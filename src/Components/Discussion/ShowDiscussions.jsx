import { useRef, useState, useEffect, useContext } from 'react';
import AppContext from '../../context/AppProvider';
import classes from './discussion.module.css';

const ShowDiscussions = () => {

  const {user} = useContext(AppContext);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {

    setLoading(true);

    (async () => {
      try {
        const token = user.tokenAccess;
        const request = await fetch("/v1/users/"+ user.id + "/discussions", {
          method: 'GET',
          headers: {
          'content-type': 'application/json',
          'Authorization' : 'Bearer ' + token
          },
        })
  
        const response = await request.json();
        const status = request.status;
        if (status === 200) {
          setLoading(false);
          setDiscussions([...response]);
          console.log(response)
        }
  
      } catch(err) {
        setErrMsg(err);
      }  

      
    })();

    return () => {
      setLoading(true)
    };
  }, []);

  const goToDiscussion = async(item) => {
    window.location.href = "/discussion/" + item.id
  }

  return (
    <div>
      {loading ? <p>Loading ...</p> : 
      discussions.map(function(item, i){
        return <div onClick={()=>goToDiscussion(item)} className={classes.discussions} key={i}>
          <p>Titre : {item.title}</p>
          <p>Description : {item.description}</p>
        </div>
      })
      }

    </div>
  )
}

export default ShowDiscussions