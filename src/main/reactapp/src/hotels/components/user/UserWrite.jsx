import { FormControl, FormLabel, Input, Card, CardContent, Typography, Box, Grid ,Avatar} from "@mui/joy";
import { CardMedia } from '@mui/material';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function UserWrite(props) {
    const [startDate, setStartDate] = useState(null); // 체크인 날짜
    const [endDate, setEndDate] = useState(null); // 체크아웃 날짜
    const [branch, setBranch] = useState(1); // 지점 선택 상태
    const [roomGrade, setRoomGrade] = useState(1); // 객실 등급 선택 상태
    const [name, setName] = useState(''); // 이름
    const [phoneNumber, setPhoneNumber] = useState(''); // 전화번호
    const [roomData, setRoomData] = useState(null); // 객실 정보 상태
    


    // 날짜 변경 핸들러
    const StartChange = (date) => {
        setStartDate(date);
    };

    const EndChange = (date) => {
        setEndDate(date);
    };

    const handleBranchChange = (event,value) => {
        console.log( value )
        setBranch( value )
    };

    const handleRoomGradeChange = (event,value) => {
        console.log( value )
        setRoomGrade( value )
    };
    // 이름 입력 핸들러
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // 전화번호 입력 핸들러
    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    // 객실 조회 버튼 클릭 시 서버에 데이터 전송
    const userRoomRead = async () => {
        const requestData = {
            hno: branch, 
            rno: roomGrade,
            checkinDate: startDate.format('YYYY-MM-DD'), 
            checkoutDate: endDate.format('YYYY-MM-DD')
        };
        try{
            console.log( requestData );
            const response = await axios.post('http://localhost:8081/rooms/search', requestData)
            console.log( response.data );
            setRoomData(response.data || null); // 예시로 roomData라는 필드가 있다고 가정
        }catch(e){ console.log(e)}
    };

    const navigate = useNavigate(); // navigate 훅 사용

    // 예약 등록 버튼 클릭 시 서버에 데이터 전송
    const userReservationRegister = async () => {
        const reservationData = {
            name: name,
            phoneNumber: phoneNumber,
            hno: branch,
            rno: roomGrade,
            checkinDate: startDate.format('YYYY-MM-DD'),
            checkoutDate: endDate.format('YYYY-MM-DD'),
        };

            const response = await axios.post('http://localhost:8081/rooms/reservation', reservationData);
            if( response.data ){
                console.log('예약 등록 성공:', response);
                // 예약 등록 후 처리
                alert(" 예약 성공 ");
                location.href="/user";
            }else{
                alert(" 예약 실패 : 관리자에게 문의 ");
            }

    };


    return (
        <>
            <form id="user_write">
                <div className="user_selectBox">
                <Select
                        value={branch}
                        onChange={handleBranchChange} // handleBranchChange 이벤트 핸들러로 값 처리
                        placeholder="지점선택"
                    >
                        <Option value="1">강남점</Option>
                        <Option value="2">중구점</Option>
                        <Option value="3">부평점</Option>
                    </Select>
                    <Select
                        value={roomGrade}
                        onChange={handleRoomGradeChange} // handleRoomGradeChange 이벤트 핸들러로 값 처리
                        placeholder="객실등급선택"
                    >
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

                    
                {/* 객실 정보 카드 형식으로 표시 */}
                {roomData && (
                        <Card style={{ marginTop: '30px', marginBottom: '60px', width: '500px' }}>
                        <CardContent>
                            <Grid container spacing={3}>
                                {/* 왼쪽에 사진 */}
                                <Grid item xs={12} sm={4}>
                                    <CardMedia
                                        component="img"
                                        image={"http://localhost:8081/upload/room/"+roomData.pnoname} // 이미지 경로를 실제 서버의 이미지로 변경
                                        alt="Room image"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Grid>

                                {/* 오른쪽에 정보 */}
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="h6">지점: {roomData.hname}</Typography>
                                    <Typography variant="h6">객실 등급: {roomData.rname}</Typography>
                                    <Typography variant="body1">체크인: {startDate.format('YYYY-MM-DD')}</Typography>
                                    <Typography variant="body1">체크아웃: {endDate.format('YYYY-MM-DD')}</Typography>
                                    
                                    {/* 남은 개수 표시 */}
                                    <Box mt={2}>
                                        <Typography variant="h3" style={{ fontWeight: 'bold', color: '#3f51b5' , fontSize : '20px' }}>
                                            남은개수: {roomData.size}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

                </div>
                <Button onClick={userRoomRead} variant="contained" type="button">객실조회</Button>



                <div className="user_input">
                    <FormControl>
                        <FormLabel>이름</FormLabel>
                        <Input 
                            variant="outlined" 
                            type="text" 
                            value={name} 
                            onChange={handleNameChange} 
                        />
                    </FormControl>

                    <FormControl style={{ flex: 1 }}>
                        <FormLabel>전화번호</FormLabel>
                        <Input 
                            variant="outlined" 
                            type="text"
                            value={phoneNumber} 
                            onChange={handlePhoneChange} 
                        />
                    </FormControl>
                </div>

                <Button onClick={userReservationRegister} variant="contained" type="button">
                    예약등록
                </Button>
            </form>
        </>
    );
}
