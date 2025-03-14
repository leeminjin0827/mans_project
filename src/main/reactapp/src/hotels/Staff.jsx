import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StaticModal from "./components/StaticModal";
import StaffRegister from "./components/staff/StaffRegister";
import StaffUpdate from "./components/staff/StaffUpdate";


export default function StaffPage(props) {

    /** 페이지 이동 관련 코드 */
    const navigate = useNavigate();

    // 모달창 관련 코드
    const [openModal, setOpenModal] = useState(false);
    // 수정 모달창 관련 코드
    const [updateModal, setUpdateModal] = useState(false);

    // 출력 관련 state
    useEffect(() => {staffFindAll()}, []);
    const [staffInfoList, setStaffInfoList] = useState([]);
    const staffFindAll = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff");
            // console.log(response.data);
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
    // useEffect(() => {if(staffUpdate.staffNumber) {console.log(staffUpdate.staffNumber); staffInfoUpdate();}}, [staffUpdate]);
    // const newStaffInfo = (event, info) => {
    //     let newPassword = prompt(`현재 비밀번호 : ${info.password}`, info.password);
    //     let newName = prompt(`현재 이름 : ${info.name}`, info.name);
    //     let newPhone = prompt(`현재 전화번호 : ${info.phone}`, info.phone);
    //     let newAddress = prompt(`현재 주소 : ${info.address}`, info.address);
    //     let newStartDate = prompt(`현재 입사일 : ${info.startDate}`, info.startDate);
    //     let newStaffRank = prompt(`현재 직급 : ${changeStaffRank(info.staffRank)}`, changeStaffRank(info.staffRank));
    //     let newSalary = prompt(`현재 연봉 : ${info.salary}`, info.salary);
    //     let newHno = prompt(`현재 근무지 : ${changeWorkplace(info.hno)}`, changeWorkplace(info.hno));

    //     alert(
    //         `
    //         newPassword : ${newPassword}\n
    //         newName : ${newName}\n
    //         newPhone :${newPhone}\n
    //         newAddress : ${newAddress}\n
    //         newStartDate : ${newStartDate}\n
    //         newStaffRank : ${newStaffRank}\n
    //         newSalary : ${newSalary}\n
    //         newHno : ${newHno}
    //         `
    //     );


    //     newStaffRank = changeStaffRank(newStaffRank);
    //     alert(newStaffRank);
    //     newHno = changeWorkplace(newHno);
    //     alert(newHno);

    //     setStaffUpdate(
    //         {
    //             ...staffUpdate, 
    //             staffNumber : info.staffNumber, 
    //             password : newPassword, 
    //             name : newName, 
    //             phone : newPhone, 
    //             address : newAddress, 
    //             startDate : newStartDate, 
    //             staffRank : newStaffRank, 
    //             salary : newSalary, 
    //             hno : newHno
    //         }
    //     );
    // }

    // 추가 중
    // 수정 모달창 관련
    const openUpdateModal = (staffNumber) => {
        for(let index = 0; index < staffInfoList.length; index++) {
            let list = staffInfoList[index];
            if(staffNumber == list.staffNumber) {
                staffUpdate.staffNumber = list.staffNumber;
                staffUpdate.password = list.password;
                staffUpdate.name = list.name;
                staffUpdate.phone = list.phone;
                staffUpdate.address = list.address;
                staffUpdate.startDate = list.startDate;
                staffUpdate.staffRank = changeStaffRank(list.staffRank);
                staffUpdate.salary = list.salary;
                staffUpdate.hno = changeWorkplace(list.hno);
            }
        }
        setUpdateModal(true);
    }
    // 추가 중

    // 직원 정보 수정
    // const staffInfoUpdate = async () => {
    //     try {
    //         console.log("확인 체크");
    //         console.log(staffUpdate);
    //         const response = await axios.put("http://localhost:8081/staff", staffUpdate);
    //         console.log(response.data);
    //         if(response.data == true) {
    //             alert("수정 성공");
    //             staffFindAll();
    //         } else {
    //             alert("수정 실패");
    //         }
    //     } catch(e) {
    //         console.log(e);
    //     }
    // }

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

    // console.log(staffUpdate);
    // console.log(selectOption);

    // 치환 관련 코드
    /** 직급 관련 함수 */
    const changeStaffRank = (staffRank) => {
        let type = typeof staffRank;
        let result;
        if(type === "number") {
            switch(staffRank) {
                case 0:
                    result = "관리자";
                    break;
                case 1:
                    result = "지배인";
                    break;
                case 2:
                    result = "사원";
                    break;
            }
        } else if(type === "string") {
            switch(staffRank) {
                case "관리자" :
                    result = 0;
                    break;
                case "지배인" :
                    result = 1;
                    break;
                case "사원" :
                    result = 2;
                    break;
            }
        }
        return result;
    }

    /** 근무지 관련 함수 */
    const changeWorkplace = (hno) => {
        let type = typeof hno;
        let result;
        if(type === "number") {
            switch(hno) {
                case 1:
                    result = "강남점";
                    break;
                case 2:
                    result = "중구점";
                    break;
                case 3:
                    result = "부평점";
                    break;
            }
        } else if(type === "string") {
            switch(hno) {
                case "강남점":
                    result = 1;
                    break;
                case "중구점":
                    result = 2;
                    break;
                case "부평점":
                    result = 3;
                    break;
            }
        }
        return result;
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

    return (
        <>
            <Sidebar />
            <div className="mainBox">
                <div style={{width : "100%"}}>
                    <h1>직원 관리</h1>
                    <div style={{ padding : "0px 10px",display : "flex", justifyContent : "end"}}>
                        <select value={selectOption} onChange={changeOption} style={{marginRight : "50px"}}>
                            <option value={"0"}>전체</option>
                            <option value={"1"}>강남점</option>
                            <option value={"2"}>중구점</option>
                            <option value={"3"}>부평점</option>
                        </select>
                        <Button variant="contained" onClick={() => {setOpenModal(true)}}>직원 등록</Button>
                    </div>
                    <br/>
                    <table border={"1"} style={{width : "100%", textAlign : "center"}}>
                        <thead>
                            <tr>
                                <td>직원 번호</td><td>아이디</td><td>비밀번호</td>
                                <td>이름</td><td>전화번호</td><td>주소</td>
                                <td>입사일</td><td>퇴사일</td><td>직급</td>
                                <td>연봉(만원)</td><td>근무지</td><td>퇴사 상태</td>
                                <td>비고</td>
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
                                            <td>{changeStaffRank(info.staffRank)}</td>
                                            <td>{info.salary}</td>
                                            <td>{changeWorkplace(info.hno)}</td>
                                            <td>{changeResignationToString(info.resignation)}</td>
                                            <td style={{padding : "10px", display : "flex", justifyContent : "space-evenly"}}>
                                                <Button variant="contained" type="button" onClick={() => {openUpdateModal(info.staffNumber);}}>수정</Button>
                                                <Button variant="contained" type="button" onClick={(event) => {resignationStaff(event, info.staffNumber);}}>퇴사</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* 직원 등록 관련 모달 */}
                <StaticModal 
                    isOpen={openModal}
                    title={"직원 등록"}
                    openData={<StaffRegister staffFindAll={staffFindAll} onClose={() => setOpenModal(false)} />}
                    onClose={()=> {setOpenModal(false)}}
                    staffFindAll={staffFindAll}
                />
                {/* 직원 수정 관련 모달 */}
                <StaticModal 
                    isOpen={updateModal}
                    title={"직원 정보 수정"}
                    openData={
                        <StaffUpdate 
                            staffFindAll={staffFindAll} 
                            onClose={() => setUpdateModal(false)} 
                            staffUpdate={staffUpdate} 
                            changeStaffRank={changeStaffRank} 
                            changeWorkplace={changeWorkplace}
                        />
                    }
                    onClose={()=> {setUpdateModal(false)}}
                    staffFindAll={staffFindAll}
                />
            </div>
        </>
    );
}
