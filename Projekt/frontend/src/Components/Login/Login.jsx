import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, json } from 'react-router-dom'
import bcrypt from 'bcryptjs'

import './Login.css'
import MyRoutes from '../MyRoutes/MyRoutes'

const Login = () => {
    
    const navigate = useNavigate()

    const [action, setAction] = useState("Login")
    const [update, forceUpdate] = useState(false)
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    const location = useLocation().pathname;

    useEffect(() => {
        const middle = () => {
            if (localStorage.getItem("user")) {
                navigate("/homepage")
                return (<MyRoutes />)
            }
            if (location !== "/") {
                navigate("/")
            }
        }
        middle()
    }, [update])

    const handleSignup = async (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        if (username.length === 0 || password.length === 0) {
            alert("Please fill out both forms.")
            usernameInputRef.current.value = ""
            passwordInputRef.current.value = ""
            return
        }
        if (username.indexOf(' ') >= 0) {
            alert("Invalid character in username. or something, probably a blankspace #tswift")
            usernameInputRef.current.value = ""
            return
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

            const res = await fetch(`http://localhost:3000/user`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: username, password: hashedPassword }),
                method: "POST"
            })
            if (res.status === 201) {
                alert("You have been signed up!")
            }
            else if (res.status === 409) {
                alert("User already exists!")
            }
            else {
                alert("Error " + res.status + " occured.") 
            }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const username = usernameInputRef.current.value
        const password = passwordInputRef.current.value

        if ( username === "" || password === "" ) {
            alert("Please fill out both forms.")
            return
        } 

        let response = await fetch(`https://localhost:3443/login`, {
                headers: {
                     'Content-Type': 'application/json'
                 },
                method: "POST",
                body: JSON.stringify({username: username, password: password}),
            })

        if (response.status === 200) {
            response = await response.json()
            localStorage.setItem("user", response.username)
            localStorage.setItem("token", response.token)
            forceUpdate(true)
        }
        else {
            alert('Error ' + response.status)
        }
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <input type="text" placeholder="skriv ditt namn här. eller nåt. upp till dig" ref={usernameInputRef} />
                </div>
                <div className='input'>
                    <input type="password" placeholder="lösenord. om du känner för det" ref={passwordInputRef} />
                </div>

                {action === "Sign Up"
                    ?
                    <div className="forgot-password"> Already have an account? <span onClick={() => { setAction("Login") }}> Log in here! </span> </div>
                    :
                    <div className="forgot-password"> Don't have an account? <span onClick={() => { setAction("Sign Up") }}> Sign up here! </span> </div>
                }

                {action === "Sign Up"
                    ?
                    <div className="submit" onClick={(e) => handleSignup(e)}>{action}</div>
                    :
                    <div className="submit" onClick={(e) => handleLogin(e)}>{action}</div>
                }
            </div>
        </div>
    )
}

export default Login