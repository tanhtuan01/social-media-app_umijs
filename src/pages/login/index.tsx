import { useState } from 'react';
import '../../assets/base.less'
import '../../assets/sign/style.less'
export default function LoginHomePage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin() {
        console.log('Form submitted');
        console.log(`Username: ${username}, Password: ${password}`);
    }

    return (
        <div className='body-sign'>

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