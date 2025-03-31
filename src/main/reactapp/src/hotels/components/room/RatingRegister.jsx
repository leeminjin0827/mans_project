import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function RatingRegister( props ){

    // 객실등급 등록
    const [ ratingnWrite , setRatingWrite ] = useState( { ratingName : '' , bedCount : '' , bedType : '' , price : '' } )
    const rChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setRatingWrite({...ratingnWrite , [e.target.name] : e.target.value })
    }
    const write = async () => {
        try{
            const response = await axios.post("http://localhost:8081/room/rating" , ratingnWrite );
            if( response.data == true ){
                alert("객실등급을 추가했습니다.");
                setRatingWrite( { ratingName : '' , bedCount : '' , bedType : '' , price : '' })
                props.ratingRead(); // 새로고침
                props.onClose(); // 모달 닫기
            }else{
                alert("객실등급 추가 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end

    return(<>
        <div>
            <Divider />
            <table style={{margin : '20px'}}>
                <tbody>
                    <tr>
                        <td> 등급 이름 : </td>
                        <td> <Input onChange={rChange} variant="outlined" type="text" name="ratingName" value={ratingnWrite.ratingName} /></td>
                    </tr>
                    <tr>
                        <td> 침대 수 : </td>
                        <td> <Input onChange={rChange} variant="outlined" type="text" name="bedCount" value={ratingnWrite.bedCount} placeholder="숫자 입력" /></td>
                    </tr>
                    <tr>
                        <td> 침대 종류 : </td>
                        <td> <Input onChange={rChange} variant="outlined" type="text" name="bedType" value={ratingnWrite.bedType} /></td>
                    </tr>
                    <tr>
                        <td> 금액 : </td>
                        <td> <Input onChange={rChange} variant="outlined" type="text" name="price" value={ratingnWrite.price} placeholder="숫자 입력" /></td>
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