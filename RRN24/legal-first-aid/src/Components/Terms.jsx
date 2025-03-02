import React from 'react';
import './Terms.css';

const Terms = () => {
    return (
        <div className="terms-container">
            <h1>Terms of Service</h1>
            <p>Last updated: March 2025</p>

            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using Legal First Aid, you agree to abide by these Terms of Service. If you do not agree, please discontinue use.
                </p>
            </section>

            <section>
                <h2>2. User Responsibilities</h2>
                <ul>
                    <li>Users must provide accurate information when creating an account.</li>
                    <li>Users must not post misleading or illegal content.</li>
                    <li>Users agree to use the platform respectfully and legally.</li>
                </ul>
            </section>

            <section>
                <h2>3. Account Termination</h2>
                <p>
                    We reserve the right to suspend or terminate accounts violating these terms without prior notice.
                </p>
            </section>

            <section>
                <h2>4. Limitation of Liability</h2>
                <p>
                    Legal First Aid is an educational platform. We do not provide legal representation, and we are not responsible for reliance on information provided by users.
                </p>
            </section>

            <section>
                <h2>5. Changes to Terms</h2>
                <p>
                    We may update these terms from time to time. Continued use of the platform implies acceptance of changes.
                </p>
            </section>

            <section>
                <h2>6. Contact Us</h2>
                <p>
                    For questions, contact us at <strong>support@legalfirstaid.com</strong>.
                </p>
            </section>

            <footer className="terms-footer">
                <p>&copy; 2025 Legal First Aid. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Terms;
