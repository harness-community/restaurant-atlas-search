import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'

const FacetAutocomplete = (props) => {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      value={props.selected}
      options={props.options}
      getOptionLabel={(option) => option.value ?? ''}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_event, selected) => {
        props.setter(selected)
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={props.label} />
      )}
    />
  )
}
export default FacetAutocomplete
