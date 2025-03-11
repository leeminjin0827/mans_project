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
    // 생명주기, 의존성, staffNumber값이 true일때 실행
    useEffect(() => {if(staffUpdate.staffNumber) {console.log(staffUpdate.staffNumber); staffInfoUpdate();}}, [staffUpdate]);
    const newStaffInfo = (event, info) => {
        let newPassword = prompt(`현재 비밀번호 : ${info.password}`, info.password);
        let newName = prompt(`현재 이름 : ${info.name}`, info.name);
        let newPhone = prompt(`현재 전화번호 : ${info.phone}`, info.phone);
        let newAddress = prompt(`현재 주소 : ${info.address}`, info.address);
        let newStartDate = prompt(`현재 입사일 : ${info.startDate}`, info.startDate);
        let newStaffRank = prompt(`현재 직급 : ${changeRankToString(info.staffRank)}`, changeRankToString(info.staffRank));
        let newSalary = prompt(`현재 연봉 : ${info.salary}`, info.salary);
        let newHno = prompt(`현재 근무지 : ${changeHnoToString(info.hno)}`, changeHnoToString(info.hno));

        alert(
            `
            newPassword : ${newPassword}\n
            newName : ${newName}\n
            newPhone :${newPhone}\n
            newAddress : ${newAddress}\n
            newStartDate : ${newStartDate}\n
            newStaffRank : ${newStaffRank}\n
            newSalary : ${newSalary}\n
            newHno : ${newHno}
            `
        );

        newStaffRank = changeRankToInt(newStaffRank);
        alert(newStaffRank);
        newHno = changeHnoToInt(newHno);
        alert(newHno);

        setStaffUpdate(
            {
                ...staffUpdate, 
                staffNumber : info.staffNumber, 
                password : newPassword, 
                name : newName, 
                phone : newPhone, 
                address : newAddress, 
                startDate : newStartDate, 
                staffRank : newStaffRank, 
                salary : newSalary, 
                hno : newHno
            }
        );
    }
    // 직원 정보 수정
    const staffInfoUpdate = async () => {
        try {
            console.log("확인 체크");
            console.log(staffUpdate);
            const response = await axios.put("http://localhost:8081/staff", staffUpdate);
            console.log(response.data);
            if(response.data == true) {
                alert("수정 성공");
                staffFindAll();
            } else {
                alert("수정 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    // 퇴사 관련 state
    const [staffDelete, setStaffDelete] = useState({endDate : "", resignation : ""});
    const resignationStaff = async (event, staffNumber) => {
        const state = confirm("정말 퇴사 처리하시겠습니까?");
        if(state) {
            let today = new Date();
            let now = `${today.getFullYear()}-${today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;
            let endDate = prompt(`퇴사일 작성(현재날짜) : ${now}`, now);
            try {
                const response = await axios.delete(`http://localhost:8081/staff?staff_number=${staffNumber}&end_date=${endDate}`);
                console.log(response.data);
                if(response.data == true) {
                    alert("퇴사 처리 완료");
                    staffFindAll();
                } else {
                    alert("퇴사 처리 실패");
                }
            } catch(e) {
                console.log(e);
            }
        }
    }

    // 지점별 조회 관련 state
    const [selectOption, setSelectOption] = useState("0");
    useEffect(() => {}, [selectOption]);
    const changeOption = (event) => {
        setSelectOption(event.target.value);
        if(event.target.value == 0) {
            staffFindAll();
        } else {
            staffFindDetail(event.target.value);
        }
    }
    const staffFindDetail = async (number) => {
        try {
            const response = await axios.get(`http://localhost:8081/staff/detail?hno=${number}`);
            console.log(response.data);
            setStaffInfoList(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    // input 출력 테스트
    console.log(staffInfo);
    // console.log(staffUpdate);
    console.log(selectOption);

    // 중복되는 함수
    // 직급을 문자열로 변환
    const changeRankToString = (staffRank) => {
        let str;
        switch(staffRank) {
            case 0:
                str = "관리자";
                break;
            case 1:
                str = "지배인";
                break;
            case 2:
                str = "사원";
                break;
        }
        return str;
    }
    // 직급을 숫자로 변환
    const changeRankToInt = (staffRank) => {
        let int;
        switch(staffRank) {
            case "관리자" :
                int = 0;
                break;
            case "지배인" :
                int = 1;
                break;
            case "사원" :
                int = 2;
                break;
        }
        return int;
    }
    // 근무지를 문자열로 변환
    const changeHnoToString = (hno) => {
        let str;
        switch(hno) {
            case 1:
                str = "강남점";
                break;
            case 2:
                str = "중구점";
                break;
            case 3:
                str = "부평점";
                break;
        }
        return str;
    }
    // 근무지를 숫자로 변환
    const changeHnoToInt = (hno) => {
        let int;
        switch(hno) {
            case "강남점":
                int = 1;
                break;
            case "중구점":
                int = 2;
                break;
            case "부평점":
                int = 3;
                break;
        }
        return int;
    }
    // 퇴사 상태를 문자열로 변환
    const changeResignationToString = (resignation) => {
        let str;
        switch(resignation) {
            case 0 :
                str = "근무";
                break;
            case 1:
                str = "퇴사";
                break;
        }
        return str;
    }
    // 퇴사 상태를 숫자로 변환
    const changeResignationToInt = (resignation) => {
        let int;
        switch(resignation) {
            case "근무" :
                int = 0;
                break;
            case "퇴사" :
                int = 1;
                break;
        }
        return int;
    }

    return (
        <>
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
            <br/><hr/><br/>
            <div>
                <h1>직원 전체 출력</h1>
                <select value={selectOption} onChange={changeOption}>
                    <option value={"0"}>전체</option>
                    <option value={"1"}>강남점</option>
                    <option value={"2"}>중구점</option>
                    <option value={"3"}>부평점</option>
                </select>
                <br/>
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
                                        <td>{changeRankToString(info.staffRank)}</td>
                                        <td>{info.salary}</td>
                                        <td>{changeHnoToString(info.hno)}</td>
                                        <td>{changeResignationToString(info.resignation)}</td>
                                        <td>
                                            <button type="button" onClick={(event) => {newStaffInfo(event, info);}}>수정</button>
                                            <button type="button" onClick={(event) => {resignationStaff(event, info.staffNumber);}}>퇴사</button>
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
