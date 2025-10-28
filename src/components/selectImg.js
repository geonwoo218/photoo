import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { generateQRCode } from './qrCode';

const SelectedImages = ({ selectedImages, onStart }) => {
  // 선택된 템플릿 상태
  const [selectedTemplate, setTemplate] = useState('default');
  // 컨테이너 참조를 위한 ref 생성
  const containerRef = useRef(null);

  // 템플릿 선택 시 호출되는 함수
  const handleTemplateClick = (template) => {
    setTemplate(template); // 선택한 템플릿을 상태로 저장
  };

  // "완성하기" 버튼 클릭 시 호출되는 함수
  const handleDownload = () => {
    const container = containerRef.current; // 캡처할 컨테이너 요소 참조

    if (container) {
      // html2canvas로 컨테이너 캡처
      html2canvas(container).then((canvas) => {
        canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append('image', blob, 'screenshot.png'); // 캡처된 이미지를 FormData에 추가

          // 서버로 이미지 업로드
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json()) // 서버 응답 처리
            .then(data => {
              const imageUrl = data.imageUrl; // 업로드된 이미지 URL
              const filename = data.filename; // 업로드된 파일 이름
              generateQRCode(imageUrl, filename); // QR 코드 생성
            })
            .catch(err => console.error('Upload failed:', err)); // 업로드 실패 시 에러 로그 출력
        });
      });
    }
  };

  /* "처음으로" 버튼 클릭 시 호출되는 함수
  const goStartPage = () => {
    window.location.reload(); // 페이지 새로고침으로 초기화
  };
  */

  return (
    <div className='res'>
      {/* 선택된 이미지 및 템플릿을 표시하는 컨테이너 */}
      <div ref={containerRef} className={`res-container ${selectedTemplate}`}>
        {selectedImages.map((img) => (
          <div key={img.id} className='res-imgitem'>
            <img src={img.src} alt="이미지 없음" />
          </div>
        ))}
        <div className='res-text1'>
          CHANG EUI
        </div>
        <div className='res-text2'>
          @k_geonwoo06
        </div>
      </div>

      {/* 템플릿 선택 버튼 */}
      <div className='template'>
        {['t1', 't2', 't3', 't4'].map((text, index) => (
          <div
            key={index}
            className={`${text} t`} // 템플릿별 클래스 설정
            onClick={() => handleTemplateClick(`t${index + 1}`)} // 템플릿 선택
          >
          </div>
        ))}
        {/* 완성하기 버튼 */}
        <button className='endBtn btnStyle1' onClick={handleDownload}>
          <span>완성하기</span>
        </button>

        {/* 처음으로 버튼 
        <button className='backBtn btnStyle1' onClick={goStartPage}>
          <span>처음으로</span>
        </button>
        */}
      </div>



      {/* QR 코드 생성용 컨테이너 (숨겨진 상태에서 사용) */}
      <div className={`res-container ${selectedTemplate} forQR`}>
        {selectedImages.map((img, index) => (
          <div key={img.id} className={`forQR-imgitem qr${index + 1}`}>
            <img src={img.src} alt="이미지 없음" />
          </div>
        ))}
        <div className='res-text1 forQRt1'>
          CHANG EUI
        </div>
        <div className='res-text2 forQRt2'>
          @k_geonwoo06
        </div>
      </div>
    </div>
  );
};

export default SelectedImages;
