import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import Reviews from '/workspaces/project-deliverable-3-etaranen/client/src/components/App/Review.js';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Review = () => {
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
                        <Button sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily:'Roboto' }}>Review</Button>
                        <Button onClick={() => navigate('/MyPage')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Account</Button>
                    </Toolbar>
                </AppBar>
            </Box>
          <Reviews/>
        </div> 
      );
    };

export default Review;