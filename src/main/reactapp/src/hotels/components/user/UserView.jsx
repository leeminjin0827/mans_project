import { Table } from "@mui/joy";
import { Button } from "@mui/material";

export default function UserView({ reservationView }){

    return(<>
        <Table id="tableAll" sx={{maxHeight : '424px'}}>
            <thead>
                <tr>
                    <th>예약번호</th><th>이름</th><th>전화번호</th><th>체크인</th><th>체크아웃</th><th>비고</th>
                </tr>
            </thead>
            <tbody>
                {
                    reservationView.map( ( reservation , i ) => {
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
    </>)
}