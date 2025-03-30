import { Table } from "@mui/joy";
import { Button, TablePagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Senter( {setChangePage , setSelectSno } ){

    // 문의 전체 조회
    useEffect( () => {
        console.log("문의 전체 조회 실행");
        SenterRead();
    } , [] );
    const [ senterList , setSenterList ] = useState([]);
    console.log("문의 게시판");
    console.log( senterList );

    const SenterRead = async () => {
        try{
            const response = await axios.get('http://localhost:8081/senter')
            setSenterList(response.data);
        }catch( e ) { console.log( e ); }
    }

    // 문의 삭제
    const snoDeleteBtn = async ( sno ) => {
      const real = confirm("정말 삭제하시겠습니까?");
      if( real ){
        try{
          const response = await axios.delete(`http://localhost:8081/senter?sno=${sno}`);
          if( response.data === true) {
            alert("문의 삭제 완료");
            await SenterRead();
          }else{
            alert("문의 삭제 실패");
          } // if end
        }catch ( e ) { console.log( e ); }
      } // if end
    } // c end

    // 전화번호로 문의 조회
    const phoneCheck = (senter) => {
        // 사용자에게 전화번호 입력 받기
        const checkPhone = prompt("전화번호를 입력하세요");

        if (checkPhone === senter.senterPhone) {
            // 전화번호가 일치하면 해당 문의 내용으로 이동
            alert("확인됐습니다.")
            setSelectSno(senter.sno);
            setChangePage("6"); // 해당 페이지로 전환
        } else {
            // 전화번호가 일치하지 않으면 경고
            alert("전화번호가 일치하지 않습니다.");
        }
    };

    // 페이지네이션
    const [page, setPage] = useState(0); // 현재 페이지
    const [rowsPage, setRowsPage] = useState(10); // 페이지당 행 개수
    
    const changePage = (e, newPage) => {
        setPage(newPage);
    };
    
    const changeRowPage = (e) => {
        setRowsPage(parseInt(e.target.value, 10));
    };
    
    const newRoom = Array.isArray(senterList) ? senterList.slice(page * rowsPage, page * rowsPage + rowsPage) : [];

    return(<>
        <Table className={"sentertable"}>
            <thead>
                <tr>
                    <th style={{ width: '5%'}}>번호</th>
                    <th style={{ width: '10%'}}>작성자</th>
                    <th style={{ width: '75%'}}>제목</th>
                    <th style={{ width: '10%'}}>비고</th>
                </tr>
            </thead>
            <tbody>
                {
                    newRoom.map( ( senter , i ) => {
                        return(
                            <tr key={ i }>
                                <td>{senter.sno}</td>
                                <td>{senter.senterName}</td>
                                <td className="senterLink"
                                    onClick={ () => {
                                        phoneCheck(senter)
                                    }}
                                >{senter.senterTitle}</td>
                                <td>
                                    <Button variant="contained" type="button" onClick={ () => snoDeleteBtn(senter.sno) }>삭제</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <div style={{ display : "flex" , justifyContent: 'space-between' , width : '100%' , marginTop : "20px"}}>
            <div>
                <Button variant="contained" type="button" onClick={ () => setChangePage("5")}>문의하기</Button>
            </div>
            {/* 페이지네이션 */}
            <TablePagination
                component="div"
                count={senterList.length}
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
        </div>
    </>)
} // c end