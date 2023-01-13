import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import '../login.css'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    return <>
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5" id="form1">
                        <div className="form-data" >
                            <div className="forms-inputs mb-4"><span>Email or username</span>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="invalid-feedback">A valid email is required!</div>
                            </div>
                            <div className="forms-inputs mb-4"><span>Password</span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="invalid-feedback">Password must be 8 character!</div>
                            </div>
                            <div className="mb-3" onClick={onLogin}>
                                <button className="btn btn-dark w-100">Connexion</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*<h1>Login</h1>
        <br />
        <form>
            <div>
                <label htmlFor="email-address">
                    Email address
                </label>
                <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button
                    onClick={onLogin}
                >
                    Login
                </button>
            </div>
        </form>*/}
    </>
}