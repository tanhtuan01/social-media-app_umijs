import { useState } from "react";
import '../../assets/base.less'
import '../../assets/sign/style.less'

import { apiUser } from "@/api/user";
// const text = { apiUser }
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns';

export default function RegisterHomePage() {
    const userApi = apiUser();
    const create = userApi.create

    const currentYear = new Date().getFullYear();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [sex, setSex] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [day, setDay] = useState(1);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(currentYear);
    const [showDayOptions, setShowDayOptions] = useState(false);
    const [showMonthOptions, setShowMonthOptions] = useState(false);
    const [showYearOptions, setShowYearOptions] = useState(false);

    const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
    const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleDayInputClick = () => {
        setShowDayOptions(true);
        setShowMonthOptions(false);
        setShowYearOptions(false);
    };

    const handleMonthInputClick = () => {
        setShowMonthOptions(true);
        setShowDayOptions(false);
        setShowYearOptions(false);
    };

    const handleYearInputClick = () => {
        setShowYearOptions(true);
        setShowDayOptions(false);
        setShowMonthOptions(false);
    };

    let isValidDate = false;

    function submitLogin() {
        console.log('Form submitted');
        console.log(`Selected Day: ${day}`);
        console.log(`Selected Month: ${month}`);
        console.log(`Selected Year: ${year}`);
        // console.log(`Username: ${username}, Password: ${password}`);

        // check date
        checkDate()

        const userDTO = {
            name: username,
            emailOrPhone: emailOrPhone,
            sex: sex,
            password: password,
            dateOfBirth: formatDate(`${year}-${month}-${day}`),
        }

        createUser(userDTO)

    }

    async function createUser(userDTO: Object) {
        const result = await create(userDTO);
        if (result.error) {
            toast.error('User registration failed');
        } else {
            console.log('Người dùng được tạo:', result);
            toast.success('User registered successfully');
            setUsername('');
            setPassword('');
            setRePassword('');
            setEmailOrPhone('')
            setSex('')
        }
    }

    const formatDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    function checkDate() {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            console.log('This is a leap year');
            switch (month) {
                case 2:
                    isValidDate = (day > 29) ? false : true
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    isValidDate = (day > 30) ? false : true
                    break;
                default:
                    return
            }
        } else {
            console.log('This is not a leap year');
            switch (month) {
                case 2:
                    isValidDate = (day > 28) ? false : true
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    isValidDate = (day > 30) ? false : true
                    break;
                default:
                    return
            }
        }
        if (!isValidDate) {
            toast.error('Form is not valid');
            return
        }
    }

    const handleDayOptionClick = (dayOption: number) => {
        setDay(dayOption);
        setShowDayOptions(false)

    }

    const handleMonthOptionClick = (monthOption: number) => {
        setMonth(monthOption);
        setShowMonthOptions(false)
    }

    const handleYearOptionClick = (yearOption: number) => {
        setYear(yearOption);
        setShowYearOptions(false)
    }

    const handleInputPasswordClick = () => {
        // if (password.length < 8 && rePassword.length < 8) {
        //     toast.error('Password must be at least 8 characters long');
        // }
    }

    let inputPasswordValid = false
    const [txtPasswordError, setTxtPasswordError] = useState('')
    let inputRePasswordValid = false
    const [txtRePasswordError, setTxtRePasswordError] = useState('')

    const handleInputPasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value

        if (password.length >= 8) {
            inputPasswordValid = true
            setPassword(password)
            setTxtPasswordError('')
        } else if (password.length < 8) {
            inputPasswordValid = false
            setTxtPasswordError('Password must be at least 8 characters long')
        } else {
            inputPasswordValid = false
            inputRePasswordValid = false
            setTxtRePasswordError('Password not match')
            setTxtPasswordError('Password not match')
        }
    }



    const handleInputRePasswordValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const repassword = event.target.value

        if (repassword !== password) {
            inputRePasswordValid = false
            setTxtRePasswordError('Password not match')
            setTxtPasswordError('Password not match')
        } else {
            inputRePasswordValid = true
            setTxtRePasswordError('')
            setTxtPasswordError('')
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

                <div className="form-sign-up">
                    <form action="">
                        <h1 className="title txt-center">SMA Register</h1>
                        <p className="txt-center">
                            Please fill in the form below to create an account.
                        </p>
                        <div className="form-group">
                            <label htmlFor="">Fullname</label>
                            <input type="text" name="" id="" placeholder="Enter your full name" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Phone or Email</label>
                            <input type="text" name="" id="" placeholder="Enter your phone number or email" value={emailOrPhone} onChange={event => setEmailOrPhone(event.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" name="" id="" placeholder="Enter your password" onClick={handleInputPasswordClick} onChange={(event) => { handleInputPasswordValue(event) }} />
                            {!inputPasswordValid && <small className="txt-error">{txtPasswordError}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Repassword</label>
                            <input type="password" name="" id="" placeholder="Enter re-password" onClick={handleInputPasswordClick} onChange={(event) => { handleInputRePasswordValue(event) }} />
                            {!inputRePasswordValid && <small className="txt-error">{txtRePasswordError}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Date of birth (day month year)</label>
                            <div className="date-of-birth">
                                <div className="box-input">
                                    <input type="number" name="" id="" value={day} onClick={handleDayInputClick} readOnly />
                                    {showDayOptions && (
                                        <div className="day-options">
                                            {dayOptions.map((dayOption) => (
                                                <div className="option"
                                                    key={dayOption}
                                                    onClick={() => handleDayOptionClick(dayOption)}>
                                                    {dayOption}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="box-input">
                                    <input type="number" name="" id="" value={month} onClick={handleMonthInputClick} readOnly />
                                    {showMonthOptions && (
                                        <div className="day-options">
                                            {monthOptions.map((monthOption) => (
                                                <div className="option"
                                                    key={monthOption}
                                                    onClick={() => handleMonthOptionClick(monthOption)}>
                                                    {monthOption}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="box-input">
                                    <input type="number" name="" id="" value={year} onClick={handleYearInputClick} readOnly />
                                    {showYearOptions && (
                                        <div className="day-options">
                                            {yearOptions.map((yearOption) => (
                                                <div className="option"
                                                    key={yearOption}
                                                    onClick={() => handleYearOptionClick(yearOption)}>
                                                    {yearOption}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Sex</label>
                            <div className="form-sex">
                                <div className="option">
                                    <label htmlFor="radioSexMale">Male</label>
                                    <input type="radio" name="sex" value='male' id="radioSexMale" onChange={(event) => { setSex(event.target.value) }} />
                                </div>
                                <div className="option">
                                    <label htmlFor="radioSexFemale">Female</label>
                                    <input type="radio" name="sex" value='female' id="radioSexFemale" onChange={(event) => { setSex(event.target.value) }} />
                                </div>
                                <div className="option">
                                    <label htmlFor="radioSexOther">Other</label>
                                    <input type="radio" name="sex" value='other' id="radioSexOther" onChange={(event) => { setSex(event.target.value) }} />
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