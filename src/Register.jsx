import React, {useRef, useState, useEffect} from 'react'
import {faCheck, faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const USER_RGXEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^=.(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;

const Register = () => {
    // Ref The User TO Focus On It
    const userRef = useRef();
    const errRef = useRef();
    // The State Of The User&Validate&Focusing
    const [user, setUser] = useState("");
    const [validateName, setValidateName] = useState(false); 
    const [userFocus, setUserFocus] = useState(false); 

    const [pwd, setPwd] = useState("");
    const [validatePwd, setValidatePwd] = useState(false); 
    const [pwdFocus, setPwdFocus] = useState(false); 

    const [matchPwd, setMatchPwd] = useState("");
    const [validateMatch, setValidateMatch] = useState(false); 
    const [matchFocus, setmatchFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    // Focus On The User Input When Component Mount
    useEffect(() => {
        userRef.current.focus();
    },[] )

    // check if the username is validate in runtime
    useEffect(() => {
        const result = USER_RGXEX.test(user);
        console.log(result);
        console.log(user);
        setValidateName(result);
    }, [user])

    // Check The Password And The Match
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidatePwd(result);
        const match = pwd === matchPwd;
        setMatchPwd(match);
    }, [pwd, matchPwd])

    // Clear The Err Msg When The User Is Changing His Data
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Regiseter</h1>
            <form action="">
                <label htmlFor="username">
                    Username:
                    <span className={validateName ? 'valid' : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validateName || !user ? 'hide' : "invalid"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validateName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validateName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 Characters <br />
                    Must Begin With a letter. <br />
                    Letters, Numbers, Underscores, Hyphens Allowed 
                </p>
            </form>
        </section>
    )
}
export default Register;