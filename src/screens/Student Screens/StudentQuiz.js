import React from 'react'
import { Grid, Container, Typography , Box } from '@mui/material'
import { useState, useEffect } from 'react'
import Dropdown from '../../components/Dropdown';
import CircularProgress from '@mui/material/CircularProgress';
import { getData } from '../../config/firebaseMethods';
import BButton from '../../components/BButton';
import Countdown from '../../components/Timer';
import { getDatawithId , checkUsers } from '../../config/firebaseMethods';
import { useNavigate } from 'react-router-dom';
import { sendDatawithId } from '../../config/firebaseMethods';

export default function StudentQuiz() {
  let [data, setData] = useState([])
  let [course, setCourse] = useState([])
  let[selectedQuiz , setSelectedQuiz] = useState("")
  let[finalQuiz , setFinalQuiz] = useState([])
  let[Quizzes , setQuizzes] = useState([])
let [indexNumber , setIndexNumber] = useState(0)
let[showResult , setShowResult] = useState(false)
let[score , setScore] = useState(0)
let[noOfQuestions, setnoOfQuestions] = useState()
let[show , setShow] = useState(true)
let[marks , setMarks] = useState()
let [stdData, setstdData] = useState([])
const navigate = useNavigate()
let [id, setId] = useState()
let[obtMarks , setObtMarks] = useState("")
let[status , setStatus] = useState("")
let[grade , setGrade] = useState("")
let[percentage , setPercentage] = useState("")
let[successMessage , setSuccessMessage] = useState(false)
let[selectedCourse , setSelectedCourse] = useState("")
let[selectedQuizName , setSelectedQuizName] = useState("")



useEffect(() => {
  checkUsers()
    .then((userId) => {
      setId(userId)
    })
    .catch((error) => {
      console.log(error)
    })
}, [])
useEffect(()=>{
    getDatawithId("users", id)
    .then((success) => {
      setstdData(success)
    })
    .catch((error) => {
      console.log(error)
    })
},[id])
  useEffect(() => {
    getData("questions")
    .then((success)=>{
     setData(Object.values(success))
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])

  let allQuizzes = ()=>{
    course = data.filter((e)=>{
     return e.courseName==stdData.courseName
    })
    setCourse([...course])
    Quizzes = course.map((e)=>{
      return e.quizName
     })
     setQuizzes([...Quizzes])
  }
  useEffect(() => {
    allQuizzes()
 }, [data,stdData])


  let showfinalQuiz = (val) => {
   setSelectedQuiz(val);
   finalQuiz = data.filter((e)=>{
   return e.quizName == val
   })
   setFinalQuiz([...finalQuiz])
   setShow(false)
  setnoOfQuestions(finalQuiz[0].questionsArray.length)
  setMarks(finalQuiz[0].marks)
  setSelectedCourse(finalQuiz[0].courseName)
  setSelectedQuizName(finalQuiz[0].quizName)
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

    let submitQuiz = ()=>{
    setSuccessMessage(false)
    obtMarks = (score * marks / noOfQuestions).toFixed(2)
    setObtMarks(obtMarks)
    percentage =( score * 100 / noOfQuestions).toFixed(2)
    setPercentage(percentage)
    grade = (percentage >= 80)? grade="A+" : (percentage >= 70)? grade="A" : (percentage >= 60)? grade="B" : (percentage >= 50)? grade="C" : (percentage < 50)? grade="F" : null
    setGrade(grade)
    status =  (percentage >= 50)? status="Pass" : status="Fail"
    setStatus(status)
    sendDatawithId({obtMarks, marks , status , percentage , grade , selectedCourse , selectedQuizName} , "stdResult" , id)
    .then(()=>{
      setSuccessMessage(true)
     })
     .catch(()=>{
      setSuccessMessage(false)

     })
    }

  return (
    <div>
       {show?<Container maxWidth="md" sx={{ textAlign: "center" }}>
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
       <Grid container sx={{ marginY: "30px", padding: "30px", backgroundColor: "lightgray", boxShadow: "5px 5px 30px lightgrey", borderRadius: "10px" }} >
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
          </Grid>
          </Grid>
          </Container>: null}
      {showResult?
      <div style={{textAlign:"center" , display:"flex" , justifyContent:"center" , alignItems:"center" , height:"70vh"}}>
      {successMessage?
      <div style={{textAlign:"center" , display:"flex" , justifyContent:"center" , alignItems:"center" , height:"70vh"}}>
      <h1>Quiz Submitted Successfully</h1>
      </div>
      :<BButton onClick={submitQuiz}  label="Submit Quiz"/>}
      </div>
         :null}
    
 
    </div>
  )
}
