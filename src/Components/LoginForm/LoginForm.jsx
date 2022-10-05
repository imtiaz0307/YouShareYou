import React from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import './LoginForm.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'


const LoginForm = () => {
    const { loginEmail, loginPassword, login } = useContext(AppContext)
    const navigate = useNavigate()
    const [incorrectEmail, setIncorrectEmail] = useState(false)
    const [incorrectPassword, setIncorrectPassword] = useState(false)
    return (
        <div className="formWrapper">
            <h1>Login to your account.</h1>
            <form className='Form loginForm' onSubmit={async (e) => {
                e.preventDefault()
                let data = await login()
                data.success && navigate('/stories')
                data.error && data.error.toLowerCase().includes('email') ? setIncorrectEmail(true) : setIncorrectEmail(false)
                data.error && data.error.toLowerCase().includes('password') ? setIncorrectPassword(true) : setIncorrectPassword(false)
            }}>
                <label htmlFor='loginEmail'>Enter your Email</label>
                <input type="email" placeholder='abc@xyz.com' id='loginEmail' ref={loginEmail} required style={{ borderColor: `${incorrectEmail ? 'red' : 'black'}` }} />
                <label htmlFor="loginPassword">Enter your Password</label>
                <input type="password" placeholder='Password' id='loginPassword' ref={loginPassword} required minLength={6} style={{ borderColor: `${incorrectPassword ? 'red' : 'black'}` }} />
                <button type='submit' className='btn login-btn'>Login</button>
            </form>
            <NavLink to='/signup'>Don't have an account? Sign up now.</NavLink>
        </div>
    )
}

export default LoginForm