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


const Search = (props) => {
    const navigate = useNavigate();

    const [searchResult, setSearch] = React.useState([]);

    // Movie Search
    const [movieSearchTerm, setMovieSearch] = React.useState("");
    const onMovieSearch = (event) => {
        setMovieSearch(event.target.value)
    };

    // Actor Search
    const [actorSearchTerm, setActorSearch] = React.useState("");
    const onActorSearch = (event) => {
        setActorSearch(event.target.value)
    };

    // Director Search
    const [directorSearchTerm, setDirectorSearch] = React.useState("");
    const onDirectorSearch = (event) => {
        setDirectorSearch(event.target.value)
    };

    const handleSearch = async () => {
        try {
            const searchData = await callApiFindMovie();
            console.log("callApiFindMovie returned: ", searchData);
            setSearch(Array.isArray(searchData) ? searchData : []);
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    const callApiFindMovie = async () => {
        const url = '/api/findMovie';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                movieSearchTerm: movieSearchTerm,
                actorSearchTerm: actorSearchTerm,
                directorSearchTerm: directorSearchTerm
            })
        });

        if (!response.ok) {
            throw new Error(`error! status: ${response.status}`);
        }

        const body = await response.json();
        console.log("API Response:", body);
        return body;
    };


    return (
        <div>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="s   tatic" sx={{ backgroundColor: '#405D72' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#F7E7DC', fontFamily:'Roboto' }}>
                            MOVIE MANIA
                        </Typography>
                        <Button id="nav-landing" onClick={() => navigate('/')} sx={{ color: '#F7E7DC', fontFamily:'Roboto' }}>Home</Button>
                        <Button id="nav-search" sx={{ color: '#F7E7DC', backgroundColor: '#758694', fontFamily: 'Roboto' }}>Search</Button>
                        <Button id="nav-review" onClick={() => navigate('/Review')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Review</Button>
                        {props.userActive.username ? (
                            <Button id="nav-myPage" onClick={() => navigate('/MyPage')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Account</Button>
                        ) : (
                            <Button id="nav-login" onClick={() => navigate('/Login')} sx={{ color: '#F7E7DC', fontFamily: 'Roboto' }}>Login</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ backgroundColor: '#FFF8F3', paddingTop: '20px', p: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: "25px",
                        padding: 2,
                        mb: 2,
                        fontFamily:'Roboto', 
                        color: '#405D72',
                    }}
                >
                    <Typography variant="h3" fontWeight= 'bold' sx={{letterSpacing: 2}}>SEARCH</Typography>
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="search-title"
                                label="Enter a movie"
                                variant="outlined"
                                type="text"
                                value={movieSearchTerm}
                                onChange={onMovieSearch}
                                sx={{ backgroundColor: 'white' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="search-actor"
                                label="Enter an actor"
                                variant="outlined"
                                type="text"
                                value={actorSearchTerm}
                                onChange={onActorSearch}
                                sx={{ backgroundColor: 'white' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="search-director"
                                label="Enter a director"
                                variant="outlined"
                                type="text"
                                value={directorSearchTerm}
                                onChange={onDirectorSearch}
                                sx={{ backgroundColor: 'white' }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            id="search-button"
                            label="Search"
                            sx={{ backgroundColor: '#405D72' }}
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {searchResult.length > 0 ? (
                            searchResult.map((movie, index) => (
                                <Box key={index} sx={{ backgroundColor: 'white', p: 3, border: 1, mb: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <h3>{movie.movie}</h3>
                                            <p>Director: {movie.director}</p>
                                            <p>Average Rating: {movie.average_rating !== null ? movie.average_rating : 'N/A'}</p>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Box
                                                sx={{
                                                    maxHeight: 150,
                                                    overflowY: 'auto',
                                                    border: '1px solid #ccc',
                                                    padding: 1,
                                                    borderRadius: 1,
                                                    mt: 1
                                                }}
                                            >
                                                {movie.reviewTitles && movie.reviewTitles.length > 0 ? (
                                                    <div>
                                                        {/* Split strings into arrays inside the JSX */}
                                                        {(() => {
                                                            const titles = movie.reviewTitles.split(', ');
                                                            const contents = movie.reviewContents.split(', ');
                                                            const scores = movie.reviewScores.split(', ');
                                                            return (
                                                                <>
                                                                    {titles.map((title, index) => (
                                                                        <Box key={index} sx={{ p: 1, border:'solid', borderColor: '#405D72' }}>
                                                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                                            Title: {title}
                                                                            </Typography>
                                                                            <Typography variant="body2">Rating: {scores[index]}</Typography>
                                                                            <Typography variant="body2">Comments: {contents[index]}</Typography>
                                                                        </Box>
                                                                    ))}
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                ) : (
                                                    <Typography variant="body2">No reviews available.</Typography>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1">No movies found.</Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Search;
