import { Input } from "@mui/joy";
import { Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function StaffDetail(props) {

    useEffect(() => {myPhoto();}, []);

    const infoName = ["직원 번호", "아이디", "비밀번호", "이름", "전화번호", "주소", "입사일", "퇴사일", "직급", "연봉", "근무지", "퇴사 유무"];
    const staffInfo = ["staffNumber", "id", "password", "name", "phone", "address", "startDate", "endDate", "staffRank", "salary", "hno", "resignation"];

    const staffDetail = props.staffDetail;
    staffDetail["resignation"] = staffDetail["resignation"] == 0 ? "근무" : "퇴사";
    // 본인 사진 경로
    const basePath = "http://localhost:8081/upload/staff/"
    const [photoPath, setPhotoPath] = useState();
    // const photoPath = "http://localhost:8081/upload/staff/default.jpg";
    // const photoPath = "C:/Users/silen/IdeaProjects/mans_project/build/resources/main/static/upload/staff/default.jpg";
    
    // 본인 사진 보여주는 코드
    const myPhoto = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/file/staff/path?staff_number=${staffDetail.staffNumber}`);
            console.log(response.data);
            setPhotoPath(basePath + response.data);
            console.log(photoPath);
        } catch(e) {
            console.log(e);
        }
    }

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
                <Divider />
                <div style={{overflow : "auto", }}>
                    <table style={{padding : "20px", textAlign : "start"}}>
                        <tbody>
                            {
                                infoName.map((info, index) => {
                                    return <tr key={index}>
                                        <td>
                                            {info} : 
                                        </td>
                                        <td>
                                            <Input variant="outlined" readOnly slotProps={{input : {tabIndex : -1}}} value={staffDetail[staffInfo[index]] != null ? staffDetail[staffInfo[index]] : "미정"} />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}