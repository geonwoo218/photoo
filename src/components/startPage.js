import React from 'react';
import '../App.css';
const StartPage = ({ onStart }) => {
  return (
    <div className="start-page">
      <div className='startTitle'>창의경영 인생네컷 <br/>
      <span>- 크리스마스 에디션 -</span></div>
      <button onClick={onStart} className='startBtn btnStyle1'><span>시작하기</span></button>
    </div>
  );
};

export default StartPage;