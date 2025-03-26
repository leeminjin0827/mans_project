import { BrowserRouter , Route , Routes , Link } from "react-router-dom";
import * as React from 'react';

// 라우터 연결 import
import Operatae from "./Oper";
import ParlorPage from "./Parlor";
import StaffPage from "./Staff";
import SignInCard from "./Login";
import Home from "./Home";
import DaumAddress from "./components/staff/DaumAddress";
import RoomReservationStatus from "./components/room_reservation/RoomReservationStatus";
import Graph from "./detailGraph";





export default function PermanentDrawerLeft() {
  return (
    <BrowserRouter>
      {/* <SignInCard /> */}
      <Routes>
        <Route path="/" element={<SignInCard />} />
        <Route path="/oper" element={ <Operatae />} />
        <Route path="/parlor" element={ <ParlorPage />} />
        <Route path="/staff" element={ <StaffPage />} />
        <Route path="/address" element={<DaumAddress />} />
        <Route path="/reservation/room" element={<RoomReservationStatus />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/graph" element={<Graph/>}/>
      </Routes>
    </BrowserRouter>
  );
}