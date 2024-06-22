import { useState } from "react";
import '../../assets/base.less'
import '../../assets/sign/style.less'
export default function RegisterHomePage() {

    const currentYear = new Date().getFullYear();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [sex, setSex] = useState('');

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
            }
        }

        if (isValidDate) {
            console.log('Date is valid');
        } else {
            console.log('Date is not valid');
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

    const handleClickInput = () => {

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
                        <h1 className="title txt-center">SMA Register</h1>
                        <p className="txt-center">
                            Please fill in the form below to create an account.
                        </p>
                        <div className="form-group">
                            <label htmlFor="">Fullname</label>
                            <input type="text" name="" id="" placeholder="Enter your full name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Phone or Email</label>
                            <input type="text" name="" id="" placeholder="Enter your phone number or email" value={username} onChange={event => setUsername(event.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="text" name="" id="" placeholder="Enter your password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Repassword</label>
                            <input type="text" name="" id="" placeholder="Enter re-password" onClick={handleClickInput} />
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