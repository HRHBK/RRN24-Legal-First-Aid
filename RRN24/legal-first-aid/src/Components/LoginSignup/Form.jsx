import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        role: 'customer',  
        image: null,
        matriculation_number: ''
    });

    const [isLogin, setIsLogin] = useState(true);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const handleChanges = (e) => {
        const { name, value, type, files } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (!isLogin && values.password !== values.password_confirmation) {
            setErrors({ password_confirmation: 'Passwords do not match' });
            return;
        }

        try {
            if (isLogin) {
                // **Login Request**
                const response = await axios.post('https://creators-api.techchantier.site/api/v1/auth/login', {
                    email: values.email,
                    password: values.password,
                });

                const { token, user } = response.data;

                if (token) {
                    localStorage.setItem("authToken", token);
                }

                if (user) {
                    localStorage.setItem("userRole", user.role || 'customer');  // Default to 'customer' if missing
                    localStorage.setItem("userEmail", user.email || '');
                } else {
                    console.warn("User object is missing in API response:", response.data);
                }

                console.log("Login successful:", response.data);

                // Redirect to landing page after login
                navigate('/');

            } else {
                // **Registration Request**
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("password", values.password);
                formData.append("password_confirmation", values.password_confirmation);
                formData.append("phone_number", values.phone_number);
                formData.append("role", values.role);

                if (values.image) {
                    formData.append("profile_pic", values.image);
                }
                if (values.role === "creator") {
                    formData.append("matriculation_number", values.matriculation_number);
                }

                const response = await axios.post('https://creators-api.techchantier.site/api/v1/auth/register', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json"
                    }
                });

                console.log("Registration successful:", response.data);
                setIsLogin(true);  // Switch to login form
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className='form'>
            <div className='form-wrapper'>
                <div className='container'>
                    <h1 className='heading'>{isLogin ? 'Login' : 'Sign Up'}</h1>

                    {serverError && <p className='error-message'>{serverError}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className='inputs'>
                            {!isLogin && (
                                <>
                                    <label htmlFor='name'>Full Name*</label>
                                    <input type='text' id='name' name='name' required onChange={handleChanges} value={values.name} />

                                    <label htmlFor='phone_number'>Contact*</label>
                                    <input type='text' id='phone_number' name='phone_number' required onChange={handleChanges} value={values.phone_number} />

                                    <label htmlFor='role'>Role*</label>
                                    <select id='role' name='role' onChange={handleChanges} value={values.role}>
                                        <option value='customer'>Normal User</option>
                                        <option value='creator'>Lawyer</option>
                                    </select>

                                    {values.role === 'creator' && (
                                        <>
                                            <label htmlFor='matriculation_number'>Matriculation Number*</label>
                                            <input type='text' id='matriculation_number' name='matriculation_number' required onChange={handleChanges} value={values.matriculation_number} />
                                        </>
                                    )}

                                    <label htmlFor='image'>Profile Image*</label>
                                    <input type='file' id='image' name='image' accept="image/png, image/jpeg" onChange={handleChanges} />
                                </>
                            )}

                            <label htmlFor='email'>Email*</label>
                            <input type='email' id='email' name='email' required onChange={handleChanges} value={values.email} />

                            <label htmlFor='password'>Password*</label>
                            <input type='password' id='password' name='password' required onChange={handleChanges} value={values.password} />

                            {!isLogin && (
                                <>
                                    <label htmlFor='password_confirmation'>Confirm Password*</label>
                                    <input type='password' id='password_confirmation' name='password_confirmation' required onChange={handleChanges} value={values.password_confirmation} />
                                </>
                            )}
                        </div>

                        <p>{isLogin ? "Don't have an account?" : "Already have an account?"} <a href='#' onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</a></p>

                        <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
