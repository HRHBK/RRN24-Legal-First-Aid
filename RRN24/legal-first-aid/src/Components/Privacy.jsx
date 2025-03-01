import React from 'react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p>Last updated: March 2025</p>

            <section>
                <h2>1. Introduction</h2>
                <p>
                    Legal First Aid values your privacy. This Privacy Policy explains how we collect, use, and protect your 
                    personal information when you use our website.
                </p>
            </section>

            <section>
                <h2>2. Information We Collect</h2>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number (if provided).</li>
                    <li><strong>Usage Data:</strong> Information on how you interact with our website.</li>
                    <li><strong>Cookies:</strong> We use cookies to improve user experience.</li>
                </ul>
            </section>

            <section>
                <h2>3. How We Use Your Information</h2>
                <p>
                    We use your information to provide and improve our services, communicate with you, and ensure platform security.
                </p>
            </section>

            <section>
                <h2>4. Data Protection & Security</h2>
                <p>
                    We implement strong security measures to protect your data, but no system is 100% secure. We advise users to 
                    take precautions when sharing personal information online.
                </p>
            </section>

            <section>
                <h2>5. Sharing Your Information</h2>
                <p>
                    We do not sell or rent your personal data. Your information may only be shared in compliance with legal 
                    obligations or with your explicit consent.
                </p>
            </section>

            <section>
                <h2>6. Your Rights</h2>
                <p>
                    You have the right to access, update, or request deletion of your data. Contact us if you have any concerns.
                </p>
            </section>

            <section>
                <h2>7. Updates to This Policy</h2>
                <p>
                    We may update this policy from time to time. Please review this page periodically for changes.
                </p>
            </section>

            <section>
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at 
                    <strong> support@legalfirstaid.com</strong>.
                </p>
            </section>

            <footer className="privacy-footer">
                <p>&copy; 2025 Legal First Aid. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Privacy;
