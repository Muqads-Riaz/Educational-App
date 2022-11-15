import React, { useEffect } from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import { sendData } from '../../config/firebaseMethods'
import { useState } from 'react'
import Dropdown from '../../components/Dropdown'
import { getDatabase, ref, onValue} from "firebase/database";
import { getData } from '../../config/firebaseMethods'


export default function TrainerRegistration() {
    const db = getDatabase()
    let[obj , setObj] = useState({})
    let[qualificationsArray , setQualificationsArray] = useState([])
    let[warning , setWarning] = useState(false)
    let[extraQualification, setExtraQualification] = useState("")
    let [redSignal , setRedSignal] = useState(false)
    let[greenSignal , setGreenSignal] = useState(false)
    let[data , setData] = useState([])
    let[filteredData , setFilteredData] = useState([])
 
  let fillObject = (key , val)=>{
        obj[key] = val;
        setObj({...obj})
  }
      
  let addExtraQualification = ()=>{
            if(extraQualification== ""){
              setWarning(true)
               }else{
                setWarning(false)
               setQualificationsArray([...qualificationsArray, extraQualification])
               setExtraQualification("")
               }
          }
let getTrainerData = ()=>{
 getData("users")
 .then((success)=>{
  setData(Object.values(success))
 })
 .catch((error)=>{
console.log(error)
 })
}
 useEffect(()=>{
  getTrainerData()
 },[])

 useEffect(()=>{
  filteredData = data.filter((e)=>{
    return e.category=="trainer"
  })
  setFilteredData([...filteredData])
},[data])

 console.log(filteredData)
let submitData = ()=>{
sendData({...obj, category:"trainer", otherQualification:qualificationsArray} , "users")
.then(()=>{
   setRedSignal(false)
   setGreenSignal(true)
   setObj({})
   setQualificationsArray([])
})
.catch(()=>{
    setRedSignal(true)
   setGreenSignal(false)
})
}

  return (
    <div>
     
    <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Trainer Registration</Typography>
                <  Input required="required" label="First Name" type="text" value={obj.firstName} onChange={(e)=>fillObject( "firstName" , e.target.value)}/>
                <  Input required="required" label="Last Name" type="text" value={obj.lastName} onChange={(e)=>fillObject( "lastName" , e.target.value)}/>
                <Input required="required" label="CNIC" type="number" value={obj.CNIC} onChange={(e)=>fillObject( "CNIC" , e.target.value)}/>
                <Input required="required" label="Qualification" type="text" value={obj.qualification} onChange={(e)=>fillObject( "qualification" , e.target.value)}/>
                <Input required="required" label="Contact Number" type="number" value={obj.contact} onChange={(e)=>fillObject( "contact" , e.target.value)}/>
                  {qualificationsArray && qualificationsArray.length > 0?
                  qualificationsArray.map((e,i)=>{
                   return <span key={i}>{e}, </span>
                  }):null}
                  <Input value={extraQualification} onChange={(e)=>setExtraQualification(e.target.value)} type="text" label="Other Qualification"/>
                  {warning? <p style={{color :"red" , margin :"10px"}}>Error : Write any text</p> : null}
               
                  <BButton onClick={addExtraQualification} label="Add"></BButton> 
                  <Dropdown onChange={(e)=>fillObject( "course" , e.target.value)} value={obj.course} label="Allowed Courses" dataSource={["Web Development" ,"Graphic Designing" , "Blockchain" , "Flutter"]} />
                  </Grid>
                  <Grid sx={{marginY:"20px"}} item xs={12} md={12} sm={12} lg={12} >
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Form Submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Form Not Submitted</p> : null} 
                  <BButton onClick={submitData} label="Submit"/>
                  </Grid>
               
         </Grid>
      </Container>
     {filteredData && filteredData.length > 0 ?
       <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Trainers List</Typography>
                { filteredData.map((obj)=>{
                 return<div> <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }}  item xs={12} md={12} sm={12} lg={12} ><Typography component="div"  variant="h6">First Name : {obj.firstName}</Typography>
                 <Typography component="div" variant="p">Last Name : {obj.lastName}</Typography>
                 <Typography component="div" variant="p">Contact : {obj.contact}</Typography>
                 <Typography component="div" variant="p">CNIC : {obj.CNIC}</Typography> <Typography component="div" variant="p">Qualification : {obj.qualification}</Typography>
                 <Typography component="div" variant="p">AllowedCourse : {obj.course}</Typography>
                
                </Grid></div>
                })}
                </Grid>     
         </Grid>
      </Container>:null}
    </div>
  )
}
