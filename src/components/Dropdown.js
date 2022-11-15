import React from 'react'
import { Select, MenuItem , InputLabel, FormControl } from '@mui/material'


export default function Dropdown(props) {
  return (
    <div>
      <FormControl   fullWidth={true}  sx={{ margin:"10px"}}>
      < InputLabel id="demo-simple-select-standard-label">{props.label}</InputLabel>
         <Select
             required = {props.required}
              label={props.label}
              variant="standard"
              onChange={props.onChange}
              value={props.value}
            >
              {props.dataSource && props.dataSource.length > 0 ? 
              props.dataSource.map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              )) : null }
            </Select>
            </FormControl>
    </div>
  )
}
