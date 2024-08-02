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


const SignUp = (props) => {
    const navigate = useNavigate();

    // Username
    const [newUsername, setUsername] = React.useState("");
    const signUsername = (event) => {
        setUsername(event.target.value)
    };

    // Password
    const [newPassword, setPassword] = React.useState("");
    const signPassword = (event) => {
        setPassword(event.target.value)
    };

    // Email
    const [newEmail, setEmail] = React.useState("");
    const signEmail = (event) => {
        setEmail(event.target.value)
    };

    // First Name
    const [newFirstName, setFirstName] = React.useState("");
    const signFirstName = (event) => {
        setFirstName(event.target.value)
    };

    // Last Name
    const [newLastName, setLastName] = React.useState("");
    const signLastName = (event) => {
        setLastName(event.target.value)
    };

    // Phone
    const [newPhone, setPhone] = React.useState("");
    const signPhone = (event) => {
        setPhone(event.target.value)
    };

    // Date of Birth
    const [newDOB, setDOB] = React.useState("");
    const signDOB = (event) => {
        setDOB(event.target.value)
    };


    const handleAddUser = async () => {
        try {
            const data = await callApiAddUser();
            console.log("callApiAddUser returned: ", data);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const callApiAddUser = async () => {
        const url = '/api/addUser';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: newUsername,
                userPassword: newPassword,
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                phone: newPhone,
                dateOfBirth: newDOB
            })
        });

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }

        const body = await response.json();
        console.log("API Response:", body);
        return body;
    };


    const [errors, setErrorMessages] = React.useState({});
    const [confirmationMessage, setConfirmationMessage] = React.useState('');

    const handleSignUp = () => {
        const errors = {};
        if (!newUsername) errors.username = 'Enter your username';
        if (!newPassword) errors.password = 'Enter your password';
        if (!newFirstName) errors.firstName = 'Enter your first name';
        if (!newLastName) errors.lastName = 'Enter your last name';
        if (!newEmail) errors.email = 'Enter your email';
        if (!newPhone) errors.phone = 'Enter your phone';
        if (!newDOB) errors.dob = 'Enter your date of birth';
    
        setErrorMessages(errors);
    
        // if errors is empty, set a confirmation message
        if (Object.keys(errors).length === 0) {
          setConfirmationMessage('Success!');
          handleAddUser();
          handleLogin();
        } else {
          setConfirmationMessage('')
        }
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
                username: newUsername,
                userPassword: newPassword
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
                        <Button id="nav-signup" sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily: 'Roboto' }}>Sign Up</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ backgroundColor: '#FFF8F3', p: 5, textAlign: 'center', fontFamily:'Roboto', color: '#405D72' }}>
                <Typography variant="h3" color="inherit" noWrap paddingBottom="20px" paddingTop="10px" fontWeight= 'bold'>
                    SIGN UP
                </Typography>
                <Grid container spacing={2} justifyContent="center">

                    {/* Username */}
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="username-signup"
                                label="Username"
                                variant="outlined"
                                type="text"
                                value={newUsername}
                                onChange={signUsername}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.username && <Typography variant="body2" color="error" mt="5px">{errors.username}</Typography>}
                        </FormControl>
                    </Grid>

                    {/* Password */}
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="password-signup"
                                label="Password"
                                variant="outlined"
                                type="text"
                                value={newPassword}
                                onChange={signPassword}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.password && <Typography variant="body2" color="error" mt="5px">{errors.password}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    {/* First Name */}
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="firstname-signup"
                                label="First Name"
                                variant="outlined"
                                type="text"
                                value={newFirstName}
                                onChange={signFirstName}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.firstName && <Typography variant="body2" color="error" mt="5px">{errors.firstName}</Typography>}
                        </FormControl>
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="lastname-signup"
                                label="Last Name"
                                variant="outlined"
                                type="text"
                                value={newLastName}
                                onChange={signLastName}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.lastName && <Typography variant="body2" color="error" mt="5px">{errors.lastName}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    {/* Email */}
                    <Grid item xs={2}></Grid>
                    <Grid item xs={5}>
                        <FormControl fullWidth>
                            <TextField
                                id="email-signup"
                                label="Email"
                                variant="outlined"
                                type="text"
                                value={newEmail}
                                onChange={signEmail}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.email && <Typography variant="body2" color="error" mt="5px">{errors.email}</Typography>}
                        </FormControl>
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="dob-login"
                                label="Date of Birth"
                                variant="outlined"
                                type="text"
                                value={newDOB}
                                onChange={signDOB}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.dob && <Typography variant="body2" color="error" mt="5px">{errors.dob}</Typography>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}></Grid>

                    {/* Phone */}
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="phone-signup"
                                label="Phone"
                                variant="outlined"
                                type="text"
                                value={newPhone}
                                onChange={signPhone}
                                sx={{ backgroundColor: 'white' }}
                            />
                            {errors.phone && <Typography variant="body2" color="error" mt="5px">{errors.phone}</Typography>}
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
                </Grid>
                {/* Confirmation Message */}
                {confirmationMessage && (
                    <Grid item xs={12}>
                        <br></br>
                        <Typography id="confirmation-message" variant="h6" color="primary" textTransform='uppercase'>{confirmationMessage}</Typography>
                    </Grid>
                )}
            </Box>
        </div>
    )
}
export default SignUp;