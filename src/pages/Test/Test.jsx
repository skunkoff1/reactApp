import React from 'react';
import AppContext from '../../context/AppProvider';

const Test = () => {

  const {user} = React.useContext(AppContext);

  return (
    <section>
        <p>{user.id}</p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.tokenAccess}</p>
        <p>{user.tokenRefresh}</p>
        <p>{user.role}</p>
    </section>
  )
}

export default Test