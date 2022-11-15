import React from 'react'
import { Grid, Container, Table, TableBody, TableCell, TableHead, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import CircularProgress from '@mui/material/CircularProgress';
import { getData } from '../config/firebaseMethods';

export default function Result() {
  let [data, setData] = useState([])
  let [showResults, setShowResults] = useState([])
  let [courses, setCourses] = useState([])
  let [selectedCourse, setSelectedCourse] = useState("")
  let [finalResult, setFinalResult] = useState([])
  let [rollNumber , setRollNumber] = useState("")
  let [result , setResult] = useState([]);
  let [rollNoResult , setRollNoResult] = useState([])
  let [idResult , setIdResult] = useState([]);
  let[id,setId] = useState("")
  let [ notFound , setNotFound] = useState(false)
  let[noMatch , setNoMatch] = useState(false)


  useEffect(() => {
    getData("result")
    .then((success)=>{
     setData(Object.values(success))
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  let allShowResult = () => {
    showResults = data.filter((x) => {
      return x.isShowResult
    })
    setShowResults([...showResults])

    courses = showResults.map((e) => {
      return e.course
    })
    setCourses([...courses])
  }
  useEffect(() => {
    allShowResult()
  }, [data])

  let showSelectedResult = (val) => {
    setSelectedCourse(val);
    finalResult = showResults.filter((e) => {
      return e.course == val
    })
    setFinalResult([...finalResult])
    result = finalResult.map((e)=>{
     return e.result
    })
    setResult([...result])
  }
  
  
  let resultByRollNumer = (val)=>{
    setNoMatch(false)
    setNotFound(false)
    setRollNumber(val)
    rollNoResult =result[0].filter((e)=>{
      return e.rollNumber==val
    })
    setRollNoResult([...rollNoResult])
    if(rollNoResult.length==0){
      setNotFound(true)
    }
   
  }
  let resultById = (val)=>{
    setNoMatch(false)
    setNotFound(false)
    setId(val)
    idResult =result[0].filter((e)=>{
      return e.id.includes(val)
    })
    setIdResult([...idResult])
    if(idResult.length==0){
      setNoMatch(true)
    }
  }
  
  return (
    <div>




        <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >  
          <Grid item xs={12} md={12} sm={12} lg={12} >
      {showResults && showResults.length > 0 ? 
      <><Dropdown value={selectedCourse} onChange={(e) => showSelectedResult(e.target.value)} label="Course" dataSource={courses} />
      {selectedCourse && selectedCourse!="" ? 
    <> <Input value={rollNumber} onChange={(e)=>resultByRollNumer(e.target.value)} label="Search by Roll Number"/> 
       {rollNoResult && rollNoResult.length > 0?
       <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid container sx={{ backgroundColor: "lightgray", padding: "10px" , marginY:"40px"}} >
          <Grid item xs={12} md={12} sm={12} lg={12} >
                  <Table>
                    <TableHead>
                      <TableCell>Roll Number</TableCell>
                      <TableCell>Student Id</TableCell>
                      <TableCell>Marks</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableHead>
                    { rollNoResult.map((e) => {
                        return <TableBody>
                          <TableCell sx={{color:"white"}}>{e.rollNumber}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.id}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.marks}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.status}</TableCell>

                        </TableBody>
                      })}

                  </Table>
          </Grid>
          </Grid>
          </Container>
    :null}
    {notFound?
     <h1 style={{textAlign:"center" }}>No Data Found</h1>
    :null} 
      <Input value={id} onChange={(e)=>resultById(e.target.value)} label="Search by Student Id"/> 
      {noMatch?
       <h1 style={{textAlign:"center" }}>No Data Found</h1>
      :null}
      {idResult && idResult.length > 0?
       <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid container sx={{ backgroundColor: "lightgray", padding: "10px" , marginY:"40px"}} >
          <Grid item xs={12} md={12} sm={12} lg={12} >
                  <Table>
                    <TableHead>
                      <TableCell>Roll Number</TableCell>
                      <TableCell>Student Id</TableCell>
                      <TableCell>Marks</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableHead>
                    {idResult.map((e) => {
                        return <TableBody>
                          <TableCell sx={{color:"white"}}>{e.rollNumber}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.id}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.marks}</TableCell>
                          <TableCell sx={{color:"white"}}>{e.status}</TableCell>

                        </TableBody>
                      })}

                  </Table>
          </Grid>
          </Grid>
          </Container>
    :null}
      </> 
      :null}
      </>
      :<CircularProgress/>}
      </Grid>
      </Grid>
      </Container>

     {finalResult && finalResult.length > 0 ?
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
          <Grid item xs={12} md={12} sm={12} lg={12} >
              {finalResult.map((obj) => {
                return <> <Typography sx={{ backgroundColor: "lightgray", padding: "15px", color: "white" }} m={3} variant="h4">{obj.course}</Typography>
                  <Table>
                    <TableHead>
                      <TableCell>Roll Number</TableCell>
                      <TableCell>Student Id</TableCell>
                      <TableCell>Marks</TableCell>
                      <TableCell>Grade</TableCell>
                    </TableHead>
                    {
                      obj.result.map((e) => {
                        return <TableBody>
                          <TableCell>{e.rollNumber}</TableCell>
                          <TableCell>{e.id}</TableCell>
                          <TableCell>{e.marks}</TableCell>
                          <TableCell>{e.status}</TableCell>

                        </TableBody>
                      })}

                  </Table>
                </>
              }) }
          </Grid>
        </Grid>
      </Container>:null}
    </div>
  )
}
