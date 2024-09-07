import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {generateQRCode} from './qrCode';

const SelectedImages = ({ selectedImages,onStart }) => {
  const [selectedTemplate, setTemplate] = useState('default');
  const containerRef = useRef(null);

  const handleTemplateClick = (template) => {
    setTemplate(template);
  };

  const handleDownload = () => {
    const container = containerRef.current;

    if (container) {
      html2canvas(container).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'screenshot.png');

          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              const imageUrl = data.imageUrl;
              generateQRCode(imageUrl);
            })
            .catch(err => console.error('Upload failed:', err));
        });
      });
    }
  };

  const goStartPage = ()=>{
    window.location.reload();
  }

  return (
    <div className='res'>
      <div className={`res-container ${selectedTemplate}`}>
        {selectedImages.map((img) => (
          <div key={img.id} className='res-imgitem'>
            <img src={img.src} alt="ss" />
          </div>
        ))}
        
      </div>
      <div className='template'>
        {['첫번째', '두번째', '세번째', '네번째', '다섯번째', '여섯번째'].map((text, index) => (
          <div
            key={index}
            className='t'
            id={`t${index + 1}`}
            onClick={() => handleTemplateClick(`t${index + 1}`)}
          >
            {text}
          </div>
        ))}
      </div>
      <button className='endBtn btnStyle1' onClick={handleDownload}>
        완성하기
      </button>
      <button className='backBtn btnStyle1' onClick={goStartPage}>
        처음으로
      </button>
      {/*qr용 이미지*/}
      <div ref={containerRef} className={`res-container ${selectedTemplate} forQR`}>
        {selectedImages.map((img) => (
          <div key={img.id} className='res-imgitem'>
            <img src={img.src} alt="ss" />
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default SelectedImages;
