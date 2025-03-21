import { Box, Card, Typography } from "@mui/joy";
import { Button, Divider } from "@mui/material";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";


export function RoomCard(props) {

    const info = props.info;
    // #899f6a --> Tendril
    // #b5e9a1 --> Paradise green
    // #d19c97 --> Rose Tan
    // const backgroundColor = info.state == "가능" ? "#899f6a" : "#d19c97";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() : now.getMonth();
    const day = now.getDate() + 1 < 10 ? "0" + now.getDate() : now.getDate();
    const startDate = `${year}-${month}-${day}`;
    const backgroundColor = info.resstart >= startDate ? "#899f6a" : "#d19c97";

    return (
        <>
            <Card 
                sx={{
                    minWidth : "15%", width : "15%", 
                    minHeight : "15%", height : "15%",
                    flexGrow : 0,
                    flexShrink : 1,
                    flexBasis : "calc(100% / 6 - 20px)",
                    backgroundColor : backgroundColor,
                    color : "white"
                }}
            >
                <Typography sx={{textAlign : "center", color : "white"}} >지점 / 호실</Typography>
                <table border={0} style={{tableLayout : "auto", textAlign : "center"}}>
                    <tbody>
                        <tr>
                            <td>예약자명 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>예약자명</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>입실날짜 : </td>
                            <td>
                            <Typography level="title-md" sx={{color : "white"}}>입실날짜</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>퇴실날짜 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>퇴실날짜</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>사용현황 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>사용현황</Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </>
    );
}


export default function RoomReservationStatus(props) {

    // 예약 테이블에서 가져온 값 저장하는 state
    const [reservationList, setReservationList] = useState([]);
    // 객실 목록 테이블에서 가져온 값을 저장하는 state
    const [roomList, setRoomList] = useState([]);
    // 셀렉트 값이 변경될 때 마다 값을 저장하는 state
    const [selectValue, setSelectValue] = useState("1");

    let socket = useRef(null);

    useEffect(() => {
        // 웹소켓 연결을 한 번만 생성
        if (!socket.current) {
            socket.current = new WebSocket("ws://localhost:8081/ws/reservation");

            // 서버에서 메시지를 받았을 때
            socket.current.onmessage = (event) => {
                try {
                    // JSON 파싱
                    const data = JSON.parse(event.data);
                    setReservationList(data);
                    console.log("↓ 서버로부터 받은 메시지 ↓");
                    console.log(event.data);
                } catch (error) {
                    console.error("JSON 파싱 오류:", error);
                }
            };

            // 연결 성공 시
            socket.current.onopen = () => {
                console.log("웹소켓 연결 성공!");
                socket.current.send("안녕하세요, 서버!");
            };

            // 에러 발생 시
            socket.current.onerror = (error) => {
                console.log("웹소켓 에러 발생 = " + error);
            };
        }

        // 컴포넌트가 언마운트될 때 웹소켓 연결 종료
        return () => {
            if (socket.current) {
                // 연결 종료 시
                socket.current.close();
                // 참조 초기화
                socket.current = null;
                console.log("웹소켓 연결이 종료되었습니다.");
            }
        };
    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

    console.log(selectValue);

    // 셀렉트 선택 후 찾기 버튼 클릭 시 실행되는 함수
    const clickEvent = () => {
        
    }
    

    return (
        <>
            <Sidebar />
            <div className="mainBox">
                <h1>객실 사용 현황</h1>
                <Divider />
                <div style={{display : "flex", justifyContent : "end", marginTop : "24px", marginRight : "5%"}}>
                    <select 
                        value={selectValue} 
                        onChange={(event) => { setSelectValue(event.target.value);}}
                        style={{marginRight : "30px", width : "100px", textAlign : "center", borderRadius : "5px"}}
                    >
                        <option value={1}>강남점</option>
                        <option value={2}>중구점</option>
                        <option value={3}>부평점</option>
                    </select>
                    <Button variant="contained">찾기</Button>
                </div>
                <Box 
                    sx={{
                        display : "flex", 
                        flexWrap : "wrap",
                        justifyContent : "center",
                        gap : "20px",
                        margin : 3,
                    }}>
                        {
                            reservationList.map((value, index) => {
                                return (
                                    <RoomCard key={index} info={value} />
                                )
                            })
                        }
                </Box>
            </div>
        </>
    );
}

/*
<Box 
    sx={{
        display : "flex", 
        flexWrap : "wrap",
        gap : "20px",
        margin : 3,
    }}>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
    <RoomCard info={{state : "가능"}}></RoomCard>
    <RoomCard info={{state : "불가능"}}></RoomCard>
</Box>
*/