import React from 'react';
import '../App.css';

const SelectedImages = ({ selectedImages }) => {
  console.log(selectedImages.imglist);
  return (
    <div className='res'>
      <div className='res-container'>
        {selectedImages.map((img, index) => (
          <div
            key={img.id}
            className='res-imgitem'
          >
            <img src={img.src} alt="ss" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedImages;