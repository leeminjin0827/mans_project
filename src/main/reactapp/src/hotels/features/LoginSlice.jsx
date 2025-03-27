import { createSlice } from "@reduxjs/toolkit";

// 전역변수(상태)로 사용할 데이터 초기값 설정
const initialState = {
    // 로그인한 정보를 저장할 속성
    userInfo : null,
    // 로그인 여부 상태를 저장하는 속성(true : 로그인, false : 비로그인)
    loginState : false
};

const userSlice = createSlice({
    // 변수(상태)의 이름
    name : "user",
    // 변수(상태)의 초기값
    initialState : initialState,
    reducers : {
        // 로그인 관련 함수
        login : (state, action) => {
            // 로그인 함수를 호출 시 로그인 여부를 true로 변경
            state.loginState = true;
            // 로그인 함수를 호출 시 매개변수를 받는 속성(값)(payload)로 변경
            state.userInfo = action.payload;
        },
        logout : (state) => {
            // 로그아웃 함수를 호출 시 로그인 여부를 false로 변경
            state.loginState = false;
            // 로그아웃 함수를 호출 시 로그인 정보를 null로 변경
            state.userInfo = null;
        }
    }
});

// Slice의 reducer를 내보내기 위해 액션을 생성
export const {login, logout} = userSlice.actions;
// reducer 내보내기(.reducer는 userSlice안에 있는 reducers를 내보내는 것)
export default userSlice.reducer;