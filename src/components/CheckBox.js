import React from 'react'
import { Radio } from '@mui/material'

export default function CheckBox(props) {
  return (
    <span style={props.style}>
         <span >{props.label}</span>
            <Radio
              checked={props.checked}
              value={props.value}
              onChange={props.onChange}
            />
    </span>
  )
}
