import React, { useState  , useEffect} from 'react'
import { getData } from '../../config/firebaseMethods';
import MyTable from '../../components/Table';

export default function AdminStudents() {
    let[data , setData] = useState([])
    let[filteredData , setFilteredData] = useState([])
    
    useEffect(()=>{
      getData ("users")
      .then((success)=>{
      setData(Object.values(success))  
      })
      .catch((error)=>{
        console.log(error)
      })
    },[])
    useEffect(()=>{
      filteredData = data.filter((e)=>{
        return e.category=="std"
      })
      setFilteredData([...filteredData])
    },[data])
 
     
  return (
    <div>
     <MyTable 
     datasource={filteredData}
     Cols={[
      {
     key:"firstName",
     displayName:"First Name"
    },
    {
      key:"lastName",
      displayName:"Last Name"
     },
     {
      key:"fatherName",
      displayName:"Father Name"
     },
     {
      key:"courseName",
      displayName:"Course Name"
     },
     {
      key:"section",
      displayName:"Section"
     },
     {
      key:"contactNumber",
      displayName:"Contact Number"
     },
     {
      key:"CNIC",
      displayName:"CNIC"
     },

      ]}
     />
    </div>
  )
}
