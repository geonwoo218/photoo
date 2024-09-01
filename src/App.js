import React, { useState } from 'react';
import './App.css';
import WebcamCapture from './components/webcam';
import ImageGallery from './components/imgGallery';

function App() {
  const [imgs, setImgs] = useState([]);
  const [viewMode, setViewMode] = useState('webcam'); // 'webcam' 또는 'gallery'
  const [cnt, setCnt] = useState(0);

  const handleCapture = (imageSrc) => {
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

  return (
    <div>
      {viewMode === 'webcam' ? (
        <WebcamCapture onCapture={handleCapture} cnt={cnt} />
      ) : (
        <ImageGallery imgList={imgs} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
