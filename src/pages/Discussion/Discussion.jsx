import React from 'react';
import classes from './discussion.module.css';
import CreateDiscussion from '../../Components/Discussion/CreateDiscussion';
import ShowDiscussions from '../../Components/Discussion/ShowDiscussions';

const Discussion = () => {

  const [navigation, setNavigation] = React.useState("showMessages")
  const handlelNavigation = (value) => {
    setNavigation(value)
}

  return (
    <div className={classes.container}>
      <div className={classes.left}>
      {navigation === 'create' ? 
        <CreateDiscussion /> : null
      }
      {navigation === 'showMessages' ? 
        <ShowDiscussions /> : null
      }
      </div>
      <div className={classes.right}>
        <p className={classes.link} onClick={()=>handlelNavigation('create')}>Créer une discussion</p>
        <p className={classes.link} onClick={()=>handlelNavigation('showMessages')}>Voir mes discussions</p>

      </div>
    </div>
  )
}

export default Discussion