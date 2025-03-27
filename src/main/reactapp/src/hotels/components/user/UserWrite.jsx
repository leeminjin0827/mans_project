import { FormControl, FormLabel, Input } from "@mui/joy";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

export default function UserWrite( props ){


    // input 상태 관리
    const [ inputState , setInputState ] = useState(true);

    // 지점 , 객실등급 , 체크인 , 체크아웃 에 적합한 방 조회

    const [ userRoomList , setUserRoomList ] = useState([]);
    console.log("적합한 방 조회 실행");
    console.log(userRoomList);

    const userRoomRead = async () => {
        const hno = prompt("hno"); // 확인용
        const rno = prompt("rno"); // 확인용
        const resstart = prompt("resstart"); // 확인용
        const resend = prompt("resend"); // 확인용
        try{
            const response = await axios.get(`http://localhost:8081/reservation?hno=${hno}&rno=${rno}&resstart=${resstart}&resend=${resend}`)
            if( response.data === null ){
                setInputState(true);
            } else{
                setInputState(false);
            } // if end
            setUserRoomList(response.data);
        }catch( e ) { console.log( e ); }
    } // f end

    // =============================== 날짜 =============================== //
    const [startDate , setStartDate] = useState(null);
    const [endDate , setEndDate] = useState(null);

    const StartChange = (date) =>{
        setStartDate(startDate);
    }
    const EndChange = (date) =>{
        setEndDate(endDate);
    }

    return(<>
        <form id="user_write">
            <div className="user_selectBox">
                <Select placeholder="지점선택">
                    <Option value="1">강남점</Option>
                    <Option value="2">중구점</Option>
                    <Option value="3">부평점</Option>
                </Select>
                <Select placeholder="객실등급선택">
                    <Option value="1">스탠다드</Option>
                    <Option value="2">슈페리어</Option>
                    <Option value="3">디럭스</Option>
                    <Option value="4">패밀리</Option>
                </Select>
            </div>
            <div className="user_day">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <DesktopDatePicker
                        label="체크인"
                        format="YYYY-MM-DD"
                        value={startDate}
                        onChange={StartChange}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <DesktopDatePicker
                        label="체크아웃"
                        format="YYYY-MM-DD"
                        value={endDate}
                        onChange={EndChange}
                    />
                </LocalizationProvider>
            </div>
            <Button onClick={userRoomRead} variant="contained" type="button">객실조회 </Button>
            <div className="user_input">
                <FormControl>
                    <FormLabel>이름</FormLabel>
                    <Input variant="outlined" type="text" disabled={inputState} />
                </FormControl>

                <FormControl style={{ flex: 1 }}>
                    <FormLabel >전화번호</FormLabel>
                    <Input variant="outlined" type="text" disabled={inputState} />
                </FormControl>
            </div>
            <Button variant="contained" type="button">예약등록</Button>
        </form>
    </>)
}