import React, { useEffect, useState } from 'react'
import { checkUsers, getDatawithId } from '../../config/firebaseMethods'
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
export default function StudentBooks() {
  let [id, setId] = useState()
  let [data, setData] = useState([])

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
        setData(success)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
 

  return (
    <div>
{data?<Container maxWidth="lg">
        <Grid spacing={3} container>
          <Grid item xs={12} md={12} sm={12} lg={12} >
            <Typography sx={{textAlign:"center" , backgroundColor:"lightgrey" , padding:"10px" , color:"white"}} variant="h4">Student Profile</Typography>
          </Grid>
          <Grid item xs={12} md={4} sm={12} lg={4}  >
            <Box sx={{ textAlign: "center", marginY: "30px", padding: "10px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
              <img style={{width:"100%"}} src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/graduation-student-icon.png"></img>
              <Typography>{data.email}</Typography>
              <Typography>{data.rollNumber}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} sm={12} lg={8}  >
            <Box sx={{ marginY: "30px", padding: "25px", paddingLeft:"40px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
              <Typography>First Name : {data.firstName}</Typography>
              <Typography>Last Name : {data.lastName}</Typography>
              <Typography>Course Name : {data.courseName}</Typography>
              <Typography> Section Name : {data.section}</Typography>
            <Typography>Contact Number : {data.contactNumber}</Typography>
            <Typography>CNIC : {data.CNIC}</Typography>
            <Typography>Age : {data.dateOfBirth && new Date().getFullYear() - data.dateOfBirth.slice(0,4)}</Typography>
            <Typography>Father Name : {data.fatherName}</Typography>
            <Typography>Father Contact Number : {data.fatherContact}</Typography>
            <Typography>Father Contact CNIC : {data.fatherCNIC}</Typography>
            <Typography>Date Of Birth : {data.dateOfBirth}</Typography>
            <Typography>Registration Date : {data.registrationDate}</Typography>
            <Typography>Email : {data.email}</Typography>
            <Typography>Password : {data.password}</Typography>

            <Typography>Roll Number : {data.rollNumber && data.courseName.slice(0,3) + new Date().getFullYear() + data.rollNumber.slice(7,15)}</Typography>
            </Box>
          </Grid>

        </Grid>

      </Container>:null }
      
    </div>
  )
}
