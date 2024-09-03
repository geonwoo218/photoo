import React, { useState } from 'react';
import '../App.css';

const SelectedImages = ({ selectedImages }) => {
  
  const [selectedTemplate, setTemplate] = useState('default');

  const handleTemplateClick = (template)=>{
    setTemplate(template);
  }

  return (
    <div className='res'>
      <div className={`res-container ${selectedTemplate}`}>
        {selectedImages.map((img) => (
          <div
            key={img.id}
            className='res-imgitem'
          >
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
      <button className='endBtn btnStyle'>
        완성하기
      </button>
    </div>
  );
};

export default SelectedImages;