import { useRef, useState, useEffect, useContext } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Label } from '@mui/icons-material';
import classes from '../../Style/form.module.css';
import AppContext from '../../context/AppProvider';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// eslint-disable-next-line no-useless-escape
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = ({handleLogin}) => {

    const {theme} = useContext(AppContext);

    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [name, setUserName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
      userRef.current.focus();    
      return () => {        
      }
    }, [])
    
    useEffect(() => {
      const result = USER_REGEX.test(name);
      setValidName(result);
      return () => {
      }
    }, [name])

    useEffect(() => {
      const result = MAIL_REGEX.test(email);
      setValidEmail(result);
      return () => {
      }
    }, [email])
    
    useEffect(() => {
      const result = PWD_REGEX.test(password);
      setValidPwd(result);
      const match = password === matchPwd;
      setValidMatch(match);    
      return () => {
      }
    }, [password, matchPwd])
    
    useEffect(() => {
      setErrMsg('');    
      return () => {
      }
    }, [name, password, matchPwd])
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      try {
        const body = {name, email, password};
  
        const request = await fetch("/v1/auth/register", {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
             'accept': 'application/json',
          },
          body: JSON.stringify(body),
        })
  
        const response = await request.json();
        const status = await request.status;
        console.log(status)
  
        if(status === 201) {
          console.log(response);
          setMsg("Enregistrement effectué.<br>Vous allez être redirigé vers la page de connexion.");
          setTimeout(() => {
            handleLogin("true");            
          }, 2000);
        }
        else {
          setErrMsg(response.message);
        }
      } catch(err) {
        setErrMsg(err.message);
      }

    }

    


  return (
    <section className={theme === 'light' ?  classes.light : classes.dark}>
        <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>
        <p className={msg ? classes.success : classes.offscreen} aria-live="assertive">{msg}</p>
        <h1>Enregistrement</h1>
        <form onSubmit={handleSubmit} >
          <label htmlFor='username'>
            Nom d'utilisateur:
            <span className={validName ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validName || !name ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>
          </label>
          <input 
            type='text'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)} 
          />
          <p id="uidnote" className={userFocus && name && !validName ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            De 4 à 24 caractères.<br />
            Doit commencer par une lettre.<br/>
            Lettres, chiffres, tirets et underscore autorisés.
          </p>

          <label htmlFor='email'>
            Email:
            <span className={validEmail ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validEmail || !email ? classes.hide : classes.invalid}>
              <FontAwesomeIcon icon={faTimes} />              
            </span>
          </label>
          <input 
            type='text'
            id='email'
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby='emailnote'
            aria-invalid={validEmail ? "false" : "true"}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)} 
          />

          <p id="e;qilnote" className={emailFocus && email && !validEmail ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Entrez un email valide.
          </p>

          <label htmlFor='pwd'>
            Mot de passe:
            <span className={validPwd ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />              
            </span>
            <span className={validPwd || !password ? classes.hide : classes.invalid}>
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
          <p id="pwdnote" className={pwdFocus && password && !validPwd ? classes.instructions : classes.offscreen}>
            <FontAwesomeIcon icon={faInfoCircle} />
            De 8 à 24 caractères.<br />
            Au moins une majuscule, une minuscule, un chiffre et un caractère spécial.<br />
            Caractères spéciaux autorisés: 
            <span aria-label="exclamation mark">!</span> 
            <span aria-label="at symbol">@</span> 
            <span aria-label="hashtag">#</span> 
            <span aria-label="dollar sign">$</span> 
            <span aria-label="percent">%</span>
          </p>


          <label htmlFor='matchpwd'>
            Confirmez le mot de passe:
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
            Les mots de passes doivent correspondre.
          </p>

          <button disabled={!validName || !validPwd || !validMatch ? true : false}>S'enregistrer</button>

        </form>

        <p>
          Déjà enregistré ?<br />
          <span 
            className={classes.line} 
            onClick={() => handleLogin("true")}
            >
            Connectez vous !
          </span>
        </p>

    </section>
  )
}

export default Register