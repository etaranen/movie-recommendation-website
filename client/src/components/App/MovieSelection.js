import * as React from "react";
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const MovieSelection = (props) => {

  return (
    <>
      <p>Movie:</p>
      <FormControl fullWidth>
        <InputLabel>Select a movie</InputLabel>
        <Select
          id="movie-select"
          label="Select a movie"
          value={props.selectedMovie}
          onChange={props.handleMovieChange}
          sx={{ backgroundColor: 'white'}}
        >
          {props.movies.map((movie, index) => (
            <MenuItem value={movie}>
              {movie.name}
            </MenuItem>
          ))}
        </Select>
        {props.error && <Typography variant="body2" color="error" mt="5px">{props.error}</Typography>}
      </FormControl>
    </>
  );
};

export default MovieSelection;