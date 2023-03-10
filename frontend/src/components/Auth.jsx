import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { 
            username, 
            password, 
            fullName,
        } = form;

        // const baseURL = 'http://localhost:8000/auth';
        const baseURL = 'http://localhost:8000';
        // const baseURL = 'https://chat-app-tutorial.herokuapp.com/auth'; # something like this would be needed for production

        cookies.set('username', username);

        if(isSignup) {
            // const signupURL = `${baseURL}/users/`
            const signupURL = `${baseURL}/dj-rest-auth/registration/`
            
            // const { 
            //     data: {id} 
            // } = await axios.post(signupURL, {
            //     username, password, 
            // });
            const res = await axios.post(signupURL, {
                username, password1: password, password2: password, 
            });
            
            // cookies.set('userId', id);
            cookies.set('fullName', fullName);
            console.log(res)
        } 

        if (!isSignup) {
            const loginURL = `${baseURL}/dj-rest-auth/login/`
            const res = await axios.post(loginURL, {
                username, password, 
            });
            cookies.set('authToken', res.data.key);
            
            console.log(res)

            const tokenURL = `${baseURL}/chat/my-view/`
            const res2 = await axios.get(tokenURL, {
                headers: {
                    Authorization: "Token " + res.data.key
                }
                
            });
            // cookies.set('authToken', key);
            cookies.set('streamToken', res2.data.stream_token);
            cookies.set('userId', res2.data.user_id);
            console.log(res2)
        }

        // const loginURL = `${baseURL}/token/login/`
        //     const { 
        //         data: {auth_token, stream_token} 
        //     } = await axios.post(loginURL, {
        //         username, password, 
        //     });
        //     cookies.set('authToken', auth_token);
        //     cookies.set('streamToken', stream_token);

        // if (!isSignup) {
        //     const getUserDetailsURL = `${baseURL}/users/me/`
        //     const { 
        //         data: {id}
        //     } = await axios.get(getUserDetailsURL, {
        //         headers: {
        //             Authorization: "Token " + auth_token
        //         }
                
        //     });
        //     cookies.set('userId', id);
        // }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input 
                                name="username" 
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )} */}
                        {/* {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )} */}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password" 
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth