import React from 'react'
import { Autocomplete } from '@mui/material'
import { TextField } from '@mui/material'

const FacetAutocomplete = (props) => {
  const pickOptionLabel = (option) => {
    if (option.value) {
      return option.value
    } else if (option && typeof option === 'string') {
      return option
    }
    return ''
  }

  return (
    <Autocomplete
      sx={{ width: 1 }}
      value={props.selected}
      options={props.options}
      disablePortal={true}
      getOptionLabel={(option) => pickOptionLabel(option)}
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
