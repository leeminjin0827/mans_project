import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
// mul import
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MonitorIcon from '@mui/icons-material/Monitor';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";



const drawerWidth = "15%";

export default function Sidebar(props) {

    // 각 항목에 대한 open 상태 관리
    const [openParlor, setOpenParlor] = React.useState(false);  // 지점별객실관리 항목에 대한 상태

    const handleClick = (section) => {
      if (section === 'parlor') {
        setOpenParlor(!openParlor);
      }
    };

    // 로그아웃 버튼 클릭 시 로그아웃 하는 함수
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await axios.get("http://localhost:8081/staff/logout", {withCredentials : true});
            alert(response.data);
            if(response.data) {
                alert("로그아웃 성공");
                navigate("/");
            } else {
                alert("로그아웃 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <Box >
                <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    display : 'flex',
                    justifyContent: 'space-between',
                    },
                }}
                variant="permanent"
                anchor="left"
                >
                    <div>
                        <Toolbar>
                            <img src="/logo2.png" alt="Logo" style={{ maxWidth: '150px' }} />
                        </Toolbar>

                        <Divider /> {/* 사이드바 border */}

                        {/* 사이드 상단 공간 */}
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton component={Link} to="/oper">
                            <ListItemIcon>
                                <LocationCityIcon />
                            </ListItemIcon>
                            <ListItemText primary="지점관리" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/parlor" onClick={ () => handleClick('parlor')}>
                                <ListItemIcon>
                                <DoorBackIcon />
                                </ListItemIcon>
                                <ListItemText primary="지점별객실관리" />
                                {openParlor ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openParlor} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="옵션등록" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="객실등급등록" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="객실등록" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            {/* 직원 관리 */}
                            <ListItemButton component={Link} to="/staff">
                                <ListItemIcon>
                                <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="직원관리" />
                            </ListItemButton>
                            {/* 객실 예약 현황 */}
                            <ListItemButton component={Link} to="/reservation/room">
                                <ListItemIcon>
                                <MonitorIcon />
                                </ListItemIcon>
                                <ListItemText primary="객실 예약 현황" />
                            </ListItemButton>
                        </List>

                        {/* 사이드 상단 공간 end*/}
                        <Divider /> {/* 사이드바 border */}
                    </div>

                    <div>
                    {/* 사이드 하단 공간 */}
                        <Divider /> {/* 사이드바 border */}
                        <List>
                            <ListItem disablePadding>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                <MeetingRoomIcon />
                                </ListItemIcon>
                                <ListItemText primary="로그아웃" />
                            </ListItemButton>
                            </ListItem>
                        </List>
                        {/* 사이드 하단 공간 end*/}
                    </div>
                </Drawer>
                { /* 본문 공간 start */ }
                <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography sx={{ marginBottom: 2 }}>

                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>

                    </Typography>
                </Box>
                { /* 본문 공간 end */ }
            </Box>
        </>
    );
}