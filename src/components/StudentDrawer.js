import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UpdateIcon from '@mui/icons-material/Update';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StudentDetail from '../screens/Student Screens/StudentDetail';
import StudentGradeBook from '../screens/Student Screens/StudentGradeBook';
import StudentAnnouncements from '../screens/Student Screens/StudentAnnouncements';
import StudentTutor from '../screens/Student Screens/StudentTutor';
import { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { signOut } from 'firebase/auth';
import { signOutUser } from '../config/firebaseMethods';
import { MenuItem , MenuList , Paper} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import StudentQuiz from '../screens/Student Screens/StudentQuiz';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';




const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MyDrawer() {

    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    React.useEffect(()=>{
    navigate('StudentDetail')
    },[])
    let logout=()=>{
        signOutUser()
         .then(()=>{
         navigate('/Login')
         })
         .catch(()=>{
         })
     
     }


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ background: 'cornflowerblue' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                         sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashborad
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} >
           
                <DrawerHeader sx={{ background: '#808080' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
                    </IconButton>
                </DrawerHeader>
            
                {/* <Divider /> */}

                <List sx={{ background: '#808080', color: 'white', height: '90vh' }}>
                    
                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('StudentDetail')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <PersonIcon />

                            </ListItemIcon>

                            <ListItemText primary="Student Detail" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('GradeBook')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <MenuBookIcon />

                            </ListItemIcon>

                            <ListItemText primary="My Grades" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('Announcements')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <UpdateIcon />

                            </ListItemIcon>

                            <ListItemText primary="Announcements" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('Trainer')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <WcIcon />

                            </ListItemIcon>

                            <ListItemText primary="My Tutor" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('StudentQuiz')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <PsychologyAltIcon/>

                            </ListItemIcon>

                            <ListItemText primary="Quiz" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={logout}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <LogoutIcon/>

                            </ListItemIcon>

                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/')}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                <HomeIcon/>

                            </ListItemIcon>

                            <ListItemText primary="Back to Home" sx={{ opacity: open ? 1 : 0 }} />

                        </ListItemButton>
                    </ListItem>
                    
                </List>
            </Drawer>

            <Box variant='div' component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                    <Route path="StudentDetail" element={<StudentDetail />} />
                    <Route path="GradeBook" element={<StudentGradeBook />} />
                    <Route path="Announcements" element={<StudentAnnouncements />} />
                    <Route path="Trainer" element={<StudentTutor />} />
                    <Route path="StudentQuiz" element={<StudentQuiz/>} />
                </Routes>
            </Box>
        </Box>
    );
}
