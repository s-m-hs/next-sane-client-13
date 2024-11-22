import React, { useRef, useState } from 'react';
import style from './SwiperG.module.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards,Autoplay } from 'swiper/modules';

export default function SwiperG() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards,Autoplay]}
        className="mySwiperG"
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}      >
        <SwiperSlide className={style.div}></SwiperSlide>
        <SwiperSlide className={style.div2}></SwiperSlide>
        <SwiperSlide className={style.div3}></SwiperSlide>
        <SwiperSlide className={style.div4}></SwiperSlide>
        <SwiperSlide className={style.div5}></SwiperSlide>
   
      </Swiper>
    </>
  );
}
