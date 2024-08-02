import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const ReviewBody = (props) => {

  return (
    <>
      <p>Review:</p>
      <FormControl fullWidth>
        <TextField
          id="review-body"
          label="Enter a review" 
          variant="outlined"
          multiline
          rows={4}
          type="text"
          value={props.enteredReview}
          onChange={props.onReviewBodyInput}
          inputProps={{ maxLength: 200 }}
          sx={{ backgroundColor: 'white'}}
        />
        {props.error && <Typography variant="body2" color="error" mt="5px">{props.error}</Typography>}
      </FormControl>
    </>
  );
}

export default ReviewBody;