import { useState } from "react";
import '../../assets/sign/style.less'
export default function RegisterHomePage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [sex, setSex] = useState('');

    function submitLogin() {

        console.log('Form submitted');
        // console.log(`Username: ${username}, Password: ${password}`);
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

                <div className="form-sign-up">
                    <form action="">

                        <div className="form-group">
                            <label htmlFor="">Fullname</label>
                            <input type="text" name="" id="" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Phone or Email</label>
                            <input type="text" name="" id="" value={username} onChange={event => setUsername(event.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Sex</label>
                            <div className="form-sex">
                                <div className="option">
                                    <label htmlFor="radioSexMale">Male</label>
                                    <input type="radio" name="sex" value='male' id="radioSexMale" />
                                </div>
                                <div className="option">
                                    <label htmlFor="radioSexFemale">Female</label>
                                    <input type="radio" name="sex" value='female' id="radioSexFemale" />
                                </div>
                                <div className="option">
                                    <label htmlFor="radioSexOther">Other</label>
                                    <input type="radio" name="sex" value='other' id="radioSexOther" />
                                </div>
                            </div>
                        </div>

                        <button type='button' className='btn btn-submit-login' onClick={submitLogin}>Sign Up</button>
                        <hr />

                        <div>
                            <p>
                                Do you have an account? <a href="/login">Login</a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}