import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import BuildEnv from './buildEnv.js'
import { debounce } from 'lodash'

const TypeAheadSearch = (props) => {
  const setCuisines = props.setCuisines
  const setResults = props.setResults
  const setFacetResults = props.setFacetResults
  const selectedCuisine = props.selectedCuisine
  const selectedBorough = props.selectedBorough
  const setSearchTerm = props.setSearchTerm
  const setBoroughs = props.setBoroughs

  const fetchResults = React.useCallback(
    async (searchTerm) => {
      try {
        const searchResults = await fetch(
          `${BuildEnv()}/restaurant/search/${searchTerm}`
        )
        setResults(await searchResults.json())
        const activeCuisineFacet = selectedCuisine.value
          ? selectedCuisine.value
          : '*'
        const activeBoroughFacet = selectedBorough.value
          ? selectedBorough.value
          : '*'
        const query = `${BuildEnv()}/restaurant/facet/${searchTerm}/${activeCuisineFacet}/${activeBoroughFacet}`
        const fetchFacetResults = await fetch(query)
        const facetResultJson = await fetchFacetResults.json()
        setFacetResults(facetResultJson[0])
      } catch (err) {
        setResults([])
        setFacetResults([])
      }
    },
    [selectedBorough, selectedCuisine, setFacetResults, setResults]
  )

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (searchTerm) => {
        fetchResults(searchTerm)
      }, 500),
    [fetchResults]
  )

  const handleSearchTermChange = React.useCallback(
    (event) => {
      setSearchTerm(event.target.value)
      debouncedSearch(event.target.value)
    },
    [debouncedSearch, setSearchTerm]
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
      setBoroughs(await optionsObject)
    }

    fetchCuisineFacets()
    fetchBoroughFacets()
  }, [setCuisines, setBoroughs])

  return (
    <Autocomplete
      sx={{
        pt: '25px'
      }}
      freeSolo
      loading
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
          variant="outlined"
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
