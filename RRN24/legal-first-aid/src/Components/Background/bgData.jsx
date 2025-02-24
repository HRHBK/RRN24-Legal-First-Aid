import React from 'react';
import './bgData.css';

const BgData = ({setBgCount, textData, bgCount}) => {
  return (
    <div className='data'>
        <div className='bgText'>
            <p>{textData.text1}</p>
            <p>{textData.text2}</p>
        </div>
         <div className='bg-dot-play'>
            <ul className='bg-dots'>
                <li onClick={()=>setBgCount(0)} className={bgCount===0?'bg-dot orange': 'bg-dot'}></li>
                <li onClick={()=>setBgCount(1)} className={bgCount===1?'bg-dot orange': 'bg-dot'}></li>
                <li onClick={()=>setBgCount(2)} className={bgCount===2?'bg-dot orange': 'bg-dot'}></li>
            </ul>
         </div>
    </div>
  )
}

export default BgData