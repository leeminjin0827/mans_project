import { Divider, Input } from "@mui/joy";
import { useState } from "react";


export default function OptionRegister( props ){
    // 옵션 등록
    // 입력 받은 데이터를 저장하는 state 변수
    const [ optionWrite , setOptionWrite ] = useState( { op_name : '' } )
    const oChange = (e) => {
        setOptionWrite({...optionWrite , [e.target.name] : e.target.value })
    }
    const write = async () => {
        try{
            const response = await axios.post("http://localhost:8081/room/option" , optionWrite );
            if( response.data == true ){
                alert("옵션을 추가했습니다.");
                setOptionWrite( { op_name : '' } )
                props.optionRead(); // 새로고침
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
                        <td> 옵션 번호 : </td>
                        <td> <Input variant="outlined" type="text" name="opName" value={optionWrite.op_name}/> </td>
                    </tr>
                </tbody>
            </table>
            <Divider />
        </div>
    </>)
} // c end