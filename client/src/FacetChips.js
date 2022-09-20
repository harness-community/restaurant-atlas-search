import React, { Component } from 'react'
import { Chip, Box } from '@mui/material'
import LocationCity from '@mui/icons-material/LocationCity'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

export default class FacetChips extends Component {
  handleFacetClick = (event) => {
    console.log('handleFacetClick', event)
  }

  render() {
    if (this.props.facets.facet) {
      let facets = []
      for (const [facetName, facetData] of Object.entries(
        this.props.facets.facet
      )) {
        for (const [, value] of Object.entries(facetData.buckets)) {
          facets.push({
            key: value._id,
            label: value._id + ' (' + value.count + ')',
            icon:
              facetName === 'cuisine' ? (
                <RestaurantMenuIcon />
              ) : (
                <LocationCity />
              )
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
              onClick={this.handleFacetClick}
              key={facet.key}
              icon={facet.icon}
              label={facet.label}
              size="small"
              color="secondary"
            />
          ))}
        </Box>
      )
    }
  }
}
