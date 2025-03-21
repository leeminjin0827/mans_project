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
            사진
        <Divider orientation="vertical"></Divider>
        <div>
            stapp출력
            <h3>운영 정보</h3>
            {opers && opers.length > 0 ? ( // opers가 undefined가 아니고 길이가 0보다 큰 경우
                opers.map((oper, index) => (
                    <div key={index}>
                        {/* oper 객체의 속성들을 원하는 방식으로 출력 */}
                        <p>이름: {oper.name}</p>
                        <p>정보: {oper.info}</p>
                        {/* 다른 속성들 출력 */}
                    </div>
                ))
            ) : (
                <p>운영 정보가 없습니다.</p>
            )}
        </div>
     

            
    </Stack>
    </div>

    <div>
        <h3>그래프</h3>
    </div>
    </div>
    </>)

}