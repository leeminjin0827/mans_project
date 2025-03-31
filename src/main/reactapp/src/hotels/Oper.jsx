
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Box, Button, Input, Option, Select, Table } from "@mui/joy";
import {useDaumPostcodePopup} from 'react-daum-postcode'; //daum 주소 검색 관련 hook?
import { useNavigate } from "react-router-dom";



export default function Operatae(props){

    const navigate = useNavigate();

    /** 접근 권한 확인 하는 함수 */
    const checkAuthority = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff/authority", {withCredentials : true});
            const result = response.data;
            console.log(`result = ${result}`);
            if(!result) {
                alert("접근 권한이 없습니다.");
                navigate(-1);
            }
        } catch(e) {
            console.log(e);
        }
    }


    useEffect(() => {checkAuthority(); onFindAll();}, []) // 처음부터 전체 출력

    //입력받은 데이터를 저장하는 변수
    const[dataInfo, setDataInfo] = useState({ hname : '' , address : '',hotel_number: '', intro : ''});
    const[profile , setProfile] = useState(null); //업로드 파일을 파일객체로로 저장하는 state 변수
    const[preview , setPreview] = useState(null); //업로드 파일을 바이트로 저장하는 state 변수
    const onFileChange = (event) => { console.log(event.target.files[0])

    const file = event.target.files[0];

    setProfile(file)

        // 이미지 미리보기 
    if(file){
        //4. 파일 읽기 객체 선언
        const reader = new FileReader(); // js객체 : 파일 읽기 객체
        //5. 파일 읽기 메소드 정의 .reader.onloadend(()=> {파일읽어드릴때 실행할 코드})
        reader.onloadend = () => {
            console.log(reader.result); //읽어드린 파일을 출력 ,reader.result : 가져온 파일의 결과물(바이트)
            setPreview(reader.result); //state에 저장

        }
        //6. 파일 읽기
        reader.readAsDataURL(file) //읽어드릴 파일 대입, reader.readAsDataURL(file객체)
    }else{// 파일이 없으면
         setPreview(null);
    }

}

    const [phoneNumberError, setPhoneNumberError] = useState(''); // 전화번호 검사를 저장하는곳


    //입력받은 데이터를 렌더링
    const formDataChange = (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        

        setDataInfo({...dataInfo, [e.target.name] : e.target.value}); 

    if (e.target.name === 'hotel_number') {
        const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
        if (!phoneRegex.test(e.target.value)) {
            setPhoneNumberError('전화번호 형식이 올바르지 않습니다. (예: 02-123-4567 또는 010-1234-5678)');
        } else {
            setPhoneNumberError(''); // 유효하면 에러 메시지 초기화
        }
    }

        
    }

    //현재 state 변수를 스프링 서버에게 보내기, axios
    // const onPost = async (e) => {
    //     try {
    //         const response = await axios.post('http://localhost:8081/director' , formData)
    //         if(response.data == true){alert("등록성공");
    //             setFomdata({address : '',hotel_number: '', intro : ''});
    //             onFindAll();
    //         } else{alert('등록실패')};
    //     } catch (error) { console.log(error);}
    // }

    const OnSignup = async () => { // 관리자 등록부분
        if (phoneNumberError) {
            alert('전화번호 형식을 확인해주세요.');
            return;
        }
        //formdata 객체 만들기
        const formData = new FormData();
        formData.append('hname' , dataInfo.hname);
        formData.append('address' , dataInfo.address );
        formData.append('hotel_number' , dataInfo.hotel_number);
        formData.append('intro' , dataInfo.intro);

        if(profile != null){
        formData.append('uploadfile', profile);
        }
        const option = {geaders : {"Content-Type" : "multipart/form-data"}}
        const response = await axios.post("http://localhost:8081/director", formData , option)
        console.log(response);
        if(response.data ==  true){
            alert("등록성공"); onFindAll();
        }else{alert("등록실패")}
    }



    // 주소 api
     //
     const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

     const handleComplete = (data) => {
       let fullAddress = data.address;
       let extraAddress = '';
   
       if (data.addressType === 'R') {
         if (data.bname !== '') {
           extraAddress += data.bname;
         }
         if (data.buildingName !== '') {
           extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
         }
         fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
       }
   
       console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
       setDataInfo( { ...dataInfo , 'address' : fullAddress })
     };
   
     const handleClick = () => {
       open({ onComplete: handleComplete });
     };
     
 



    const [boards, setBoards] = useState([]); //여러개의 방문록을 가지는 state 변수
    const onFindAll = async () => {
        try {
            const response = await axios.get('http://localhost:8081/director');
            setBoards(response.data);
            console.log(response.data);
            for(let index = 0; index < response.data.length; index++) {
                stateDe[index] = response.data[index].state == 0 ? '운영중' : response.data[index].state == 1 ? '임시휴업' : '폐점';
                console.log(stateDe[index]);
            }
        } catch (error) {console.log(error);
            
        }

    }

    

    //주소 소개 , 폰번호 변경 데이터
    const [editFormData, setEditFormData] = useState({ hno : '', hname : '' , address : '', hotel_number : '' , intro : ''});

    const editChange = (e) => {
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        setEditFormData({...editFormData, [e.target.name] : e.target.value});
    }
    

    const onUpdate = async (hno,hname,address, hotel_number, intro) => {
        editFormData.hname = prompt(`현재 지점명 : ${hname}` , editFormData.hname);
        editFormData.address = prompt(`현재주소 : ${address}`, editFormData.address);
        editFormData.hotel_number= prompt(`현재 번호 : ${hotel_number}`, editFormData.hotel_number);
        editFormData.intro = prompt(`현재 소개 : ${intro}`, editFormData.intro);
        editFormData.hno = hno;
        try {

            if(editFormData.hotel_number == "" && editFormData.address == '' && editFormData.intro == ''){// 여기부분 수정 필요 전혀 걸러지지가 않음
                alert("수정실패 공백을 넣을수 없습니다.")

            } else if(editFormData.address != "" && editFormData.address != '' && editFormData.intro != '') {
                const response = await axios.put('http://localhost:8081/director', editFormData)
                if(response.data == true){
                alert("수정성공");
                setEditFormData({hotel_number : '', intro : ''}); //초기화
                onFindAll();
            }else {
                alert("수정실패");}
            }
        } catch (error) {console.log(error);
            
        }

    }

    const [stateDe, setStateDe] = useState([]);
    console.log( stateDe )
    //  [ 0 : 운영중 , 1:임시휴업 , 2: 폐업 ]
    //          0           1           2
    //   index  0           1           2
    const stateChange = (e , newvalue, index ) => {

        // stateDe[index] = e.target.value; mui select가 target을 인식을 못함
        stateDe[index] = newvalue;
        setStateDe( [...stateDe ] );
    }
    const stateUpdate = async (hno ,state) => {
        state = state =='운영중' ? 0 : state == '임시휴업' ? 1:2;
        let response = await axios.delete(`http://localhost:8081/director?hno=${hno}&state=${state}`)
        console.log(response.data);
        if(response.data == true){alert('변경성공');  onFindAll();}
        else{alert('변경실패');}
    }

    
    

    return(<>
            <Sidebar />
            <div className="mainBox">
                <form style={{float : 'left'}}>
                    
                    <Box sx={{ml: 10, py: 2, width: '100%',  display: 'grid', gap: 1, flexWrap: 'wrap' }}>
                    <h2>관리자 정보페이지</h2>
                    <Input sx={{ width: '85%' }} size="md" placeholder="호텔지점" type="text" value={dataInfo.hname} name="hname" onChange={formDataChange}/>
                    <div>
                    <Input sx={{ width: '85%' }} readOnly size="md" placeholder="주소" type="text" value={dataInfo.address} name="address" onChange={formDataChange}/>
                    </div>
                    <Box sx={{  ml: 45 } }>
                    <Button sx={{ justifyContent: 'flex-end'  } } size="sm" type="button" onClick={handleClick}>검색</Button>
                    </Box>
                    <Input sx={{ width: '85%' }}size="md" placeholder="호텔 전화번호" type="text" value={dataInfo.hotel_number} name="hotel_number" onChange={formDataChange}/>{phoneNumberError && <div style={{ color: 'red' , fontSize: '12px' }}>{phoneNumberError}</div>}
                    <Input sx={{ width: '85%' }}size="md" placeholder="소개" type="text" value={dataInfo.intro} name="intro" onChange={formDataChange}/>
                    <input sx={{ width: '85%' }}type="file" accept="imge/*" onChange={onFileChange}/>
                    <Box sx={{  ml: 45 }}>
                    <Button size="sm" sx={{justifyContent: 'flex-end' }}  type="button" onClick={OnSignup}>저장</Button><br/><br/>
                    </Box>
                    </Box>
                </form>
                    <div style={{ marginLeft: '40%'}}>
                    {preview && (<><img src={preview} style={{with:"500px", height:"300px"}}/></>)}
                    </div>


                <Table sx={{tableLayout : "auto"}}  >
                    <thead>
                        <tr><th>번호</th><th>지점명</th><th>주소</th><th>호텔전화번호</th><th>소개</th><th>운영상태</th><th>수정</th></tr>
                        
                    </thead>
                    <tbody border={1}>
                        {
                            boards.map((board, index) => {

                                return(<tr key={board.hno}>
                                <th>{board.hno}</th>
                                <th>{board.hname}</th>
                                <th>{board.address}</th>
                                <th>{board.hotel_number}</th>
                                <th>{board.intro}</th>
                                <th>
                                    <Select sx={{ width: '130px' , ml: -1 }}   value={ stateDe[index] } onChange={ (e , newvalue) => { stateChange( e, newvalue , index) } } >
                                        <Option value="운영중">운영중 </Option>
                                        <Option value="임시휴업">임시휴업</Option>
                                        <Option value="폐점">폐점 </Option>
                                    </Select>
                                    <Button size="sm" sx={{  ml: 6 } } type="button" onClick={() =>{stateUpdate(board.hno, stateDe[index])}}>상태수정</Button>
                                    </th>
                                <th><Button type="butoon" sx={{  ml: -1} } onClick={() => onUpdate(board.hno, board.hname, board.address, board.hotel_number ,board.intro)}>수정</Button></th>
                                </tr>);// 여기 부분 onUpdate() 를 그냥 넣으니 연속 실행됨
                            })
                        }
                    </tbody>
                </Table>

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
