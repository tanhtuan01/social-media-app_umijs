import { useState } from 'react';
import '../../assets/base.less'
import '../../assets/sign/style.less'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { history } from 'umi';

import { apiUser } from "@/api/user";
export default function LoginHomePage() {

    const userApi = apiUser();
    const getUser = userApi.getUser

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('')
    function submitLogin() {
        console.log('Form submitted');
        console.log(`Username: ${username}, Password: ${password}`);
        getUserDetails(username, password)
    }

    async function getUserDetails(emailOrPhone: string, password: string) {
        //const result = await getUser(emailOrPhone, password);
        const { token, result } = await getUser(emailOrPhone, password);

        if (!token) {
            toast.error('Log in failed. Please try again.');
        } else {
            setToken(token);
            toast.success("Login success");
            setUsername('');
            setPassword('');
            localStorage.setItem('token', token);
            history.push('/home');

        }
    }



    return (
        <div className='body-sign'>
            <ToastContainer />
            <div className='content'>

                <div className="information">
                    <div>
                        <h1 className="title">
                            SOCIAL MEDIA APP
                        </h1>
                        <p>
                            A website demo using Umi JS
                        </p>
                    </div>
                </div>

                <div className="form-login">

                    <form action="">
                        <h1 className='title txt-center'>
                            Login
                        </h1>
                        <div className="form-group">
                            <input type="text" name="" id="" value={username} onChange={event => setUsername(event.target.value)} placeholder='Enter your email or phone number' />
                        </div>
                        <div className="form-group">
                            <input type="password" name="" id="" value={password} onChange={event => setPassword(event.target.value)} placeholder='Enter your password' />
                        </div>

                        <button type='button' className='btn btn-submit-login' onClick={submitLogin}>Login</button>
                        <hr />
                        <p className='txt-center'>
                            <a href="">Forgotten password?</a>
                        </p>
                        <div>
                            <a href="/register" className='btn'>
                                Sign Up
                            </a>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )

}