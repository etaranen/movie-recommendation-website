import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
document.body.style.backgroundColor = "#FFF8F3";

const Landing = (props) => {
    const navigate = useNavigate();
      
    return (
        <div>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{ backgroundColor: '#405D72' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#F7E7DC', fontFamily:'Roboto' }}>
                            MOVIE MANIA
                        </Typography>
                        <Button id="nav-landing" sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily:'Roboto' }}>Home</Button>
                        <Button id="nav-search" onClick={() => navigate('/Search')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Search</Button>
                        <Button id="nav-review" onClick={() => navigate('/Review')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Review</Button>
                        {props.userActive.username ? (
                            <Button id="nav-myPage" onClick={() => navigate('/MyPage')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Account</Button>
                        ):(
                            <Button id="nav-login" onClick={() => navigate('/Login')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ paddingTop: '20px', p: 5 }}>
                <Typography variant="h3" color="#405D72" noWrap paddingBottom="20px" paddingTop="20px" fontWeight='bold'>
                    Welcome to Movie Mania {props.userActive.firstName}!
                </Typography>

                <Typography variant="body1" color="#405D72">
                    Discover and review your favorite movies. Join our community of movie enthusiasts today!
                </Typography>

                <Box sx={{ mb: 4, pt: 5}}>
                    <Typography variant="h5" color="#405D72" fontWeight="bold" gutterBottom>
                        POPULAR MOVIES
                    </Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: 'white' }}>
                                <Typography variant="h6">American Beauty</Typography>
                                <Typography variant="body2">Director: Sam Mendes</Typography>
                                <Typography variant="body2">Rating: 4.7/5</Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        pt: 2,
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    alt="American Beauty"
                                    src="https://resizing.flixster.com/5sOOWkgXyKfxn5zq73bjF59_5cI=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzY4NTUxOGZjLWNkMjAtNDE3YS1hOGVkLWU3NTZkZjFhMGMxOS53ZWJw"
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: 'white' }}>
                                <Typography variant="h6">La La Land</Typography>
                                <Typography variant="body2">Director: Damien Chazelle</Typography>
                                <Typography variant="body2">Rating: 4.8/5</Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        pt: 2,
                                        height: '100%',
                                        width: '90%'
                                    }}
                                    alt="La La Land"
                                    src="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg"
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, backgroundColor: 'white' }}>
                                <Typography variant="h6">Mamma Mia</Typography>
                                <Typography variant="body2">Director: Phyllida Lloyd</Typography>
                                <Typography variant="body2">Rating: 5/5</Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        pt: 2,
                                        height: '100%',
                                        width: '90%',
                                        justifyContent: 'center'
                                    }}
                                    alt="Mamma Mia"
                                    src="https://m.media-amazon.com/images/M/MV5BMTA2MDU0MjM0MzReQTJeQWpwZ15BbWU3MDYwNzgwNzE@._V1_.jpg"
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </div>
    )
}
export default Landing;