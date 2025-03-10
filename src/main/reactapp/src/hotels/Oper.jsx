
import axios from "axios";
import { useState } from "react";


export default function Operatae(props){

    //입력받은 데이터를 저장하는 변수
    const[formData, setFomdata] = useState({address : '',hotel_number: '', intro : '', });

    //입력받은 데이터를 렌더링
    const formDataChange = (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);

        setFomdata({...formData, [e.target.name] : e.target.value});
    }

    //현재 state 변수를 스프링 서버에게 보내기, axios
    const onPost = async (e) => {
        try {
            const response = await axios.post('http://localhost:8080/director' , formData)
            if(response.data == true){alert("등록성공");
                setFomdata({address : '',hotel_number: '', intro : ''});
            } else{alert('등록실패')};
        } catch (error) { console.log(error);}
    }

    return(<>
            <div>
                <form>
                    <h2>관리자 정보페이지</h2>
                    
                    주소 : <input type="text" value={formData.address} name="address" onChange={formDataChange}/><br/>
                    호텔 전화번호 : <input type="text" value={formData.hotel_number} name="hotel_number" onChange={formDataChange}/><br/>
                    소개 : <input type="text" value={formData.intro} name="intro" onChange={formDataChange}/><br/>
        
                    <button type="button" onClick={onPost}>저장</button>

                </form>
                <table border={1}>
                    <thead>
                        <tr><th>번호</th><th>주소</th><th>호텔전화번호</th><th>소개</th><th>운영상태</th><th>수정/삭제</th></tr>
                        <tr><th>1</th><th>서울 강동구</th><th>010-3332-4243</th><th>우리호텔은~~~</th><th><select name="state" value={formData.state} onChange={formDataChange}>
                                    <option value='0'>운영중</option>
                                    <option value='1'>임시휴업</option>
                                    <option value='3'>폐점</option>
                                </select></th><th><button type="button">수정</button><button type="button">삭제</button></th></tr>
                    </thead>
                </table>

            </div>
    
            </>)

}//f end