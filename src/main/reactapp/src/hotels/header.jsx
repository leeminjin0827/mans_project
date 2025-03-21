import { BrowserRouter , Route , Routes , Link } from "react-router-dom";
import * as React from 'react';

// mul import
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import DoorBackIcon from '@mui/icons-material/DoorBack';
// 라우터 연결 import
import Operatae from "./Oper";
import ParlorPage from "./Parlor";
import StaffPage from "./Staff";
import SignInCard from "./Login";
import DaumAddress from "./components/staff/DaumAddress";
import RoomReservationStatus from "./components/RoomReservationStatus";
import Sidebar from "./components/Sidebar";




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
      </Routes>
    </BrowserRouter>
  );
}