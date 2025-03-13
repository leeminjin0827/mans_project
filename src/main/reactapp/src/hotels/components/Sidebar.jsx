import { Link } from "react-router-dom";
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

const drawerWidth = "15%";

export default function Sidebar(props) {
    return (
        <>
            <Box sx={{ display: 'flex'}}>

                {/* 상단 bar end*/}
                <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                >
                <Toolbar />
                
                <Divider /> {/* 사이드바 border */}

                {/* 사이드 상단 공간 */}
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/oper">
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="지점관리" />
                    </ListItemButton>
                </ListItem>
                    
                    <ListItem disablePadding>
                    <ListItemButton component={Link} to="/parlor">
                        <ListItemIcon>
                        <DoorBackIcon />
                        </ListItemIcon>
                        <ListItemText primary="지점별객실관리" />
                    </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                    <ListItemButton component={Link} to="/staff">
                        <ListItemIcon>
                        <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="직원관리" />
                    </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="..." />
                    </ListItemButton>
                    </ListItem>
                {/* 사이드 상단 공간 end*/}

                <Divider /> {/* 사이드바 border */}

                {/* 사이드 하단 공간 */}
                <List>
                    {['All mail', 'Trash', '로그인'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                {/* 사이드 하단 공간 end*/}
                </Drawer>
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
            </Box>
        </>
    );
}