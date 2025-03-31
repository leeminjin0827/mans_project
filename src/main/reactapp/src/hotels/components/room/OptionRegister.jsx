import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";


export default function OptionRegister( props ){
    
    // 옵션 등록
    const [ optionWrite , setOptionWrite ] = useState( { opName : '' } )
    const oChange = (e) => {
        setOptionWrite({...optionWrite , [e.target.name] : e.target.value })
    }
    const write = async () => {
        try{
            const response = await axios.post("http://localhost:8081/room/option" , optionWrite );
            if( response.data == true ){
                alert("옵션을 추가했습니다.");
                setOptionWrite( { opName : '' } )
                props.optionRead(); // 새로고침
                props.onClose(); // 모달 닫기
            }else{
                alert("옵션 추가 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end
    return(<>
        <div>
            <Divider />
            <table style={{margin : '20px'}}>
                <tbody>
                    <tr>
                        <td> 옵션 이름 : </td>
                        <td> <Input onChange={oChange} variant="outlined" type="text" name="opName" value={optionWrite.opName} /> </td>
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