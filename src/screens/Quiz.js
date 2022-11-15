import React from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import Dropdown from '../components/Dropdown';
import CircularProgress from '@mui/material/CircularProgress';
import { getData } from '../config/firebaseMethods';
import img1 from '../components/images/1.jpg'
import img2 from '../components/images/2.jpg'
import img3 from '../components/images/3.jpg'
import img4 from '../components/images/4.jpg'
import Countdown from '../components/Timer';
import Box from '@mui/material/Box';
import BButton from '../components/BButton';

export default function Quiz() {
  let [data, setData] = useState([])
  let [showQuiz, setShowQuiz] = useState([])
  let [courses, setCourses] = useState([])
  let [selectedCourse, setSelectedCourse] = useState("")
  let[selectedQuiz , setSelectedQuiz] = useState("")
  let[finalQuiz , setFinalQuiz] = useState([])
  let[Quizzes , setQuizzes] = useState([])
let [indexNumber , setIndexNumber] = useState(0)
let[showResult , setShowResult] = useState(false)
let[score , setScore] = useState(0)
let[noOfQuestions, setnoOfQuestions] = useState()
let[show , setShow] = useState(true)
let[marks , setMarks] = useState()
let[showCards , setShowCards] = useState(false)
  
  useEffect(() => {
    getData("questions")
    .then((success)=>{
     setData(Object.values(success))
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])
  
  let allQuizzes = () => {
    courses = data.map((e) => {
      return e.courseName
    })
    courses = new Set([...courses])
    setCourses([...courses])
  }
  useEffect(() => {
    allQuizzes()
  }, [data])

  let showSelectedQuiz = (val)=>{
    setSelectedCourse(val);
    Quizzes = data.filter((e) => {
      return e.courseName == val
    }).map((e)=>{
      return e.quizName
     })
     setQuizzes([...Quizzes])
     setShow(false)
   setShowCards(true)
  }
  let showfinalQuiz = (val) => {
   setSelectedQuiz(val);
   finalQuiz = data.filter((e)=>{
   return e.quizName == val
   })
   setFinalQuiz([...finalQuiz])
   setShowCards(false)
  setnoOfQuestions(finalQuiz[0].questionsArray.length)
  setMarks(finalQuiz[0].marks)
  }

      let checkAnswer = (e , x) =>{
    if(e==x){
     setScore(score + 1);
    }
    if(indexNumber + 1 == noOfQuestions){
      setShowResult(true);
    }else{
      setIndexNumber(indexNumber + 1);
    }
    }
    let timeOver = ()=>{
      setShowResult(true);
    }
    console.log(courses)
 
  return (
    <div>
      {show?<Container maxWidth="md" sx={{ textAlign: "center" }}>
    <Grid container spacing={5} sx={{textAlign: "center" , marginY: "20px", padding: "20px"}} >  
    {courses && courses.length > 0 ? 
    courses.map((e)=>{
      return <Grid item xs={12} md={6} sm={12} lg={6} >
        <Box sx={{padding: "20px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
        <div><img width="80%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxypzU1A5IT7euy6W144eUPH4SQvh80LFZg&usqp=CAU"/></div>
      <Typography variant="h5">{e}</Typography>
      <BButton onClick={()=>showSelectedQuiz(e)}  style={{margin:"10px"}} label="Start Quiz"/>
      </Box>
      </Grid>
     }):<div style={{textAlign:"center" , display:"flex" , justifyContent:"center" , alignItems:"center" ,width:"100vw ", height:"70vh"}}>
     <CircularProgress/>
      </div>}
      </Grid>
      </Container>:null}
      {showCards?<Container maxWidth="md" sx={{ textAlign: "center" }}>
    <Grid container spacing={5} sx={{textAlign: "center" , marginY: "20px", padding: "20px"}} >  
    {Quizzes && Quizzes.length > 0 ? 
    Quizzes.map((e)=>{
      return <Grid item xs={12} md={6} sm={12} lg={6} >
        <Box sx={{padding: "20px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
        <div><img width="80%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjoct0168B5O1BhwxW3DFokLaholTIraPi4Q&usqp=CAU"/></div>
      <Typography variant="h5">{e}</Typography>
      <BButton onClick={()=>showfinalQuiz(e)}  style={{margin:"10px"}} label="Start Quiz"/>
      </Box>
      </Grid>
     }):null}
      </Grid>
      </Container>:null}
      {!showResult && !show && finalQuiz && finalQuiz.length > 0 ? 
       <Container maxWidth="md">
       <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "lightgrey", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
         <Grid item xs={12} md={12} sm={12} lg={12} >
          {finalQuiz.map((e)=>{
        return  <>
          <Typography sx={{ backgroundColor: "white", padding: "15px", textAlign : "center"}} m={3} variant="h4">{e.courseName}</Typography>

          <Countdown startingMinutes={e.duration} func={timeOver}/>
         
            <Typography  sx={{ margin:"15px" }} component="div" variant="p"> Total Marks : {e.marks} </Typography>
            <Typography  sx={{ textAlign: "center" }}>({indexNumber + 1 + "/" + noOfQuestions})</Typography>
            <Typography  sx={{ margin:"15px" }}  component="div"  variant="h5">Question No {indexNumber + 1}: {e.questionsArray[indexNumber].question}</Typography>
            {e.questionsArray[indexNumber].optionsArray.map((x)=>{
            return <div style={{backgroundColor:"white" ,padding:"15px" , margin:"10px" , borderRadius:"10px"}} onClick={()=>checkAnswer(x,e.questionsArray[indexNumber].correctOption)}>{x}</div>
          })}
            </>
          })}
         
         {/* <div>{indexNumber + 1 + "/"  + finalQuiz.length}</div>
         <div>{finalQuiz[indexNumber].question}</div>
          {finalQuiz[indexNumber].options.map((e)=>{
        return <button onClick={()=>checkAnswer(e,finalQuiz[indexNumber].correctOption)}>{e}</button>
          })} */}
          </Grid>
          </Grid>
          </Container>: null}
      {showResult?<Container maxWidth="md" sx={{ textAlign: "center" }}>
       <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
         <Grid item xs={12} md={12} sm={12} lg={12} >
          <Typography component="div" variant= "h3">Quiz Result</Typography>
         {showResult && score>= 4? <div className='position'> <img src={img2}></img><h1>Congratulations!</h1><p>You have attemped {indexNumber + 1 } questions<br/>Your Score is {score * marks / noOfQuestions}<br/>Your percentege is {score * 100 / noOfQuestions}</p> </div> 
      : showResult && score<= 4 && score>= 2? <div className='passed'> <img src={img4}></img>  <h1>Passed!</h1><p>You have attemped {indexNumber + 1 } questions<br/>Your Score is {score * marks / noOfQuestions}<br/>Your percentege is {score * 100 / noOfQuestions}</p> </div> 
      : showResult && score<= 2?  <div className='failed'> <img src={img3}></img>  <h1>Failed!</h1><p>You have attemped {indexNumber + 1 } questions<br/>Your Score is {score * marks / noOfQuestions}<br/>Your percentege is {score * 100 / noOfQuestions}</p> </div>:
      null
      } 
         </Grid>
         </Grid>
         </Container>:null}
 
    </div>
  )
}
