import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

// import "./styles.css";
import homeStyle from '../css/home.module.scss'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


export default function AdSlide() {

    return (
        <div>
            <Swiper
                // spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                // className="mySwiper"
                className={`${homeStyle['ad-swiper']} ${'mySwiper'}`}
            >
                <SwiperSlide className={homeStyle['ad-swiper-slide']}><img src={`${process.env.PUBLIC_URL}/img/ad-banner-01.jpg`} alt="ad" /></SwiperSlide>
                <SwiperSlide className={homeStyle['ad-swiper-slide']}><img src={`${process.env.PUBLIC_URL}/img/ad-banner-02.jpg`} alt="ad" /></SwiperSlide>
                <SwiperSlide className={homeStyle['ad-swiper-slide']}><img src={`${process.env.PUBLIC_URL}/img/ad-banner-03.png`} alt="ad" /></SwiperSlide>

            </Swiper>
        </div>
    )
}
