import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props) {
  return (
    <div>
<TextField 
sx={{ margin:"10px"}}
fullWidth
required= {props.required}
id="outlined-required"
label={props.label}
type={props.type}
value={props.value}
onChange ={props.onChange}
disabled = {props.disabled}
/>
    </div>
  )
}
