import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { getData } from "../config/firebaseMethods";

export default function MySelect(props) {

  let [data, setData] = useState(props.datasource);
  let nodeData = () => {
    if (props.nodeName) {
      getData(props.nodeName)
        .then((success) => {
          setData(Object.values(success));
         
        })
        .catch((error) => {
            console.log(error)
        });
    }
  };
  useEffect(() => {
    nodeData();
  }, []);

  return (
    <>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        required={props.required}
        fullWidth={true}
        variant="standard"
        label={props.label}
        onChange={props.onChange}
        value={props.value}
      >
        
        {data && data.length > 0? 
        data.map((x) => {
         return <MenuItem value={x[props.valueField ? props.valueField : "id"]}>
           {x[props.displayField ? props.displayField : "fullName"]}
           </MenuItem>
           })
          : null}
      </Select>
    </>
  );
}




{/* <MySelect
displayField="countryName"
valueField="countryCode"
nodeName="countries"
label="Country"
onChange={(e) => setObj(e.target.value)} 
value={obj}
// datasource ={[
//   {
//     id:"wm",
//     fullName :"web Development"
//   },
//   {
//     id:"wm",
//     fullName :"web Development"
//   }
// ]}
/> */}























