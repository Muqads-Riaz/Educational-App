import React from 'react'
import { Button } from '@mui/material'


export default function BButton(props) {
  return (
    <div style={props.style}>
   <Button onClick={props.onClick} variant='contained'>{props.label}</Button>
    </div>
  )
}
