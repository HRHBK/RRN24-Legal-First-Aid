import React, { useState } from 'react';
import './Hero.css';

const Hero = ({ onSubmitQuestion }) => {
    const [question, setQuestion] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmitQuestion(question);
            setQuestion('');
            setIsFormVisible(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality here
        console.log('Search term:', searchTerm);
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                    />
                    <button type="submit">Search</button>
                </form>
                <h1>Welcome to Legal First Aid</h1>
                <p>Get answers to your legal questions from experts.</p>
                <button className="cta-button" onClick={() => setIsFormVisible(true)}>Ask a Question</button>
                {isFormVisible && (
                    <form className="question-form" onSubmit={handleSubmit}>
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Hero;