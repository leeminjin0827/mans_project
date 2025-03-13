import { useState } from "react";
import Sidebar from "../Sidebar";



export default function StaffRegister(props) {

    const [staffInfo, setStaffInfo] = useState(
        {id : "", name : "", phone : "", address : "", startDate : "2025-03-10", salary : ""}
    );
    const changeData = (event) => {
        setStaffInfo({...staffInfo, [event.target.name] : event.target.value});
    }
    const register = async (event) => {
        try {
            const response = await axios.post("http://localhost:8081/staff", staffInfo);
            console.log(response.data);
            if(response.data == true) {
                alert("등록 성공");
                setStaffInfo({id : "", name : "", phone : "", address : "", startDate : "2025-03-10", salary : ""});
                staffFindAll();
            } else {
                alert("등록 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>  
            <Sidebar />
            <div className="mainBox">
                <h1>직원 등록</h1>
                <form>
                    <span>아이디 : </span>
                    <input type="text" name="id" value={staffInfo.id} placeholder="hotels" onChange={changeData} /><br/>
                    <span>이름 : </span>
                    <input type="text" name="name" value={staffInfo.name} placeholder="홍길동" onChange={changeData} /><br/>
                    <span>전화번호 : </span>
                    <input type="text" name="phone" value={staffInfo.phone} placeholder="010-XXXX-XXXX" onChange={changeData} /><br/>
                    <span>주소 : </span>
                    <input type="text" name="address" value={staffInfo.address} placeholder="서울 강남구" onChange={changeData} /><br/>
                    <span>입사일 : </span>
                    <input type="text" name="startDate" value={staffInfo.startDate} placeholder="20XX-XX-XX" onChange={changeData} /><br/>
                    <span>연봉 : </span>
                    <input type="text" name="salary" value={staffInfo.salary} placeholder="만원단위작성" onChange={changeData} /><br/>
                    <button type="button" onClick={register}>등록</button>
                </form>
            </div>
        </>
    );
}