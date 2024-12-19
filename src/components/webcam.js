import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from "react-webcam";
import '../App.css';

// 비디오 설정 (비디오 크기 및 사용자 카메라 사용 설정)
const videoConstraints = {
    width: 1300,
    facingMode: "user"
};

const WebcamCapture = ({ onCapture, cnt }) => {
    // 웹캠 참조 객체
    const webcamRef = useRef(null);
    // 캡처 중인지 여부를 나타내는 상태
    const [isCapturing, setIsCapturing] = useState(false);
    // 타이머 카운트다운 상태
    const [countdown, setCountdown] = useState(3);
    // 비디오 스타일 상태 (캡처 시 깜박임 효과를 위한 스타일 변경)
    const [videoStyle, setVideoStyle] = useState({});
    // 타이머 소리 참조 객체
    const countSoundRef = useRef(new Audio('/sound/countSound.mp3'));

    // 즉시 사진을 캡처하는 함수
    /*
    const justCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // 캡처된 이미지를 부모 컴포넌트로 전달
    };
    */
    // 사진을 캡처하고 비디오에 깜박임 효과를 주는 함수
    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // 캡처된 이미지를 부모 컴포넌트로 전달

        // 비디오 깜박임 효과 적용
        setVideoStyle({ opacity: 0.7 });
        setTimeout(() => {
            setVideoStyle({ opacity: 1 }); // 300ms 후 원래 상태로 복구
        }, 300);
    }, [onCapture]);

    // 캡처 타이머 관리 (1초마다 카운트다운)
    useEffect(() => {
        let intervalId;
        if (isCapturing) {
            intervalId = setInterval(() => {
                setCountdown((prev) => {
                    // 타이머 소리 재생
                    if (prev !== 1) {
                        countSoundRef.current.currentTime = 0;
                        countSoundRef.current.play();
                    }
                    // 타이머가 1초일 때 캡처 실행
                    if (prev === 1) {
                        handleCapture();
                        return 4; // 타이머를 4초로 리셋
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        // 컴포넌트가 언마운트되거나 캡처가 중지되면 타이머 정리
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isCapturing, handleCapture]);

    // 캡처 시작 함수
    const startCapturing = () => {
        countSoundRef.current.currentTime = 0;
        countSoundRef.current.play(); // 첫 타이머 소리 재생
        setIsCapturing(true); // 캡처 상태로 전환
        setCountdown(5); // 타이머 초기화
    };

    // 캡처 중지 함수
    const stopCapturing = () => {
        setIsCapturing(false); // 캡처 상태 종료
        setCountdown(3); // 타이머 리셋
    };

    return (
        <div className='bodycontainer'>
            {/* 왼쪽: 웹캠 화면 */}
            <div className='left'>
                <div className='webcam' style={videoStyle}>
                    <Webcam
                        audio={false} // 오디오 비활성화
                        screenshotFormat="image/jpeg" // 이미지 포맷 설정
                        mirrored // 좌우 반전
                        videoConstraints={videoConstraints} // 비디오 설정 적용
                        ref={webcamRef} // 웹캠 참조 설정
                    />
                </div>
            </div>

            {/* 오른쪽: 제어 영역 */}
            <div className='right'>
                <div className='capture'>
                    {/* 캡처 타이머 표시 */}
                    <div className='timer'>
                        {isCapturing ? `남은 시간: ${countdown}초` : '캡처 대기 중'}
                    </div>

                    {/* 캡처 시작/중지 버튼 */}
                    <div className='captureBtnB'>
                        <button
                            className="captureBtn"
                            onClick={isCapturing ? stopCapturing : startCapturing}
                        >
                            {isCapturing ? '중지' : '시작'}
                        </button>
                    </div>
                </div>

                {/* 바로 찍기 버튼 
                
                <div>
                    <button className='captureBtn1' onClick={justCapture}>
                        바로찍기
                    </button>
                </div>
                */}
                {/* 캡처된 이미지 개수 표시 */}
                <div className='counter'>
                    {cnt} / 8
                </div>
            </div>
        </div>
    );
};

export default WebcamCapture;
