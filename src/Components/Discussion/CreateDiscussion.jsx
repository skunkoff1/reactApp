import { useRef, useState, useEffect, useContext } from 'react';
import AppContext from '../../context/AppProvider';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './discussion.module.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
// import Stack from '@mui/material/Stack';

const CreateDiscussion = () => {

  const {user} = useContext(AppContext);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [msg, setMsg] = useState('');

  const [title, setTitle] = useState('');
  const [validTitle, setValidTitle] = useState(false);
  const [description, setDescription] = useState('');
  const [validDescription, setValidDescription] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [validSelectedUser, setValidSelectedUser] = useState(false)
  const [userIds, setUserIds] = useState(null);
  const [open, setOpen] = useState(false);
  const loading = open && userNames.length === 0;

  useEffect(() => {
    if(title !== '') {
      setValidTitle(true);
    }
    else {
      setValidTitle(false);
    }
    return () => {
    }
  }, [title]);

  useEffect(() => {
    if(description !== '') {
      setValidDescription(true);
    }
    else {
      setValidDescription(false);
    }
    return () => {
    }
  }, [description]);

  useEffect(() => {
    if(selectedUser !== null) {
      let array = [selectedUser.id]
      setUserIds(array)
      setValidSelectedUser(true);
    }
    else {
      setValidSelectedUser(false);
    }
    return () => {
    }
  }, [selectedUser]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const token = user.tokenAccess;
        const request = await fetch("/v1/users", {
          method: 'GET',
          headers: {
          'content-type': 'application/json',
          'Authorization' : 'Bearer ' + token
          },
        })
  
        const response = await request.json();
        
        if (active) {
          setUserNames([...response]);
        }
  
      } catch(err) {
        setErrMsg(err);
      }  

      
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const onSelectUser = (e, newValue) => {
    setSelectedUser(newValue);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

      const body = {title,description, userIds}
      
      const request = await fetch("/v1/discussions", {
        method: 'POST',
        headers: {
        'content-type': 'application/json',
        'Authorization' : 'Bearer ' + user.tokenAccess
        },
        body: JSON.stringify(body),

      })
      const response = await request.json();
      const status = request.status;

      if(status === 201) {
        console.log(response)
        setMsg('discussion créée')
      }

    }catch(err) {
      setErrMsg(err.message);
    }
  }


  return (
    <div className="form-container">
        <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>
        <p className={msg ? classes.success : classes.offscreen} aria-live="assertive">{msg}</p>
        <h1>Création d'une discussion</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor='title'>
            Titre de la discussion:    
            <span className={validTitle ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validTitle || !title ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>        
        </label>
        <input 
            type='text'
            id='title'
            autoComplete="off"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        <label htmlFor='description'>
            Description de la discussion :    
            <span className={validDescription ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validDescription || !description ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>         
        </label>
        <input 
          type='text'
          id='description'
          required
            onChange={(e) => setDescription(e.target.value)}
        />
         <label htmlFor='selecter'>
            Choisir un utilisateur :    
            <span className={validSelectedUser ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validSelectedUser || !description ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>         
        </label>
        <Autocomplete className={classes.autocomplete}        
          id="selecter"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(user, value) => user.id === value.id}
          getOptionLabel={(user) => user.name}
          options={userNames}
          loading={loading}
          onChange={onSelectUser}
          value={selectedUser}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(users) => (
          <TextField 
            {...users}
            label=""
            margin="normal"
            InputProps={{
              ...users.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {users.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
          )}
        />
        <button disabled={!validDescription || !validTitle || !validSelectedUser ? true : false}>Créer la discussion</button>

        </form>        

    </div>
  )
}

export default CreateDiscussion