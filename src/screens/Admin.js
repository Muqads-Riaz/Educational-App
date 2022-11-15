import { useNavigate } from 'react-router-dom'
import React, { useEffect , useState } from 'react'
import MyDrawer from '../components/MyDrawer'
import { checkUsers, getDatawithId } from '../config/firebaseMethods'



export default function Admin() {
  let[show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    checkUsers()
    .then((userId)=>{
     getDatawithId("users" , userId)
     .then((success)=>{
       if(success.category=="admin"){
         setShow(true)
       }else{
        navigate('/Login')
       }
      })
      .catch((error)=>{
       console.log(error)
       navigate('/Login')
      })
    })
    .catch((error)=>{
    navigate('/Login')
    })
  },[])

  return (
    <div>
     {show ? <MyDrawer/> : <div style={{textAlign:"center", display:"flex" , justifyContent:"center" , alignItems:"center" , marginTop:"50px"}}><img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"></img></div>}
    </div>
  )
}
