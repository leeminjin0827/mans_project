
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Link from '@mui/material/Link';


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
            console.log(response.data);
            for(let index = 0; index < response.data.length; index++) {
                stateDe[index] = response.data[index].state;
                console.log(stateDe[index]);
            }
        } catch (error) {console.log(error);
            
        }

    }

    

    //주소 소개 , 폰번호 변경 데이터
    const [editFormData, setEditFormData] = useState({ hno : '' , address : '', hotel_number : '' , intro : ''});

    
    
    const onUpdate = async (hno,address, hotel_number, intro) => {
        editFormData.address = prompt(`현재주소 : ${address}`, editFormData.address);
        editFormData.hotel_number= prompt(`현재 번호 : ${hotel_number}`, editFormData.hotel_number);
        editFormData.intro = prompt(`현재 소개 : ${intro}`, editFormData.intro);
        editFormData.hno = hno;
        try {
            
            if(editFormData.hotel_number == "" && editFormData.address == '' && editFormData.intro == ''){// 여기부분 수정 필요 전혀 걸러지지가 않음
                alert("수정실패 공백을 넣을수 없습니다.")
            
            } else if(editFormData.address != ""&& editFormData.address != '' && editFormData.intro != '') {
                const response = await axios.put('http://localhost:8081/director', editFormData)
                if(response.data == true){
                alert("수정성공");
                setEditFormData({hotel_number : '', intro : ''}); //초기화
                onFindAll();
                
                }else{alert("수정실패")}
            }
                
               

            
                
                
               
            
        } catch (error) {console.log(error);
            
        }

    }
    const temp = [];

    const [stateDe, setStateDe] = useState(temp); 
    //  [ 0 : 운영중 , 1:임시휴업 , 2: 폐업 ] 
    //          0           1           2
    //   index  0           1           2
    const stateChange = (e , index ) => {
        console.log(e.target);
        // console.log(e.target.name);
        console.log(e.target.value);
        stateDe[index] = e.target.value;

        setStateDe( [...stateDe ] );
    }
    const stateUpdate = async (hno ,state) => {
        let response = await axios.delete(`http://localhost:8081/director?hno=${hno}&state=${state}`)
        console.log(response.data);
        if(response.data == true){alert('변경성공');  onFindAll();}
        else{alert('변경실패');}
    }


   
    

    return(<>
            <Sidebar />
            <div className="mainBox">
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
                                
                                return(<tr key={board.hno}>
                                <th>{board.hno}</th>
                                <th>{board.address}</th>
                                <th>{board.hotel_number}</th>
                                <th>{board.intro}</th>
                                <th><select value={stateDe[index]} onChange={ (e) => { stateChange( e, index) } } >
                                    <option value={0}>운영중</option>
                                   <option value={1}>임시휴업</option>
                                    <option value={2}>폐점</option>
                                    </select>
                                    <button type="button" onClick={() =>{stateUpdate(board.hno, stateDe[index])}}>상태수정</button>
                                    </th>
                                
                                <th><button type="butoon" onClick={() => onUpdate(board.hno, board.address, board.hotel_number ,board.intro)}>수정</button></th></tr>)// 여기 부분 onUpdate() 를 그냥 넣으니 연속 실행됨
                            })
                        }
                    </tbody>
                </table>

            </div>

                            {/* 0 1 1  위 반복문 예시 

                            <select value={ 0 } >
                                <option value="0"> 하하</option>
                                <option value="1"> 카카 </option>
                            </select>


                            <select value={ 1 } >
                                <option value="0"> 하하</option>
                                <option value="1"> 카카 </option>
                            </select>


                            <select value={ 1 } >
                                <option value="0"> 하하</option>
                                <option value="1"> 카카 </option>
                            </select> */}

    
            </>)

}//f end