import { BrowserRouter , Route , Routes , Link, useLocation } from "react-router-dom";
import * as React from 'react';

// 라우터 연결 import
import Operatae from "./Oper";
import ParlorPage from "./Parlor";
import StaffPage from "./Staff";
import SignInCard from "./Login";
import Home from "./Home";
import DaumAddress from "./components/staff/DaumAddress";
import RoomReservationStatus from "./components/room_reservation/RoomReservationStatus";
// import User from "./User";
import { useEffect } from "react";
import User from "./User";

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
        <Route path="/user" element={<User />} />
    </Routes>
  )
} // f end

export default function PermanentDrawerLeft() {
  return (
    <BrowserRouter>
      {/* <SignInCard /> */}
      <RouterWrapper />
    </BrowserRouter>
  );
}