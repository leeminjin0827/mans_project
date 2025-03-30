import { FormControl, FormLabel, Input } from "@mui/joy";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function SenterWrite( {setChangePage} ){

    // 문의 등록
    const [ senterWrite , setSenterWrite ] = useState({ senterName : '' , senterPhone : '' , senterTitle : '' , senterContent : '' })
    const senterChange = (e) => {
        console.log( e.target.name);
        console.log( e.target.value);
        setSenterWrite( { ...senterWrite , [e.target.name] : e.target.value })
    }
    const write = async () => {
        try{
            const response = await axios.post('http://localhost:8081/senter' , senterWrite )
            console.log( response.data );
            if( response.data == true ){
                alert("문의 등록 완료!");
                setChangePage("3"); // 문의목록으로 이동
            }else{
                alert("문의 등록 실패!");
            } // if end
        }catch(e) {console.log(e);}
    } // f end

    return(<>
        <form style={{ margin : 'auto auto'}}>
            <div className="senter_input">
                <div>
                    <FormControl>
                        <FormLabel>작성자</FormLabel>
                        <Input name="senterName" onChange={senterChange} value={senterWrite.senterName} variant="outlined" type="text" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>전화번호</FormLabel>
                        <Input name="senterPhone" onChange={senterChange} value={senterWrite.senterPhone}  variant="outlined" type="text" />
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
                            }
                        }}
                    />
                </div>
                <div>
                    <Button variant="contained" type="button" onClick={write}>문의등록</Button>
                </div>
            </div>
        </form>
    </>)
} // c end