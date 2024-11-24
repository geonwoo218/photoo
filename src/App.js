import React, { useState, useRef } from 'react';
import './App.css';
import WebcamCapture from './components/webcam';
import ImageGallery from './components/imgGallery';
import StartPage from './components/startPage';

function App() {
  // 이미지 목록 상태 관리
  const [imgs, setImgs] = useState([]);
  // 현재 화면 모드를 나타내는 상태 ('start', 'webcam', 'gallery')
  const [viewMode, setViewMode] = useState('start');
  // 현재 촬영된 이미지 개수를 관리
  const [cnt, setCnt] = useState(0);
  // 셔터 소리 재생을 위한 Audio 객체 참조
  const shutterSoundRef = useRef(new Audio('/sound/shutter.mp3'));

  // 이미지 촬영 시 호출되는 함수
  const handleCapture = (imageSrc) => {
    // 셔터 소리 재생
    shutterSoundRef.current.currentTime = 0;
    shutterSoundRef.current.play();

    // 새 이미지 객체 생성
    const newImage = {
      id: imgs.length + 1, // 고유 ID 생성
      src: imageSrc       // 촬영된 이미지의 데이터
    };

    // 새로운 이미지 배열 업데이트
    const newImgs = [...imgs, newImage];
    setImgs(newImgs);
    setCnt(cnt + 1); // 촬영된 이미지 수 증가

    // 이미지가 8개 촬영되면 갤러리 모드로 전환
    if (newImgs.length === 8) {
      setViewMode('gallery');
      setCnt(0); // 카운터 초기화
    }
  };

  // 갤러리에서 뒤로가기 버튼 클릭 시 호출되는 함수
  const handleBack = () => {
    setViewMode('webcam'); // 웹캠 화면으로 전환
    setImgs([]); // 이미지 목록 초기화
  };

  // 시작 화면에서 시작 버튼 클릭 시 호출되는 함수
  const handleStart = () => {
    setViewMode('webcam'); // 웹캠 화면으로 전환
  };

  return (
    <div>
      {/* 화면 모드에 따라 컴포넌트 렌더링 */}
      {viewMode === 'start' ? (
        <StartPage onStart={handleStart}/> 
      ) : viewMode === 'webcam' ? (
        <WebcamCapture onCapture={handleCapture} cnt={cnt} />
      ) : (
        <ImageGallery imgList={imgs} onBack={handleBack}/>
      )}
    </div>
  );
}

export default App;
