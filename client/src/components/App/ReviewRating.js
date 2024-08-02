import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';


const ReviewRating = (props) => {

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <p>Rating:</p>
        <Box sx={{ display: 'flex', justifyContent: 'center', border: '0.5px solid grey', borderRadius: '3px', pt: '6px', pb: '6px', backgroundColor: 'white'}}>
          <RadioGroup
            row
            label="Select a rating"
            id="review-rating"
            onChange={props.handleRatingChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
          </RadioGroup>
        </Box>
        {props.error && <Typography variant="body2" color="error" mt="5px">{props.error}</Typography>}
      </FormControl>
    </>
  );
}

export default ReviewRating;