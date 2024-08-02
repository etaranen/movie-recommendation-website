import React from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from "@mui/material/Grid";
document.body.style.backgroundColor = "#FFF8F3";

// For MyPage I decided to create a user system! This includes a login, signup, and an account page
// Feel free to create a new user or try logging in to one of my existing users :) 
// (username: liz password: liz)
// If you are not logged in, reviews are saved as anonymous

const MyPage = (props) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        props.setUserActive({})
        navigate('/')
    }

    const [userInfo, setUserInfo] = React.useState([]);

    const handleUser = async () => {
        try {
            const searchData = await callApiFindUserInfo();
            console.log("callApiFindMovie returned: ", searchData);
            setUserInfo(Array.isArray(searchData) ? searchData : []);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const callApiFindUserInfo = async () => {
        const url = '/api/findUserInfo';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: props.userActive.userID,
            })
        });

        if (!response.ok) {
            throw new Error(`error! status: ${response.status}`);
        }

        const body = await response.json();
        console.log("API Response:", body);
        return body;
    };

    React.useEffect(() => {
        handleUser();
      }, []);


    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#405D72' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#F7E7DC', fontFamily: 'Roboto' }}>
                            MOVIE MANIA
                        </Typography>
                        <Button id="nav-landing" onClick={() => navigate('/')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Home</Button>
                        <Button id="nav-search" onClick={() => navigate('/Search')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Search</Button>
                        <Button id="nav-review" onClick={() => navigate('/Review')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Review</Button>
                        <Button id="nav-myPage" sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily: 'Roboto' }}>Account</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ p: 2, pb: 3, textAlign: 'center', fontFamily: 'Roboto', color: '#405D72' }}>
                <Typography variant="h3" color="inherit" noWrap paddingTop="30px" fontWeight='bold'>
                    ACCOUNT
                </Typography>
            </Box>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingBottom: 2 }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={3.5}>
                    <Box sx={{ p: 2, textAlign: 'center', fontFamily: 'Roboto', color: '#405D72', border: 'solid', backgroundColor: 'white' }}>
                        <Typography variant="h6" sx={{ lineHeight: 3 }}>USERNAME: {props.userActive.username}</Typography>
                        <Typography variant="h6" sx={{ lineHeight: 3 }}>EMAIL: {props.userActive.email}</Typography>
                        <Typography variant="h6" sx={{ lineHeight: 3 }}>NAME: {props.userActive.firstName}</Typography>
                        <Typography variant="h6" sx={{ lineHeight: 3 }}>LAST NAME: {props.userActive.lastName}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3.5}>
                    <Box sx={{ p: 2, textAlign: 'center', fontFamily: 'Roboto', color: '#405D72', border: 'solid', backgroundColor: 'white' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>REVIEWS</Typography>
                        <Box
                            sx={{
                                maxHeight: 190,
                                overflowY: 'auto',
                                border: '1px solid #ccc',
                                padding: 1,
                                borderRadius: 1,
                                mt: 1
                            }}
                        >
                            {userInfo.length > 0 ? (
                                userInfo.map((movie, index) => {
                                    const movies = movie.movies.split(', ');
                                    const titles = movie.reviewTitles.split(', ');
                                    const contents = movie.reviewContents.split(', ');
                                    const scores = movie.reviewScores.split(', ');

                                    return (
                                        <div key={index}>
                                            {titles.map((title, i) => (
                                                <Box key={i} sx={{ mb: 1, border:'solid', p:1 }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {movies[i]}
                                                    </Typography>
                                                    <Typography variant="body2">Title: {title}</Typography>
                                                    <Typography variant="body2">Rating: {scores[i]}</Typography>
                                                    <Typography variant="body2">{contents[i]}</Typography>
                                                </Box>
                                            ))}
                                        </div>
                                    );
                                })
                            ) : (
                                <Typography variant="body2">No reviews available.</Typography>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleSignOut}
                    id="signup-button"
                    label="Sign Out"
                    sx={{ backgroundColor: '#405D72' }}
                >
                    Sign Out
                </Button>
            </Box>
        </div>
    )
}
export default MyPage;