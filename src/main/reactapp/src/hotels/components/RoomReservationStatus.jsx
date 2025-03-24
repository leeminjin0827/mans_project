import { Box, Card, Typography } from "@mui/joy";
import { Button, Divider } from "@mui/material";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import StaticModal from "./StaticModal";
import RoomReservationUpdate from "./RoomReservationUpdate";


export function RoomCard(props) {

    const info = props.info;
    const reservationList = props.reservationList;
    // #899f6a --> Tendril
    // #b5e9a1 --> Paradise green
    // #d19c97 --> Rose Tan

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? "0" + now.getMonth() : now.getMonth();
    const day = now.getDate() + 1 < 10 ? "0" + now.getDate() : now.getDate();
    const startDate = `${year}-${month}-${day}`;
    let backgroundColor = "#899f6a";
    const [reservation, setReservation] = useState({});
    // 예약 수정 모달창 관련 코드
    const [updateModal, setUpdateModal] = useState(false);

    // console.log(reservationList);
    // for(let index = 0; index < reservationList.length; index++) {
    //     let temp = reservationList[index];
    //     if(temp.rname === info.rname) {
    //         backgroundColor = "#d19c97";
    //         setReservation(temp);
    //     }
    // }

    // const resInfo = reservationList.find((temp) => temp.rname === info.rname));

    if(reservation) {
        backgroundColor = "#d19c97";
    }

    // 카드를 클릭 시 실행되는 코드
    const clickCard = () => {
        alert("클릭");
    }


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
                    color : "white",
                    cursor : "pointer"
                }}
                onClick={() => {setUpdateModal(true);}}
            >
                <Typography sx={{textAlign : "center", color : "white"}} >{props.changeHnoString(info.hno)} / {info.rname}</Typography>
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
            <StaticModal
                isOpen={updateModal}
                title={"예약 수정"}
                openData={
                    <RoomReservationUpdate
                        onClose={() => {setUpdateModal(false);}}
                        reservation={reservation}
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

    // 지점명 저장 변수
    let hotelBranch = ["전체", "강남점", "중구점", "부평점"];
    // 예약 테이블에서 가져온 값 저장하는 state
    const [reservationList, setReservationList] = useState([]);
    // 객실 목록 테이블에서 가져온 값을 저장하는 state
    const [roomList, setRoomList] = useState([]);
    // 셀렉트 값이 변경될 때 마다 값을 저장하는 state
    const [selectValue, setSelectValue] = useState("1");
    // 처음 지점 번호를 가져오는 함수
    const [hnoValue, setHnoValue] = useState([]);

    let socket = useRef(null);

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
                    if("state" in data[0]) {
                        console.log("지점 번호 가져옴");
                        setHnoValue(data);
                    }
                    if("rono" in data[0] && "rno" in data[0]) {
                        console.log("지점별 객실 정보 가져옴");
                        setRoomList(data);
                    }
                    if("reno" in data[0]) {
                        console.log("지점별 예약 정보 가져옴");
                        setReservationList(data);
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
                socket.current.send("지점 별 예약:1");
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

    // useEffect(() => {
    //     if(socket.current) {
    //         console.log(`지점 별 예약:${selectValue}`);
    //         socket.current.send(`지점 별 예약:${selectValue}`);
    //     }
    // }, [roomList]);

    // console.log(selectValue);
    // console.log("reservationList : ");
    // console.log(reservationList);

    /** 셀렉트 선택 후 찾기 버튼 클릭 시 실행되는 함수 */
    const onClickSelect = () => {
        console.log(`선택한 지점:${selectValue}`);
        socket.current.send(`선택한 지점:${selectValue}`);
        console.log(`지점 별 예약:${selectValue}`);
        socket.current.send(`지점 별 예약:${selectValue}`);
    }

    /** 지점 번호 문자열로 바꾸기 */
    const changeHnoString = (hno) => {
        let str = hno;
        switch(hno) {
            case 1:
                str = hotelBranch[1];
                break;
            case 2:
                str = hotelBranch[2];
                break;
            case 3:
                str = hotelBranch[3];
                break;
        }
        return str;
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
                        {
                            hnoValue.map((value, index) => {
                                return <option key={index} value={value.hno}>{changeHnoString(value.hno)}</option>
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
                    }}>
                        {
                            roomList.map((value, index) => {
                                // 가져온 지점별 예약 데이터에서 
                                return (
                                    <RoomCard 
                                        key={index} 
                                        // 생성된 인덱스
                                        cardIndex={index}
                                        //
                                        count={roomList.length}
                                        // 지점별 방 정보
                                        info={value} 
                                        // 지점번호를 문자열로 치환하는 함수
                                        changeHnoString={changeHnoString}
                                        // 현재 예약 현황 정보
                                        reservationList={reservationList}
                                    />
                                )
                            })
                        }
                </Box>
            </div>
        </>
    );
}