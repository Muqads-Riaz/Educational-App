import React, { useState } from "react"
import { NavLink } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import "./Navbar.css";


export default function Navbar() {
  const [Mobile, setMobile] = useState(false)
  return (
    <div className='navbar'>
      <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg38ImIb-DrgGB82jIP_ft5NsQgCLMcOj17IB2TEdyMt58tKFO9xcaNFGNOBYd9icfJSk&usqp=CAU"></img>
      <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
      <NavLink to="/"><li>Registration Form</li></NavLink>
      <NavLink to="/Result"><li>Result</li></NavLink>
      <NavLink to="/Quiz"><li>Quiz</li></NavLink>
      <NavLink to="/Login"><li>Login</li></NavLink>
      </ul>
      <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
     {Mobile ? <CancelIcon /> : <MenuIcon />}
      </button>
    </div>
  )
}

