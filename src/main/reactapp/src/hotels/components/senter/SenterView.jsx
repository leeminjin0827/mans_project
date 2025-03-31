import { FormControl, FormLabel, Input } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

export default function SenterView( {setChangePage , setSelectSno} ){

    // 개별문의 조회
    const [senterView, setSenterView] = useState(null);
    const [sno , setSno] = useState(null);
    const [senterWrite, setSenterWrite] = useState({
        senterName: '' ,
        senterPhone: '' ,
        senterTitle: '' ,
        senterContent: ''
    });

    useEffect(() => {
        if (setSelectSno) {
            setSelectSno((prevSno) => {
                setSno(prevSno);
            });
        }
    }, [setSelectSno]);

    useEffect(() => {
        const senterRead = async () => {
            try {
                if (!sno) return;  // sno가 없으면 요청하지 않음

                const response = await axios.get(`http://localhost:8081/senter/view?sno=${sno}`);
                setSenterView(response.data);
                console.log(response.data);
                setSenterWrite({
                    senterName: response.data.senterName,
                    senterPhone: response.data.senterPhone,
                    senterTitle: response.data.senterTitle,
                    senterContent: response.data.senterContent
                })
            } catch (e) {
                console.log(e);
            }
        };
        senterRead();
    }, [sno]);

    // senterView가 null일 때 로딩 상태 처리
    if (!senterView) {
        return <div>Loading...</div>;
    }

    // 문의 수정
    const write = async () => {
        try {
            const { senterTitle, senterContent } = senterWrite;
            const response = await axios.put('http://localhost:8081/senter', { sno, senterTitle, senterContent });
            
            // 응답 데이터를 콘솔에 출력하여 무엇이 반환되는지 확인
            console.log('서버 응답:', response.data);
            
            if (response.data === true) {
                alert("문의가 수정되었습니다.");
                setChangePage("3"); // 목록
            } else {
                alert("수정 실패");
            }
        } catch (e) { console.log( e ); }
    } // f end

    // senterWrite 상태 변경 함수
    const senterChange = (e) => {
        const { name, value } = e.target;
        setSenterWrite({
            ...senterWrite,
            [name]: value
        });
    };

    return(<>
        <form style={{ margin : 'auto auto'}}>
            <div className="senter_input">
                <div>
                    <FormControl>
                        <FormLabel>작성자</FormLabel>
                        <Input name="senterName" onChange={senterChange} value={senterWrite.senterName} variant="outlined" type="text" disabled />
                    </FormControl>
                    <FormControl>
                        <FormLabel>전화번호</FormLabel>
                        <Input name="senterPhone" onChange={senterChange} value={senterWrite.senterPhone}  variant="outlined" type="text" disabled />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <FormLabel>제목</FormLabel>
                        <Input name="senterTitle" onChange={senterChange} value={senterWrite.senterTitle}  variant="outlined" type="text" />
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="문의내용"
                        multiline
                        maxRows={4}
                        name="senterContent" onChange={senterChange} value={senterWrite.senterContent} 
                        sx={{
                            height: "300px",
                            "& .MuiInputBase-root": {
                                height: "100%",
                            },
                            "& .MuiInputBase-input": {
                                minHeight: "300px",
                                maxHeight: "300px",
                                paddingTop: "20px"
                            }
                        }}
                    />
                </div>
                <div>
                    <Button variant="contained" type="button" onClick={write}>문의수정</Button>
                </div>
            </div>
        </form>
    </>)
}