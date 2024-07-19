import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const MyPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{ backgroundColor: '#405D72' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#F7E7DC', fontFamily:'Roboto' }}>
                            MOVIE MANIA
                        </Typography>
                        <Button onClick={() => navigate('/')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Home</Button>
                        <Button onClick={() => navigate('/Search')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Search</Button>
                        <Button onClick={() => navigate('/Review')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Review</Button>
                        <Button sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily:'Roboto' }}>Account</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ backgroundColor: '#FFF8F3', paddingTop: '20px', p:5}}>
                <Typography variant="h3" color="inherit" noWrap>
                    account page to be changed
                </Typography>
            </Box>
        </div>
    )
}
export default MyPage;