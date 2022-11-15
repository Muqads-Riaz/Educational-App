import React from 'react'
import { useNavigate } from 'react-router-dom'
import BButton from '../components/BButton'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div style={{display:"flex" , height:"80vh" , justifyContent:"center" , alignItems:"center" , flexDirection:"column"}}>
      <img src="https://solutiondots.com/wp-content/uploads/2015/06/defaultTemplate.png" ></img>
      <BButton onClick={()=>{navigate('/')}} style={{margin:"20px"}} label="Go to Home"></BButton>
    </div>
  )
}
