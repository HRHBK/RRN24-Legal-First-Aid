import React, { useState } from 'react';
import './FormStyle.css';
import mail_icon from '../Assets/mail_icon.jpeg';
import password_icon from '../Assets/password_icon.jpeg';
import name_icon from '../Assets/name_icon.jpeg';
import contact_icon from '../Assets/contact_icon.png';

const Form = ({ onSubmit }) => {
    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        contact: '',
        usertype: 'Normal user',
        certificate: ''
    };

    const [values, setValues] = useState(initialValues);
    const [isLogin, setIsLogin] = useState(true);
    const [errors, setErrors] = useState({});

    const handleChanges = (e) => {
        const { name, value, type, files } = e.target;
        setValues({
            ...values,
            [name]: type === 'file' ? files[0] : value
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        if (name === 'contact') {
            if (value.length !== 9) {
                error = 'Phone number must be exactly 9 characters';
            }
        }

        if (name === 'password') {
            if (value.length < 7) {
                error = 'Password must be at least 7 characters';
            } else if (value === values.contact || value === values.firstname || value === values.lastname) {
                error = 'Password cannot be the same as phone number, first name, or last name';
            }
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin && values.password !== values.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (Object.values(errors).some(error => error)) {
            alert("Please fix the errors in the form");
            return;
        }
        onSubmit(values);
    };

    const handleReset = () => {
        setValues(initialValues);
        setErrors({});
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            <div className='container'>
                <h1 className='heading'>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='inputs'>
                        {!isLogin && (
                            <>
                                <label htmlFor='firstname'>First Name*</label>
                                <div className='input'>
                                    <img src={name_icon} alt='Name' />
                                    <input type='text' placeholder='' required name='firstname' onChange={handleChanges} value={values.firstname} style={{ borderColor: errors.firstname ? 'red' : '' }} />
                                </div>

                                <label htmlFor='lastname'>Last Name*</label>
                                <div className='input'>
                                    <img src={name_icon} alt='' />
                                    <input type='text' placeholder='' required name='lastname' onChange={handleChanges} value={values.lastname} style={{ borderColor: errors.lastname ? 'red' : '' }} />
                                </div>

                                <label htmlFor='contact'>Contact*</label>
                                <div className='input'>
                                    <img src={contact_icon} alt='' />
                                    <input type='number' placeholder='' required name='contact' onChange={handleChanges} value={values.contact} style={{ borderColor: errors.contact ? 'red' : '' }} />
                                    {errors.contact && <p className='error'>{errors.contact}</p>}
                                </div>

                                <label htmlFor='gender'>Gender*</label>
                                <div className='radio-group'>
                                    <input type='radio' name='gender' value='Male' onChange={handleChanges} checked={values.gender === 'Male'} />Male
                                    <input type='radio' name='gender' value='Female' onChange={handleChanges} checked={values.gender === 'Female'} />Female
                                    <input type='radio' name='gender' value='Other' onChange={handleChanges} checked={values.gender === 'Other'} />Other
                                </div>

                                <label htmlFor='usertype'>User type</label>
                                <select name='usertype' id='usertype' onChange={handleChanges} value={values.usertype}>
                                    <option value='Normal user'>Normal User</option>
                                    <option value='Lawyer'>Lawyer</option>
                                </select>

                                {values.usertype === 'Lawyer' && (
                                    <>
                                        <label htmlFor='certificate'>Qualification*</label><p>(for lawyers only)</p>
                                        <div className='input'>
                                            <input type='file' name='certificate' onChange={handleChanges} required />
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        <label htmlFor='email'>Email*</label>
                        <div className='input'>
                            <img src={mail_icon} alt='' />
                            <input type='email' placeholder='' required name='email' onChange={handleChanges} value={values.email} style={{ borderColor: errors.email ? 'red' : '' }} />
                        </div>

                        <label htmlFor='password'>Password*</label>
                        <div className='input'>
                            <img src={password_icon} alt='' />
                            <input type='password' placeholder='' required name='password' onChange={handleChanges} value={values.password} style={{ borderColor: errors.password ? 'red' : '' }} />
                            {errors.password && <p className='error'>{errors.password}</p>}
                        </div>

                        {isLogin && (
                            <p><a href='#'>Forgot your password?</a></p>
                        )}

                        {!isLogin && (
                            <>
                                <label htmlFor='confirmPassword'>Confirm Password*</label>
                                <div className='input'>
                                    <img src={password_icon} alt='' />
                                    <input type='password' placeholder='' required name='confirmPassword' onChange={handleChanges} value={values.confirmPassword} style={{ borderColor: errors.confirmPassword ? 'red' : '' }} />
                                </div>
                            </>
                        )}
                    </div>

                    <p>{isLogin ? "Don't have an account?" : "Already have an account?"}<a href='#' onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</a></p>

                    <button type='submit'>{isLogin ? 'Login' : 'Submit'}</button>
                    <button type='reset'>Reset</button>
                </form>
            </div>
        </>
    );
};

export default Form;