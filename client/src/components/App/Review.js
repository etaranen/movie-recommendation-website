import * as React from "react";
import ReviewTitle from "./ReviewTitle";
import ReviewBody from "./ReviewBody";
import ReviewRating from "./ReviewRating";
import MovieSelection from "./MovieSelection";
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


const Reviews = (props) => {
  const [userID, setUserID] = React.useState(1)

  React.useEffect(() => {
    if (props.userActive.username) {
      setUserID(props.userActive.userID);
    }
  }, [props.userActive]);

  // List of movies
  const [movies, setMovies] = React.useState([]);
    
  const handleMovies = async () => {
    try {
      const moviesData = await callApiGetMovies();
      console.log("callApiGetMovies returned: ", moviesData);
      setMovies(moviesData);
    } catch (error) {
      console.error("Error calling api:", error);
    }
  };

  const callApiGetMovies = async () => {
    const url = "/api/getMovies";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }

    const body = await response.json();
    console.log("Found movies");
    return body;
  };

  React.useEffect(() => {
    handleMovies();
  }, []);


  const handleAddReview = async () => {
    try {
      const confirmation = await callApiAddReview();
      console.log("callApiAddReview returned: ", confirmation);
    } catch (error) {
      console.error("Error calling api:", error);
    }
  };

  const callApiAddReview = async () => {
    const url = "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieID: selectedMovie.id,
        userID: userID, //1
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
      }),
    });

    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }

    const body = await response.json();
    console.log("Review added");
    return body;
  };

  
  // Movie Selection
  const [selectedMovie, setMovie] = React.useState("");
  const handleMovieChange = (event) => {
    setMovie(event.target.value)
    setConfirmationMessage('');
  };

  // Title
  const [enteredTitle, setTitle] = React.useState("");
  const onTitleInput = (event) => {
    setTitle(event.target.value)
    setConfirmationMessage('');
  };

  // Body
  const [enteredReview, setReviewBody] = React.useState("");
  const onReviewBodyInput = (event) => {
    setReviewBody(event.target.value)
    setConfirmationMessage('');
  };

  // Rating
  const [selectedRating, setRatings] = React.useState("");
  const handleRatingChange = (event) => {
    setRatings(event.target.value)
    setConfirmationMessage('');
  };
 
  // Submit
  const [errorMessages, setErrorMessages] = React.useState({});
  const [confirmationMessage, setConfirmationMessage] = React.useState('');

  const handleSubmit = () => {
    const errors = {};
    if (!selectedMovie) errors.movie = 'Select your movie';
    if (!enteredTitle) errors.title = 'Enter your review title';
    if (!enteredReview) errors.body = 'Enter your review';
    if (!selectedRating) errors.rating = 'Select the rating';

    setErrorMessages(errors);

    // if errors is empty, set a confirmation message
    if (Object.keys(errors).length === 0) {
      setConfirmationMessage('Your review has been received!');
      handleAddReview();
    } else {
      setConfirmationMessage('')
    }
  };

  return (
    <>
      <div>
        <Box sx={{ flexGrow: 2, backgroundColor: '#FFF8F3', paddingTop: '20px', p:5}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "25px",
              padding: 2,
              fontFamily:'Roboto', 
              color: '#405D72',
            }}
          >
            <Typography variant="h3" fontWeight= 'bold' sx={{letterSpacing: 2}}>REVIEW A MOVIE</Typography>
          </Box>
          <Grid container spacing={2} alignItems="center">
            {/* Movie */}
            <Grid item xs={4}>
              <MovieSelection
                movies={movies}
                selectedMovie={selectedMovie}
                handleMovieChange={handleMovieChange}
                error={errorMessages.movie}
              />
            </Grid>
            {/* Title */}
            <Grid item xs={4}>
              <ReviewTitle
                enteredTitle={enteredTitle}
                onTitleInput={onTitleInput}
                error={errorMessages.title}
              />
            </Grid>
            {/* Rating */}
            <Grid item xs={4}>
              <ReviewRating
                selectedRating={selectedRating}
                handleRatingChange={handleRatingChange}
                error={errorMessages.rating}
              />
            </Grid>
          </Grid>
          {/* Review */}
          <Grid item xs={12}>
            <ReviewBody
              enteredReview={enteredReview}
              onReviewBodyInput={onReviewBodyInput}
              error={errorMessages.body}
            />
          </Grid>
          {/* Submit */}
          <Grid item xs={2}>
            <br></br>
            <Box justify="flex-end">
              <Button 
              variant="contained"
              onClick={handleSubmit}
              id="submit-button"
              label="Submit"
              sx={{ backgroundColor: '#405D72'}}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          {/* Confirmation Message */}
          {confirmationMessage && (
            <Grid item xs={12}>
              <br></br>
              <Typography id="confirmation-message" variant="h6" color="primary" textTransform='uppercase'>{confirmationMessage}</Typography>
              <Typography variant="body1">Movie: {selectedMovie.name}</Typography>
              <Typography variant="body1">Title: {enteredTitle}</Typography>
              <Typography variant="body1">Rating: {selectedRating}</Typography>
              <Typography variant="body1">Review: {enteredReview}</Typography>
            </Grid>
          )}
        </Box>
      </div>
    </>
  );
};

export default Reviews;
