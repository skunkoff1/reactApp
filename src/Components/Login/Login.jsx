import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../../Style/form.module.css';
import AppContext from '../../context/AppProvider';


// eslint-disable-next-line no-useless-escape
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = ({handleLogin}) => {

    const { onUserChange } = useContext(AppContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
      emailRef.current.focus();    
      return () => {        
      }
    }, [])
    
    useEffect(() => {
      const result = MAIL_REGEX.test(email);
      setValidEmail(result);
      return () => {
      }
    }, [email])

    useEffect(() => {
      const result = PWD_REGEX.test(password);
      setValidPwd(result);
      return () => {
      }
    }, [password])

    const handleSubmit = async(e) => {
      e.preventDefault();

      try {

        const body = {email, password};

        const request = await fetch("/v1/auth/login", {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const response = await request.json();
        const status = await request.status;
        console.log(status)

        if(status === 200) {
            console.log(response);
            const tokenAccess = response.tokens.access.token;
            const tokenRefresh = response.tokens.refresh.token;
            const role = response.user.role;
            const name = response.user.name;
            const email = response.user.email;
            const id = response.user.id;
            const user = {
              id: id,
              name: name,
              email: email,
              tokenAccess : tokenAccess,
              tokenRefresh: tokenRefresh,
              role: role
            }
            onUserChange(user)
            setMsg("Connection réussie");
            // window.location.href = "/"
        }
        else {
            setErrMsg(response.message);
        }
      } catch(err) {
            setErrMsg(err.message);
      }
    }

  return (
    <section>
        <p ref={errRef} className={errMsg ? classes.errMsg : classes.offscreen} aria-live="assertive">{errMsg}</p>
        <p className={msg ? classes.success : classes.offscreen} aria-live="assertive">{msg}</p>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
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
            aria-describedby='pwdnote'
            aria-invalid={validPwd ? "false" : "true"}
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

          <button disabled={!validEmail || !validPwd ? true : false}>Se connecter</button>

        </form>

        <p>
          Pas encore enregistré ?<br />
          <span 
            className={classes.line}
            onClick={() => handleLogin("false")}
            >
            Créer un compte
          </span>
        </p>

    </section>
  )
}

export default Login