import { cache, use, useActionState, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import { Button, Option, Select } from "@mui/joy";
import Table from '@mui/joy/Table';
import Graph from "./detailGraph";
import Choice from "./OperGraph";
import { useNavigate } from "react-router-dom";
// import { BarChart } from '@mui/x-charts/BarChart';





export default function  Home(props){

    /** 페이지 이동 관련 코드 */
    const navigate = useNavigate();

    /** 접근 권한 확인 하는 함수 */
    const checkAuthority = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff/authority", {withCredentials : true});
            const result = response.data;
            console.log(`result = ${result}`);
            if(!result) {
                alert("접근 권한이 없습니다.");
                navigate(-1);
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{checkAuthority(); rating(); },[])

   //select hno 가져옴 value에 저장
    const [value , setValue ] = useState('1');
    const valueChanege = (e , newvalue) =>{

        setValue(newvalue);

    }
    console.log(value);



    const [stappas , setStappas] = useState();

    const staffone = async (hno) => {
        try {
            let temp = Number(hno)
            const response = await axios.get(`http://localhost:8081/findall/stffone?hno=${temp}`);
            // console.log(response.data);
            setStappas(response.data);

        } catch(e) {
            console.log(e);
        }

    }
    console.log(stappas);


    const [opers , setOpers] = useState();

    const operone = async (hno) => {
        try {
            let temp = Number(hno)
            const response = await axios.get(`http://localhost:8081/findall/operone?hno=${temp}`);
            // console.log(response.data);
            setOpers(response.data);

        } catch(e) {
            console.log(e);
        }

    }
    console.log(opers);

    const [ratings , setRatings] = useState();
    //객실정보
    const rating = async () => {
        try {
            const response = await axios.get('http://localhost:8081/findall/rating');
            setRatings(response.data);
            console.log(response.data);

        } catch (error) {console.log(error);

        }

    }
    console.log(ratings);




    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 hno가 1인 정보 불러오기
        staffone('1');
        operone('1');

    }, []); // 빈 배열을 dependency array로 전달하여 컴포넌트 마운트 시에만 실행


    const [hnoForChoice, setHnoForChoice] = useState('1');


    return(<>
    <Sidebar />
    <div className="mainBox">
    <div>
        <Stack spacing={2} direction="row" size="sm" sx={{width : "600px" , padding : "10px" , }} >
        <Select name="지역선택" value={value} onChange={(e, newvalue) => {valueChanege(e, newvalue)}} >
        <Option value="1">강남구</Option>
        <Option value="2">중구</Option>
        <Option value="3">부평구</Option>
        </Select>

        <Divider orientation="vertical"></Divider>

        <Button sx={{width : "60px" }} size="sm" type="button" onClick={() => {operone(value) ,staffone(value) , setHnoForChoice(value)}}>조회</Button>
        </Stack>
        <Stack spacing={2} direction="row" sx={{width:'100%'}}>

        { opers &&(<>
        <div>
        <img style={{width : "500px", height: "400px"}} src={ 'http://localhost:8081/upload/' + opers.mimg  } />
        </div>
        </>)
        }
        <Divider orientation="vertical"></Divider>

        <div>

        <h3 >운영 정보</h3>
           { opers && (<>
                <div>
                    {



                    <Table
                    variant="outlined" aria-label="basic table" style={{width:"350px"}}>

                    <tbody>
                    <tr>
                    <td style={{ color: "black"}}>주소 : {opers.address}</td>
                    </tr>
                    <tr>
                    <td style={{ color: "black"}}>호텔 번호 : {opers.hotel_number}</td>
                    </tr>
                    <tr>
                    <td style={{ color: "black"}}>소개 : {opers.intro}</td>
                    </tr>
                    </tbody>

                    </Table>

                    }
                </div>
           </>)
             }{/*함수종료*/}
        </div>

        <div  style={{overflowY : "auto", maxHeight : "400px"}}>
        <h3 style={{ position: 'sticky', top: 0, zIndex: 1 }} >직원정보</h3>
        { stappas && stappas.map((stapp, index) => {

            return(<>
            <Table
  variant="outlined" aria-label="basic table" style={{width:"350px"}}  sx={{
    "--Table-headerUnderlineThickness": "10000px"
  }}>
                <tbody >
                    <tr>
                        <td style={{ color: "black"}}>이름 :{stapp.name}</td>
                    </tr>
                    <tr>
                    <td style={{ color: "black"}}>번호 :{stapp.phone}</td>
                    </tr>
                    <tr>
                    <td style={{ color: "black"}}>주소 :{stapp.address1}</td>
                    </tr>
                    <tr>
                        <tr><tr><tr></tr></tr></tr>
                    </tr>
                </tbody>
            </Table>
            </>)
        })
        }
        </div>

    </Stack>
    </div>
    <h3>기본객실등급정보</h3>
        <div style={{display : 'flex', marginTop: '10px'}}>

            <Table
                        variant="outlined" aria-label="basic table"  sx={{width : '900px'}}>

                <thead><tr><th>객실이름</th><th>침실수</th><th>침대타입</th><th>가격</th></tr></thead>

            <tbody>
            {
            ratings && ratings.map((rating, index)=> {
                    return(<tr key={index}>
                        <td>{rating.ratingName}</td>
                        <td>{rating.bedCount}</td>
                        <td>{rating.bedType}</td>
                        <td>{rating.price}</td>
                    </tr>)
                })
            }

            </tbody>
            </Table>
            <Choice hno={hnoForChoice}/>

        </div>


        <div>
            <h3> 집계 </h3>
            <div >
                <Graph />
            </div>
        </div>
    </div>
    </>)

}