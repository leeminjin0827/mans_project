import { Divider, Input, Option, Select } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";



export default function StaffUpdate(props) {

    // 직급 관리 배열
    const [rankList, setRankList] = useState([0, 1, 2]);
    // 새로운 직급
    const [newRank, setNewRank] = useState(0);
    // 근무지 관련 배열
    const [workplaceList, setWorkplaceList] = useState([]);
    // 새로운 근무지
    const [newWorkplace, setNewWorkplace] = useState(0);
    // 근무지 정보 가져오기
    useEffect(() => {getWorkplace();}, []);
    // 부모컨포넌트로부터 받은 값
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

    /** 직원 정보 수정 */
    const staffInfoUpdate = async () => {
        try {
            updateData.staffRank = newRank;
            updateData.hno = newWorkplace;
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

    /** 지점정보 가져오는 코드 */
    const getWorkplace = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/director`);
            console.log(response.data);
            for(let index = 0; index < response.data.length; index++) {
                workplaceList[index] = response.data[index].hno;
            }
            setWorkplaceList([...workplaceList]);
        } catch(e) {
            console.log(e);
        }
    }

    // console.log(updateData);
    // console.log(newRank);
    console.log(workplaceList);

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
                        <td>
                            <Select 
                                defaultValue={props.changeStaffRank(updateData.staffRank)} 
                                onChange={(event, newValue) => {setNewRank(newValue);}} 
                                slotProps={{listbox : {sx : { zIndex: 1300 }}}}
                                name="staffRank"
                            >
                                {
                                    rankList.map((rank, index) => {
                                        return (
                                            <Option key={index} value={rank}>{props.changeStaffRank(rank)}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>연봉(만원) : </td>
                        <td><Input variant="outlined" size="md" name="salary" placeholder="3200" value={updateData.salary} onChange={chageInput} /></td>
                    </tr>
                    <tr>
                        <td>근무지 : </td>
                        <td>
                            <Select 
                                defaultValue={props.changeWorkplace(updateData.hno)} 
                                onChange={(event, newValue) => {setNewWorkplace(newValue);}} 
                                slotProps={{listbox : {sx : { zIndex: 1300 }}}}
                                name="hno"
                            >
                                {
                                    workplaceList.map((workplace, index) => {
                                        return (
                                            <Option key={index+1} value={workplace}>{props.changeWorkplace(workplace)}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </td>
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