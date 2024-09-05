import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

const SelectedImages = ({ selectedImages }) => {
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

  const generateQRCode = (url) => {
    QRCode.toDataURL(url)
      .then((qrCodeUrl) => {
        const newWindow = window.open("", "_blank", "width=300,height=300");
        newWindow.document.write(`
          <html>
            <head>
              <title>QR Code</title>
            </head>
            <body style="display: flex; align-items: center; justify-content: center; height: 100%; margin: 0;">
              <img src="${qrCodeUrl}" alt="QR Code">
              <h2>qr 을 찍어서 나온 이미지를 꾹 눌러 저장해주세요</h2>
            </body>
          </html>
        `);
        newWindow.document.close();
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
      });
  };

  return (
    <div className='res'>
      <div ref={containerRef} className={`res-container ${selectedTemplate}`}>
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

      {/*qr용 이미지*/}
      <div className={`res-container ${selectedTemplate} forQR`}>
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
