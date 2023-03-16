import React, {useRef, useState, useEffect} from 'react'
import {faCheck, faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons' 
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'

// REGEX TO Validtae The User and Password Inputs
const USER_RGXEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // Must Be Decleared Later

const Register = () => { // Functional Component => That Used To Invlvoe Hooks In It 
    // To Use Hooks Must be
    // 1- On the top level of the component 
    // 2- must be in a functional component
    // Ref The User TO Focus On It
    const userRef = useRef(); // reference to the user
    const errRef = useRef(); // reference to the error
    // The State Of The User&Validate&Focusing
    const [user, setUser] = useState(""); // state of the user input
    const [validateName, setValidateName] = useState(false);  //state of the user check if it validated or not
    const [userFocus, setUserFocus] = useState(false);  // state of check if the input is focused or not

    const [pwd, setPwd] = useState(""); // state of the user Password
    const [validatePwd, setValidatePwd] = useState(false); //state of the Pass check if it validated or not
    const [pwdFocus, setPwdFocus] = useState(false); //state of check if the Pass input is focused or not

    const [matchPwd, setMatchPwd] = useState(""); // state of the confirm Password
    const [validateMatch, setValidateMatch] = useState(false); //state of the Confirm Pass check if it validated or not
    const [matchFocus, setmatchFocus] = useState(false); //state of check if the Confirm Pass input is focused or not

    const [errMsg, setErrMsg] = useState(""); // state of the err
    const [success, setSuccess] = useState(false); // state of the successed

    // get The Date By Axios
    const allUsers = fetch('https://api.github.com/users/MuhammedKK/repos').then(res => {
        const result = res.json();

        return result;
    }).then(res => {
        console.log(res[0])
    })
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
        const result = PWD_REGEX.test(pwd); // check the validation of the pass
        setValidatePwd(result);
        setValidateMatch(pwd === matchPwd); // check if the pass match the confirm
    }, [pwd, matchPwd])

    // Clear The Err Msg When The User Is Changing His Data
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // Handle Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
        console.log(success)
    }

    return (
        <>
        {success ? (
                    <section>Form Successing Submiting <a href="/">SignIn</a></section>
                ) : ( 
                    <section>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Regiseter</h1>
                        <form action='' onSubmit={handleSubmit}>
                            <label htmlFor="username">
                                Username:
                                <span className={validateName ? 'valid' : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validateName || !user ? 'hide' : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
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
                            {/* Password Section */}
                            <label htmlFor="password">
                                Password:
                                <span className={validatePwd ? 'valid' : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validatePwd || !pwd ? 'hide' : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validatePwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && pwd && !validatePwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 Characters <br />
                                Must Contain : <br />
                                lowercase, uppercase, Numbers, Underscores, Hyphens  
                            </p>
                            {/* Matching The Password */}
                            <label htmlFor="confirmPass">
                                Confirm Password:
                                <span className={validateMatch && matchPwd ? 'valid' : "hide"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validateMatch || !matchPwd ? 'hide' : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirmPass"
                                autoComplete="off"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validateMatch ? "false" : "true"}
                                aria-describedby="confpwdnote"
                                onFocus={() => setmatchFocus(true)}
                                onBlur={() => setmatchFocus(false)}
                            />
                            <p id="confpwdnote" className={matchFocus && matchPwd && !validateMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must Two Password match each other <br />
                            </p>
                            <button disabled={!validateName || !validatePwd || !validateMatch ? true : false}>SignUp</button>
                        </form>
                    </section>
                )
            }
        </>
    )
}
export default Register;