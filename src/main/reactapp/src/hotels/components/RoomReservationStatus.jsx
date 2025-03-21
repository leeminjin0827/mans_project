import { Box, Card, Typography } from "@mui/joy";
import { Divider } from "@mui/material";
import Sidebar from "./Sidebar";


export function RoomCard(props) {

    const info = props.info;

    const backgroundColor = info.state == "가능" ? "green" : "red";

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

    const socket = new WebSocket("ws://localhost:8081/ws/reservation");

    // 서버에서 메시지를 받았을 때
    socket.onmessage = (event) => {
        console.log("서버로부터 받은 메시지 = " + event.data);
    }

    // 연결 성공 시
    socket.onopen = () => {
        console.log("웹소켓 연결 성공!");
        socket.send("안녕하세요, 서버!");
    }

    // 연결 종료
    socket.onclose = () => {
        console.log("웹소켓 연결 종료!");
    }

    // 에러 발생 시
    socket.onerror = (error) => {
        console.log("웹소켓 에러 발생 = " + error);
    }

    return (
        <>
            <Sidebar />
            <div className="mainBox">
                <h1>객실 예약 확인 페이지</h1>
                <Divider />
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
            </div>
        </>
    );
}
