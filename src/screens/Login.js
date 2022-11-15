import React from 'react'
import { CircularProgress } from '@mui/material'
import { Container , Grid , Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Input from '../components/Input'
import BButton from '../components/BButton'
import { useState } from 'react';
import { loginUser } from '../config/firebaseMethods';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
    let[password , setPassword] = useState("")
    let[email , setEmail] = useState("")
    let[error , setError] =useState(false)
    let [showButton , setShowButton] = useState(true)
    const navigate = useNavigate()

    let login = ()=>{
        setShowButton(false)
        loginUser({email , password} , "users")
        .then((success)=>{
      setShowButton(true)
      setError(false)
      if(success.category=="std"){
      navigate("/StudentProfile")
      }
      if(success.category=="admin"){
       navigate("/Admin")
      }
        })
        .catch(()=>{
       setShowButton(true)
        setError(true)
        })
    }
  return (
    <div>
      <Container  maxWidth="sm" sx={{ textAlign: "center"}}>
                <Grid container spacing={3} sx={{ marginY: "30px", padding: "30px", backgroundColor: "white", boxShadow: "5px 5px 30px lightgray", borderRadius: "10px" }} >
                <Grid item xs={12} md={12} sm={12} lg={12} >
                <div>
               < AccountCircleIcon sx={{fontSize:"140px"}}></ AccountCircleIcon>
                </div>
                <Typography variant="h5">Login</Typography>
                {error? <p style={{color:"red"}}>Only Admin and Registered Student Can Login</p> : null}
                <Input  value={email} type="email" onChange={(e)=>setEmail(e.target.value)}  label="Email"/>
                <Input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} label="Password"/>
                {showButton?  <BButton onClick={login} label="Login"/>:<CircularProgress/>}
                </Grid>
                </Grid>
            </Container>
    </div>
  )
}
