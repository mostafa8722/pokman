import React, { useEffect, useState } from "react";
import './Login.css';
import { useOktaAuth } from "@okta/okta-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APIUrlOne, SetOktaAuthData, SetUserId, isValidEmail } from "../../../Utils/Utils";
import axios from "axios";
import Loader from "../../Loader/Loader";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        emailAddress: '',
        password: ''
    })
    const [saveUserEmail, setSaveUserEmail] = useState('');
    const validateInputs = () => {
        if (!userDetails?.emailAddress || userDetails?.emailAddress?.trim() === '') {
            toast.error("Please Enter Email address");
            return false
        }
        if (!isValidEmail(userDetails?.emailAddress)) {
            toast.error("Please Enter Valid Email Address");
            return false;
        }
        if (!userDetails?.password || userDetails?.password?.trim() === '') {
            toast.error("Please Enter Password");
            return false;
        }
        return true
    }
    const auth = useOktaAuth();
    const loggingIn = (e) => {
        e?.preventDefault();
        setLoading(true);
        if (!validateInputs()) return;

        auth.oktaAuth.signIn({ username: userDetails?.emailAddress, password: userDetails?.password })
            .then(result => {
                setLoading(false)
                SetOktaAuthData("auth", result);
                if (result?.status === "SUCCESS") {
                    const email = result?.user?.profile?.login.charAt(0).toUpperCase() + result?.user?.profile?.login.slice(1);
                    setSaveUserEmail(email);
                    login(email);

                }
                return auth.oktaAuth.isAuthenticated();
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error?.message);
            });
    };

    const login = (email) => {
        setLoading(true);
        const option = {
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "content-type": "application/json",
            },
            url: `${APIUrlOne()}/v1/get_user_id?email=${email}`,
        };
        axios(option)
            .then((e) => {
                setLoading(false);
                if (e?.status === 200) {
                    SetUserId('userId', e?.data?.user_id);
                    toast.success("User login successfully");
                    setUserDetails({
                        emailAddress: '',
                        password: ''
                    });
                    navigate('/dashboard');
                }
            })
            .catch(() => {
                setLoading(false)
            });
    }


    const loggingOut = async () => auth.oktaAuth.signOut();
    return (
        <>
            {
                loading ? <Loader /> : null
            }
            <section className="login-section-main">
                <div className="section-login-after-main">
                    <img src="../images/logo.svg" alt="logo" className="logo-login" />
                    <div className="login-card-main">
                        <div className="login-card-content-section">
                            <div className="heading-content-section">
                                <h2>Login to Account</h2>
                                <p>Please enter your email and password to continue</p>
                                <form onSubmit={loggingIn}>
                                    <div className="email-address-section">
                                        <label className="labels-login">Email address</label>
                                        <input type="text" className="email-address-input" placeholder="esteban_schiller@gmail.com" onChange={(e) => setUserDetails({ ...userDetails, emailAddress: e?.target?.value })} value={userDetails?.emailAddress} />
                                    </div>
                                    <div className="password-section-login">
                                        <label className="labels-login">Password</label>
                                        <input type="password" className="email-address-input" placeholder="**********" onChange={(e) => setUserDetails({ ...userDetails, password: e?.target?.value })} value={userDetails?.password} />
                                    </div>
                                    <div className="keep-logged-in-section">
                                        <input type="checkbox" id="keepLoggedIn" />
                                        <label htmlFor="keepLoggedIn">Keep me logged in</label>
                                    </div>
                                    <div className="login-button-section">
                                        <button type="submit" onClick={loggingIn}>Login</button>
                                    </div>
                                    {/* <div className="separator">
                                        <span>OR</span>
                                    </div> */}

                                    <div className="login-button-section-okta">
                                        {
                                            auth.authState?.isAuthenticated ?
                                                <button type="button" onClick={loggingOut}
                                                >Logout</button> :
                                                null
                                            // <button type="submit" onClick={loggingIn}
                                            // >Login with Okta</button>
                                        }

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Login;
