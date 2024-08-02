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


const Login = (props) => {
    const navigate = useNavigate();

    const [username, setemailAddress] = React.useState("");
    const enteredUsername = (event) => {
        setemailAddress(event.target.value)
    };

    const [userPassword, setPassword] = React.useState("");
    const enteredPassword = (event) => {
        setPassword(event.target.value)
    };

    const [error, setError] = React.useState("");

    const handleSignUp = () => {
        navigate('/SignUp')
    };

    const handleLogin = async () => {
        try {
            const data = await callApiFindUser();
            console.log("callApiFindUser returned: ", data);
            if (Array.isArray(data) && data.length > 0) {
                const user = data[0];
                props.setUserActive(user);
                console.log(`User updated: ${JSON.stringify(user)}`);
                navigate('/MyPage');
            } else {
                setError("Error: incorrect username or password");
            }; 
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const callApiFindUser = async () => {
        const url = '/api/findUser';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                userPassword: userPassword
            })
        });

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        const body = await response.json();
        console.log("API Response:", body);
        return body;
    };


    return (
        <div>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx={{ backgroundColor: '#405D72' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#F7E7DC', fontFamily:'Roboto' }}>
                            MOVIE MANIA
                        </Typography>
                        <Button id="nav-landing" onClick={() => navigate('/')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Home</Button>
                        <Button id="nav-search" onClick={() => navigate('/Search')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Search</Button>
                        <Button id="nav-review" onClick={() => navigate('/Review')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Review</Button>
                        <Button id="nav-login" sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily: 'Roboto' }}>Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ backgroundColor: '#FFF8F3', p: 5, textAlign: 'center', fontFamily:'Roboto', color: '#405D72' }}>
                <Typography variant="h3" color="inherit" noWrap paddingBottom="20px" paddingTop="40px" fontWeight= 'bold'>
                    LOGIN
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="username-login"
                                label="Username"
                                variant="outlined"
                                type="text"
                                value={username}
                                onChange={enteredUsername}
                                sx={{ backgroundColor: 'white' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="password-login"
                                label="Password"
                                variant="outlined"
                                type="text"
                                value={userPassword}
                                onChange={enteredPassword}
                                sx={{ backgroundColor: 'white' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            onClick={handleSignUp}
                            id="signup-button"
                            label="Sign Up"
                            sx={{ backgroundColor: '#405D72' }}
                        >
                            Sign-Up
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            id="login-button"
                            label="Login"
                            sx={{ backgroundColor: '#405D72' }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ p: 5, color: 'red' }}>
                    {error && (
                        <Typography>{error}</Typography>
                    )}
                </Box>
            </Box>
        </div>
    )
}
export default Login;