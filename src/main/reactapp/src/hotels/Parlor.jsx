import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar";
import { Box, Table } from "@mui/joy";
import { Button, ButtonGroup, TablePagination } from "@mui/material";
import StaticModal from "./components/StaticModal";
import OptionRegister from "./components/room/OptionRegister";
import RoomRatingRegister from "./components/room/RoomRatingRegister";
import RatingRegister from "./components/room/RatingRegister";
import RoomRegister from "./components/room/RoomRegister";
import { useNavigate } from "react-router-dom";
import PictureList from "./components/room/PictureList";

export default function ParlorPage( props ){

    // ------------------------------------------------ 접근권한 ------------------------------------------------------------------------
    /** 페이지 이동 관련 코드 */
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

    // ------------------------------------------------ 모달 ------------------------------------------------------------------------

    // 옵션 등록 모달
    const [optionWriteModal , setOptionWriteModal] = useState(false);
    // 객실 등급 등록 모달
    const [ratingWriteModal , setRatingWriteModal] = useState(false);
    // 객실별 옵션 등록 모달
    const [roomOptionWriteModal , setRoomOptionWriteModal ] = useState(false);
    // 객실 등록 모달
    const [roomWriteModal , setRoomWriteModal ] = useState(false);
    // 사진 리스트
    const [ pList , setPList ] = useState(false);

    // 모달 열림/닫힘 상태
    const [omodals , setOmodals ] = useState(false);
    const [rmodals , setRmodals ] = useState(false);
    const [romodals , setRomodals ] = useState(false);
    // 모달 열기
    const oOpenModal = () => { setOmodals(true); }
    const rOpenModal = () => { setRmodals(true); }
    const roOpenModal = () => { setRomodals(true); }
    // 모달 닫기
    const oCloseModal = () => { setOmodals(false); }
    const rCloseModal = () => { setRmodals(false); }
    const roCloseModal = () => { setRomodals(false); }

    // ------------------------------------------------ 옵션 ------------------------------------------------------------------------
    
    // 옵션 조회
    useEffect( () => {
        checkAuthority();
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
    const oUpdateInput = async ( opno ) => {
        const opName = prompt("변경될 옵션명을 입력하세요");
        if( !opName ){ return; }
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
    const [ ratingUpdate , setRatingUpdate ] = useState({ rno : '' , rating_name : '' , bed_count : '' , bed_type : '' , price : '' })
    const rUpdateInput = async ( rno ) => {
        const ratingName = prompt("변경하실 객실등급명 을 입력하세요.");
        const bedCount = prompt("침대수를 입력하세요.");
        const bedType = prompt("침대의 타입을 입력하세요.");
        const price = prompt("금액을 입력하세요.");
        if( !rno || !ratingName || !bedCount || !bedType ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room/rating" , { rno , ratingName , bedCount , bedType , price } );
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

    // 객실 전체 조회
    useEffect(() => {
        console.log("객실 전체 조회 실행");
        roomRead();
    }, []);  // 처음 한번만 실행
    
    const [roomList, setRoomList] = useState([]);
    const [plzList, setPlzList] = useState([]);  // 필터링할 객실목록
    const [selectedRoom, setSelectedRoom] = useState(null); // 선택된 객실 상태
    
    const roomRead = async () => {
        const response = await axios.get("http://localhost:8081/room");
    
        // 객실 번호별로 옵션을 그룹화
        const groupedRooms = response.data.reduce((acc, room) => {
            if (acc[room.rono]) {
                // 기존 객실에 옵션 추가 (중복된 옵션을 Set으로 제거)
                acc[room.rono].options.add(room.opName); // Set을 사용하여 중복 옵션을 제거
            } else {
                // 새로운 객실에 대한 옵션 추가
                acc[room.rono] = {
                    rono: room.rono,
                    hno: room.hno,
                    staffNumber: room.staffNumber,
                    rname : room.rname,
                    rfiles: room.rfiles,
                    ratingName: room.ratingName,
                    bedCount: room.bedCount,
                    bedType: room.bedType,
                    name: room.name,
                    options: room.opName ? new Set([room.opName]) : new Set(),  // 첫 번째 옵션 추가, Set으로 중복 제거
                };
            }
            return acc;
        }, {});
    
        // 객체를 배열로 변환하고, Set을 쉼표로 구분된 문자열로 변환
        const roomListWithOptions = Object.values(groupedRooms).map((room) => {
            return {
                ...room,
                options: Array.from(room.options).join(", "), // Set을 배열로 변환하고 옵션을 쉼표로 구분된 문자열로 변환
            };
        });
    
        setRoomList(roomListWithOptions);  // 상태 업데이트
    };
    
    // select
    const [selectBranch , setSelectBranch ] = useState("0");
    
    const selectChange = (e) => {
        const value = e.target.value;
        setSelectBranch(value);
    };
    
    // selectBranch나 roomList가 변경될 때마다 plzList를 업데이트
    useEffect(() => {
        if (selectBranch === "0") {
            // 전체 선택 시 모든 객실 표시
            setPlzList(roomList);
        } else {
            // 지점에 맞는 객실만 필터링
            const filterRooms = roomList.filter((room) => room.hno === parseInt(selectBranch));
            setPlzList(filterRooms);
        }
    }, [selectBranch, roomList]);  // selectBranch와 roomList가 변경될 때마다 실행
    
    // 페이지네이션
    const [page, setPage] = useState(0); // 현재 페이지
    const [rowsPage, setRowsPage] = useState(10); // 페이지당 행 개수
    
    const changePage = (e, newPage) => {
        setPage(newPage);
    };
    
    const changeRowPage = (e) => {
        setRowsPage(parseInt(e.target.value, 10));
    };
    
    const newRoom = Array.isArray(plzList) ? plzList.slice(page * rowsPage, page * rowsPage + rowsPage) : [];
    
    // 객실 사진 모달을 열 때 선택된 객실의 사진만 표시
    const openPictureModal = (room) => {
        setSelectedRoom(room); // 선택된 객실 설정
        setPList(true); // 모달 열기
    };

    const closePictureModal = () => {
        setPList(false); // 모달 닫기
        setSelectedRoom(null); // 선택된 객실 정보 초기화
    };
    

    // 객실 수정
    const [ roomUpdate , setRoomUpdate ] = useState({ rono : '' , rname : '' , rno : '' , staffNumber : '' })
    const mUpdateInput = async ( rono ) => {
        const rname = prompt("변경하실 객실이름을 입력하세요.");
        const rno = prompt("변경하실 객실등급번호를 입력하세요.(번호)");
        const staffNumber = prompt("변경하실 담당자를 입력하세요.(번호)");
        if( !rno ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room" , { rono , rname , rno , staffNumber })
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
        <Sidebar
            setOptionWriteModal={setOptionWriteModal}
            setRatingWriteModal={setRatingWriteModal}
            setRoomOptionWriteModal={setRoomOptionWriteModal}
            />
        <div className="mainBox">
            {/* 각 목록 start */}
            <div>
                <StaticModal
                    isOpen={omodals}
                    onClose={oCloseModal}
                    title="옵션 목록"
                    openData={
                        <div style={{ overflowY : 'auto',  maxHeight : "70vh"}}>
                            <Table id="tableAll" sx={{tableLayout : "auto"}}>
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
                                                        <Button variant="contained" type="button" onClick={ () => oUpdateInput(option.opno) }>수정</Button>
                                                        <Button sx={{ marginLeft : '10px'}} variant="contained" type="button" onClick={ () => oDeleteInput(option.opno) }>삭제</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    }
                />
            </div>
            <div>
                <StaticModal 
                    isOpen={rmodals}
                    onClose={rCloseModal}
                    title="등급 목록"
                        openData={
                        <div style={{ overflowY : 'auto',  maxHeight : "70vh"}}>
                            <Table id="tableAll" sx={{tableLayout : "auto"}}>
                                <thead>
                                    <tr>
                                        <th>등급번호</th>
                                        <th>등급명</th>
                                        <th>침대수</th>
                                        <th>침대종류</th>
                                        <th>가격</th>
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
                                                    <td> { rating.price } </td>
                                                    <td>
                                                        <Button variant="contained" type="button" onClick=  { () => rUpdateInput(rating.rno) }>수정</Button>
                                                        <Button sx={{ marginLeft : '10px'}} variant="contained" type="button" onClick={ () => rDeleteInput(rating.rno) }>삭제</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    }
                />
            </div>
            <div>
                <StaticModal 
                    isOpen={romodals}
                    onClose={roCloseModal}
                    title="객실별 옵션 목록"
                    openData={
                        <div style={{ overflowY : 'auto',  maxHeight : "70vh"}}>
                            <Table id="tableAll" sx={{tableLayout : "auto"}}>
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
                                                        <Button variant="contained" type="button" onClick={ () => roWriteInput(roomop.rno) }>추가</Button>
                                                        <Button sx={{ marginLeft : '10px'}} variant="contained" type="button" onClick={ () => roDeleteInput(roomop.rno) }>삭제</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    }
                />
            </div>
            {/* 각 목록 end */}
            {/* 객실 목록 start */}
            <Box style={{marginBottom : '50px'}}>
                <div style={{ marginBottom : '30px' , display : "flex", justifyContent : "space-between"}}>
                    {/* 버튼 그룹 start */}
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button sx={{fontWeight : 'bold' }} onClick={oOpenModal} type = 'button'>옵션목록</Button>
                        <Button sx={{fontWeight : 'bold'}} onClick={rOpenModal} type = 'button'>객실등급목록</Button>
                        <Button sx={{fontWeight : 'bold'}} onClick={ roOpenModal } type = 'button'>객실별옵션목록</Button>
                    </ButtonGroup>
                    {/* 버튼 그룹 end*/}
                    {/* select 박스 start */}
                    <div style={{ padding: '0px 10px'}}>
                        <select style={{marginRight : "50px", padding : '9.75px 21.5px' , textAlign : "center"}}
                                value={selectBranch}
                                onChange={selectChange}>
                            <option value={"0"}>전체</option>
                            <option value={"1"}>강남점</option>
                            <option value={"2"}>중구점</option>
                            <option value={"3"}>부평점</option>
                        </select>
                        <Button variant="contained" type="button" onClick={() => setRoomWriteModal(true)}>객실 등록</Button>
                    </div>
                    {/* select 박스 end */}
                </div>
                <Table className={"roomtable"}> 
                        <thead>
                            <tr>
                                <th style={{ width : '4%'}}>객실번호</th>
                                <th style={{ width : '4%'}}>호실</th>
                                <th style={{ width : '4%'}}>지점</th>
                                <th style={{ width : '5%'}}>객실등급</th>
                                <th style={{ width : '4%'}}>침대수</th>
                                <th style={{ width : '9%'}}>침대유형</th>
                                <th style={{ width : '25%'}}>객실옵션</th>
                                <th style={{ width : '9%'}}>사진</th>
                                <th style={{ width : '5%'}}>담당자</th>
                                <th style={{ width : '10%'}}>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newRoom.map( ( room , i ) => {
                                    if(true) {
                                        
                                    }
                                    return(
                                        <tr key={ i } style={{width : "100%"}}>
                                            <td>{room.rono}</td>
                                            <td>{room.rname}</td>
                                            <td>{hnoChange(room.hno)}</td>
                                            <td>{room.ratingName}</td>
                                            <td>{room.bedCount}</td>
                                            <td>{room.bedType}</td>
                                            <td>{room.options}</td>
                                            <td>
                                                <Button variant="contained" type="button" onClick={ () => openPictureModal(room)}> 사진보기 </Button>
                                            </td>
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
                {/* 페이지네이션 */}
                <TablePagination
                    component="div"
                    count={plzList.length} // 전체 데이터 개수
                    page={page}
                    onPageChange={changePage}
                    rowsPerPage={rowsPage}
                    onRowsPerPageChange={changeRowPage}
                    sx={{
                        "& .MuiTablePagination-selectLabel": { display: "none" },
                        "& .MuiTablePagination-select": { display: "none" },
                        "& .MuiTablePagination-displayedRows": { marginRight: "auto" } // 가운데 정렬 깨짐 방지
                    }}
                />
            </Box>
            {/* 객실 목록 end */}
            { /* 옵션 등록 모달 */}
            <StaticModal
                isOpen={optionWriteModal}
                title={"옵션 등록"}
                openData={
                    <OptionRegister 
                        optionRead={optionRead}
                        onClose={() => setOptionWriteModal(false)}
                    />
                }
                onClose={() => {setOptionWriteModal(false)}}
            />
            { /* 객실 등급 등록 모달 */}
            <StaticModal
                isOpen={ratingWriteModal}
                title={"객실 등급 등록"}
                openData={
                    <RatingRegister 
                        ratingRead={ratingRead}
                        onClose={ () => setRatingWriteModal(false) }
                    />
                }
                onClose={ () => { setRatingWriteModal(false) }}
            />
            { /* 객실별 옵션 등록 모달 */}
            <StaticModal 
                isOpen={roomOptionWriteModal}
                title={"객실별 옵션 등록"}
                openData={
                    <RoomRatingRegister 
                        roomOptionRead={roomOptionRead}
                        onClose={() => setRoomOptionWriteModal(false)}
                    />
                }
                onClose={ () => { setRoomOptionWriteModal(false)}}
            />
            { /* 객실 등록 모달 */}
            <StaticModal 
                isOpen={roomWriteModal}
                title={"객실 등록"}
                openData={
                    <RoomRegister
                        roomRead={roomRead}
                        onClose={ () => setRoomWriteModal(false)}
                    />
                }
                onClose={ () => { setRoomWriteModal(false) } }
            />
            {/* 객실 사진 모달 */}
            <StaticModal 
                isOpen={pList}
                title={"객실 사진"}
                openData={
                    <PictureList
                        room={selectedRoom}
                        onClose={ closePictureModal}
                    />
                }
                onClose={ () => { setPList(false) } }
            />
        </div>
    </>)
} // c end
