import { BrowserRouter , Routes , Route  } from "react-router-dom";
import React from 'react'
import RegistrationForm from "../screens/RegistrationForm";
// import Login from "../screens/Login";
import Admin from "../screens/Admin";
import Result from "../screens/Result";
import PageNotFound from "../screens/PageNotFound";
import Navbar from "../components/Navbar";
import StudentProfile from "../screens/StudentProfile";
import Quiz from "../screens/Quiz";
import Login from "../screens/Login";
export default function Router() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
       <Route  path="/" element={<RegistrationForm/>} />
       <Route  path="/Result" element={<Result/>} />
       <Route  path="/Quiz" element={<Quiz/>} />
       <Route  path="/Login" element={<Login/>} />
       <Route  path="/StudentProfile/*" element={<StudentProfile/>} />
       <Route  path="/Admin/*" element={<Admin/>}/>
       <Route  path="/*" element={<PageNotFound/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
