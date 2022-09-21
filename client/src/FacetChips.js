import React from 'react'
import { Chip, Box } from '@mui/material'
import LocationCity from '@mui/icons-material/LocationCity'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const FacetChips = (props) => {
  const handleFacetClick = (event) => {
    const classList = event.currentTarget.classList
    if (classList.contains('cuisine')) {
      props.cuisineFacetSetter(event.currentTarget.innerText)
    } else {
      props.boroughFacetSetter(event.currentTarget.innerText)
    }
  }

  if (props.facets.facet) {
    let facets = []
    for (const [facetName, facetData] of Object.entries(props.facets.facet)) {
      for (const [, value] of Object.entries(facetData.buckets)) {
        facets.push({
          key: value._id,
          label: value._id, // + ' (' + value.count + ')',
          icon:
            facetName === 'cuisine' ? <RestaurantMenuIcon /> : <LocationCity />,
          className: facetName
        })
      }
    }

    return (
      <Box
        sx={{
          pt: 2,
          justifyContent: 'flex-end'
        }}
      >
        {facets.map((facet) => (
          <Chip
            onClick={handleFacetClick}
            key={facet.key}
            icon={facet.icon}
            label={facet.label}
            className={facet.className}
            size="small"
            color="secondary"
          />
        ))}
      </Box>
    )
  }
}
export default FacetChips
