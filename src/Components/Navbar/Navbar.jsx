import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavbarItems } from './Consts/navbar_items';
import { navBarStyles } from './styles';
import { useNavigate } from "react-router-dom";
import AppContext from '../../context/AppProvider';

const Navbar = () => {
    
  const navigate = useNavigate();
  const { onThemeChange } = React.useContext(AppContext);

  return (
    <Drawer
        sx={ navBarStyles.drawer }
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{
          backgroundColor: '#0A1131',
        }} />        
        <Divider />  
        <div className="theme-div">
          <button 
            type="button"
            onClick={() => onThemeChange('light')}>
              Light
            </button>
            <button 
            type="button"
            onClick={() => onThemeChange('dark')}>
              Dark
            </button>
        </div>   
        <Divider />
        <List>
          {mainNavbarItems.map((item, index) => (
            <ListItem 
              button
              key={ item.id }
              onClick={() => navigate(item.route)}
            >
              <ListItemButton>
                <ListItemIcon 
                  sx={ navBarStyles.icons }>
                  { item.icon }
                </ListItemIcon>
                <ListItemText 
                  sx={ navBarStyles.text }
                  primary={item.label} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>      
      </Drawer>
  )
}

export default Navbar