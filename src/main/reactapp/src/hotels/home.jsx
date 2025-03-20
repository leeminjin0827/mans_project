import { use, useActionState, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import { Button, Option, Select } from "@mui/joy";




export default function Home(props){

    //useEffect(()=> {operListAll()}, [])
   // useEffect(()=> {staffFinAll()}, [])
   // useEffect(()=> {ratingAll()}, [])


    const[operList , setOperList] = useState([]);
    const[staffList, setStaffList] = useState([]);
    const[ratingList, setRatingList] = useState([]);
    console.log(operList);
    console.log(staffList);
    console.log(ratingList);

    const operListAll = async ()=> {
        try {
            const response = await axios.get('http://localhost:8081/findall/oper');
            setOperList(response.data);
            console.log(response.data);
            for(let i =0; i < response.data.length; i++){
               operList[i] = response.data[i];
                console.log(operList[i]);
            }
            
        } catch (error) {
            console.log(error);
        }

    }

        const [stappas , setStappas] = useState([]);
    
    const staffFinAll = async () => {
        try {
            const response = await axios.get("http://localhost:8081/findall/staffs");
            // console.log(response.data);
            setStaffList(response.data);
           
        } catch(e) {
            console.log(e);
        }
    
    }

    const ratingAll = async ()=> {
        try {
            const response = await axios.get('http://localhost:8081/findall/rating');
            setRatingList(response.data);
            console.log(response.data);
            for(let i =0; i < response.data.length; i++){
               ratingList[i] = response.data[i];
                console.log(ratingList[i]);
            }
            
        } catch (error) {
            console.log(error);
        }

    }

    

   
    const [value , setValue ] = useState('');
    const valueChanege = (e , newvalue) =>{
      
     
       
       setValue(newvalue);
       
        
    }
    console.log(value);


    return(<>
    <Sidebar />
    <div className="mainBox">
    <div>
        <Stack spacing={2} direction="row" size="sm" >
        <Select name="지역선택" value={value} onChange={(e, newvalue) => {valueChanege(e, newvalue)}} >
        <Option value="1">강남구</Option>
        <Option value="2">중구</Option>
        <Option value="3">부평구</Option>
        </Select>
        
        <Divider orientation="vertical"></Divider>

        <Button size="sm" type="button">조회</Button>
        </Stack>
        <Stack spacing={2} direction="row" sx={{width:'150%'}}>
            사진
        <Divider orientation="vertical"></Divider>
            내용
    </Stack>
    </div>

    <div>
        <h3>그래프</h3>
    </div>
    </div>
    </>)

}