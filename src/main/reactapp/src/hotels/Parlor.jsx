import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar";
import { Box, Table } from "@mui/joy";
import { Button } from "@mui/material";

export default function ParlorPage( props ){

    // ------------------------------------------------ 옵션 ------------------------------------------------------------------------

    // 옵션 등록
    // 입력 받은 데이터를 저장하는 state 변수
    const [ optionWrite , setOptionWrite ] = useState( { op_name : '' } )
    const oWriteInput = async () => {
        const opName = prompt("추가할 옵션을 입력하세요.");
        if( !opName ) { return; } // 입력값이 없을시 종료
        console.log( opName );

        try{
            const response = await axios.post("http://localhost:8081/room/option" , { opName } );
            if( response.data == true ){
                alert("옵션을 추가했습니다.");
                optionRead(); // 새로고침
            }else{
                alert("옵션 추가 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end
    
    // 옵션 조회
    useEffect( () => {
        console.log('옵션조회 실행');
        optionRead();
    } , [] )
    // axios 이용해서 서버와 통신
    const optionRead = async ( ) => {
        const response = await axios.get('http://localhost:8081/room/option');
        setOptionList( response.data );
    } // f end
    // 서버로 부터 받은 결과를 저장하는 변수
    const [ optionList , setOptionList ] = useState([]);
    console.log( "옵션 목록 ");
    console.log( optionList );

    // 옵션 수정
    const [ optionUpdate , setOptionUpdate ] = useState({ opno : '' , op_name : '' })
    const oUpdateInput = async () => {
        const opno = prompt("수정할 옵션번호를 입력하세요.");
        const opName = prompt("변경될 옵션명을 입력하세요");
        if( !opno || !opName ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room/option" , { opno , opName } );
            if( response.data == true ){
                alert("옵션을 수정했습니다.");
                optionRead();
                roomOptionRead();
                roomRead();
            }else{
                alert("옵션 수정 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end
    
    // 옵션 삭제
    const [ optionDelete , setOptionDelete ] = useState({ opno : '' });
    const oDeleteInput = async (opno) => {
        if( !opno ){ return; }
        const real = confirm("정말 삭제 하시겠습니까?");
        if( real == true ){
            try{
                const response = await axios.delete(`http://localhost:8081/room/option?opno=${opno}`)
                if( response.data ) {
                    alert("삭제되었습니다.");
                    optionRead();
                    roomOptionRead();
                    roomRead();
                }else{
                    alert("삭제실패");
                }
            }catch( error ) { console.log( error ); }
        }else{
            return;
        }
    } // f end

    // ------------------------------------------------ 객실 등급 ------------------------------------------------------------------------

    // 객실등급 등록
    const [ ratingnWrite , setRatingWrite ] = useState( { rating_name : '' , bed_count : '' , bed_type : '' } )
    const rWriteInput = async () => {
        const ratingName = prompt("등록하실 객실등급명을 입력하세요.");
        const bedCount = prompt("침대수를 입력하세요.");
        const bedType = prompt("침대의 타입을 입력하세요.");
        if( !ratingName || !bedCount || !bedType ) { return; } // 입력값이 없을시 종료

        try{
            const response = await axios.post("http://localhost:8081/room/rating" , { ratingName , bedCount , bedType } );
            if( response.data == true ){
                alert("객실등급을 추가했습니다.");
                ratingRead();
            }else{
                alert("객실등급 추가 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end
    
    // 객실등급 조회
    useEffect( () => {
        console.log('객실등급 조회 실행');
        ratingRead();
    } , [] )
    const ratingRead = async ( ) => {
        const response = await axios.get('http://localhost:8081/room/rating');
        setRatingList( response.data );
    } // f end
    const [ ratingList , setRatingList ] = useState([]);
    console.log( "객실등급 " );
    console.log( ratingList );

    // 객실등급 수정
    const [ ratingUpdate , setRatingUpdate ] = useState({ rno : '' , rating_name : '' , bed_count : '' , bed_type : '' })
    const rUpdateInput = async () => {
        const rno = prompt("수정하실 객실등급번호를 입력하세요.");
        const ratingName = prompt("객실등급을 입력하세요.");
        const bedCount = prompt("침대수를 입력하세요.");
        const bedType = prompt("침대의 타입을 입력하세요.");
        if( !rno || !ratingName || !bedCount || !bedType ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room/rating" , { rno , ratingName , bedCount , bedType } );
            if( response.data == true ){
                alert("객실등급을 수정했습니다.");
                ratingRead();
                roomOptionRead();
                roomRead();
            }else{
                alert("객실등급 수정 실패");
            }
        }catch( error ) { console.log( error ); }
    } // f end
    
    // 객실등급 삭제
    const [ ratingDelete , setRatingDelete ] = useState({ rno : '' });
    const rDeleteInput = async (rno) => {
        if( !rno ){ return; }
        const real = confirm("정말 삭제 하시겠습니까?");
        if( real == true ){
            try{
                const response = await axios.delete(`http://localhost:8081/room/rating?rno=${rno}`)
                if( response.data ) {
                    alert("삭제되었습니다.");
                    ratingRead();
                    roomOptionRead();
                    roomRead();
                }else{
                    alert("삭제실패");
                }
            }catch( error ) { console.log( error ); }
        }else{
            return;
        }
    } // f end

    // ------------------------------------------------ 객실  ------------------------------------------------------------------------

    // 객실 등록
    const [ roomWrite , setRoomWrite ] = useState( { rno : '' , hno : '' , staffNumber : '' })
    const mWriteInput = async () => {
        const hno = prompt("호텔 지점번호를 입력해주세요.");
        const rno = prompt("객실에 설정할 객실등급을 입력하세요.");
        const staffNumber = prompt("객실을 담당할 직원번호를 입력해주세요.");
        if( !rno ) { return; }
        try{
            const response = await axios.post("http://localhost:8081/room" , { rno , hno , staffNumber } )
            if( response.data == true ){
                alert("객실 등록을 성공했습니다.");
                roomRead();
            }else{
                alert("객실 등록을 실패");
            } // if end
        }catch( error ) { console.log( error ); }
    } // f end

    // 객실 전체 조회
    useEffect(() => {
        console.log("객실 전체 조회 실행");
        roomRead();
    }, []);  // 처음 한번만 실행

    const [roomList, setRoomList] = useState([]);
    console.log( "객실 목록 ")
    console.log( roomList );

    const roomRead = async () => {
        const response = await axios.get("http://localhost:8081/room");
    
        // 객실 번호별로 옵션을 그룹화
        const groupedRooms = response.data.reduce((acc, room) => {
            if (acc[room.rono]) {
                // 기존 객실에 옵션 추가
                acc[room.rono].options.push(room.opName);
            } else {
                // 새로운 객실에 대한 옵션 추가
                acc[room.rono] = {
                    rono: room.rono,
                    hno: room.hno,
                    staffNumber: room.staffNumber,
                    rno: room.rno,
                    ratingName: room.ratingName,
                    bedCount: room.bedCount,
                    bedType: room.bedType,
                    name: room.name,
                    options: room.opName ? [room.opName] : [],  // 첫 번째 옵션 추가
                };
            }
            return acc;
        }, {});
    
        // 객체를 배열로 변환하고, 옵션을 쉼표로 구분된 문자열로 변환
        const roomListWithOptions = Object.values(groupedRooms).map((room) => {
            return {
                ...room,
                options: room.options.join(", "), // 옵션을 쉼표로 구분된 문자열로 변환
            };
        });
    
        setRoomList(roomListWithOptions);  // 상태 업데이트
    };
    
    // 객실 수정
    const [ roomUpdate , setRoomUpdate ] = useState({ rno : '' , rono : '' })
    const mUpdateInput = async ( rono ) => {
        const rno = prompt("변경하실 객실등급번호를 입력하세요.");
        if( !rno ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room" , { rno , rono })
            if( response.data == true ){
                alert("변경완료");
                roomRead();
            }else{
                alert("변경실패");
            } // if end
        }catch( error ) { console.log( error ); }
    } // f end

    // 객실 삭제
    const [ roomDelete , setRoomDelete] = useState({ rono : '' })
    const mDeleteInput = async ( rono ) => {
        const real = confirm("정말 삭제 하시겠습니까?");
        if( real == true ){
            try{
                const response = await axios.delete(`http://localhost:8081/room?rono=${rono}`)
                if( response.data == true ){
                    alert("삭제완료");
                    roomRead();
                }else{
                    alert("삭제실패")
                } // if end
            }catch ( error ) { console.log( error ); }
        } // if end
    } // f end

    // ------------------------------------------------ 객실별 옵션 ------------------------------------------------------------------------

    // 객실별 옵션 목록 등록
    const[ roomOptionListWrite , setRoomOptionListWrite ] = useState( { rno : '' , opno : '' })
    const rolWriteInput = async () => {
        const rno = prompt("목록에 등록할 객실등급 번호를 입력하세요.");
        const opno = prompt("객실등급에 등록할 옵션번호을 입력하세요");
        if( !rno || !opno ){ return; }
        try{
            const response = await axios.post("http://localhost:8081/room/option/set" , { rno , opno } )  
            if( response.data == true ) {
                alert("목록 등록 완료");
                roomOptionRead();
            }else{
                alert("목록 등록 실패");
            } // if end
        }catch( error ) { console.log( error ); }
    } // f end

    // 객실별 옵션 추가
    const [ roomOptionWrite , setRoomOptionWrite ] = useState( { opno : '' })
    const roWriteInput = async ( rno ) => {
        const opno = prompt("추가할 옵션 번호를 입력하세요.");
        if( !opno ) { return; }
        try{
            const response = await axios.post ("http://localhost:8081/room/option/set" , { rno , opno } )
            if( response.data == true ){
                alert("성공했습니다.");
                roomOptionRead();
                roomRead();
            }else{
                alert("실패");
            } // if end
        }catch(error) { console.log( error ); }
    } // f end

    // 객실별 옵션 조회
    useEffect(() => {
        console.log('객실별 옵션 전체조회 실행');
        roomOptionRead();
    }, []);

    const [roomOptionList, setRoomOptionList] = useState([]);
    console.log("객실별 옵션 목록")
    console.log( roomOptionList );

    const roomOptionRead = async () => {
        try {
            const response = await axios.get('http://localhost:8081/room/option/set');
            setRoomOptionList(response.data);
        } catch (error) { console.error(error); }
    };

    // 객실 옵션을 rno 기준으로 그룹화
    const groupedRoomOptions = roomOptionList.reduce((acc, room) => {
        if (acc[room.rno]) {
            acc[room.rno].options.push(room.opName);
        } else {
            acc[room.rno] = {
            rno: room.rno,
            ratingName: room.ratingName,
            bedCount: room.bedCount,
            bedType: room.bedType,
            options: [room.opName]
            };
        }
        return acc;
    }, {});

    // 객체 → 배열 변환
    const mergedRoomOptions = Object.values(groupedRoomOptions);

    // 객실별 옵션 목록 삭제
    const [ roomOptionListDelete , setRoomOptionListDelete ] = useState( { rno : '' } )
    const rolDeleteInput = async () => { // 나중에 rno 받을거면 추가
        const rno = prompt("삭제할 목록 번호를 입력하세요");
        if( !rno ){return;}
        const real = confirm("정말 삭제하시겠습니까?");
        if( real == true ){
            try{
                const response = await axios.delete(`http://localhost:8081/room/option/set/delete?ropno=${rno}`)
                if( response.data == true ){
                    alert("목록 삭제 완료");
                    roomOptionRead();
                    roomRead();
                }else{
                    alert("목록 삭제 실패");
                } // if end
            }catch(error) { console.log( error ); }
        } // if end
    } // f end

    // 객실별 옵션 목록 옵션 삭제
    const [ roomOptionDelete , setRoomOptionDelete ] = useState({ rno : '' , opno : '' });
    const roDeleteInput = async (rno) => {
        const opno = prompt("삭제할 옵션번호를 입력하세요.")
        if( !opno ){ return; }
        try{
            const response = await axios.delete(`http://localhost:8081/room/option/set?rno=${rno}&opno=${opno}`)
            if( response.data == true ) {
                alert("삭제완료");
                roomOptionRead();
                roomRead();
            }else{
                alert("삭제실패");
            } // if end
        }catch( error ) { console.log( error ); }
    } // f end

    // 호텔명 함수
    const hnoChange = (hno) =>{
        let result;
        if( typeof hno === "number" ){
            switch(hno){
                case 1:
                    result = "강남점";
                    break;
                case 2:
                    result = "중구점";
                    break;
                case 3:
                    result = "부평점";
                    break;
            }
        }console.log( result ); return result;
    } // f end


    // ------------------------------------------------ return ------------------------------------------------------------------------

    return(<>
        <Sidebar />
        <div className="mainBox">
        <h1>객실 관리 페이지</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <h3>옵션목록</h3>
                    <div>
                        <button type="button" onClick={ oWriteInput }>등록</button>
                        <button type="button" onClick={ oUpdateInput }>수정</button>
                    </div>
                    <table border={"1"}>
                        <thead>
                            <tr>
                                <th>옵션번호</th>
                                <th>옵션명</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                optionList.map( ( option , i ) => {
                                    return(
                                        <tr key={ i }>
                                            <td> { option.opno } </td>
                                            <td> { option.opName } </td>
                                            <td>
                                                <button type="button" onClick={ () => oDeleteInput(option.opno) }>삭제</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>객실등급목록</h3>
                    <div>
                        <button type="button" onClick={ rWriteInput }>등록</button>
                        <button type="button" onClick={ rUpdateInput }>수정</button>
                    </div>
                    <table border={"1"}>
                        <thead>
                            <tr>
                                <th>등급번호</th>
                                <th>등급명</th>
                                <th>침대수</th>
                                <th>침대종류</th>
                                <th>기능</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ratingList.map( ( rating , i ) => {
                                    return(
                                        <tr key={ i }>
                                            <td> { rating.rno } </td>
                                            <td> { rating.ratingName } </td>
                                            <td> { rating.bedCount } </td>
                                            <td> { rating.bedType } </td>
                                            <td>
                                                <button type="button" onClick={ () => rDeleteInput(rating.rno) }>삭제</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h3>객실별 옵션 목록</h3>
                <div>
                    <button onClick={ rolWriteInput } type="button">목록등록</button>
                    <button onClick={ rolDeleteInput } type="button">목록삭제</button>
                </div>
                <table border={"1"}>
                    <thead>
                        <tr>
                            <th>옵션번호</th>
                            <th>객실등급</th>
                            <th>침대수</th>
                            <th>침대유형</th>
                            <th>객실옵션</th>
                            <th>기능</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mergedRoomOptions.map( ( roomop , i ) => {
                                return(
                                    <tr key={ roomop.rno }>
                                        <td> {roomop.rno}</td>
                                        <td> {roomop.ratingName} </td>
                                        <td> {roomop.bedCount} </td>
                                        <td> {roomop.bedType} </td>
                                        <td> {roomop.options.join(",")} </td>
                                        <td>
                                            <button onClick={ () => roWriteInput(roomop.rno) } type="button">추가</button>
                                            <button onClick={ () => roDeleteInput(roomop.rno) } type="button">삭제</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Box style={{marginBottom : '50px' }}>
                <h3>객실 목록</h3>
                <div style={{ padding : "0px 10px", display : "flex", justifyContent : "end"}}>
                    <select style={{marginRight : "50px", width : "7%", textAlign : "center"}}>
                        <option value={"0"}>전체</option>
                        <option value={"1"}>강남점</option>
                        <option value={"2"}>중구점</option>
                        <option value={"3"}>부평점</option>
                    </select>
                    <Button variant="contained" type="button" onClick={mWriteInput}>객실 등록</Button>
                </div>
                <Table id="tableAll" sx={{tableLayout : "auto"}}>
                        <thead>
                            <tr>
                                <th>객실번호</th>
                                <th>지점</th>
                                <th>객실등급</th>
                                <th>침대수</th>
                                <th>침대유형</th>
                                <th>객실옵션</th>
                                <th>담당자</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roomList.map( ( room , i ) => {
                                    if(true) {
                                        
                                    }
                                    return(
                                        <tr key={ i } style={{width : "100%"}}>
                                            <td>{room.rono}</td>
                                            <td>{hnoChange(room.hno)}</td>
                                            <td>{room.ratingName}</td>
                                            <td>{room.bedCount}</td>
                                            <td>{room.bedType}</td>
                                            <td>{room.options}</td>
                                            <td>{room.name}</td>
                                            <td>
                                                <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem"}} onClick={() => {mUpdateInput(room.rono);}}>수정</Button>
                                                <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem" , marginLeft : "10px"}} onClick={() => {mDeleteInput(room.rono);}}>삭제</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </Table>
            </Box>
        </div>
    </>)
} // c end
