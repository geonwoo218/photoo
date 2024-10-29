import React, { useState, useRef } from 'react';
import './App.css';
import WebcamCapture from './components/webcam';
import ImageGallery from './components/imgGallery';
import StartPage from './components/startPage';

function App() {
  const [imgs, setImgs] = useState([]);
  const [viewMode, setViewMode] = useState('start');
  const [cnt, setCnt] = useState(0);
  const shutterSoundRef = useRef(new Audio('/sound/shutter.mp3'));

  const handleCapture = (imageSrc) => {
    shutterSoundRef.current.currentTime = 0;
    shutterSoundRef.current.play();
    const newImage = {
      id: imgs.length + 1,
      src: imageSrc
    };

    const newImgs = [...imgs, newImage];
    setImgs(newImgs);
    setCnt(cnt + 1);
    if (newImgs.length === 8) {
      setViewMode('gallery');
      setCnt(0);
    }
  };

  const handleBack = () => {
    setViewMode('webcam');
    setImgs([]); // 웹캠으로 돌아올 때 이미지 목록 초기화
  };
  const handleStart = ()=>{ //첫 시작
    setViewMode('webcam');
  }
  
  return (
    <div>
      {viewMode === 'start' ? (
        <StartPage onStart={handleStart}/> 
      ): viewMode === 'webcam' ? (
        <WebcamCapture onCapture={handleCapture} cnt={cnt} />
      ) : (
        <ImageGallery imgList={imgs} onBack={handleBack}/>
      )}
    </div>

  );
}

export default App;
