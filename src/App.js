import React, { useState, useRef } from 'react';
import './App.css';
import WebcamCapture from './components/webcam';
// import ImageGallery from './components/imgGallery'; // 더 이상 사용하지 않음
import StartPage from './components/startPage';
import SelectedImages from './components/selectImg'; // SelectedImages 컴포넌트 임포트

function App() {
  // 촬영된 단일 이미지 상태 관리 (초기값 null)
  const [capturedImage, setCapturedImage] = useState(null);
  // 현재 화면 모드를 나타내는 상태 ('start', 'webcam', 'template')
  const [viewMode, setViewMode] = useState('start');
  // 셔터 소리 재생을 위한 Audio 객체 참조
  const shutterSoundRef = useRef(new Audio('/sound/shutter.mp3'));

  // 이미지 촬영 시 호출되는 함수
  const handleCapture = (imageSrc) => {
    // 셔터 소리 재생
    shutterSoundRef.current.currentTime = 0;
    shutterSoundRef.current.play();

    // 촬영된 이미지 저장
    setCapturedImage({ id: 1, src: imageSrc }); // 고유 ID는 1로 고정해도 무방

    // 바로 템플릿 선택 화면으로 전환
    setViewMode('template');
  };

  // 시작 화면에서 시작 버튼 클릭 시 호출되는 함수
  const handleStart = () => {
    setViewMode('webcam'); // 웹캠 화면으로 전환
    setCapturedImage(null); // 혹시 이전 이미지가 남아있을 경우 초기화
  };

  // 다시 찍기 버튼 클릭 시 호출되는 함수
  const handleRetake = () => {
    setCapturedImage(null); // 촬영된 이미지 초기화
    setViewMode('webcam'); // 웹캠 화면으로 다시 전환
  }

  return (
    <div>
      {/* 화면 모드에 따라 컴포넌트 렌더링 */}
      {viewMode === 'start' ? (
        <StartPage onStart={handleStart} />
      ) : viewMode === 'webcam' ? (
        // onCapture와 onRetake 핸들러 전달
        <WebcamCapture onCapture={handleCapture} onRetake={handleRetake} />
      ) : viewMode === 'template' && capturedImage ? ( // template 모드이고 이미지가 있을 때
        // capturedImage를 배열로 감싸서 전달 (기존 SelectedImages 구조 유지 위함)
        // 또는 SelectedImages 컴포넌트 자체를 수정하여 객체 하나만 받도록 변경
        <SelectedImages selectedImages={[capturedImage]} onRetake={handleRetake} />
      ) : (
        // 예상치 못한 상태일 경우 시작 페이지로 (혹은 다른 처리)
        <StartPage onStart={handleStart} />
      )}
    </div>
  );
}

export default App;