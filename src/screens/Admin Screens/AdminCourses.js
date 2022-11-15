import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import Dropdown from '../../components/Dropdown'
import CheckBox from '../../components/CheckBox'
import { sendData } from '../../config/firebaseMethods'
import { getData } from '../../config/firebaseMethods'


export default function AdminCourses() {

  let[obj , setObj] = useState({});
  let[duration , setDuration] = useState(["8 months","10 months","12 months" , "14 months " , "16 months"])
  let[quiz , setQuiz] = useState([6 , 8 , 10 ,12 , 14 , 16])
  let[show , setShow] = useState(false)
  let[data , setData] = useState([]);
  let[form , setForm] = useState(false);
  let [greenSignal , setGreenSignal] = useState(false)
   let [redSignal , setRedSignal] = useState(false)
   let[warning , setWarning] = useState(false)

  let[assistantTrainer , setAssistantTrainer] = useState("");
  let[trainerArray , setTrainerArray] = useState([])


  let fillObject = (key , val)=>{
    setGreenSignal(false)
obj[key] = val;
setObj({...obj})
  }
  let addData=()=>{
    if(obj.courseName !="" && obj.courseDuration !="" && obj.courseFee !="" && obj.trainerId!= ""  &&  obj.noOfQuiz!=""){
      sendData({...obj,form ,assistantTrainer:trainerArray } , "courses")
      .then((success)=>{
        setGreenSignal(true)
        setObj({})
       setTrainerArray([])
       
      })
      .catch((error)=>{
        setRedSignal(true)
        setGreenSignal(false)
      }) 
    }else{
      setRedSignal(true)
      setGreenSignal(false)
  }
}
  let showBox=()=>{
    setShow(true)
  } 

  let addTrainer = ()=>{
     if(assistantTrainer== ""){
   setWarning(true)
    }else{
      setWarning(false)
    setTrainerArray([...trainerArray, assistantTrainer])
    setAssistantTrainer("")
    }
  }

  useEffect(()=>{
    getData("courses")
    .then((success)=>{
     setData(Object.values(success))
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  let checkValue = (val)=>{
    setForm(val)
  }
  
  return (
    <div>
      {data && data.length > 0 ?
       <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Courses Detail</Typography>
                {data.map((obj)=>{
                 return<div> <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }}  item xs={12} md={12} sm={12} lg={12} ><Typography component="div"  variant="h6">Course Name : {obj.courseName}</Typography>
                 <Typography component="div" variant="p">Course Duration : {obj.courseDuration}</Typography>
                 <Typography component="div" variant="p">No Of Quizes : {obj.noOfQuiz}</Typography>
                 <Typography component="div" variant="p">Course Fee : {obj.courseFee}</Typography> <Typography component="div" variant="p">Lead Trainer Id : {obj.trainerId}</Typography>
                 <Typography variant="p">Assistant Trainers:</Typography>
                 {obj.assistantTrainer.map((name)=>{
                  return <span component="div"> {name} </span>
                 })}

                </Grid></div>
                })}
                </Grid>
                <Grid item xs={12} md={12} sm={12} lg={12} >
                  <BButton onClick={showBox} label="Add New Course"/>
                  </Grid>
               
         </Grid>
      </Container>:null}
      {show? <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Add New Course</Typography>
                  <  Input required="required" type="text" value={obj.courseName} onChange={(e)=>fillObject( "courseName" , e.target.value)} label="Course Name"/>
                  <  Dropdown value={obj.courseDuration} dataSource={duration} onChange={(e)=>fillObject( "courseDuration" , e.target.value)}  label="Course Duration"/>
                  <  Dropdown value={obj.noOfQuiz} dataSource={quiz} onChange={(e)=>fillObject( "noOfQuiz" , e.target.value)}  label="No of Quiz"/>
                  < Input value={obj.courseFee} onChange={(e)=>fillObject( "courseFee" , e.target.value)}  label="Fee"/>
                  <  Input value={obj.trainerId} onChange={(e)=>fillObject( "trainerId" , e.target.value)}  label="Lead Trainer Id"/>

                  
                  {trainerArray && trainerArray.length > 0?
                  trainerArray.map((e,i)=>{
                   return <span key={i}>{e}, </span>
                  }):null}
                  {warning? <p style={{color :"red" , margin :"10px"}}>Error : Write any name here</p> : null}

                  <Input value={assistantTrainer} onChange={(e)=>setAssistantTrainer(e.target.value)} type="text" label="Assisstant Trainer"/>

                  <BButton onClick={addTrainer} label="Add"></BButton>

                  

                  <CheckBox required="required"  value="true" onChange={(e)=>checkValue(e.target.value)} checked={form=="true"}  label="Is Form Open"/>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Course Added</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Error : Course is not added</p> : null} 
                  <BButton onClick={addData} label="Add Course"/>
                  </Grid>
               
         </Grid>
      </Container> : ""
      }
     
    </div>
  )
}
