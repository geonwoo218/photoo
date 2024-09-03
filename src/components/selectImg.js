import React, { useState, useRef } from 'react';
import '../App.css';
import html2canvas from 'html2canvas';


const SelectedImages = ({ selectedImages }) => {
  const [selectedTemplate, setTemplate] = useState('default');
  const containerRef = useRef(null);

  const handleTemplateClick = (template) => {
    setTemplate(template);
  };

  const openQrInNewTab = (url) => {
    const newWindow = window.open("", "_blank", "width=300,height=300");
    newWindow.document.write(`
      <html>
        <head>
          <title>QR Code</title>
        </head>
        <body style="display: flex; align-items: center; justify-content: center; height: 100%; margin: 0;">
          <div id="qrcode"></div>
          <script src="https://cdn.jsdelivr.net/npm/qrcode.react/umd/qrcode.react.min.js"></script>
          <script>
            function generateQRCode() {
              const qrContainer = document.getElementById('qrcode');
              qrContainer.innerHTML = '';
              new QRCode(qrContainer, { text: '${url}', width: 256, height: 256 });
            }
            generateQRCode();
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };
  
  const handleDownload = () => {
    const container = containerRef.current;

    if (container) {
      html2canvas(container).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'res-container.png');

          // 이미지 서버로 업로드
          fetch('/upload', {  // 여기에 서버 업로드 URL을 설정
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              // 서버에서 이미지 URL을 받으면 새로운 페이지에서 QR 코드 표시
              openQrInNewTab(data.imageUrl);
            })
            .catch(error => console.error('Error uploading image:', error));
        });
      });
    }
  };

  return (
    <div className='res'>
      <div
        ref={containerRef}
        className={`res-container ${selectedTemplate}`}
      >
        {selectedImages.map((img) => (
          <div key={img.id} className='res-imgitem'>
            <img src={img.src} alt="ss" />
          </div>
        ))}
        <div className={`coment ${selectedTemplate}`}>
          이야앗호
        </div>
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
      <button className='endBtn btnStyle' onClick={handleDownload}>
        완성하기
      </button>
    </div>
  );
};

export default SelectedImages;
