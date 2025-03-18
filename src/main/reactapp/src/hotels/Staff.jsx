import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Box, Button } from "@mui/material";
import { Table } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import StaticModal from "./components/StaticModal";
import StaffRegister from "./components/staff/StaffRegister";
import StaffUpdate from "./components/staff/StaffUpdate";
import StaffDetail from "./components/staff/StaffDetail";


export default function StaffPage(props) {

    /** 페이지 이동 관련 코드 */
    const navigate = useNavigate();

    // 등록 모달창 관련 코드
    const [openModal, setOpenModal] = useState(false);
    // 수정 모달창 관련 코드
    const [updateModal, setUpdateModal] = useState(false);
    // 상세보기 모달창 관련 코드
    const [detailModal, setDetailModal] = useState(false);

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
    const [staffUpdate, setStaffUpdate] = useState({
        staffNumber : "", id : "", password : "", 
        name : "", phone : "", address : "", 
        startDate : "", endDate : "", staffRank : "", 
        salary : "", hno : "", resignation : "", myPhoto : ""
    });
    // 추가 중
    /** 수정 모달창 관련 */
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
    /** 상세보기 모달창 관련 */
    const openDetalModal = (staffNumber) => {
        for(let index = 0; index < staffInfoList.length; index++) {
            let list = staffInfoList[index];
            if(staffNumber == list.staffNumber) {
                staffUpdate.staffNumber = list.staffNumber;
                staffUpdate.id = list.id;
                staffUpdate.password = list.password;
                staffUpdate.name = list.name;
                staffUpdate.phone = list.phone;
                staffUpdate.address = list.address;
                staffUpdate.startDate = list.startDate;
                staffUpdate.endDate = list.endDate;
                staffUpdate.staffRank = changeStaffRank(list.staffRank);
                staffUpdate.salary = list.salary;
                staffUpdate.hno = changeWorkplace(list.hno);
                staffUpdate.resignation = list.resignation;
            }
        }
        setDetailModal(true);
    }
    // 추가 중

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
                    <div style={{ padding : "0px 10px", display : "flex", justifyContent : "end"}}>
                        <select value={selectOption} onChange={changeOption} style={{marginRight : "50px", width : "7%", textAlign : "center"}}>
                            <option value={"0"}>전체</option>
                            <option value={"1"}>강남점</option>
                            <option value={"2"}>중구점</option>
                            <option value={"3"}>부평점</option>
                        </select>
                        <Button variant="contained" onClick={() => {setOpenModal(true)}}>직원 등록</Button>
                    </div>
                    <br/> {/* overflow: "auto", */}
                    <Box sx={{ maxWidth: "100%" }}>
                        <Table id="staffTable" sx={{tableLayout : "auto"}} style={{width : "100%", textAlign : "center"}}>
                            <thead>
                                <tr>
                                    <th>직원 번호</th>
                                    <th>아이디</th>
                                    {/* <th>비밀번호</th> */}
                                    <th>이름</th>
                                    <th>전화번호</th>
                                    {/* <th>주소</th> */}
                                    <th>입사일</th>
                                    {/* <th>퇴사일</th> */}
                                    <th>직급</th>
                                    {/* <th>연봉(만원)</th> */}
                                    <th>근무지</th>
                                    <th>퇴사 상태</th>
                                    <th>비고</th>
                                </tr>
                            </thead>
                            <tbody border={"1"}>
                                {
                                    staffInfoList.map((info, index) => {
                                        return (
                                            <tr key={index} style={{width : "100%"}}>
                                                <td id={"staffNumber" + info.staffNumber}>{info.staffNumber}</td>
                                                <td><Button variant="text" sx={{textTransform : "none"}} onClick={() => {openDetalModal(info.staffNumber)}}>{info.id}</Button></td>
                                                {/* <td>{info.password}</td> */}
                                                <td>{info.name}</td>
                                                <td>{info.phone}</td>
                                                {/* <td>{info.address}</td> */}
                                                <td>{info.startDate}</td>
                                                {/* <td>{info.endDate}</td> */}
                                                <td>{changeStaffRank(info.staffRank)}</td>
                                                {/* <td>{info.salary}</td> */}
                                                <td>{changeWorkplace(info.hno)}</td>
                                                <td>{changeResignationToString(info.resignation)}</td>
                                                <td style={{width : "100%", padding : "10px", display : "flex", justifyContent : "space-evenly"}}>
                                                    <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem"}} onClick={() => {openUpdateModal(info.staffNumber);}}>수정</Button>
                                                    <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem"}} onClick={(event) => {resignationStaff(event, info.staffNumber);}}>퇴사</Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </Table>
                    </Box>
                </div>
                {/* 직원 등록 관련 모달 */}
                <StaticModal 
                    isOpen={openModal}
                    title={"직원 등록"}
                    openData={
                        <StaffRegister 
                            staffFindAll={staffFindAll} 
                            onClose={() => setOpenModal(false)} 
                        />
                    }
                    onClose={()=> {setOpenModal(false)}}
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
                />
                {/* 직원 상세보기 관련 모달 */}
                <StaticModal 
                    isOpen={detailModal}
                    title={"직원 정보 상세보기"}
                    openData={
                        <StaffDetail 
                            onClose={() => setDetailModal(false)}
                            staffDetail={staffUpdate}
                        />
                    }
                    onClose={() => {setDetailModal(false)}} 
                />
            </div>
        </>
    );
}
