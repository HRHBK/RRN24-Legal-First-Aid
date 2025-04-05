import React from 'react';
import './Background.css';
import boy from '../Assets/img11.jpg';
import lawyers from '../Assets/img1.jpg';
import police from '../Assets/img3.jpg';

const Background = ({ bgCount }) => {
  const getImage = () => {
    if (bgCount === 0) return lawyers;
    if (bgCount === 1) return police;
    return boy;
  };

  return (
    <>
      <div className="background-overlay"></div>
      <img src={getImage()} className="background fade-in" alt="Background" />
    </>
  );
};

export default Background;