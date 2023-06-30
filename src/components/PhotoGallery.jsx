import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import groupStyle from '../css/group.module.scss';
import mainStyle from '../css/sass.module.scss';
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";

export default function PhotoGallery() {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([
    "/img/group_photo_01.jpg",
    "/img/group_photo_02.jpg",
    "/img/group_photo_03.jpg",
    "/img/group_photo_04.jpg",
    "/img/group_photo_05.jpg",
    "/img/group_photo_06.jpg",
    "/img/group_photo_07.jpg",
    "/img/group_photo_08.jpg",
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setImages([imageSrc, ...images]);
      setIsNewImage([true, ...isNewImage, false]); // 추가된 이미지에 대한 isNewImage 값을 true로 설정
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  
    if (showPopup) {
      setShowPopup(false); // 팝업 닫기
    }
  };
  
  const handleClosePopup = () => {
    setIsNewImage(Array(images.length).fill(false)); // isNewImage 배열 초기화
    setShowPopup(false);
  };

  const handleMoreButtonClick = () => {
    setShowPopup(true);
  };

  const [isNewImage, setIsNewImage] = useState(Array(images.length).fill(false));

  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
        className={`${groupStyle['photo-gallery']} ${groupStyle['photo-navigation']} ${'mySwiper'}`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={groupStyle['photo-swiper-slide']}>
            <img src={image} alt="사진" />
            {isNewImage[index] && <span className={groupStyle['new-badge']}>NEW</span>}
          </SwiperSlide>
        ))}
      </Swiper>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        className={`${groupStyle['photo-btn-left']}`}
        onClick={handleUpload}
      >
        UPLOAD
      </button>

      <button
        className={`${groupStyle['photo-btn-right']}`}
        onClick={handleMoreButtonClick}
      >
        MORE +
      </button>

      {showPopup && (
        <div className={groupStyle['popup']} onClick={handleClosePopup}>
          <div className={groupStyle['popup-content']} onClick={(e) => e.stopPropagation()}>
            <div className={groupStyle['popup-close']} onClick={handleClosePopup}>
              <GrClose />
            </div>
            {images.map((image, index) => (
              <div
                key={index}
                className={groupStyle['popup-image']}
              >
                <img src={image} alt="사진"  />
                {isNewImage[index] && <span className={groupStyle['new-badge2']}>NEW</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
