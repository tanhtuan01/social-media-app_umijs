import '../../assets/profile/style.less'

import { apiUser } from "../../api/user";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import checkTokenFirst from '@/middleware/auth';

export default function ProfileHomePage() {
    checkTokenFirst()
    const [name, setName] = useState('')
    const [emailOrPhone, setEmailOrPhone] = useState('')
    const [sex, setSex] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [validForm, setValidForm] = useState(true)
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')
    const [currentPasswordValid, setCurrnPasswordValid] = useState(false)
    const [newPasswordValid, setNewPasswordValid] = useState(false)
    const [reNewPasswordValid, setReNewPasswordValid] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)

    const userAPI = apiUser();
    const getInfo = userAPI.getUserInfo
    const updateInfo = userAPI.updateUser
    const checkpass = userAPI.checkPassword
    const updatePassword = userAPI.updatePassword

    useEffect(() => {
        getUser()
    }, [])

    const formatDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    async function getUser() {

        const data = await getInfo()
        if (typeof data === 'object' && data !== null) {
            // toast.success('Get user info successfully')
            setName(data.name)
            setEmailOrPhone(data.emailOrPhone)
            setSex(data.sex)
            setDateOfBirth(formatDate(data.dateOfBirth))
        }
        else {
            toast.error('Get user info failed')
        }
        //console.log('data', data)
    }

    async function checkPassword(password: string) {
        if (password.length < 8) {
            toast.error('Password is incorrect');
            setCurrnPasswordValid(false)
        }
        else {
            const data = await checkpass(password)
            if (!data) {
                toast.error('Password is incorrect');
                setCurrnPasswordValid(false)
                return
            } else {
                //toast.success('Password is correct');
                setCurrnPasswordValid(true)
            }
        }

    }

    const checkDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateOfBirth(formatDate(event.target.value));
        const inputDate = new Date(event.target.value);
        const currentDate = new Date();

        if (inputDate > currentDate) {
            toast.error('Date of birth is not valid');
            setValidForm(false);
        } else {
            setDateOfBirth(event.target.value);
        }
    };

    function submit() {
        if (validForm) {
            const user = {
                name,
                emailOrPhone,
                sex,
                dateOfBirth
            }
            updateUser(user)
        }
    }

    async function updateUser(user: object) {
        const data = await updateInfo(user)
        // console.log(data.error)
        if (typeof data === 'object' && data !== null && !data.error) {
            toast.success('Update user info successfully')
            getInfo()
        } else {
            toast.error('Update user info failed, please choose another email or phone number.')
        }
    }

    function changePass() {
        console.log('Change password')
        event?.preventDefault()
        setOpenModalChangePassword(true)
    }

    async function updatepassword(password: string) {
        const data = await updatePassword(password)
        if (typeof data === 'object' && data !== null && !data.error) {
            toast.success('Update password successfully')
            setOpenModalChangePassword(false)
        } else {
            toast.error('Update password failed, please try again.')
        }
    }

    function handleUpdatePassword() {
        checkPassword(currentPassword)
        //console.log('Update password')
        if (newPassword.trim().length < 8) {
            setNewPasswordValid(false)
            return
        }
        // else if (reNewPassword.trim().length < 8) {
        //     setReNewPasswordValid(false)
        // }
        // else if (newPassword.trim().length >= 8) {
        //     setNewPasswordValid(true)
        // }


        updatepassword(newPassword)

        // else {
        //     updatepassword(newPassword)
        // }


    }

    function handleCancelModal() {
        setOpenModalChangePassword(false)
        setNewPassword('')
        setReNewPassword('')
    }



    return (
        <div className="row">
            <ToastContainer autoClose={3000} />

            <div className="profile">
                <h1 className='title'>Your Information</h1>
                <div className="form-profile">

                    <form action="">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter your name" value={name} onChange={event => setName(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Emai Or Phone</label>
                            <input type="text" id="name" placeholder="Enter your name" value={emailOrPhone} onChange={event => setEmailOrPhone(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Sex</label>
                            <select name="" id="" value={sex} onChange={event => setSex(event.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Date of birth </label>
                            <input type="date" name="" id="" value={dateOfBirth} onChange={(event) => {
                                checkDate(event);
                            }} />
                        </div>

                        <button onClick={submit} type='button' className="btn">Update Information</button>
                    </form>

                    <a href='' onClick={changePass} className='btn-change-password'>Change Password</a>
                    {openModalChangePassword &&
                        (
                            <div id="modal" className="modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <span className="close-button" onClick={() => setOpenModalChangePassword(false)}>&times;</span>
                                        <h2>Change password</h2>
                                    </div>
                                    <div className="modal-body">
                                        <p>Update a new password?</p>
                                    </div>
                                    <div className="modal-form">
                                        <form action="">

                                            <div className="form-group">
                                                <label htmlFor="">Current password</label>
                                                <input type="password" name="" id="" value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
                                                {!currentPasswordValid && (<p className='txt-error'>Password is incorrect</p>)}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="">New password</label>
                                                <input type="password" name="" id="" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                                                {!newPasswordValid && (<p className='txt-error'>Password should be at least 8 characters </p>)}
                                                {/* {!passwordMatch && (<p className='txt-error'>Password not match</p>)} */}
                                            </div>

                                            {/* <div className="form-group">
                                                <label htmlFor="">Re-password</label>
                                                <input type="password" name="" id="" value={reNewPassword} onChange={event => setReNewPassword(event.target.value)} />
                                                {!reNewPasswordValid && (<p className='txt-error'>Password should be at least 8 characters </p>)}
                                                {!passwordMatch && (<p className='txt-error'>Password not match</p>)}
                                            </div> */}


                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="cancel-button btn" onClick={() => handleCancelModal()}>Cancel</button>
                                        <button className="delete-button btn" onClick={() => handleUpdatePassword()}>Update</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )

}
