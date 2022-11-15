import React, { useEffect ,useState  } from 'react'
import { getDatawithId } from '../../config/firebaseMethods';
import { checkUsers } from '../../config/firebaseMethods';
import MyTable from '../../components/Table';

export default function StudentGradeBook() {
let [stdData, setstdData] = useState([])
let [id, setId] = useState()
let[data , setData] = useState([])
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
useEffect(()=>{
getDatawithId("stdResult" , id)
.then((success)=>{
setData(Object.values(success))
})
.catch((error)=>{
console.log(error)
})
},[stdData])

  return (
    <div> 
           <MyTable 
     datasource={data}
     Cols={[
      {
        key:"marks",
        displayName:"Total Marks"
       },
      {
     key:"obtMarks",
     displayName:"Obtained Marks"
    },
   
    {
      key:"percentage",
      displayName:"Percerntage%"
     },
     {
      key:"grade",
      displayName:"Grade"
     },
     {
      key:"status",
      displayName:"Status"
     }
]}
     />
    </div>
  )
}
