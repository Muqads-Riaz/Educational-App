import React from 'react'
import { Container , Grid , Typography , Box} from '@mui/material'
import { useState } from 'react'
import { getData } from '../../config/firebaseMethods'
import { useEffect } from 'react'
import { checkUsers } from '../../config/firebaseMethods'
import { getDatawithId } from '../../config/firebaseMethods'

export default function StudentTutors() {
  let [id, setId] = useState()
  let [stdData, setstdData] = useState([])
  let[data , setData] = useState([])
  let[trainerData , setTrainerData] = useState([])
  let[filteredData , setFilteredData] = useState([])
  let[courseTrainer , setCourseTrainer] = useState([])

  useEffect(() => {
    checkUsers()
      .then((userId) => {
        setId(userId)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    getDatawithId("users", id)
      .then((success) => {
        setstdData(success)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
 
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
   
   let trainerDetail = ()=>{
    courseTrainer = filteredData.filter((e)=>{
     return e.course==stdData.courseName
    })
    setCourseTrainer([...courseTrainer])
  }
  useEffect(() => {
    trainerDetail()
 }, [filteredData,stdData])


  return (
    <div>
          {courseTrainer && courseTrainer.length > 0 ?
       <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Trainers List</Typography>
                { courseTrainer.map((obj)=>{
                 return<div> <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }}  item xs={12} md={12} sm={12} lg={12} ><Typography component="div"  variant="h6">First Name : {obj.firstName}</Typography>
                 <Typography component="div" variant="p">Last Name : {obj.lastName}</Typography>
                 <Typography component="div" variant="p">Contact : {obj.contact}</Typography>
                 <Typography component="div" variant="p">CNIC : {obj.CNIC}</Typography> <Typography component="div" variant="p">Qualification : {obj.qualification}</Typography>
                 <Typography component="div" variant="p">AllowedCourse : {obj.course}</Typography>
                
                </Grid></div>
                })}
                </Grid>     
         </Grid>
      </Container>:<div style={{textAlign:"center" , display:"flex" , justifyContent:"center" , alignItems:"center" , height:"70vh"}}>
      <h1>No Trainer</h1>
      </div>}
    </div>
  )
}
