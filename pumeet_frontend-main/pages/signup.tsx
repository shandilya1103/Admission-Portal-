import React from "react";
import Head from 'next/head';
import { useNotifier } from 'react-headless-notifier';

import { DangerNotification } from '../src/components/notifications';
import { PasswordHideIcon } from '../src/icons/password-hide';
import { PasswordShowIcon } from '../src/icons/password-show';
import { AuthRegistration } from '../src/services/authentication.js';

import styles from '../styles/auth.module.scss';

interface formData {
    preventDefault: any,
    target: signupForm
}

interface signupForm {
    email: { value: string },
    password1: { value: string },
    password2: { value: string },
}

function SignupPage() {
    const { notify } = useNotifier();
    const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

    React.useEffect(() => {
       localStorage.removeItem('AUTH_TOKEN') 
    }, [])

    const handleSubmit = async(e: formData) => {
        e.preventDefault();
        let params = {
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value
        }
        try {
            let response: any = await AuthRegistration(params);
            if(response?.error) {
                throw new Error(response?.error);
            } else if(response) {
                window.location.replace('/signin');
            }
        } catch (err: any) {
            notify(<DangerNotification message={err.message} />);
        }
    }

    return (
        <div>
            <Head>
                <title>PU Meet SignUp</title>
            </Head>
            <div className={styles.__page_auth}>
                <div className={styles.content_wrapper}>
                    <div className={`${styles._box} flex flex-col justify-center`}>
                        <div className={styles.header}>
                            <h2>Sign Up</h2>
                        </div>
                        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
                            <div className="my-2">
                                <label htmlFor="email">Email</label>
                                <div className={styles.input}>
                                    <input type="email" name="email" id="email" placeholder="e.g. kashish@gmail.com" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="email">Password</label>
                                <div className={styles.input + " flex mb-4"}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password1" id="password1" placeholder="e.g. 2$F04Hr@6RMr" />
                                    <div className="flex justify-center items-center">
                                        <span className={styles.toggle} onClick={() => setPasswordVisibility(!isPasswordVisible)}>
                                            {isPasswordVisible ? <PasswordShowIcon /> : <PasswordHideIcon />}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.input}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password2" id="password2" placeholder="Confirm password" />
                                </div>
                            </div>
                            <div className="my-2 flex justify-content-end">
                                <span className="link">Forgot password?</span>
                            </div>
                            <div className="mt-4">
                                <button className="theme-btn mb-4">Sign Up</button>
                                <p className="text-center mb-1" style={{color: "rgba(0, 0, 0, 0.45)"}}>By signing up you agree to our <a href="#">Terms & Conditions.</a></p>
                            </div>
                            <div className="text-center">
                                <p>Already have an account? <a className="link" href="/signin">Sign In</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;
