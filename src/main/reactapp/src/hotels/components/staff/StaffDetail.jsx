import { Input } from "@mui/joy";
import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function StaffDetail(props) {

    useEffect(() => {myPhoto();}, []);


    const infoName = ["직원 번호", "아이디", "비밀번호", "이름", "전화번호", "도로명주소", "상세주소", "입사일", "퇴사일", "직급", "연봉", "근무지", "퇴사 유무"];
    const staffInfo = ["staffNumber", "id", "password", "name", "phone", "address1", "address2", "startDate", "endDate", "staffRank", "salary", "hno", "resignation"];

    const staffDetail = props.staffDetail;
    staffDetail["endDate"] = staffDetail["endDate"] == null ? "미정" : staffDetail["endDate"];
    staffDetail["address2"] = staffDetail["address2"] == null ? "" : staffDetail["address2"];
    staffDetail["address3"] = staffDetail["address3"] == null ? "" : staffDetail["address3"];
    // 본인 사진 경로
    const basePath = "http://localhost:8081/upload/staff/"
    const [photoPath, setPhotoPath] = useState(null);
    // const photoPath = "http://localhost:8081/upload/staff/default.jpg";
    // const photoPath = "C:/Users/silen/IdeaProjects/mans_project/build/resources/main/static/upload/staff/default.jpg";
    
    // 본인 사진 보여주는 코드
    const myPhoto = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/file/staff/path?staff_number=${staffDetail.staffNumber}`);
            console.log(response.data);
            setPhotoPath(basePath + response.data);
            // staffDetail["address1"] = staffDetail["address1"] + " " + (staffDetail["address2"] == null ? "" : staffDetail["address2"]);
        } catch(e) {
            console.log(e);
        }
    }

    console.log(staffDetail);
    console.log(photoPath);
    // console.log(`staffDetail["resignation"] : ${staffDetail["resignation"]}`);

    return (
        <>
            <div style={{maxHeight : "70vh", overflowY : "auto"}}>
                <div style={{padding : "10px 0px", width : "100%", textAlign : "center"}}>
                    <img 
                        src={photoPath} 
                        style={{
                            width : "200px", height : "200px", 
                            border : "solid 1px grey", borderRadius : "10px", boxShadow : "4px 4px 4px grey"
                        }} 
                    />
                </div>
                <Divider style={{margin : "0px 15px"}} />
                <div style={{overflow : "auto" }}>
                    <table style={{padding : "20px", textAlign : "start"}}>
                        <tbody>
                            {
                                infoName.map((info, index) => {
                                    if(index == infoName.length-1) { return; }
                                    return <tr key={index}>
                                        <td>
                                            {info} : 
                                        </td>
                                        <td>
                                            <Input variant="outlined" readOnly slotProps={{input : {tabIndex : -1}}} value={staffDetail[staffInfo[index]]} />
                                        </td>
                                    </tr>
                                })
                            }
                            <tr>
                                <td>퇴사 유무 : </td>
                                <td>
                                    <Input variant="outlined" readOnly slotProps={{input : {tabIndex : -1}}} value={staffDetail["resignation"] == 0 ? "근무" : "퇴사"} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}