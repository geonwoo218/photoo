import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from "react-webcam";
import '../App.css';

const videoConstraints = {
    width: 1300,
    facingMode: "user"
};

const WebcamCapture = ({ onCapture, cnt }) => {
    const webcamRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [videoStyle, setVideoStyle] = useState({});

    const justCapture = ()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    }

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // 이미지를 부모 컴포넌트로 전달

        setVideoStyle({ opacity: 0.7 });
        setTimeout(() => {
            setVideoStyle({ opacity: 1 }); // 비디오 원래 상태로 복구
        }, 300); // 300ms 후 원래 상태로 복구
    }, [onCapture]);

    useEffect(() => {
        let intervalId;
        if (isCapturing) {
            intervalId = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        handleCapture(); // 타이머가 1초일 때 사진 캡처
                        return 3; // 타이머를 3초로 리셋
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // 컴포넌트가 언마운트되거나 캡처 중지 시 인터벌 정리
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isCapturing, handleCapture]);

    const startCapturing = () => {
        setIsCapturing(true);
        setCountdown(3); // 타이머를 3초로 설정
    };

    const stopCapturing = () => {
        setIsCapturing(false);
        setCountdown(3); // 타이머 리셋
    };

    return (
        <div className='bodycontainer'>
            <div className='left'>
                <div className='webcam' style={videoStyle}>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        mirrored
                        videoConstraints={videoConstraints}
                        ref={webcamRef}
                    />
                </div>
            </div>
            <div className='right'>
                <div className='capture'>
                    <div className='timer'>
                        {isCapturing ? `남은 시간: ${countdown}초` : '캡처 대기 중'}
                    </div>
                    <div className='captureBtnB'>
                        <button
                            className="captureBtn"
                            onClick={isCapturing ? stopCapturing : startCapturing}
                        >
                            {isCapturing ? '캡처 중지' : '캡처 시작'}
                        </button>
                    </div>
                </div>
                <div>
                    <button className='captureBtn1' onClick={justCapture}>
                         바로찍기
                    </button>
                </div>
                <div className='counter'>
                    {cnt} / 8
                </div>
            </div>
        </div>
    );
};

export default WebcamCapture;
