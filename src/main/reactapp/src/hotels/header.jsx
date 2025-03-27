import { BrowserRouter , Route , Routes , Link } from "react-router-dom";
import * as React from 'react';

// 리덕스, 리덕스 퍼시스턴스 import
import { Provider } from "react-redux";
import { store, persistor } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";


// 라우터 연결 import
import Operatae from "./Oper";
import ParlorPage from "./Parlor";
import StaffPage from "./Staff";
import SignInCard from "./Login";
import Home from "./Home";
import DaumAddress from "./components/staff/DaumAddress";
import RoomReservationStatus from "./components/room_reservation/RoomReservationStatus";
import User from "./User";
import { useEffect } from "react";
import Graph from "./detailGraph";


// useLocation를 사용하는 컴포넌트는 BrowserRouter 내부에서 호출되어야 함
function RouterWrapper(){
  // 주소창이 /user이 되면 root에 className 부여
  // 이유 : root에 flex가 걸려있는데 사용자 페이지는 flex를 안쓰고 싶었음
  const location = useLocation();

  useEffect( () => {
    const root = document.querySelector("#root");
    if( location.pathname === "/user" ){
      root.classList.add("user_body");
    }else{
      root.classList.remove("user_body");
    }
  }, [location]);

  return(
    <Routes>
        <Route path="/" element={<SignInCard />} />
        <Route path="/oper" element={ <Operatae />} />
        <Route path="/parlor" element={ <ParlorPage />} />
        <Route path="/staff" element={ <StaffPage />} />
        <Route path="/address" element={<DaumAddress />} />
        <Route path="/reservation/room" element={<RoomReservationStatus />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/graph" element={<Graph/>}/>
        <Route path="/user" element={<User />} />
    </Routes>
  )
} // f end

export default function PermanentDrawerLeft() {
  return (
    <>
        {/* ↓ 리덕스 스토어 적용 : 현재 Provider로 감싼 컴포넌트들은 모두 리덕스의 전역변수(상태)를 사용할 수 있다. */}
        <Provider store={store}>
            {/* ↓ 리덕스 퍼시스턴스를 적용 하는 컴포넌트 */}
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                {/* <SignInCard /> */}
                    <RouterWrapper />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </>
  );
}