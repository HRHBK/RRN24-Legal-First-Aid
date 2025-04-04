import React from 'react';
import './Background.css';
import boy from '../Assets/boy.png';
import lawyers from '../Assets/lawyers.png';
import police from '../Assets/police.png';

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