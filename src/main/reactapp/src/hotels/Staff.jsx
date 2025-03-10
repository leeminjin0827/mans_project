import { useEffect, useState } from "react";
import axios from "axios";


export default function StaffPage(props) {

    // 등록 관련 state
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
        } catch(e) {
            console.log(e);
        }
    }

    // 출력 관련 state
    useEffect(() => {staffFindAll()}, []);
    const [staffInfoList, setStaffInfoList] = useState([]);
    const staffFindAll = async (event) => {
        try {
            const response = await axios.get("http://localhost:8081/staff");
            console.log(response.data);
            setStaffInfoList(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    // 수정 관련 state
    const [staffUpdate, setStaffUpdate] = useState(
        {staffNumber : "", password : "", name : "", phone : "", address : "", startDate : "", staffRank : "", salary : "", hno : ""}
    );
    const staffInfoUpdate = (event, staffNumber) => {
        let password = prompt("비밀번호 : ", document.querySelector(`#StaffNumber${staffNumber}`));
    }

    // input 출력 테스트
    console.log(staffInfo);

    return (
        <>
            <h1>직원 등록</h1>
            <form>
                <span>아이디 : </span>
                <input type="text" name="id" value={staffInfo.id} onChange={changeData} /><br/>
                <span>이름 : </span>
                <input type="text" name="name" value={staffInfo.name} onChange={changeData} /><br/>
                <span>전화번호 : </span>
                <input type="text" name="phone" value={staffInfo.phone} onChange={changeData} /><br/>
                <span>주소 : </span>
                <input type="text" name="address" value={staffInfo.address} onChange={changeData} /><br/>
                <span>입사일 : </span>
                <input type="text" name="startDate" value={staffInfo.startDate} onChange={changeData} /><br/>
                <span>연봉 : </span>
                <input type="text" name="salary" value={staffInfo.salary} onChange={changeData} /><br/>
                <button type="button" onClick={register}>등록</button>
            </form>
            <br/><hr/><br/>
            <div>
                <h1>직원 전체 출력</h1>
                <table border={"1"}>
                    <thead>
                        <tr>
                            <td>직원 번호</td><td>아이디</td><td>비밀번호</td>
                            <td>이름</td><td>전화번호</td><td>주소</td>
                            <td>입사일</td><td>퇴사일</td><td>직급</td>
                            <td>연봉(만원)</td><td>지점 번호</td><td>퇴사 상태</td>
                            <td>비고(근무 : 0, 퇴사 : 1)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffInfoList.map((info, index) => {
                                return (
                                    <tr key={index}>
                                        <td id={"staffNumber" + info.staffNumber}>{info.staffNumber}</td>
                                        <td>{info.id}</td>
                                        <td>{info.password}</td>
                                        <td>{info.name}</td>
                                        <td>{info.phone}</td>
                                        <td>{info.address}</td>
                                        <td>{info.startDate}</td>
                                        <td>{info.endDate}</td>
                                        <td>{info.staffRank == 0 ? "관리자" : info.staffRank == 1 ? "지배인" : "사원"}</td>
                                        <td>{info.salary}</td>
                                        <td>{info.hno == 1 ? "강남점" : info.hno == 2 ? "중구점" : "부평점"}</td>
                                        <td>{info.resignation == 0 ? "근무" : "퇴사"}</td>
                                        <td>
                                            <button type="button" onClick={(event) => {staffInfoUpdate(event, info.staffNumber);}}>수정</button>
                                            <button type="button">퇴사</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}