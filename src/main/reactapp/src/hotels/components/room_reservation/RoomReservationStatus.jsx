import { Box, Card, Tooltip, Typography } from "@mui/joy";
import { Button, Divider } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Sidebar from "../Sidebar";
import { useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import StaticModal from "../StaticModal";
import RoomReservationUpdate from "./RoomReservationUpdate";
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


export function RoomCard(props) {

    const info = props.info;
    const hnoInfo = props.hnoInfo;
    // const reservationValue = props.reservation;
    // #899f6a --> Tendril
    // #b5e9a1 --> Paradise green
    // #d19c97 --> Rose Tan

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth()+1) : now.getMonth()+1;
    const day = now.getDate() + 1 < 10 ? "0" + now.getDate() : now.getDate();
    const startDate = `${year}-${month}-${day}`;
    // let backgroundColor = "#899f6a";
    const [reservation, setReservation] = useState(props.reservation);
    // 예약 수정 모달창 관련 코드
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(() => {
        setReservation(props.reservation);
    }, [props.reservation])

    // 카드를 클릭 시 실행되는 코드
    const clickCard = () => {
        setUpdateModal(true);
    }
    // console.log(hnoInfo);
    return (
        <>
            <Card 
                sx={{
                    boxSizing: "border-box",
                    minWidth : "15%", width : "15%", 
                    minHeight : "15%", height : "15%",
                    flexGrow : 0,
                    flexShrink : 1,
                    flexBasis : "calc(100% / 5 - 20px)",
                    backgroundColor : props.bgColor,
                    color : "white",
                    cursor : "pointer"
                }}
                onClick={() => {
                    reservation.reno === 0  ? alert("당일 예약이 없습니다.") : clickCard();
                }}
            >
                <Typography sx={{textAlign : "center", color : "white"}} >{props.hnoInfo.hname} / {info.rname}</Typography>
                <table border={0} style={{tableLayout : "auto", textAlign : "center"}}>
                    <tbody>
                        <tr>
                            <td style={{width : "50%"}}>예약자명 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>{reservation.resname == "" ? "없음" : reservation.resname}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>입실날짜 : </td>
                            <td>
                            <Typography level="title-md" sx={{color : "white"}}>{reservation.resstart == "" ? "없음" : reservation.resstart}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>퇴실날짜 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>{reservation.resend == "" ? "없음" : reservation.resend}</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>입실여부 : </td>
                            <td>
                                <Typography level="title-md" sx={{color : "white"}}>{props.bgColor == "#d19c97" ? "입실" : "퇴실"}</Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <StaticModal
                isOpen={updateModal}
                title={"예약 수정 및 취소"}
                openData={
                    <RoomReservationUpdate
                        onClose={() => {setUpdateModal(false);}}
                        // 예약 정보
                        reservation={reservation}
                        // 소켓
                        socket={props.socket}
                        // 지점 정보
                        hno={props.info.hno}
                        // 지점별 전체 객실 정보
                        roomList={props.roomList}
                        // 현재 날짜
                        now={startDate}
                    />
                }
                onClose={() => {setUpdateModal(false);}}
            />
        </>
    );
}

/*
<StaticModal 
    isOpen={detailModal}
    title={"직원 정보 상세보기"}
    openData={
        <StaffDetail 
            onClose={() => setDetailModal(false)}
            staffDetail={staffUpdate}
        />
    }
    onClose={() => {setDetailModal(false)}} 
/>
</div>
*/


