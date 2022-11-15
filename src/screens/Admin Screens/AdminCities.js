import React, { useState } from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import Dropdown from '../../components/Dropdown'
import { getData, sendData } from '../../config/firebaseMethods'
import { useEffect } from 'react'
import MyTable from '../../components/Table'

export default function AdminCities() {
    let[obj , setObj] = useState({})
    let[data , setData] = useState([])
    let[greenSignal , setGreenSignal] = useState(false)
    let[redSignal , setRedSignal] = useState(false)
    let[countries , setCountries] = useState([])
    let[citiesList , setCitiesList] = useState([])

    let fillObject = (key , val)=>{
        obj[key] = val;
        setObj({...obj})
    }
    useEffect(()=>{
    getData("cities")
    .then((success)=>{
      console.log(success)
      setCitiesList(Object.values(success))
    })
    .catch((error)=>{
   console.log(error)
    })
    },[])
console.log(citiesList)
    
    
  useEffect(() => {
    getData("countries")
    .then((success)=>{
     setData(Object.values(success))
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  let allCountries = ()=>{
  countries = data.map((e)=>{
    return e.countryName
  })
  setCountries(countries)
  }
  useEffect(()=>{
   allCountries()
  },[data])

  let addCity = ()=>{
    sendData({...obj},"cities")
    .then(()=>{
      setGreenSignal(true)
      setRedSignal(false)
    })
    .catch(()=>{
      setGreenSignal(false)
      setRedSignal(true)
    })
  }

  return (
    <div>
           <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Manage Cities</Typography>  
                  <Dropdown  label="Country" dataSource={countries} value={obj.countryName} onChange={(e)=>fillObject( "countryName" , e.target.value)} />
                  <Input label="City Name" required="required" type="text" value={obj.cityName} onChange={(e)=>fillObject( "cityName" , e.target.value)}/>
                  <Input label="City Code" required="required" type="text" value={obj.cityCode} onChange={(e)=>fillObject( "cityCode" , e.target.value)}/>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Data submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Error : Data not Submitted</p> : null} 
                  <BButton onClick={addCity} label="Submit"/>
                  </Grid>
               
         </Grid>
      </Container>
      
         
    </div>
  )
}
