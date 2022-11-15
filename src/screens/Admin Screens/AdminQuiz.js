import React, { useEffect , useState} from 'react'
import Input from '../../components/Input'
import { Container,Grid , Typography } from '@mui/material'
import BButton from '../../components/BButton'
import { sendData } from '../../config/firebaseMethods'
import { getDatabase, ref, onValue, set} from "firebase/database";
import CheckBox from '../../components/CheckBox'
import Dropdown from '../../components/Dropdown'
import { getData } from '../../config/firebaseMethods'

export default function AdminQuiz() {
  const db = getDatabase()
  let[option , setOption] = useState("")
  let [correctOption , setCorrectOption] = useState("")
  let[optionsArray , setOptionsArray]= useState([])
  let[question , setQuestion] = useState("")
  let[quizArray , setQuizArray] = useState([])
   let [greenSignal , setGreenSignal] = useState(false)
   let [redSignal , setRedSignal] = useState(false)
   let[questionError , setQuestionError] = useState(false)
   let[correctOptionError , setCorrectOptionError] = useState(false)
   let[OptionError , setOptionError] = useState(false)
   let [show , setShow]= useState(false)
   let [mainShow , setMainShow]= useState(true)
   let[showData , setShowData] = useState(false)
   let[obj,setObj] = useState({})
  let[data , setData] = useState([])
  let [previousData , setPreviousData] = useState(false)
  let [optionWarning , setOptionWarning ] = useState(false)
  let[emptyError ,setEmptyError] = useState(false)
  let courseArray = ["Web Development" ,"Graphic Designing" ," Flutter" , "Blockchain"]

    let fillObject=(key,val)=>{
      obj[key] = val;
      setObj({...obj})
      }

    useEffect(()=>{
      getData("questions")
      .then((success)=>{
       setData(Object.values(success))
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])

    let addOption = ()=>{
      if(option!= ""){
        setOptionWarning(false)

        setOptionsArray([...optionsArray , option]);
        setOption("")
        
      }else{
        setOptionWarning(true)
      }
    }

   let addQuestion=()=>{
    if(question==""){
     setQuestionError(true)}
      else if(optionsArray.length < 2){
      setQuestionError(false)
      setOptionError(true)
      }else if(correctOption == ""){
        setQuestionError(false)
        setOptionError(false)
        setCorrectOptionError(true)
    }else{
      setCorrectOptionError(false)
      setQuizArray([...quizArray ,{question , optionsArray , correctOption} ])
      setQuestion("");
      setOptionsArray([]);
      setCorrectOption("");
    }
   }
   let createQuiz = ()=>{
    if(obj.courseName && obj.quizName && obj.marks && obj.duration){
      setEmptyError(false)
      setShow(true)
      setMainShow(false)
    }else{
      setEmptyError(true)
    }
   
   }
   let saveQuiz = ()=>{
    setShowData(true)
    setShow(false)
    setMainShow(false)
   }
   let sendQuiz = ()=>{
    sendData({...obj, questionsArray : quizArray} , "questions")
    .then((success)=>{
      setMainShow(true)
      setShow(false)
      setRedSignal(false)
      setShowData(false) 
      setObj({}) 
    })
    .catch((error)=>{
      setRedSignal(true)
      setGreenSignal(false)
    })
   }

  return (
    <div>
      <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                 {mainShow?
                 <>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                <Typography m={3} variant="h4">Create Quiz</Typography>
                </Grid>
                <Grid item xs={12} md={6} sm={12} lg={6} >

                  
                <Input required="required" value={obj.quizName} onChange={(e)=>fillObject( "quizName" , e.target.value)}  label="Quiz Name" type="text"/>

                <Input required="required" value={obj.duration} onChange={(e)=>fillObject( "duration" , e.target.value)}  label="Quiz Duration" type="number"/>
                  </Grid>
                  <Grid item xs={12} md={6} sm={12} lg={6} >
                  <Dropdown  value={obj.courseName} onChange={(e)=>fillObject( "courseName" , e.target.value)}  label="Course Name"  dataSource={courseArray}/>
                  <Input required="required" value={obj.marks} onChange={(e)=>fillObject( "marks" , e.target.value)}  label="Quiz Marks" type="number"/>
                  </Grid>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                    {emptyError? <p style={{color :"red" , margin :"10px"}}>Fill the required data</p>:null}
                  <BButton 
                   onClick = {createQuiz} 
                   label="Create Quiz"/>
                </Grid>
                  </> :null}                 
                  {show?<Container maxWidth="sm" sx={{ textAlign: "center"}}><Grid item xs={12} md={12} sm={12} lg={12} >
                  {questionError? <p style={{color :"red" , margin :"10px"}}>Write any Question</p> : null} 

                  <Input required="required" value={question} onChange={(e)=>setQuestion(e.target.value)}  label="Question" type="text"/>

                  </Grid>
                  {optionsArray && optionsArray.length > 0?
                  optionsArray.map((e,i)=>{
                   return<div><CheckBox onChange={(e)=>setCorrectOption(e.target.value)} checked={correctOption==e} value={e} /> <span key={i}>{e}</span>
                   </div>
                  }):null}

                  <Input required="required" value={option} onChange={(e)=>setOption(e.target.value)}  label="Options"/>

                  {optionWarning? <p style={{color :"red" , margin :"10px"}}>Empty option cannot be submitted</p> : null} 
                  {correctOptionError? <p style={{color :"red" , margin :"10px"}}>Check any option that is true</p> : null} 
                  {OptionError? <p style={{color :"red" , margin :"10px"}}>Every question must have at least two options</p> : null} 

                  <BButton onClick={addOption} label="Add Option"/>

                  <div style={{margin:"20px"}}>
                  <BButton onClick={addQuestion} label="Add Question"/>
                  </div>
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  <BButton  onClick = {saveQuiz} label="Save Quiz"/>
               
                </Grid>
                 </Container> :null} 


                 {showData?<Container maxWidth="sm" sx={{ textAlign: "center"}}>
                  {quizArray && quizArray.length  > 0?
                  quizArray.map((e)=>{
                    return  <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} item xs={12} md={12} sm={12} lg={12} >
                    <Typography m={1} component="div" variant="p">Question : {e.question}</Typography>
                    <span>Options : </span>
                    {e.optionsArray.map((opt)=>{
                    return<span>{opt} , </span>
                    })}
                    <Typography m={1}  component="div"  variant="p">Correct Option : {e.correctOption}</Typography>
                   </Grid>
                     
                  })
                  :null}
                  <Grid item xs={12} md={12} sm={12} lg={12} >
                  {greenSignal? <p style={{color :"green"  , margin :"10px"}}>Question submitted Successfully</p> : null} 
                  {redSignal? <p style={{color :"red" , margin :"10px"}}>Question Not Submitted</p> : null} 
                    <BButton onClick={sendQuiz} label="Submit Quiz"></BButton>
                  </Grid>
                 </Container> :null} 

                
         </Grid>
            </Container> 
{previousData?  <Container maxWidth="md" sx={{ textAlign: "center"}}>
                <Grid container spacing={3}  >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                {data && data.length > 0 ? data.map((obj)=>{
                 return<div> <Grid sx={{ backgroundColor:"lightgray" ,  marginY: "30px", padding: "30px",  borderRadius: "10px" }}  item xs={12} md={12} sm={12} lg={12} 
                 >  
                
                  <Typography sx={{color:"white"}} component="div" variant="h5">Course Name : {obj.courseName}</Typography>
                  <Typography sx={{color:"white"}} component="div"  variant="h6">Quiz Name: {obj.quizName}</Typography>
                   <Typography sx={{color:"white"}} component="div" variant="h6">Quiz Duration : {obj.duration}</Typography>
                   <Typography sx={{color:"white"}} component="div" variant="h6">Total Marks : {obj.marks}</Typography>
               
                 {obj.questionsArray.map((e)=>{
                  return <Grid sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} item xs={12} md={12} sm={12} lg={12} ><Typography component="div"  variant="p">Question : {e.question}</Typography>
                   <Typography component="div"  variant="p">Correct Option : {e.correctOption}</Typography>
                  <span>Options : </span>
                  {e.optionsArray.map((x)=>{
                    return <span>{x} ,</span>
                  })}
                 </Grid>
                 })}
                 
                </Grid></div>
                }):""}
                  </Grid>
                  <Grid md={12} lg={12} sm={12} item sx={{textAlign:"center"}}>
            <BButton  onClick = {()=>setPreviousData(false)} label="Hide Data"/>
            </Grid>
         </Grid>
            </Container>  : null}
           
            <Grid  md={12}  lg={12} sm={12} item sx={{textAlign:"center", margin:"20px"}}>
           {data && data.length > 0?
            <BButton  onClick = {()=>setPreviousData(true)} label="Previous Data"/>:
            <h1 style={{textAlign:"center"}} >No Previous Updated Quiz</h1>
             }
            </Grid>
    </div>
  )
}