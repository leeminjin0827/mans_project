import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function RoomRegister( props ){

    // 입력받은 첨부파일
    const [ profile , setProfile ] = useState(null); // 파일 객체로 저장
    const [ roomWrite , setRoomWrite ] = useState( { rname : '' , rno : '' , hno : '' , staffNumber : '' })

    // 첨부파일 외
    const roChange = (e) =>{
        setRoomWrite({...roomWrite , [e.target.name] : e.target.value })
    }
    // 첨부파일
    const onfileChange = (e) => { console.log( e.target.files[0] );
        const file = e.target.files[0];
        setProfile(file);
    } // f end
    const write = async () => {
        // formData 객체 생성
        const formData = new FormData();
        // 속성 넣기
        formData.append( 'rname' , roomWrite.rname );
        formData.append( 'hno' , roomWrite.hno );
        formData.append( 'rno' , roomWrite.rno );
        formData.append( 'staffNumber' , roomWrite.staffNumber );
        if( profile ){
            formData.append( 'uploadfile' , profile );
        }
        const option = { headers : { "Content-Type" : "multipart/form-data" }}
        const response = await axios.post("http://localhost:8081/room" , formData , option )
        const result = response.data;
        if( result == true ){
            alert("객실 등록을 성공했습니다.");
            setRoomWrite({ rname : '' , rno : '' , hno : '' , staffNumber : '' })
            props.roomRead();
            props.onClose();
        }else{
            alert("객실 등록을 실패");
        } // if end
    } // f end

    

    return(<>
        <div>
            <Divider />
            <table style={{margin : '20px'}}>
                <tbody>
                    <tr>
                        <td> 호실명 :  </td>
                        <td> <Input onChange={roChange} variant="outlined" type="text" name="rname" value={roomWrite.rname}/> </td>
                    </tr>
                    <tr>
                        <td> 등급 :  </td>
                        <td> <Input onChange={roChange} variant="outlined" type="text" name="rno" value={roomWrite.rno}/> </td>
                    </tr>
                    <tr>
                        <td> 지점 :  </td>
                        <td> <Input onChange={roChange} variant="outlined" type="text" name="hno" value={roomWrite.hno}/> </td>
                    </tr>
                    <tr>
                        <td> 담당자 :  </td>
                        <td> <Input onChange={roChange} variant="outlined" type="text" name="staffNumber" value={roomWrite.staffNumber}/> </td>
                    </tr>
                    <tr>
                        <td> 객실사진 </td>
                        <td> <Input onChange={onfileChange} variant="outlined" type="file" name="rimg" /> </td>
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