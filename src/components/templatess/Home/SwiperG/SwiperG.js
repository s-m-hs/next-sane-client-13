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
          }}  
              >
        <SwiperSlide className={style.div}>
{/* <img src='../../../../../../images/Slider/photo_2024-11-22_22-34-322.jpg' alt="" /> */}

        </SwiperSlide>

        <SwiperSlide className={style.div2}>
        {/* <img src='../../../../../../images/Slider/photo_2024-11-22_22-34-39.jpg' alt="" /> */}
        </SwiperSlide>

        <SwiperSlide className={style.div3}>
        {/* <img src='../../../../../../images/Slider/photo_2024-11-22_22-34-45.jpg' alt="" /> */}
        </SwiperSlide>
        <SwiperSlide className={style.div4}>
        {/* <img src='../../../../../../images/Slider/photo_2024-11-22_22-34-322.jpg' alt="" /> */}
        </SwiperSlide>
   
      </Swiper>
    </>
  );
}
