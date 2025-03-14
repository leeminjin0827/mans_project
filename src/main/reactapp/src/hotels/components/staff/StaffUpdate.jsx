import { Divider, Input } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";



export default function StaffUpdate(props) {

    const info = props.staffUpdate;

    // 입력값 관련 코드
    const [updateData, setUpdateData] = useState({
        staffNumber : info.staffNumber, password : info.password, name : info.name,
        phone : info.phone, address : info.address, startDate : info.startDate,
        staffRank : info.staffRank, salary : info.salary, hno : info.hno
    });
    const chageInput = (event) => {
        setUpdateData({...updateData, [event.target.name] : event.target.value});
    }

    // 직원 정보 수정
    const staffInfoUpdate = async () => {
        try {
            updateData.staffRank = props.changeStaffRank(updateData.staffRank);
            updateData.hno = props.changeWorkplace(updateData.hno);
            console.log("확인 체크");
            console.log(updateData);
            const response = await axios.put("http://localhost:8081/staff", updateData);
            console.log(response.data);
            if(response.data == true) {
                alert("수정 성공");
                props.staffFindAll();
                props.onClose();
            } else {
                alert("수정 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    console.log(updateData);

    return (
        <>
            <Divider />
            <table style={{padding : "20px", textAlign : "start"}}>
                <tbody>
                    <tr>
                        <td>비밀번호 : </td>
                        <td><Input variant="outlined" size="md" name="password" placeholder="••••••" value={updateData.password} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>이 름 : </td>
                        <td><Input variant="outlined" size="md" name="name" placeholder="" value={updateData.name} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>전화번호 : </td>
                        <td><Input variant="outlined" size="md" name="phone" placeholder="010-XXXX-XXXX" value={updateData.phone} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>주 소 : </td>
                        <td><Input variant="outlined" size="md" name="address" placeholder="서울 강남구..." value={updateData.address} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>입사일 : </td>
                        <td><Input variant="outlined" size="md" name="startDate" placeholder="20XX-XX-XX" value={updateData.startDate} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>직급 : </td>
                        <td><Input variant="outlined" size="md" name="staffRank" placeholder="" value={updateData.staffRank} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>연봉(만원) : </td>
                        <td><Input variant="outlined" size="md" name="salary" placeholder="3200" value={updateData.salary} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>근무지 : </td>
                        <td><Input variant="outlined" size="md" name="hno" placeholder="○○점" value={updateData.hno} onChange={chageInput} /></td>
                    </tr>
                </tbody>
            </table>
            <Divider />
            <div style={{textAlign : "end", paddingTop : "15px"}}>
                <Button variant="contained" type="button" onClick={staffInfoUpdate}>수정</Button>
            </div>
        </>
    );
}