import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSubmit }) => {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: '',
        role: 'normal_user',
        image: null,
        matriculationNumber: ''
    });

    const [isLogin, setIsLogin] = useState(true);
    const [errors, setErrors] = useState({});

    const handleChanges = (e) => {
        const { name, value, type, files } = e.target;

        setValues((prevValues) => {
            const updatedValues = {
                ...prevValues,
                [name]: type === 'file' ? files[0] : value
            };

            validateField(name, value, updatedValues);
            return updatedValues;
        });
    };

    const validateField = (name, value, updatedValues) => {
        let error = '';

        if (name === 'contact' && value.length !== 9) {
            error = 'Phone number must be exactly 9 digits';
        }

        if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
            error = 'Enter a valid email address';
        }

        if (name === 'password') {
            if (value.length < 7) {
                error = 'Password must be at least 7 characters';
            } else if (value === updatedValues.contact || value === updatedValues.fullname) {
                error = 'Password cannot match your name or phone number';
            }
        }

        if (name === 'confirmPassword' && value !== updatedValues.password) {
            error = 'Passwords do not match';
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLogin && values.password !== values.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Passwords do not match'
            }));
            return;
        }

        if (Object.values(errors).some((error) => error)) {
            alert("Please fix the errors before submitting.");
            return;
        }

        onSubmit(values);
    };

    const handleReset = () => {
        setValues({
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
            contact: '',
            role: 'normal_user',
            image: null,
            matriculationNumber: ''
        });
        setErrors({});
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        handleReset();
    };

    return (
       <div className='form'>
        <div className='form-wrapper'>
            <div className='container'>
                <h1 className='heading'>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='inputs'>
                        {!isLogin && (
                            <>
                                <label htmlFor='fullname'>Full Name*</label>
                                <input type='text' id='fullname' name='fullname' required onChange={handleChanges} value={values.fullname} className={errors.fullname ? 'error-input' : ''} />

                                <label htmlFor='contact'>Contact*</label>
                                <input type='number' id='contact' name='contact' required onChange={handleChanges} value={values.contact} className={errors.contact ? 'error-input' : ''} />
                                {errors.contact && <p className='error'>{errors.contact}</p>}

                                <label htmlFor='role'>Role*</label>
                                <select id='role' name='role' onChange={handleChanges} value={values.role}>
                                    <option value='normal_user'>Normal User</option>
                                    <option value='lawyer'>Lawyer</option>
                                </select>

                                {values.role === 'lawyer' && (
                                    <>
                                        <label htmlFor='matriculationNumber'>Matriculation Number*</label>
                                        <input type='text' id='matriculationNumber' name='matriculationNumber' required onChange={handleChanges} value={values.matriculationNumber} />
                                    </>
                                )}

                                <label htmlFor='image'>Profile Image*</label>
                                <input type='file' id='image' name='image' accept="image/png, image/jpeg" onChange={handleChanges} />
                            </>
                        )}

                        <label htmlFor='email'>Email*</label>
                        <input type='email' id='email' name='email' required onChange={handleChanges} value={values.email} className={errors.email ? 'error-input' : ''} />
                        {errors.email && <p className='error'>{errors.email}</p>}

                        <label htmlFor='password'>Password*</label>
                        <input type='password' id='password' name='password' required onChange={handleChanges} value={values.password} className={errors.password ? 'error-input' : ''} />
                        {errors.password && <p className='error'>{errors.password}</p>}

                        {!isLogin && (
                            <>
                                <label htmlFor='confirmPassword'>Confirm Password*</label>
                                <input type='password' id='confirmPassword' name='confirmPassword' required onChange={handleChanges} value={values.confirmPassword} className={errors.confirmPassword ? 'error-input' : ''} />
                                {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                            </>
                        )}
                    </div>

                    <p>{isLogin ? "Don't have an account?" : "Already have an account?"} <a href='#' onClick={toggleForm}>{isLogin ? 'Sign Up' : 'Login'}</a></p>

                    <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Form;
