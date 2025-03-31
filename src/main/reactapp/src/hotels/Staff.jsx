import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import { Box, Button } from "@mui/material";
import { Table, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import StaticModal from "./components/StaticModal";
import StaffRegister from "./components/staff/StaffRegister";
import StaffUpdate from "./components/staff/StaffUpdate";
import StaffDetail from "./components/staff/StaffDetail";

import IconButton from '@mui/joy/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export default function StaffPage(props) {

    /** 페이지 이동 관련 코드 */
    const navigate = useNavigate();

    /** 접근 권한 확인 하는 함수 */
    const checkAuthority = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff/authority", {withCredentials : true});
            const result = response.data;
            console.log(`result = ${result}`);
            if(!result) {
                alert("접근 권한이 없습니다.");
                navigate(-1);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // 등록 모달창 관련 코드
    const [openModal, setOpenModal] = useState(false);
    // 수정 모달창 관련 코드
    const [updateModal, setUpdateModal] = useState(false);
    // 상세보기 모달창 관련 코드
    const [detailModal, setDetailModal] = useState(false);

    // 출력 관련 state
    useEffect(() => {
        checkAuthority();
        hnoFindAll();
        staffFindAll();
    }, []);
    const [staffInfoList, setStaffInfoList] = useState([]);
    const staffFindAll = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff");
            console.log(response.data);
            setStaffInfoList(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    // 수정 관련 state
    const [staffUpdate, setStaffUpdate] = useState({
        staffNumber : "", id : "", password : "", name : "", 
        phone : "", address1 : "", address2 : "", address3 : "",
        startDate : "", endDate : "", staffRank : "", salary : "", 
        hno : "", resignation : "", myPhoto : ""
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
                staffUpdate.address1 = list.address1;
                staffUpdate.address2 = list.address2;
                staffUpdate.address3 = list.address3;
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
                staffUpdate.address1 = list.address1;
                staffUpdate.address2 = list.address2;
                staffUpdate.address3 = list.address3;
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
    const resignationStaff = async (staffNumber) => {
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

    // 지점 번호 가져오기
    const [workplace, setWorkplace] = useState([]);
    const hnoFindAll = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/director`);
            const result = response.data;
            console.log(result);
            const temp = [{hno : 0, hname : "전체"}];
            for(let index = 0; index < result.length; index++) {
                temp.push(result[index]);
                // console.log(temp);
            }
            setWorkplace(temp);
        } catch(e) {
            console.log(e);
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

    /** 페이징 처리 관련 */

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    function labelDisplayedRows({ from, to, count }) {
        return `${from} - ${to} of ${count !== -1 ? count : `more than ${to}`}`;
    }
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const getLabelDisplayedRowsTo = () => {
        if (staffInfoList.length === -1) {
          return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
          ? staffInfoList.length
          : Math.min(staffInfoList.length, (page + 1) * rowsPerPage);
    };

    /** 페이징 처리 관련 */

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
    /** 퇴사 상태를 문자열로 변환 */
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
            <div className="commonBox">
                <div> {/*  style={{width : "100%"}} */}
                    {/* <h1>직원 관리</h1> */}
                    <div style={{display : "flex", justifyContent : "end"}}>
                        <select value={selectOption} onChange={changeOption} style={{marginRight : "50px", width : "7%", textAlign : "center", borderRadius : "5px"}}>
                            {
                                workplace.map((value, index) => {
                                    return (
                                        <option key={index} value={value.hno}>{value.hname}</option>
                                    )
                                })
                            }
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
                            <tbody style={{width : "100%"}}>
                                {
                                    staffInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((info, index) => {
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
                                                <td style={{padding : "10px", display : "flex", justifyContent : "space-evenly"}}>
                                                    <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem"}} onClick={() => {openUpdateModal(info.staffNumber);}}>수정</Button>
                                                    <Button variant="contained" type="button"  sx={{width : "5rem", height : "2.5rem"}} onClick={() => {resignationStaff(info.staffNumber);}}>퇴사</Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={9}>
                                        <Box
                                            sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            justifyContent: 'center',
                                            }}
                                        >
                                            
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <IconButton
                                                    size="sm"
                                                    color="neutral"
                                                    variant="outlined"
                                                    disabled={page === 0}
                                                    onClick={() => handleChangePage(page - 1)}
                                                    sx={{ bgcolor: 'background.surface' }}
                                                >
                                                    <KeyboardArrowLeftIcon />
                                                </IconButton>
                                                <Typography sx={{ textAlign : 'center', minWidth : 80, alignContent : "center" }}>
                                                    {
                                                        labelDisplayedRows({ 
                                                            from: staffInfoList.length === 0 ? 0 : page * rowsPerPage + 1, 
                                                            to: getLabelDisplayedRowsTo(), 
                                                            count: staffInfoList.length === -1 ? -1 : staffInfoList.length,
                                                        })
                                                    }
                                                </Typography>
                                                <IconButton
                                                    size="sm"
                                                    color="neutral"
                                                    variant="outlined"
                                                    disabled={
                                                        staffInfoList.length !== -1 ? page >= Math.ceil(staffInfoList.length / rowsPerPage) - 1 : false
                                                    }
                                                    onClick={() => handleChangePage(page + 1)}
                                                    sx={{ bgcolor: 'background.surface' }}
                                                >
                                                    <KeyboardArrowRightIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </td>
                                </tr>
                            </tfoot>
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
