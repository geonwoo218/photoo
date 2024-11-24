import React, { useState } from 'react';
import '../App.css';
import Onselect from './selectImg';

const ImageGallery = ({ imgList, onBack }) => {
  // 선택된 이미지의 ID를 저장하는 상태
  const [selectedImages, setSelectedImages] = useState([]);
  // 선택이 완료되었는지 여부를 나타내는 상태
  const [selectionComplete, setSelectionComplete] = useState(false);

  // 이미지를 선택하거나 선택 해제하는 함수
  const toggleImageSelection = (img) => {
    // 이미지가 이미 선택된 경우 선택 해제
    if (selectedImages.includes(img.id)) {
      setSelectedImages(selectedImages.filter(id => id !== img.id));
    }
    // 이미지가 선택되지 않았고, 선택된 이미지가 4개 미만일 경우 추가
    else if (selectedImages.length < 4) {
      setSelectedImages([...selectedImages, img.id]);
    }
  };

  // 선택 완료 버튼을 눌렀을 때 실행되는 함수
  const handleSelectionComplete = () => {
    // 선택된 이미지가 정확히 4개일 때만 완료 상태로 전환
    if (selectedImages.length === 4) {
      setSelectionComplete(true);
    }
  };

  // 선택된 이미지 개수 상태
  const selectCnt = selectedImages.length;

  // 선택이 완료되었을 경우 선택된 이미지 목록을 Onselect 컴포넌트에 전달
  if (selectionComplete) {
    const selectedImgList = imgList.filter(img => selectedImages.includes(img.id));
    return <Onselect selectedImages={selectedImgList} />;
  }

  return (
    <div className='gallery-container'>
      {/* 갤러리 제목 */}
      <h1 style={{ textAlign: 'center', fontSize: '40px' }}>사진을 선택해 주세요!</h1>

      {/* 이미지 목록 표시 */}
      <div className="image-gallery-container">
        {imgList.map((img, index) => (
          <div
            key={img.id}
            className={`image-item ${selectedImages.includes(img.id) ? 'selected' : ''}`}
            onClick={() => toggleImageSelection(img)} // 이미지 선택/해제
          >
            <img src={img.src} alt={`Captured ${index}`} />
          </div>
        ))}
      </div>

      {/* 선택 완료 버튼 및 뒤로 가기 버튼 */}
      <div className='selectBottom'>
        {/* 뒤로 가기 버튼 */}
        <button onClick={onBack} className="back-button">
          <img src={require('../images/back.png')} alt="다시" className='galleryImgBtn' />
        </button>

        {/* 선택된 이미지 개수 표시 */}
        <p className='selectCnt'>{selectCnt} / 4</p>

        {/* 선택 완료 버튼 (4개 선택 시 활성화) */}
        <button
          onClick={handleSelectionComplete}
          className="selectBtn"
          disabled={selectedImages.length !== 4} // 4개가 선택되지 않으면 비활성화
        >
          <img src={require('../images/arrow.png')} alt="화살표" className='galleryImgBtn' />
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
