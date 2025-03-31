import { Divider, Input } from "@mui/joy"
import { Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"

export default function RoomRatingRegister( props ){

    // 객실별 옵션 목록 등록
    const[ roomOptionListWrite , setRoomOptionListWrite ] = useState( { rno : '' , opno : '' })
    const roChange = (e) => {
        setRoomOptionListWrite({...roomOptionListWrite , [e.target.name] : e.target.value })
    }
    const write = async () => {
        try{
            const response = await axios.post("http://localhost:8081/room/option/set" , roomOptionListWrite )  
            if( response.data == true ) {
                alert("목록 등록 완료");
                setRoomOptionListWrite( { rno: '' , opno: '' })
                props.roomOptionRead();
                props.onClose();
            }else{
                alert("목록 등록 실패");
            } // if end
        }catch( error ) { console.log( error ); }
    } // f end
    return(<>
        <div>
            <Divider />
            <table style={{margin : '20px'}}>
                <tbody>
                    <tr>
                        <td> 객실 등급 : </td>
                        <td> <Input variant="outlined" type="text" name="rno" value={roomOptionListWrite.rno} onChange={roChange} placeholder="번호로 입력" /> </td>
                    </tr>
                    <tr>
                        <td> 옵션 번호 : </td>
                        <td> <Input variant="outlined" type="text" name="opno" value={roomOptionListWrite.opno} onChange={roChange} placeholder="번호로 입력" /> </td>
                    </tr>
                </tbody>
            </table>
            <Divider />
            <div style={{textAlign : "end" , paddingTop : "15px" }}>
                <Button variant="contained" type="button" onClick={write}>등록</Button>
            </div>
        </div>
    </>)
} // c end