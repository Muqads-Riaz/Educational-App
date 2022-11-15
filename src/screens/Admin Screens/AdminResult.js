import React from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import Dropdown from '../../components/Dropdown'
import CheckBox from '../../components/CheckBox'
import { useState ,useEffect} from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
import { getData, sendData } from '../../config/firebaseMethods'
import { getChildData } from '../../config/firebaseMethods'
import {Table, TableBody, TableCell, TableHead, Switch } from '@mui/material';



export default function AdminResult() {
  let courseArray = ["Web Development" ," Graphic Designing" ," Flutter" , "Blockchain"]
  let[course , setCourse] = useState("")
  let[quizName , setQuizName] = useState("")
  let[isShowResult , setIsShowResult] = useState(false);
  let[data , setData] = useState([])
  let [greenSignal , setGreenSignal] = useState(false)
  let [redSignal , setRedSignal] = useState(false)
  let [showResults, setShowResults] = useState([])
  let [courses, setCourses] = useState([])
  let [selectedCourse, setSelectedCourse] = useState("")
  let [finalResult, setFinalResult] = useState([])
  let [result , setResult ] = useState([{
    id : "1hjjkf",
    rollNumber : 1,
    marks : 60 , 
    status : "B",
  },
  {
    id : "2vbncc",
    rollNumber : 2,
    marks : 80 , 
    status : "A+",
  },
  {
    id : "3jhcghj",
    rollNumber : 3,
    marks : 66 , 
    status : "B",
  },
  {
    id : "4hjjkf",
    rollNumber : 4,
    marks : 91 , 
    status : "A+",
  },
  {
    id : "5hjjkf",
    rollNumber : 5,
    marks : 73 , 
    status : "A",
  },
  {
    id : "6hjjkf",
    rollNumber : 6,
    marks : 77 , 
    status : "A",
  }
   ])
    let updateResult = ()=>{
      sendData({course , isShowResult , result} , "result")
      .then((success)=>{
        setIsShowResult(false)
        setCourse("")
        setGreenSignal(true)
        setRedSignal(false)
      })
      .catch((error)=>{
        setRedSignal(true)
        setGreenSignal(false)
      })
     }
     useEffect(()=>{
      getData ("result")
      .then((success)=>{
       setData(Object.values(success))
   
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
    let allShowResult = () => {
      courses = data.map((e) => {
        return e.course
      })
      setCourses([...courses])
    }
    useEffect(() => {
      allShowResult()
    }, [data])

    let showSelectedResult = (val) => {
      setSelectedCourse(val);
      finalResult = data.filter((e) => {
        return e.course == val
      })
      setFinalResult([...finalResult])
    }
    // useEffect(()=>{
    //   getData ("stdResult")
    //   .then((success)=>{
    //    setData(Object.values(success))
   
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
    // },[])
    // console.log(data)
  return (
    <div>
      <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
       <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
        <Grid item xs={12} md={12} sm={12} lg={12} >
        <Typography m={3} variant="h4">Update Result</Typography>
        <span>Is Show Update</span>
        <Switch value={isShowResult}  onChange={(e)=>setIsShowResult(e.target.checked)}   />
        < Dropdown label="Course" dataSource={courseArray}  value={course} 
        onChange={(e)=>setCourse(e.target.value)}/>
        < Dropdown label="Quiz" dataSource={courseArray}  value={quizName} 
        onChange={(e)=>setQuizName(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} >
        {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Result updated</p> : null} 
        {redSignal? <p style={{color :"red" , margin :"10px"}}>Result Not updated</p> : null} 
        <BButton onClick={updateResult} label="Update Result"/>
        </Grid>
         </Grid>
      </Container> 
     
      {data && data.length > 0 ? 
      <Container  maxWidth="md"  sx={{ textAlign: "center"}}>
                <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography sx={{ padding:"15px"}} m={3} variant="h4">Previous Updated Result</Typography>
                <Dropdown value={selectedCourse} onChange={(e) => showSelectedResult(e.target.value)} label="Course" dataSource={courses} />
                {finalResult && finalResult.length > 0 ? 
                 finalResult.map((obj)=>{
                  return<> <Typography sx={{backgroundColor : "lightgray" , padding:"15px" , color:"white"}} m={3} variant="h4">{obj.course}</Typography>
                     <Table>
            <TableHead>
               <TableCell>Roll Number</TableCell>
               <TableCell>Student Id</TableCell>
               <TableCell>Marks</TableCell>
               <TableCell>Roll Number</TableCell>
            </TableHead>        
              {
                 obj.result.map((e)=>{
                return <TableBody>
                 <TableCell>{e.id}</TableCell>
               <TableCell>{e.rollNumber}</TableCell>
               <TableCell>{e.marks}</TableCell>
               <TableCell>{e.status}</TableCell>
            
               </TableBody>   
                })} 
           
        </Table>   
                  </>
                }):null}
        </Grid>
         </Grid>
      </Container>
      :<h1 style={{textAlign:"center"}} >No Previous Updated Result</h1>}
    </div>
  )
}
