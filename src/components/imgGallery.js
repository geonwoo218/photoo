import React, { useState } from 'react';
import '../App.css';
import Onselect from './selectImg'
const ImageGallery = ({ imgList, onBack}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectionComplete, setSelectionComplete] = useState(false);

  const toggleImageSelection = (img) => {
    if (selectedImages.includes(img.id)) {
      setSelectedImages(selectedImages.filter(id => id !== img.id));
    } else if (selectedImages.length < 4) {
      setSelectedImages([...selectedImages, img.id]);
    }
  };

  const handleSelectionComplete = () => {
    if (selectedImages.length === 4) {
      setSelectionComplete(true);
    }
  };
  const selectCnt = selectedImages.length;

  if (selectionComplete) {
    const selectedImgList = imgList.filter(img => selectedImages.includes(img.id));
    return <Onselect selectedImages={selectedImgList}/>;
  }

  return (
    <div>
      <h1>사진 고르기</h1>
      <div className="image-gallery-container">
        {imgList.map((img, index) => (
          <div
            key={img.id}
            className={`image-item ${selectedImages.includes(img.id) ? 'selected' : ''}`}
            onClick={() => toggleImageSelection(img)}
          >
            <img src={img.src} alt={`Captured ${index}`} />
          </div>
        ))}
      </div>
      <div className='selectBottom'>
        <button onClick={onBack} className="back-button btnStyle">
          다시찍기
        </button>
        <button
          onClick={handleSelectionComplete}
          className="selectBtn btnStyle"
          disabled={selectedImages.length !== 4}
        >
          선택완료
        </button>
        <p className='selectCnt'>{selectCnt} / 4</p>
      </div>
    </div>
  );
};

export default ImageGallery;
