import React from 'react';
import Webcam from "react-webcam";
import '../App.css'
const videoConstraints = {
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
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
            </div>
            <div className='bottom'>
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