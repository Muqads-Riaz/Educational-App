import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import StudentDrawer from '../components/StudentDrawer'
import { checkUsers, getDatawithId } from '../config/firebaseMethods'

export default function StudentProfile() {
  let[show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    checkUsers()
    .then((userId)=>{
     getDatawithId("users" , userId)
     .then((success)=>{
       if(success.category=="std"){
         setShow(true)
       }else{
        navigate('/Login')
       }
      })
      .catch((error)=>{
     
       navigate('/Login')
      })
    })
    .catch((error)=>{
    navigate('/Login')
    })
  },[])


  return (
    <div>
    {show ? <StudentDrawer/> : <div style={{textAlign:"center", display:"flex" , justifyContent:"center" , alignItems:"center" , marginTop:"50px"}}><img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"></img></div>}
    </div>
  )
}
