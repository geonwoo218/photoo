import React from 'react';
import Webcam from "react-webcam";
import '../App.css'

const videoConstraints = {
    width: 1300,
    facingMode: "user"
};

const WebcamCapture = ({ onCapture,cnt }) => {
    const webcamRef = React.useRef(null);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    };

    const timerCapture = ()=>{

    };

    return (
        <div className='bodycontainer'>
            <div className='left'>
                <div className='webcam'>
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
                <div className='timebutton'>
                    <button className='timerBtn' onClick={timerCapture}>
                        타이머 사진
                    </button>
                </div>
                <div className='capture'>
                    <button className="captureBtn" onClick={handleCapture}>
                        사진 찍기
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