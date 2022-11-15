import React, { useState } from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import CheckBox from '../../components/CheckBox'
import { getDatabase, ref, set} from "firebase/database";

export default function AdminFormControl() {
  let[obj , setObj] = useState({})
  let[form , setForm] = useState(false)
  let[city , setCity] = useState("")
  let[citiesArray , setCitiesArray] = useState([])
  let[course , setCourse] = useState("")
  let[coursesArray , setCoursesArray] = useState([])
  let[warning , setWarning] = useState(false)
  let[courseWarning , setCourseWarning] = useState(false)
  const db = getDatabase()
  let fillObject = (key , val)=>{
obj[key] = val;
setObj({...obj})
  }
  let checkValue = (val)=>{
    setForm(val)
    console.log(val)
  }
  let addCities = ()=>{
    if(city== ""){
      setWarning(true)
      setCourseWarning(false)
       }else{
        setWarning(false)
        setCourseWarning(false)
       setCitiesArray([...citiesArray, city])
       setCity("")
       }
  }
  let addCourse = ()=>{
    if(course== ""){
      setWarning(false)
      setCourseWarning(true)
       }else{
        setWarning(false)
        setCourseWarning(false)
   setCoursesArray([...coursesArray , course])
   setCourse("")
       }
  }
  let submit = ()=>{
  set(ref(db, 'FormControlData/'), {...obj,form ,courses:coursesArray,cities:citiesArray });
  setCitiesArray([])
  setCoursesArray([])
  setForm(false)
  }
  return (
    <div>
      <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Form Control</Typography>
                <div>
              <CheckBox required="required"  value="true" onChange={(e)=>checkValue(e.target.value)} checked={form=="true"}  label="Is Form Open"/>
              </div>
              {coursesArray && coursesArray.length > 0?
                  coursesArray.map((e,i)=>{
                   return <span key={i}>{e}, </span>
                  }):null}
                  <Input value={course} onChange={(e)=>setCourse(e.target.value)} type="text" label="Courses"/>
                  {courseWarning? <p style={{color :"red" , margin :"10px"}}>Error : Write any course name</p> : null}
                  <BButton onClick={addCourse} label="Add"></BButton> 
                  {citiesArray && citiesArray.length > 0?
                  citiesArray.map((e,i)=>{
                   return <span key={i}>{e}, </span>
                  }):null}
                  <Input value={city} onChange={(e)=>setCity(e.target.value)} type="text" label="Open In Cities"/>
                  {warning? <p style={{color :"red" , margin :"10px"}}>Error : Write any city name</p> : null}
                  <BButton onClick={addCities} label="Add"></BButton> 
                  <span style={{marginTop:"100px"}}>Date of Admission Start</span>
                  <  Input required="required" type="date" value={obj.dateOfAdmissionStart} onChange={(e)=>fillObject( "dateOfAdmissionStart" , e.target.value)}/>
                  <span>Date of Admission End</span>
                  <  Input required="required" type="date" value={obj.dateOfAdmissionEnd} onChange={(e)=>fillObject( "dateOfAdmissionEnd" , e.target.value)}/>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  <BButton onClick={submit} label="Submit"/>
                  </Grid>
               
         </Grid>
      </Container>
    </div>
  )
}
