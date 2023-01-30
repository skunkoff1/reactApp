import { useRef, useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import AppContext from '../../context/AppProvider';
import classes from './discussion.module.css';

const ShowDiscussion = () => {
    const {user} = useContext(AppContext);
    const discussionId = useParams();
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {

        setLoading(true);
        (async () => {
            try {
              const token = user.tokenAccess;
              const request = await fetch("/v1/discussions/"+ discussionId.id, {
                method: 'GET',
                headers: {
                'content-type': 'application/json',
                'Authorization' : 'Bearer ' + token
                },
              })
        
              const response = await request.json();
              const status = request.status;
              if (status === 200) {
                setTitle(response.title);
                setDescription(response.description);
                setUsers([...response.users])
                console.log(users)
                setLoading(false)
              }
        
            } catch(err) {
              setErrMsg(err);
            }  
      
            
          })();
        return () => {
            
        };
    }, []);

    useEffect(() => {

        setLoading(true);
        (async () => {
            try {
              const token = user.tokenAccess;
              const request = await fetch("/v1/discussions/"+ discussionId.id + "/comments", {
                method: 'GET',
                headers: {
                'content-type': 'application/json',
                'Authorization' : 'Bearer ' + token
                },
              })
        
              const response = await request.json();
              const status = request.status;
              if (status === 200) {
                console.log(response);
              }
        
            } catch(err) {
              setErrMsg(err);
            }  
      
            
          })();
        return () => {
            
        };
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.left}>
                {loading ? <h1>Loading ...</h1> : 
                <div>
                    <h1>Titre : {title}</h1>
                    <h1>Deescription : {description}</h1>
                </div>
                }
            </div>
            <div className={classes.right}>
                {users.map(function(user, i){
                    return <div key={i}>
                    <p>{user.name}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ShowDiscussion