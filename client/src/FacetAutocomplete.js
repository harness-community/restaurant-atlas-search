import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'
import { calculateActiveFacetValue } from './utils'

const FacetAutocomplete = (props) => {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      value={props.selected}
      options={props.options}
      disablePortal={true}
      getOptionLabel={(option) =>
        option && typeof option === 'string' ? option : ''
      }
      isOptionEqualToValue={(option, value) => true}
      onChange={(_event, selected) => {
        props.setter(selected)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={props.selected}
          variant="outlined"
          label={props.label}
        />
      )}
    />
  )
}
export default FacetAutocomplete