export default function RoomReservationStatus(props) {

    // 현재 시간을 저장한 변수
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const now = `${year}-${month}-${day}`;

    // 지점명 저장 변수
    // let hotelBranch = ["전체", "강남점", "중구점", "부평점"];
    // 예약 테이블에서 가져온 값 저장하는 state
    const [reservationList, setReservationList] = useState([]);
    // 객실 목록 테이블에서 가져온 값을 저장하는 state
    const [roomList, setRoomList] = useState([]);
    // 셀렉트 값이 변경될 때 마다 값을 저장하는 state
    const [selectValue, setSelectValue] = useState("1");
    // 처음 지점 번호를 가져오는 함수
    const [hnoValue, setHnoValue] = useState([]);
    // 하위 컴포넌트들을 위한 소켓 인스턴스
    const [socketInstance, setSocketInstance] = useState(null);
    // 날짜 검색을 위한 state
    const [newDate, setNewDate] = useState(now);

    let socket = useRef(null);

    // 추가한 부분
    const newDateRef = useRef(newDate);
    useEffect(() => {
        newDateRef.current = newDate;
    }, [newDate]);
    // 추가한 부분

    // 웹소켓 연결을 한 번만 생성
    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket("ws://localhost:8081/ws/reservation");

            // 서버에서 메시지를 받았을 때
            socket.current.onmessage = (event) => {
                try {
                    // JSON 파싱
                    const data = JSON.parse(event.data);
                    // console.log(event.data);
                    console.log("↓ 서버로부터 받은 메시지 ↓");
                    console.log(data);
                    if(data.length !== 0 && "state" in data[0]) {
                        console.log("지점 번호 가져옴");
                        setHnoValue(data);
                    }
                    if(data.length !== 0 && "rono" in data[0] && "rno" in data[0]) {
                        console.log("지점별 객실 정보 가져옴");
                        setRoomList(data);
                    }
                    if(data.length !== 0 && "reno" in data[0]) {
                        console.log("지점별 예약 정보 가져옴");
                        // console.log(newDateRef.current);
                        // if(newDate == newDateRef.current) {
                           
                        // }
                        // socket.current.send(`지점 별 예약:1:${newDateRef.current}`);
                        setReservationList(data);
                    }
                    if(data.length === 0) {
                        console.log("빈 배열이 옴");
                    }
                } catch (error) {
                    console.error("JSON 파싱 오류:", error);
                }
            };

            // 연결 성공 시
            socket.current.onopen = () => {
                console.log("웹소켓 연결 성공!");
                socket.current.send("지점 번호");
                socket.current.send("선택한 지점:1");
                socket.current.send(`지점 별 예약:1:${now}`);
                setSocketInstance(socket.current);
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

    // console.log(selectValue);
    // console.log("reservationList : ");
    // console.log(reservationList);

    /** 셀렉트 선택 후 찾기 버튼 클릭 시 실행되는 함수 */
    const onClickSelect = () => {
        let selectDate;
        if(newDate == now) {
            selectDate = now;
        } else {
            selectDate = changeDateFormat(0);
        }
        console.log(`선택한 지점:${selectValue}`);
        socket.current.send(`선택한 지점:${selectValue}`);
        console.log(`지점 별 예약:${selectValue}:${selectDate}`);
        socket.current.send(`지점 별 예약:${selectValue}:${selectDate}`);
    }
    /** 셀렉트한 날짜 포멧 변경 함수 */
    const changeDateFormat = (count) => {
        dayjs.locale("ko");
        let tempDate = dayjs(newDate);
        // console.log("변경 전:", tempDate.format("YYYY-MM-DD"));
        if(count === 1) {
            tempDate = tempDate.add(1, "day"); 
        } else if(count == -1) {
            tempDate = tempDate.subtract(1, "day");
        }
        setNewDate(tempDate);
        // console.log("변경 후:", tempDate.format("YYYY-MM-DD"));
        return tempDate.format("YYYY-MM-DD");
    }
    /** 일자를 이동하는 함수 */
    const changeDate = (count) => {
        const selectDate = changeDateFormat(count);
        setNewDate(selectDate);
        console.log(selectDate);
        console.log(`선택한 지점:${selectValue}`);
        socket.current.send(`선택한 지점:${selectValue}`);
        console.log(`지점 별 예약:${selectValue}:${selectDate}`);
        socket.current.send(`지점 별 예약:${selectValue}:${selectDate}`);
    }
    console.log(newDate);
    /** 지점 번호 문자열로 바꾸기 */
    // const changeHnoString = (hno) => {
    //     let str = hno;
    //     switch(hno) {
    //         case 1:
    //             str = hotelBranch[1];
    //             break;
    //         case 2:
    //             str = hotelBranch[2];
    //             break;
    //         case 3:
    //             str = hotelBranch[3];
    //             break;
    //     }
    //     return str;
    // }
    
    // console.log(newDate);

    return (
        <>
            <Sidebar />
            <div className="commonBox">
                {/* <div style={{position : "absolute", top : "228px", right : "30px", left : "30px"}}> */}
                <div style={{display : "flex", justifyContent : "end", margin : "24px 5% 0px 5%", height : "40px"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                        <DesktopDatePicker
                            format="YYYY-MM-DD"
                            value={dayjs(newDate)}
                            onChange={setNewDate}
                            sx={{
                                width : "155px",
                                height : "40px", backgroundColor : "#FFFFFF",
                                "& .MuiInputBase-root" : {height : "100%"},
                                "& .MuiOutlinedInput-input" : {padding : "10px"}
                            }}
                        />
                    </LocalizationProvider>
                    
                    <select 
                        value={selectValue} 
                        onChange={(event) => { setSelectValue(event.target.value);}}
                        style={{marginLeft : "30px", marginRight : "30px", width : "100px", textAlign : "center", borderRadius : "5px"}}
                    >
                        {
                            hnoValue.map((value, index) => {
                                return <option key={index} value={value.hno}>{value.hname}</option>
                            })
                        }
                    </select>
                    <Button variant="contained" onClick={onClickSelect}>찾기</Button>
                </div>
                <Box 
                    sx={{
                        display : "flex", 
                        flexWrap : "wrap",
                        justifyContent : "center",
                        gap : "20px",
                        margin : 3,
                        padding : "0px 30px"
                    }}>
                        {
                            roomList.map((value, index) => {
                                // #899f6a --> Tendril
                                // #b5e9a1 --> Paradise green
                                // #d19c97 --> Rose Tan
                                let bgColor = "#899f6a";
                                let reservation = {
                                    reno : 0, resname : "", resphone : "", resstart : "", resend : "",
                                    rname : "", rono : 0

                                };
                                let hnoInfo = {};
                                for(let index = 0; index < hnoValue.length; index++) {
                                    if(value.hno == hnoValue[index].hno) {
                                        hnoInfo = hnoValue[index];
                                    }
                                }
                                for(let index = 0; index < reservationList.length; index++) {
                                    let temp = reservationList[index];
                                    if(value.rname === temp.rname) {
                                        reservation = temp;
                                        bgColor = "#d19c97";
                                    }
                                }
                                // console.log(reservation);
                                // console.log(bgColor);
                                // console.log(hnoInfo);
                                return (
                                    <RoomCard 
                                        key={index} 
                                        // 생성된 인덱스
                                        cardIndex={index}
                                        // 지점별 방 정보
                                        info={value} 
                                        // 지점별 전체 객실 정보
                                        roomList={roomList}
                                        // 지점번호를 문자열로 치환하는 함수
                                        // changeHnoString={changeHnoString}
                                        hnoInfo={hnoInfo}
                                        // 현재 예약 현황 정보
                                        reservation={reservation}
                                        // 카드 상태를 위한 배경색
                                        bgColor={bgColor}
                                        // 소켓
                                        socket={socketInstance}
                                    />
                                )
                            })
                        }
                </Box>
                {/* </div> */}
                <Tooltip title="이전 날">
                    <IconButton
                        size="lg"
                        variant="outlined"
                        onClick={() => changeDate(-1)}
                        sx={{position : "fixed", top : "49%", left : "3%", bgcolor : "#224a9a", "&:hover": { backgroundColor: "#224a9a" }}}
                    >
                        <KeyboardArrowLeftIcon sx={{color : "white"}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="이후 날">
                    <IconButton
                        size="lg"
                        color="neutral"
                        variant="outlined"
                        onClick={() => changeDate(1)}
                        sx={{position : "fixed", top : "49%", right : "3%", bgcolor : "#224a9a", "&:hover": { backgroundColor: "#224a9a" }}}
                    >
                        <KeyboardArrowRightIcon sx={{color : "white"}}  />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
}