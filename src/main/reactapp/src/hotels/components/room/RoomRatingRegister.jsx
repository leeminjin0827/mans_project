import { Divider, Input } from "@mui/joy"
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
                        <td> <Input variant="outlined" type="text" name="rno" value={roomOptionListWrite.rno} /> </td>
                    </tr>
                    <tr>
                        <td> 옵션 번호 : </td>
                        <td> <Input variant="outlined" type="text" name="opno" value={roomOptionListWrite.opno} /> </td>
                    </tr>
                </tbody>
            </table>
            <Divider />
        </div>
    </>)
} // c end