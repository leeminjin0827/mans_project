import { Divider } from '@mui/joy';
import axios from 'axios';
import React, { useState } from 'react';

export default function PictureList({ room }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.rfiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.rfiles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Divider />
      <div style={{ textAlign: "center", minWidth : "600px" , maxWidth: "600px" , marginTop : "50px" }}>
        <img
          src={`http://localhost:8081/upload/room/${room.rfiles[currentImageIndex]}`}
          alt={`room-${room.rono}-${currentImageIndex}`}
          style={{
            width: "100%", 
            height: "auto", 
            maxHeight: "400px" ,   // 이미지 높이를 고정하거나 제한
            minHeight: "400px" ,
            objectFit: "contain", // 이미지가 모달 크기에 맞게 비율 유지
            marginBottom: "10px"
          }}
        />
        <div>
          <button onClick={prevImage} style={{ marginRight: "10px" }}>
            Prev
          </button>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
    </div>
  );
}