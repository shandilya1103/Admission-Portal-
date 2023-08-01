import React, {useState} from "react";
import Head from 'next/head';
import { useNotifier } from 'react-headless-notifier';

import { DangerNotification } from '../src/components/notifications';
import { PasswordHideIcon } from '../src/icons/password-hide'
import { PasswordShowIcon } from '../src/icons/password-show'
import { AuthLogin } from '../src/services/authentication.js'

import styles from '../styles/auth.module.scss';

interface formData {
    preventDefault: any,
    target: signinForm
}

interface signinForm {
    email: { value: string },
    password: { value: string },
}

function SigninPage() {
    const { notify } = useNotifier();
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    React.useEffect(() => {
        const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
        if (!!AUTH_TOKEN) {
            window.location.replace('/');
        }
    }, [])

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        let params = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        try {
            let response: any = await AuthLogin(params);
            if(response?.error) {
                throw new Error(response?.error);
            } else if (response) {
                console.log(response.data.key)
                localStorage.setItem("AUTH_TOKEN", response.data.key);
                window.location.replace('/');
            }
        } catch (err: any) {
            notify(<DangerNotification message={err.message} />);
        }
    }

    return (
        <div>
            <Head>
                <title>PU Meet Login</title>
            </Head>
            <div className={styles.__page_auth}>
                <div className={styles.content_wrapper}>
                    <div className={`${styles._box} flex flex-col justify-center`}>
                        <div className={styles.header}>
                            <h2>Sign In</h2>
                        </div>
                        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
                            <div className="my-2">
                                <label htmlFor="email">Your email</label>
                                <div className={styles.input}>
                                    <input type="email" name="email" id="email" placeholder="e.g. kashish@gmail.com" />
                                </div>
                            </div>
                            <div className="my-2">
                                <label htmlFor="email">Your password</label>
                                <div className={styles.input + " flex"}>
                                    <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="e.g. 2$F04Hr@6RMr" />
                                    <div className="flex justify-content-center items-center">
                                        <span className={styles.toggle} onClick={() => setPasswordVisibility(!isPasswordVisible)}>
                                            {isPasswordVisible ? <PasswordShowIcon /> : <PasswordHideIcon />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="my-2 flex justify-end">
                                <span style={{ fontSize: "14px", color: "#0d6efd" }}>Forgot password?</span>
                            </div>
                            <div className="my-4">
                                <button className="theme-btn">Sign In</button>
                            </div>
                            <div className="text-center">
                                <p>Don't have an account? <a href="/signup" className="link">Sign Up</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage;
