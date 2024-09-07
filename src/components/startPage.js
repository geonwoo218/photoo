import React from 'react';
import '../App.css';
const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <div className='startTitle'>Chang Eui PhotoStyle</div>
      <button onClick={onStart} className='startBtn btnStyle2'>시작하기</button>
    </div>
  );
};

export default StartPage;