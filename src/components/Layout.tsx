import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, Toolbar } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <CssBaseline />
            <AppBar
                position='sticky'
                sx={{
                    backgroundColor: 'black'
                }}
            >
                <Toolbar>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: 'black' }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundImage: 'linear-gradient(#17141F,#1A162D)' },
                    }}
                    open
                >
                    <div>
                        <Toolbar />
                    </div>

                </Drawer>
            </Box>
            <Box sx={{
                marginLeft: { xs: 0, sm: 30 },
                position: 'relative',
                marginBottom: { xs: 20, sm: 0 },
            }}>
                {children}
            </Box>
        </div>
    );
};

export default Layout;
