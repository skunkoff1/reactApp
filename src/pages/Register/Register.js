import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label } from '@mui/icons-material';
import classes from './register.module.css'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      userRef.current.focus();    
      return () => {        
      }
    }, [])
    
    useEffect(() => {
      const result = USER_REGEX.test(user);
      console.log(result);
      console.log(user);
      setValidName(result);
      return () => {
      }
    }, [user])
    
    useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);    
      return () => {
      }
    }, [pwd, matchPwd])
    
    useEffect(() => {
      setErrMsg('');    
      return () => {
      }
    }, [user, pwd, matchPwd])
    

  return (
    <section>
        <p ref={errRef} className={classes.errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form>
          <label htmlFor='username'>
            Username:
            <span className={validName ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validName || !user ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>
          </label>
          <input 
            type='text'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)} 
          />
          <p id="uidnote" className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.<br />
            Must begin with a letter.<br/>
            Letters, numbers, underscores, hyphens allowed.
          </p>


          <label htmlFor='pwd'>
            Password:
            <span className={validPwd ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validPwd || !pwd ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>
          </label>
          <input 
            type='password'
            id='pwd'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)} 
          />
          <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: 
            <span aria-label="exclamation mark">!</span> 
            <span aria-label="at symbol">@</span> 
            <span aria-label="hashtag">#</span> 
            <span aria-label="dollar sign">$</span> 
            <span aria-label="percent">%</span>
          </p>


          <label htmlFor='matchpwd'>
            Confirm password:
            <span className={validMatch && matchPwd ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validMatch || !matchPwd ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>
          </label>
          <input 
            type='password'
            id='matchpwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="matchnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)} 
          />
          <p id="matchnote" className={matchFocus && matchPwd && !validMatch ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

        </form>
    </section>
  )
}

export default Register