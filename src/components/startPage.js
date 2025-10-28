import React from 'react';
import '../App.css';
const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <div className='startTop'></div>
      <div className='startTitle'>빛나는 네 컷, 나의 진로 <br/>
      </div>
      <button onClick={onStart} className='startBtn btnStyle1'><span>시작하기</span></button>
    </div>
  );
};

export default StartPage;