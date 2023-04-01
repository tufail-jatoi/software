import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function DrawerAppBar(props) {

    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Admin Panel
            </Typography>
            <Divider />
            <List>
                {[{
                    route: '/registrationDetail', name: 'Registration Details'
                },
                { route: '/quizform', name: 'Quiz Form' },
                { route: '/quizdetail', name: 'Quiz Detail' },
                { route: '/course', name: 'Courses' }].map((page, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText onClick={() => navigate(page.route)} primary={page.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {/* {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Admin Panel
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {
                            [{
                                route: '/registrationDetail', name: 'Registration Details'
                            },
                            { route: '/quizform', name: 'Quiz Form' },
                            { route: '/quizdetail', name: 'Quiz Detail' },
                            { route: '/course', name: 'Courses' }].map((page, index) => (
                                <Button key={index} onClick={() => navigate(page.route)} sx={{ color: '#fff' }}>
                                    {page.name}
                                </Button>
                            ))
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" className='adminmaintext'>
                <Toolbar />
                <Typography>
                    <h1>Be Carefull!</h1>
                    <h2>You are in Admin Panel.</h2>
                </Typography>
            </Box>
        </Box >
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;