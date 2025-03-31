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
        role: 'normal_user',
        matricule: '',
        image: null
    });

    const [isLogin, setIsLogin] = useState(true);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const handleChanges = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setValues((prevValues) => ({
                ...prevValues,
                image: files[0]
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (values.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (!isLogin && values.password !== values.password_confirmation) {
            newErrors.password_confirmation = 'Passwords do not match';
        }

        if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (values.role === 'lawyer' && !values.matricule) {
            newErrors.matricule = 'Matricule is required for lawyers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (!validateForm()) {
            return;
        }

        try {
            if (isLogin) {
                const response = await axios.post(
                    "https://rrn24.techchantier.com/Legal_First_Aid/public/api/login",
                    {
                        email: values.email,
                        password: values.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );

                console.log("Login successful:", response.data);

                localStorage.setItem("authToken", response.data.access_token);
                localStorage.setItem("userRole", response.data.user.role);
                localStorage.setItem("userName", response.data.user.name);
                localStorage.setItem("userEmail", response.data.user.email);
                localStorage.setItem("userMatricule", response.data.user.matricule || '');
                localStorage.setItem("userPhoto", response.data.user.image || '');

                navigate('/home');
            } else {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('password', values.password);
                formData.append('password_confirmation', values.password_confirmation);
                formData.append('role', values.role);

                if (values.role === 'lawyer') {
                    formData.append('matricule', values.matricule);
                }

                if (values.image) {
                    formData.append('image', values.image);
                }

                const response = await axios.post(
                    "https://rrn24.techchantier.com/Legal_First_Aid/public/api/register",
                    formData,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                console.log("Registration successful:", response.data);

                localStorage.setItem("authToken", response.data.access_token);
                localStorage.setItem("userRole", response.data.user.role);
                localStorage.setItem("userName", response.data.user.name);
                localStorage.setItem("userEmail", response.data.user.email);
                localStorage.setItem("userMatricule", response.data.user.matricule || '');
                localStorage.setItem("userPhoto", response.data.user.image || '');
                localStorage.setItem("userId", response.data.user.id);

                setIsLogin(true);
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            if (error.response) {
                const responseData = error.response.data;
                if (responseData.errors) {
                    const errorMessages = Object.values(responseData.errors).flat().join(' ');
                    setServerError(errorMessages);
                } else {
                    setServerError(responseData.message || "Something went wrong. Please try again.");
                }
            } else {
                setServerError("Network error. Please try again.");
            }
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
                                    <label htmlFor='role'>Role*</label>
                                    <select id='role' name='role' onChange={handleChanges} value={values.role}>
                                        <option value='normal_user'>Normal User</option>
                                        <option value='lawyer'>Lawyer</option>
                                    </select>

                                    {values.role === 'lawyer' && (
                                        <>
                                            <label htmlFor="matricule">Matricule*</label>
                                            <input
                                                type="text"
                                                id="matricule"
                                                name="matricule"
                                                onChange={handleChanges}
                                                value={values.matricule}
                                                required
                                            />
                                            {errors.matricule && <p className='error-message'>{errors.matricule}</p>}
                                        </>
                                    )}

                                    <label htmlFor="image">Profile Picture*</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChanges}
                                    />
                                </>
                            )}

                            <label htmlFor='email'>Email*</label>
                            <input type='email' id='email' name='email' required onChange={handleChanges} value={values.email} />
                            {errors.email && <p className='error-message'>{errors.email}</p>}

                            <label htmlFor='password'>Password*</label>
                            <input type='password' id='password' name='password' required onChange={handleChanges} value={values.password} />
                            {errors.password && <p className='error-message'>{errors.password}</p>}

                            {!isLogin && (
                                <>
                                    <label htmlFor='password_confirmation'>Confirm Password*</label>
                                    <input type='password' id='password_confirmation' name='password_confirmation' required onChange={handleChanges} value={values.password_confirmation} />
                                    {errors.password_confirmation && <p className='error-message'>{errors.password_confirmation}</p>}
                                </>
                            )}
                        </div>

                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <a
                                href='#'
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    if (isLogin) {
                                        setValues({
                                            name: '',
                                            email: '',
                                            password: '',
                                            password_confirmation: '',
                                            role: 'normal_user',
                                            matricule: '',
                                            image: null
                                        });
                                        setServerError(''); // Clear server errors
                                    }
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </a>
                        </p>

                        <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
