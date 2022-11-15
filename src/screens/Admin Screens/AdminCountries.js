import React, { useState } from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import { sendData } from '../../config/firebaseMethods'


export default function AdminCountries() {
    let[obj , setObj] = useState({})
    let[greenSignal , setGreenSignal] = useState(false)
    let[redSignal , setRedSignal] = useState(false)
    let fillObject = (key , val)=>{
        obj[key] = val;
        setObj({...obj})
    }
    let addCountry=()=>{
    sendData({...obj} , "countries")
    .then((success)=>{
      setGreenSignal(true)
      setRedSignal(false)
    })
    .catch((error)=>{
      setGreenSignal(false)
      setRedSignal(true)
    })
    }
  return (
    <div>
       <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Manage Countries</Typography>  
                  <  Input label="Country Name" required="required" type="text" value={obj.countryName} onChange={(e)=>fillObject( "countryName" , e.target.value)}/>
                  <  Input label="Country Code" required="required" type="text" value={obj.countryCode} onChange={(e)=>fillObject( "countryCode" , e.target.value)}/>
                  <  Input label="Currency" required="required" type="text" value={obj.currency} onChange={(e)=>fillObject( "countryCurrency" , e.target.value)}/>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Data submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Error : Data not Submitted</p> : null} 
                  <BButton onClick={addCountry}  label="Submit"/>
                  </Grid>
               
         </Grid>
      </Container>
    </div>
  )
}
