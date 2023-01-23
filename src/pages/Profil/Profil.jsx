import React from 'react';
import AuthContext from '../../context/AppProvider';
import UpdateForm from '../../Components/UpdateForm/UpdateForm';
const Profil = () => {

  const {user} = React.useContext(AuthContext);

  return (
    <div>
        {user.name === null ? 
          <p>Connectez vous</p>  
          :
          <UpdateForm/>
        }
    </div>
  )
}

export default Profil