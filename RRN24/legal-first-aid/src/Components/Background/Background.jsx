import React from 'react';
import './Background.css';
import boy from '../Assets/boy.png';
import lawyers from '../Assets/lawyers.png';
import police from '../Assets/police.png';
const Background = ({ bgCount }) => {

    if (bgCount === 0) {
        return <img src={lawyers} className='background fade-in' alt='' />
    }
    else if (bgCount === 1) {
        return <img src={police} className='background fade-in' alt='' />
    }
    else if (bgCount === 2) {
        return <img src={boy} className='background fade-in' alt='' />
    }

}

export default Background