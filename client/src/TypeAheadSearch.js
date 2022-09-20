import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@material-ui/core'
import BuildEnv from './buildEnv.js'
import { debounce } from 'lodash'

const TypeAheadSearch = (props) => {
  const setCuisines = props.setCuisines

  const fetchResults = React.useCallback(async (searchTerm) => {
    try {
      const searchResults = await fetch(
        `${BuildEnv()}/restaurant/search/${searchTerm}`
      )
      props.setResults(await searchResults.json())
      const activeCuisineFacet = props.selectedCuisine.value
        ? props.selectedCuisine.value
        : '*'
      const activeBoroughFacet = props.selectedBorough.value
        ? props.selectedBorough.value
        : '*'
      const query = `${BuildEnv()}/restaurant/facet/${searchTerm}/${activeCuisineFacet}/${activeBoroughFacet}`
      const fetchFacetResults = await fetch(query)
      const facetResultJson = await fetchFacetResults.json()
      props.setFacetResults(facetResultJson[0])
    } catch (err) {
      props.setResults([])
      props.setFacetResults([])
    }
  }, [])

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (searchTerm) => {
        fetchResults(searchTerm)
      }, 500),
    [fetchResults]
  )

  const handleSearchTermChange = React.useCallback(
    (event) => {
      props.setSearchTerm(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch]
  )

  React.useEffect(() => {
    const fetchCuisineFacets = async () => {
      const cuisineFacets = await fetch(
        `${BuildEnv()}/restaurants/facets/cuisine`
      )
      const apiResults = await cuisineFacets.json()
      const optionsObject = apiResults.map((c) => {
        return { label: c, value: c }
      })
      setCuisines(await optionsObject)
    }

    const fetchBoroughFacets = async () => {
      const boroughFacets = await fetch(
        `${BuildEnv()}/restaurants/facets/borough`
      )
      const apiResults = await boroughFacets.json()
      const optionsObject = apiResults.map((b) => {
        return { label: b, value: b }
      })
      props.setBoroughs(await optionsObject)
    }

    fetchCuisineFacets()
    fetchBoroughFacets()
  }, [setCuisines])

  return (
    <Autocomplete
      // sx={{ width: '100%' }}
      freeSolo
      // loading
      autoSelect
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.name ?? ''}
      options={props.results}
      value={props.selectedResult}
      onChange={(_event, selected) => {
        props.setSelectedResult([selected])
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.name}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // onChange={fetchSearchResultsFromBackend}
          onChange={handleSearchTermChange}
          type="search"
          label="Type-Ahead Restaurant Search"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: <React.Fragment></React.Fragment>
          }}
        />
      )}
    />
  )
}

export default TypeAheadSearch
