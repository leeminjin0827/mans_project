import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";


export default function RoomReservationUpdate(props) {

    // 예약 정보
    const reservation = props.reservation;
    // 기존 날짜
    const oldDate = props.reservation.resstart;
    // 입력된 새로운 값 저장 state
    const [newValue, setNewValue] = useState(reservation);

    /** 예약 정보를 수정하는 함수 */
    const updateReservation = async () => {
        // props.socket.send("통신!");
        try {
            const response = await axios.put("http://localhost:8081/reservation", newValue);
            if(response.data) {
                console.log(`지점 별 예약:${props.hno}:${oldDate}`);
                props.socket.send(`지점 별 예약:${props.hno}:${oldDate}`);
                alert("수정 성공");
                props.onClose(false);
            } else {
                alert("수정 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    /** 예약을 삭제하는 함수 */
    const deleteReservation = async () => {
        const state = confirm("정말 예약을 취소하겠습니까?");
        if(state) {
            try {
                const response = await axios.delete(`http://localhost:8081/reservation?reno=${newValue.reno}`);
                if(response.data) {
                    alert("예약이 취소되었습니다.");
                    console.log(`지점 별 예약:${props.hno}:${oldDate}`);
                    props.socket.send(`지점 별 예약:${props.hno}:${oldDate}`);
                    props.onClose(false);
                } else {
                    alert("예약 취소를 실패했습니다.");
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    /** 입력값 실시간 수정 함수 */
    const changeInput = (event) => {
        setNewValue({...newValue, [event.target.name] : event.target.value});
    }

    console.log(reservation);
    // console.log(props.socket);

    return (
        <>
            <div style={{maxHeight : "70vh", overflowY : "auto"}}>
                <Divider style={{margin : "0px 15px"}} />
                <table style={{padding : "20px", textAlign : "start"}}>
                    <tbody>
                        <tr>
                            <td>예약자명 : </td>
                            <td><Input type="text" name="resname" value={newValue.resname} onChange={changeInput} readOnly /></td>
                        </tr>
                        <tr>
                            <td>전화번호 : </td>
                            <td><Input type="text" name="resphone" value={newValue.resphone} onChange={changeInput} /></td>
                        </tr>
                        <tr>
                            <td>입실날짜 : </td>
                            <td><Input type="text" name="resstart" value={newValue.resstart} onChange={changeInput} /></td>
                        </tr>
                        <tr>
                            <td>퇴실날짜 : </td>
                            <td><Input type="text" name="resend" value={newValue.resend} onChange={changeInput} /></td>
                        </tr>
                    </tbody>
                </table>
                <Divider style={{margin : "0px 15px"}} />
                <div style={{textAlign : "end", paddingTop : "15px", paddingRight : "15px", marginBottom : "15px"}}>
                    <Button variant="contained" type="button" onClick={updateReservation} style={{marginRight : "15px"}}>예약 수정</Button>
                    {
                        newValue.resname == "" ? 
                        <Button variant="contained" type="button" onClick={deleteReservation} disabled>예약 취소</Button> 
                        : 
                        <Button variant="contained" type="button" onClick={deleteReservation}>예약 취소</Button>

                    }
                    {/* <Button variant="contained" type="button" onClick={deleteReservation}>삭제</Button> */}
                </div>
            </div>
        </>
    );
}