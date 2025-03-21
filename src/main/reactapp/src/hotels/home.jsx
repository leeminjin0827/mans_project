import { use, useActionState, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import { Button, Option, Select } from "@mui/joy";




export default function Home(props){

   
        


    

   //select hno 가져옴 value에 저장
    const [value , setValue ] = useState('');
    const valueChanege = (e , newvalue) =>{
      
        setValue(newvalue);
      
    }
    console.log(value);
    
   

    const [stappas , setStappas] = useState(); 
    
    const staffone = async (value) => {
        try {
            let temp = Number(value)
            const response = await axios.get(`http://localhost:8081/findall/stffone?hno=${temp}`);
            // console.log(response.data);
            setStappas(response.data);
           
        } catch(e) {
            console.log(e);
        }
    
    }
    console.log(stappas);


    const [opers , setOpers] = useState();
     
    const operone = async (value) => {
        try {
            let temp = Number(value)
            const response = await axios.get(`http://localhost:8081/findall/operone?hno=${temp}`);
            // console.log(response.data);
            setOpers(response.data);
           
        } catch(e) {
            console.log(e);
        }
    
    }
    console.log(opers);

   




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

        <Button size="sm" type="button" onClick={() => {operone(value) ,staffone(value)}}>조회</Button>
        </Stack>
        <Stack spacing={2} direction="row" sx={{width:'150%'}}>
            
        <Divider orientation="vertical"></Divider>
        <div>
           
        <h3>운영 정보</h3>
           { opers && (<>
                <div>
                    {
                         
                    <table border={1}>
                       
                    <tbody>
                    <tr>
                    <td>주소 : {opers.address}</td>
                    </tr>
                    <tr>
                    <td>호텔 번호 : {opers.hotel_number}</td>
                    </tr>
                    <tr>
                    <td>소개 : {opers.intro}</td>
                    </tr> 
                    </tbody>

                    </table>

                    }
                </div>        
           </>)
             }{/*함수종료*/}
        </div>
             
        <div>
        <h3>직원정보</h3>
        { stappas && stappas.map((stapp, index) => {

            return(<>           
            <table border={1}>
                <tbody>
                    <tr>
                        <td>이름 :{stapp.name}</td>
                        <td>번호 :{stapp.phone}</td>
                        <td>주소 :{stapp.address}</td>
                    </tr>
                </tbody>
            </table>       
            </>)
        }) 
        }
        </div>
            
    </Stack>
    </div>

    <div>
        <h3>그래프</h3>
    </div>
    </div>
    </>)

}