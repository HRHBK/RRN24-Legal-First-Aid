import React, { useState } from 'react';
import './Cont.css';

const Cont = () => {
    const [values, setValues] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        if (!value.trim()) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Enter a valid email address';
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        Object.keys(values).forEach((key) => validateField(key, values[key]));
        if (Object.values(errors).some((err) => err) || Object.values(values).some((val) => !val)) {
            return;
        }
        setSubmitted(true);
    };

    return (
        <div className="contact-wrapper">
            <div className="inspiration-box">
                <h2>Need Help?</h2>
                <p>"The best way to find yourself is to lose yourself in the service of others." – Mahatma Gandhi</p>
                <p>We are here to assist you. Send us a message, and we’ll respond as soon as possible!</p>
            </div>
            <div className="contact-container">
                <h2>Contact Us</h2>
                {submitted && <p className="success-message">Message sent successfully!</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={values.name} onChange={handleChange} />
                    {errors.name && <p className="error-text">{errors.name}</p>}

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={handleChange} />
                    {errors.email && <p className="error-text">{errors.email}</p>}

                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="4" value={values.message} onChange={handleChange}></textarea>
                    {errors.message && <p className="error-text">{errors.message}</p>}

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Cont;
