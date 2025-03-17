import { Input } from "@mui/joy";
import { Divider } from "@mui/material";


export default function StaffDetail(props) {

    const infoName = ["직원 번호", "아이디", "비밀번호", "이름", "전화번호", "주소", "입사일", "퇴사일", "직급", "연봉", "근무지", "퇴사 유무"];
    const staffInfo = ["staffNumber", "id", "password", "name", "phone", "address", "startDate", "endDate", "staffRank", "salary", "hno", "resignation"];

    const staffDetail = props.staffDetail;
    staffDetail["resignation"] = staffDetail["resignation"] == 0 ? "근무" : "퇴사";
    

    return (
        <>
            <div>
                <Divider />
                <table style={{padding : "20px", textAlign : "start"}}>
                    <tbody>
                        {
                            staffInfo.map((info, index) => {
                                return <tr key={index}>
                                    <td>
                                        {infoName[index]} : 
                                    </td>
                                    <td>
                                        <Input variant="outlined" readOnly slotProps={{input : {tabIndex : -1}}} value={staffDetail[staffInfo[index]] != null ? staffDetail[staffInfo[index]] : "미정"} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}