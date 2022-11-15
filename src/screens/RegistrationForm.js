import React, { useEffect, useState } from 'react'
import { Container , Grid , Typography } from '@mui/material'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'
import BButton from '../components/BButton'
import { signUpUser } from '../config/firebaseMethods'
import CircularProgress from '@mui/material/CircularProgress';


export default function RegistrationForm() {
  let[greenSignal , setGreenSignal] = useState(false)
  let[redSignal , setRedSignal] = useState(false)
  let[loader , setLoader] = useState(true)
let[obj,setObj] = useState({})
let sec =  ["A", "B"];
let course = ["Graphic Designing" , "Web Development"]
let fillObject=(key,val)=>{
obj[key] = val;
setObj({...obj})
}


let submit = ()=>{
  setLoader(false)
  signUpUser({...obj,isFeeSubmitted: "false" ,isApproved: "false" ,isActive: "false" , registrationDate: new Date().getDate()+ "-" + new Date().getMonth() + "-" + new Date().getFullYear() , registrationYear:new Date().getFullYear() , category:"std" } , "users" )
    .then((success)=>{
      setLoader(true)
      setGreenSignal(true)
      setRedSignal(false)
      setObj({})
   })
   .catch((error)=>{
    setLoader(true)
    setRedSignal(true)
    setGreenSignal(false)
   })
  }
  
  useEffect(()=>{
    let date = new Date();
    console.log(date.getMonth() + 1)
  },[])
  return (
    <div>
            <Container  maxWidth="md" sx={{ textAlign: "center" , marginY:"20px"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography sx={{backgroundColor : "lightgray" , padding:"15px" , color:"white"}} m={3} variant="h4">Registration Form</Typography>
                  </Grid>
                    <Grid item md={6} lg={6} sm={12} xs={12}>
                    <div style={{ textAlign: "center" }}>
                    <Input value={obj.firstName} onChange={(e)=>fillObject( "firstName" , e.target.value)} required="required" label="First Name" type="text"/>
                    <Input value={obj.lastName} onChange={(e)=>fillObject( "lastName" , e.target.value)}   label="Last Name" type="text"/> 
                    <Dropdown required="required" value={obj.courseName} label="Course Name" onChange={(e)=>fillObject( "courseName" , e.target.value)} dataSource = {course} /> 
                    <Dropdown required="required" value={obj.section} label="Section" onChange={(e)=>fillObject( "section" , e.target.value)} dataSource={sec}  />
                    <Input required="required" value={obj.contactNumber} onChange={(e)=>fillObject( "contactNumber" , e.target.value)} label="Contact Number" type="number"/>
                    <span>Date of Birth</span>
                    <Input  value={obj.dateOfBirth} onChange={(e)=>fillObject( "dateOfBirth" , e.target.value)}  type="date"/>
                    <Input disabled="true"  value={obj.age} onChange={(e)=>fillObject( "age" , e.target.value)} label="Age will be calculated automatically" type="number"/>
                        </div>
                    </Grid>
                   
                    <Grid item md={6} lg={6} sm={12} xs={12}  >
                        <div style={{ textAlign: "center" }}> 
                        <Input  value={obj.email} onChange={(e)=>fillObject( "email" , e.target.value)} label="Email" type="email"/>
                        <Input  value={obj.password} onChange={(e)=>fillObject( "password" , e.target.value)} label="Password" type="password"/>
                        <Input required="required"  value={obj.CNIC} onChange={(e)=>fillObject( "CNIC" , e.target.value)} label="CNIC" type="number"/>
                      
                        <Input required="required" value={obj.emergencyContact} onChange={(e)=>fillObject( "emergencyContact" , e.target.value)}  label="Emergency Contact" type="number"/>
                        <Input required="required" value={obj.fatherName} onChange={(e)=>fillObject( "fatherName" , e.target.value)}  label="Father Name" type="text"/>
                        <Input value={obj.fatherCNIC} onChange={(e)=>fillObject( "fatherCNIC" , e.target.value)}  label="Father CNIC" type="number"/> 

                        <Input required="required" value={obj.fatherContact} onChange={(e)=>fillObject( "fatherContact" , e.target.value)}  label="Father Contact" type="number"/>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} lg={12} >
                    {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Registration Form Submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Error : Registration Form Not Submitted</p> : null} 
                  {loader?<BButton onClick={submit}  label= "Submit"/>:<CircularProgress/>}
                
                  </Grid>
                </Grid>
               
              
            </Container> 
    </div>
  )
}
