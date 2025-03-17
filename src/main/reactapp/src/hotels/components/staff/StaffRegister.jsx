import { useState } from "react";
import { Button } from "@mui/material";
import { Divider, Input } from "@mui/joy";
import axios from "axios";



export default function StaffRegister(props) {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    const day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    console.log(`${year}-${month}-${day}`);

    const [staffInfo, setStaffInfo] = useState(
        {id : "", name : "", phone : "", address : "", startDate : `${year}-${month}-${day}`, salary : "", hno : "1", myPhoto : "default.jpg"}
    );
    const changeData = (event) => {
        setStaffInfo({...staffInfo, [event.target.name] : event.target.value});
    }
    const register = async () => {
        try {
            const response = await axios.post("http://localhost:8081/staff", staffInfo);
            console.log(response.data);
            if(response.data == true) {
                alert("등록 성공");
                setStaffInfo({id : "", name : "", phone : "", address : "", startDate : `${year}-${month}-${day}`, salary : "", hno : "0", myPhoto : "default.jpg"});
                props.staffFindAll();
                props.onClose(false);
            } else {
                alert("등록 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    console.log(staffInfo);

    return (
        <>  
            <div>
                <Divider />
                <table style={{padding : "20px", textAlign : "center"}}>
                    <tbody>
                        <tr>
                            <td>아이디 : </td>
                            {/* <td><input type="text" name="id" value={staffInfo.id} placeholder="hotelsXXXX" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="id" value={staffInfo.id} placeholder="hotelsXXXX" onChange={changeData} /></td>
                        </tr>
                        <tr>
                            <td>이 름 : </td>
                            {/* <td><input type="text" name="name" value={staffInfo.name} placeholder="홍길동" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="name" value={staffInfo.name} placeholder="홍길동" onChange={changeData} /></td>
                        </tr>
                        <tr>
                            <td>전화번호 : </td>
                            {/* <td><input type="text" name="phone" value={staffInfo.phone} placeholder="010-XXXX-XXXX" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="phone" value={staffInfo.phone} placeholder="010-XXXX-XXXX" onChange={changeData} /></td>
                        </tr>
                        <tr>
                            <td>주 소 : </td>
                            {/* <td><input type="text" name="address" value={staffInfo.address} placeholder="서울 강남구" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="address" value={staffInfo.address} placeholder="서울 강남구" onChange={changeData} /></td>
                        </tr>
                        <tr>
                            <td>입사일 : </td>
                            {/* <td><input type="text" name="startDate" value={staffInfo.startDate} placeholder="20XX-XX-XX" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="startDate" value={staffInfo.startDate} placeholder="20XX-XX-XX" onChange={changeData} /></td>
                        </tr>
                        <tr>
                            <td>연 봉 : </td>
                            {/* <td><input type="text" name="salary" value={staffInfo.salary} placeholder="만원단위작성" onChange={changeData} /></td> */}
                            <td><Input variant="outlined" type="text" name="salary" value={staffInfo.salary} placeholder="만원단위작성" onChange={changeData} /></td>
                        </tr>
                    </tbody>
                </table>
                <Divider />
                <div style={{textAlign : "end", paddingTop : "15px"}}>
                    <Button variant="contained" type="button" onClick={register}>등록</Button>
                </div>
            </div>
        </>
    );
}