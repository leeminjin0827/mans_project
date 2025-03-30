import { Table } from "@mui/joy";
import { Button, TablePagination } from "@mui/material";
import { useState } from "react";

export default function UserView({ reservationView }){

    // 페이지네이션
    const [page, setPage] = useState(0); // 현재 페이지
    const [rowsPage, setRowsPage] = useState(10); // 페이지당 행 개수
            
    const changePage = (e, newPage) => {
        setPage(newPage);
    };
    
    const changeRowPage = (e) => {
        setRowsPage(parseInt(e.target.value, 10));
    };
    
    const newRoom = Array.isArray(reservationView) ? reservationView.slice(page * rowsPage, page * rowsPage + rowsPage) : [];

    return(<>
        <Table id="tableAll" sx={{maxHeight : '424px'}}>
            <thead>
                <tr>
                    <th>예약번호</th><th>이름</th><th>전화번호</th><th>체크인</th><th>체크아웃</th><th>비고</th>
                </tr>
            </thead>
            <tbody>
                {
                    newRoom.map( ( reservation , i ) => {
                        return(
                            <tr key={ i }>
                                <td>{ reservation.reno }</td>
                                <td>{ reservation.resname }</td>
                                <td>{ reservation.resphone }</td>
                                <td>{ reservation.resstart }</td>
                                <td>{ reservation.resend }</td>
                                <td>
                                    <Button variant="contained" type="button">수정</Button>
                                    <Button variant="contained" type="button">취소</Button>
                                </td>
                            </tr>
                        )
                    } )
                }
            </tbody>
        </Table>
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
    </>)
}