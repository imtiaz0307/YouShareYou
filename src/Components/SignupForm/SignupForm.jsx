import React from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'


const SignupForm = () => {
    const { signupEmail, signupPassword, username, signUp, getAllPosts } = useContext(AppContext)
    const navigate = useNavigate()
    const [incorrectEmail, setIncorrectEmail] = useState(false)
    const [incorrectUsername, setIncorrectUsername] = useState(false)
    return (
        <div className="formWrapper">
            <h1>Sign Up to YouShareYou.</h1>
            <form className='Form signupForm' onSubmit={async (e) => {
                e.preventDefault()
                getAllPosts()
                let data = await signUp()
                data.success && navigate('/stories')
                data.error && data.error.toLowerCase().includes('email') ? setIncorrectEmail(true) : setIncorrectEmail(false)
                data.error && data.error.toLowerCase().includes('username') ? setIncorrectUsername(true) : setIncorrectUsername(false)
            }}>
                <label htmlFor='username'>Username</label>
                <input type="string" placeholder='abc123' id='username' ref={username} required minLength={4} maxLength={20} style={{borderColor: `${incorrectUsername ? 'red' : 'black'}`}} />

                <label htmlFor='signupEmail'>Email</label>
                <input type="email" placeholder='abc@xyz.com' id='signupEmail' ref={signupEmail} required style={{borderColor: `${incorrectEmail ? 'red' : 'black'}`}}/>

                <label htmlFor="signupPassword">Password</label>
                <input type="password" placeholder='Password' id='signupPassword' ref={signupPassword} required minLength={6} />

                <button type='submit' className='btn login-btn'>Sign Up</button>
            </form>
            <NavLink to='/login'>Already have an account? Login now.</NavLink>
        </div>
    )
}

export default SignupForm