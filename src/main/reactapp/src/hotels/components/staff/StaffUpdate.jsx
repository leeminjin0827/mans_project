import { Divider, Input, Option, Select } from "@mui/joy";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
// 임시 추가
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";



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
    // 사진 관리 (파일 객체)
    const [newPhoto, setNewPhoto] = useState(null);
    // 사진 미리보기(바이너리)
    const [preview, setPreview] = useState(null);

    // 입력값 관련 코드
    const [updateData, setUpdateData] = useState({
        staffNumber : info.staffNumber, password : info.password, name : info.name,
        phone : info.phone, address1 : info.address1, address3 : info.address3, startDate : info.startDate,
        staffRank : info.staffRank, salary : info.salary, hno : info.hno
    });
    const changeInput = (event) => {
        setUpdateData({...updateData, [event.target.name] : event.target.value});
    }
    const changeFile = (event) => {
        const file = event.target.files[0];
        setNewPhoto(file);
        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                // console.log(reader.result);
                setPreview(reader.result);
            }
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
        
    }

    /** 직원 정보 수정 */
    const staffInfoUpdate = async () => {
        updateData.staffRank = newRank;
        updateData.hno = newWorkplace;
        const formData = new FormData();
        formData.append("staffNumber", updateData.staffNumber);
        formData.append("password", updateData.password);
        formData.append("name", updateData.name);
        formData.append("phone", updateData.phone);
        formData.append("address1", address);
        formData.append("address2", updateData.address2);
        formData.append("address3", updateData.address3);
        formData.append("startDate", updateData.startDate);
        formData.append("staffRank", updateData.staffRank);
        formData.append("salary", updateData.salary);
        formData.append("hno", updateData.hno);
        if(newPhoto) {
            formData.append("uploadFile", newPhoto);
        }
        const header = {headers : {"Content-Type" : "multipart/form-data"}};
        console.log("실행2222");
        // FormData에 데이터 들어갔는지 확인하는 부분
        for (const x of formData.entries()) {
            console.log(x);
        };
        // FormData에 데이터 들어갔는지 확인하는 부분
        try {
            const response = await axios.put("http://localhost:8081/staff", formData, header);
            console.log(response.data);
            if(response.data) {
                alert("수정 성공");
                props.staffFindAll();
                props.onClose(false);
            } else {
                alert("수정 실패");
                return
            }
        } catch(e) {
            console.log(e);
            return;
        }
        if(newPhoto != null) {
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

    // 임시 추가
    const [address, setAddress] = useState("");
    const [zonecode, setZonecode] = useState("");
    useEffect(() => {
        const messageHandler = (event) => {
            console.log("자식 창에서 받은 메시지 : ", event.data);
            console.log(event.data.message.address);
            console.log(event.data.message.zonecode);
            setAddress(event.data.message.address);
            setZonecode(event.data.message.zonecode);
        }
        window.addEventListener("message", messageHandler);

        return () => {
            window.removeEventListener("message", messageHandler);
        }
    }, []);

    const tempp = (event) => {
        console.log(event.target.value);
        setAddress(event.target.value);
    }

    return (
        <>
        <div style={{maxHeight : "70vh", overflowY : "auto"}}>
            <Divider style={{margin : "0px 15px"}} />
            <table style={{padding : "20px", textAlign : "start"}}>
                <tbody>
                    <tr>
                        <td>비밀번호 : </td>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="password" placeholder="••••••" value={updateData.password} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>이 름 : </td>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="name" placeholder="" value={updateData.name} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>전화번호 : </td>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="phone" placeholder="010-XXXX-XXXX" value={updateData.phone} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td rowSpan={"2"} style={{paddingTop : "5px", alignContent : "start"}}>주 소 : </td>
                        <td><Input variant="outlined" size="md" name="address3" readOnly placeholder="우편주소" value={zonecode} /></td>
                        <td>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    window.open(
                                                "/address", 
                                                "_blank", `
                                                width=500,
                                                height=600,
                                                left=${window.screenX + (window.outerWidth - 500) / 2},
                                                top=${window.screenY + (window.outerHeight - 600) / 2}
                                            `
                                        )}
                                }
                            >
                                찾기
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="address1" placeholder="도로명주소" value={address} onChange={tempp} /></td>
                    </tr>
                    <tr>
                        <td>상세주소 : </td>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="address2" placeholder="상세주소" value={updateData.address} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>입사일 : </td>
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="startDate" placeholder="20XX-XX-XX" value={updateData.startDate} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>직급 : </td>
                        <td colSpan={"2"}>
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
                        <td colSpan={"2"}><Input variant="outlined" size="md" name="salary" placeholder="3200" value={updateData.salary} onChange={changeInput} /></td>
                    </tr>
                    <tr>
                        <td>근무지 : </td>
                        <td colSpan={"2"}>
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
                        <td colSpan={"3"}>사진 변경</td>
                    </tr>
                    <tr>
                        <td colSpan={"3"}>
                            <Input type="file" name="myPhoto" onChange={changeFile} slotProps={{ input: { accept: "image/*" } }}  sx={{marginTop : "5px", padding : "5px"}} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{textAlign : "center", width : "100%"}}>
                <FormControl component="fieldset" sx={{width : "80%", minHeight : "200px", padding : "10px", textAlign : "center", border : "solid 1px black", borderRadius : "10px"}}>
                    <FormLabel component="legend" sx={{padding : "0px 10px", textAlign : "center"}}>미리보기</FormLabel>
                    <div style={{textAlign : "center"}}>
                    {
                        preview && (<img src={preview} style ={{width : 200, border : "solid 1px grey", borderRadius : "10px", boxShadow : "4px 4px 4px grey"}} />)
                    }
                    </div>
                </FormControl>
            </div>
            <br/>
            <Divider style={{margin : "0px 15px"}} />
            <div style={{textAlign : "end", paddingTop : "15px", paddingRight : "15px", marginBottom : "15px"}}>
                <Button variant="contained" type="button" onClick={staffInfoUpdate}>수정</Button>
            </div>
        </div>
        </>
    );
}