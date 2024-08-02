import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


const ReviewTitle = (props) => {

  return (
    <>
      <p>Title:</p>
      <FormControl fullWidth>
        <TextField 
          id="review-title"
          label="Enter a title" 
          variant="outlined"
          type="text"
          value={props.enteredTitle}
          onChange={props.onTitleInput}
          sx={{ backgroundColor: 'white'}}
        />
        {props.error && <Typography variant="body2" color="error" mt="5px">{props.error}</Typography>}
      </FormControl>
    </>
  );
}

export default ReviewTitle;