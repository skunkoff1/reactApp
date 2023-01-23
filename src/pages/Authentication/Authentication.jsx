import React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
// import CommonButton from '../../Components/common/CommonButton/CommonButton';
import Register from '../../Components/Register/Register';
import Login from '../../Components/Login/Login';

const Authentication = () => {

  const [login, setLogin] = useState("false");

  const handlelogin = (value) => {
      setLogin(value)
  }

  return (
    <Grid 
      item xs={8}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      login={login}
    >
        {/* Authentication page
        <CommonButton
          size="large"
          variant="contained"
          sx={buttonStyles}
        >
          Text
        </CommonButton> */}
        {login==="true" ? 
          <Login handleLogin={handlelogin}/> 
          :  <Register handleLogin={handlelogin}/> }
                
              
    </Grid>
  )
}

export default Authentication