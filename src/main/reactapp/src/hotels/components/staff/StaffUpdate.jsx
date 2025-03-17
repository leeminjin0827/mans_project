import { Divider, Input, Option, Select } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";



export default function StaffUpdate(props) {

    // 부모컨포넌트로부터 받은 값
    const info = props.staffUpdate;
    // 직급 관리 배열
    const [rankList, setRankList] = useState([0, 1, 2]);
    // 새로운 직급
    const [newRank, setNewRank] = useState(props.changeStaffRank(info.staffRank));
    // 근무지 관련 배열
    const [workplaceList, setWorkplaceList] = useState([]);
    // 새로운 근무지
    const [newWorkplace, setNewWorkplace] = useState(props.changeWorkplace(info.hno));
    // 근무지 정보 가져오기
    useEffect(() => {getWorkplace();}, []);
    // 사진 관리
    const [newPhoto, setNewPhoto] = useState(null);

    // 입력값 관련 코드
    const [updateData, setUpdateData] = useState({
        staffNumber : info.staffNumber, password : info.password, name : info.name,
        phone : info.phone, address : info.address, startDate : info.startDate,
        staffRank : info.staffRank, salary : info.salary, hno : info.hno
    });
    const changeInput = (event) => {
        setUpdateData({...updateData, [event.target.name] : event.target.value});
    }
    const changeFile = (event) => {
        setNewPhoto(event.target.files[0]);
    }

    /** 직원 정보 수정 */
    const staffInfoUpdate = async () => {
        if(newPhoto != null) {
            const formData = new FormData();
            formData.append("file", newPhoto);
            formData.append("staffNumber", updateData.staffNumber);
            const header = {headers : {"Content-Type" : "multipart/form-data"}};
            try {
                const response1 = await axios.post("http://localhost:8081/api/file/staff/upload", formData, header);
                console.log(response1.data);
                if(response1.data) {
                    console.log("사진 저장 성공");
                } else {
                    alert("사진 수정 실패");
                    return;
                }
            } catch(e) {
                console.log(e);
                return;
            }
        }
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
    console.log(updateData);
    console.log(newPhoto);

    return (
        <>
            <Divider />
            <table style={{padding : "20px", textAlign : "start"}}>
                <tbody>
                    <tr>
                        <td>비밀번호 : </td>
                        <td><Input variant="outlined" size="md" name="password" placeholder="••••••" value={updateData.password} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>이 름 : </td>
                        <td><Input variant="outlined" size="md" name="name" placeholder="" value={updateData.name} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>전화번호 : </td>
                        <td><Input variant="outlined" size="md" name="phone" placeholder="010-XXXX-XXXX" value={updateData.phone} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>주 소 : </td>
                        <td><Input variant="outlined" size="md" name="address" placeholder="서울 강남구..." value={updateData.address} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>입사일 : </td>
                        <td><Input variant="outlined" size="md" name="startDate" placeholder="20XX-XX-XX" value={updateData.startDate} onChange={changeInput} /></td>
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
                        <td><Input variant="outlined" size="md" name="salary" placeholder="3200" value={updateData.salary} onChange={changeInput} /></td>
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
                    <tr>
                        <td colSpan={"2"}>사진 변경</td>
                    </tr>
                    <tr>
                        <td colSpan={"2"}>
                            <Input type="file" name="myPhoto" onChange={changeFile} sx={{marginTop : "5px", padding : "5px"}} />
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