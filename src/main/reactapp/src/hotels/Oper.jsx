
import axios from "axios";
import { useEffect, useState } from "react";


export default function Operatae(props){
    
    useEffect(() => {onFindAll()}, []) // 처음부터 전체 출력

    //입력받은 데이터를 저장하는 변수
    const[formData, setFomdata] = useState({ address : '',hotel_number: '', intro : ''});

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
            const response = await axios.post('http://localhost:8081/director' , formData)
            if(response.data == true){alert("등록성공");
                setFomdata({address : '',hotel_number: '', intro : ''});
                onFindAll();
            } else{alert('등록실패')};
        } catch (error) { console.log(error);}
    }


    const [boards, setBoards] = useState([]); //여러개의 방문록을 가지는 state 변수

    const onFindAll = async () => {
        try {
            const response = await axios.get('http://localhost:8081/director');
            setBoards(response.data);
        } catch (error) {console.log(error);
            
        }

    }

    

    //주소 소개 , 폰번호 변경 데이터
    const [editFormData, setEditFormData] = useState({ hno : '' , hotel_number : '' , intro : ''});

    const editChange = (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        setEditFormData({...editFormData, [e.target.name] : e.target.value});
    }
    
    const onUpdate = async (hno, hotel_number, intro) => {
        editFormData.hotel_number= prompt(`현재 비밀번호 : ${hotel_number}`, editFormData.hotel_number);
        editFormData.intro = prompt(`현재 이름 : ${intro}`, editFormData.intro);

        try {
                editFormData.hno = hno;
            const response = await axios.put('http://localhost:8081/director', editFormData)
            if(response.data == true && editFormData != ''){// 여기부분 수정 필요 전혀 걸러지지가 않음
                alert("수정성공");
                setEditFormData({hotel_number : '', intro : ''}); //초기화
                onFindAll();
            }else{
                alert("수정실패");
            }
        } catch (error) {console.log(error);
            
        }

    }


    const [stateDe, setState] = useState({ hno : '' , state : ''});

    const stateChange = (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        setState({...stateDe, [e.target.name] : e.target.value});

        let response =  axios.delete(`http://localhost:8081/director?id=${stateDe.hno}&state=${stateDe.state}`)
        if(response.data == true){alert('삭제성공'); setState({hno : '' , state : ''}); onFindAll();}
        else{alert('삭제실패');}
    }




    

    return(<>
            <div>
                <form>
                    <h2>관리자 정보페이지</h2>
                    
                    주소 : <input type="text" value={formData.address} name="address" onChange={formDataChange}/><br/>
                    호텔 전화번호 : <input type="text" value={formData.hotel_number} name="hotel_number" onChange={formDataChange}/><br/>
                    소개 : <input type="text" value={formData.intro} name="intro" onChange={formDataChange}/><br/>
        
                    <button type="button" onClick={onPost}>저장</button><br/><br/>


                </form>
                <table border={1}>
                    <thead>
                        <tr><th>번호</th><th>주소</th><th>호텔전화번호</th><th>소개</th><th>운영상태</th><th>수정</th></tr>
                        
                    </thead>
                    <tbody>
                        {
                            boards.map((board, index) => {
                                return(<tr key={board.hno}><th>{board.hno}</th>
                                <th>{board.address}</th>
                                <th>{board.hotel_number}</th>
                                <th>{board.intro}</th>
                                <th><select name="state" value={board.state} onChange={() =>stateChange()}>
                                    <option value='0'>운영중</option>
                                    <option value='1'>임시휴업</option>
                                    <option value='2'>폐점</option>
                                </select></th><th><button type="butoon" onClick={() => onUpdate(board.hno, board.hotel_number ,board.intro)}>수정</button></th></tr>)// 여기 부분 onUpdate() 를 그냥 넣으니 연속 실행됨
                            })

                        }

                    </tbody>
                </table>

            </div>
    
            </>)

}//f end