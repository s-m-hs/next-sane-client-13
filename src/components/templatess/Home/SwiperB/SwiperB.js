'use client'
import React, { useRef, useState } from "react";
import styles from "./SwiperB.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SwiperB() {
//   const progressCircle = useRef(null);
//   const progressContent = useRef(null);
//   const onAutoplayTimeLeft = (s, time, progress) => {
//     progressCircle.current.style.setProperty("--progress", 1 - progress);
//     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
//   };
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}

      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    //   onAutoplayTimeLeft={onAutoplayTimeLeft}
      className={styles.swiper}
    >
    <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/31240.jpg
    " alt="" />
            <img className={styles.swiper_img_B} src="../../images/26763361_2111.i211.036.F.m012.c9.jpg" alt="" />

      </SwiperSlide>


      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A}
          src="../../images/163924.jpg " alt=""
        />
                <img className={styles.swiper_img_B} src="../../images/acernitrolaptop-1650914214505.jpg" alt="" />

      </SwiperSlide>


      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/26763361_2111.i211.036.F.m012.c9.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/sp_a80_2tbb.jpg" alt="" />

      </SwiperSlide>

   


      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A} src="../../images/2148994197.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/pick-the-best-parts-for-your-pc-within-your-budget.jpg" alt="" />

      </SwiperSlide>
     

      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/2149529371.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/15462.jpg" alt="" />

      </SwiperSlide>

     

      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/2149417048.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/2149402395.jpg" alt="" />

      </SwiperSlide>

       <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A}src="../../images/2149829123.jpg" alt="" />
        <img className={styles.swiper_img_B} src="../../images/2149529371 (1).jpg" alt="" />
      </SwiperSlide>

      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/rendering-smart-home-device.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/571.jpg" alt="" />

      </SwiperSlide>


      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/2149402395 (2).jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/236790_Apple_watch_9_Ultra_2_AKrales_0356.jpg" alt="" />

      </SwiperSlide>
      {/* <div className="autoplay_progress" slot="container-end">
        <svg viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div> */}
    </Swiper>
  );
}
