import Navbar from './Components/Navbar/Navbar';
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
import AppContext from './context/AppProvider'
import { useState } from 'react';
import classes from '../src/Style/app.module.css'


function App() {
  
  // const user = {
  //   name: 'defaultName',
  //   email: 'defaultMail',
  //   tokenAccess: 'defaultTokenAccess',
  //   tokenRefresh: 'defaultTokenRefresh',
  //   role: 'defaultRole',
  // }

  const [user, setUser] = useState(
    {
      id: null,
      name: null,
      email: null,
      tokenAccess: null,
      tokenRefresh: null,
      role: null,
    }
  );

  const [theme, setTheme] = useState('light')

  const onUserChange = (user) => setUser(user);
  const onThemeChange = (theme) => {setTheme(theme); console.log(theme);}

  return (
    <AppContext.Provider value={{user, theme, onUserChange, onThemeChange}}>
      <Grid container className={theme==='light' ? classes.light : classes.dark}>
        <Navbar />
        <Outlet />
      </Grid>
    </AppContext.Provider>
  );
}

export default App;
