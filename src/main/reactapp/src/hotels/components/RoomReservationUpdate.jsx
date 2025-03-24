import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";


export default function RoomReservationUpdate(props) {
    const reservation = props.reservation;
    const [newValue, setNewValue] = useState(reservation);

    const updateReservation = () => {
        props.socket.send("통신 보안!");
    }

    console.log(reservation);
    console.log(props.socket);

    return (
        <>
            <div style={{maxHeight : "70vh", overflowY : "auto"}}>
                <Divider style={{margin : "0px 15px"}} />
                <table style={{padding : "20px", textAlign : "start"}}>
                    <tbody>
                        <tr>
                            <td>예약자명 : </td>
                            <td><Input type="text" value={newValue.resname} onChange={setNewValue} /></td>
                        </tr>
                        <tr>
                            <td>입실날짜 : </td>
                            <td><Input type="text" value={newValue.resstart} onChange={setNewValue} /></td>
                        </tr>
                        <tr>
                            <td>퇴실날짜 : </td>
                            <td><Input type="text" value={newValue.resend} onChange={setNewValue} /></td>
                        </tr>
                    </tbody>
                </table>
                <Divider style={{margin : "0px 15px"}} />
                <div style={{textAlign : "end", paddingTop : "15px", paddingRight : "15px", marginBottom : "15px"}}>
                    <Button variant="contained" type="button" onClick={updateReservation}>수정</Button>
                </div>
            </div>
        </>
    );
}