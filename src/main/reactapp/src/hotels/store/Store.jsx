// 리덕스관련 함수 가져오기
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/LoginSlice";

// 퍼시스턴스 설정 --> 로컬 스토리지로 바로 올려줌
const persistConfig = {storage : storage, key : "Login"}
// 퍼시스턴스 적용할 리듀서 설정
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer : {user : persistedReducer}
});

// 퍼시스턴스가 적용된 store 내보내기 설정
export const persistor = persistStore(store);
// 내보내기
export default store;