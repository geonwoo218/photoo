import React from 'react';
import Webcam from "react-webcam";
import '../App.css'

const videoConstraints = {
    width: 800,
    height: 600,
    facingMode: "user"
};

const WebcamCapture = ({ onCapture,cnt }) => {
    const webcamRef = React.useRef(null);

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    };

    return (
        <div className='bodycontainer'>
            <div className='top'>
                <div className='webcam'>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        mirrored
                        videoConstraints={videoConstraints}
                        ref={webcamRef}
                        style={{ width: '800px', height: '600px' }}
                    />
                </div>
            </div>
            <div className='bottom'>
                <div className='capture'>
                    <button className="captureBtn btnStyle" onClick={handleCapture}>
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