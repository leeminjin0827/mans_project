import axios from "axios";
import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar";

export default function ParlorPage( props ){

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
        console.log('1회 실행');
        optionRead();
    } , [] )
    // axios 이용해서 서버와 통신
    const optionRead = async ( ) => {
        const response = await axios.get('http://localhost:8081/room/option');
        setOptionList( response.data );
    } // f end
    // 서버로 부터 받은 결과를 저장하는 변수
    const [ optionList , setOptionList ] = useState([]);
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
                }else{
                    alert("삭제실패");
                }
            }catch( error ) { console.log( error ); }
        }else{
            return;
        }
    } // f end

    // 객실등급 등록
    const [ ratingnWrite , setRatingWrite ] = useState( { rating_name : '' , bed_count : '' , bed_type : '' , rating_option : '' } )
    const rWriteInput = async () => {
        const ratingName = prompt("등록하실 객실등급을 입력하세요.");
        const bedCount = prompt("침대수를 입력하세요.");
        const bedType = prompt("침대의 타입을 입력하세요.");
        const ratingOption = prompt("해당하는 옵션을 입력하세요.");
        if( !ratingName || !bedCount || !bedType || !ratingOption ) { return; } // 입력값이 없을시 종료

        try{
            const response = await axios.post("http://localhost:8081/room/rating" , { ratingName , bedCount , bedType , ratingOption } );
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
        console.log('객실등급 조회 1회 실행');
        ratingRead();
    } , [] )
    const ratingRead = async ( ) => {
        const response = await axios.get('http://localhost:8081/room/rating');
        setRatingList( response.data );
    } // f end
    const [ ratingList , setRatingList ] = useState([]);
    console.log( ratingList );

    // 객실등급 수정
    const [ ratingUpdate , setRatingUpdate ] = useState({ rno : '' , rating_name : '' , bed_count : '' , bed_type : '' , rating_option : '' })
    const rUpdateInput = async () => {
        const rno = prompt("수정하실 객실번호를 입력하세요.");
        const ratingName = prompt("그에 해당하는 객실등급을 입력하세요.");
        const bedCount = prompt("침대수를 입력하세요.");
        const bedType = prompt("침대의 타입을 입력하세요.");
        const ratingOption = prompt("옵션을 입력하세요.");
        if( !rno || !ratingName || !bedCount || !bedType || !ratingOption ){ return; }
        try{
            const response = await axios.put("http://localhost:8081/room/rating" , { rno , ratingName , bedCount , bedType , ratingOption } );
            if( response.data == true ){
                alert("객실등급을 수정했습니다.");
                ratingRead();
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
                }else{
                    alert("삭제실패");
                }
            }catch( error ) { console.log( error ); }
        }else{
            return;
        }
    } // f end


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
                            <th>구성옵션</th>
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
                                        <td> { rating.ratingOption } </td>
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
            <h3>객실목록</h3>
            <table border={"1"}>
                <thead>
                    <tr>
                        <th>객실번호</th>
                        <th>객실등급</th>
                        <th>침대수</th>
                        <th>침대유형</th>
                        <th>객실옵션</th>
                        <th>비고</th>
                    </tr>
                </thead>
            </table>
        </div>
        </div>
    </>)
} // c end

// 테이블 
// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) => {
//       console.log('params:', params);
//       if (!params || !params.row) return ''; 
//       return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
//     },
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function ParlorPage() {
//   console.log('Rows:', rows); // rows가 정상적으로 전달되는지 확인

//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         sx={{ border: 0 }}
//       />
//     </Paper>
//   );
// }
