import React from 'react';
import Grid from '@mui/material/Grid';
import CommonButton from '../../Components/common/CommonButton/CommonButton';

const Authentication = () => {

  const buttonStyles = {
    fontSize: 20,
    fontWeight: 700,
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'red'
    }
  }

  return (
    <Grid item xs={8}>
        Authentication page
        <CommonButton
          size="large"
          variant="contained"
          sx={buttonStyles}
        >
          Text
        </CommonButton>
    </Grid>
  )
}

export default Authentication