import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";


export default function RoomReservationUpdate(props) {
    const reservation = props.reservation;
    const [newValue, setNewValue] = useState(reservation);

    return (
        <>
            <div style={{maxHeight : "70vh", overflowY : "auto"}}>
                <Divider style={{margin : "0px 15px"}} />
                <table style={{padding : "20px", textAlign : "start"}}>
                    <tbody>
                        <tr>
                            <td>예약자명 : </td>
                            <td><Input type="text" /></td>
                        </tr>
                        <tr>
                            <td>입실날짜 : </td>
                            <td><Input type="text" /></td>
                        </tr>
                        <tr>
                            <td>퇴실날짜 : </td>
                            <td><Input type="text" /></td>
                        </tr>
                    </tbody>
                </table>
                <Divider style={{margin : "0px 15px"}} />
                <div style={{textAlign : "end", paddingTop : "15px", paddingRight : "15px", marginBottom : "15px"}}>
                    <Button variant="contained" type="button">수정</Button>
                </div>
            </div>
        </>
    );
}