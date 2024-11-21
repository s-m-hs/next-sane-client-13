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
        delay: 2000,
        disableOnInteraction: false,
      }}

      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
    //   onAutoplayTimeLeft={onAutoplayTimeLeft}
      className={styles.swiper}
    >
   
{/* 1 */}
      <SwiperSlide className={styles.swiper_slide}>
      
              <img className={styles.swiper_img_A} src="../../images/2149829123.jpg
    " alt="" />
                <img className={styles.swiper_img_B} src="../../images/acernitrolaptop-16509142145052.jpg" alt="" />

      </SwiperSlide>
{/* 2 */}
      <SwiperSlide className={styles.swiper_slide}>
      <img className={styles.swiper_img_A}
          src="../../images/gradient-translucent-glass-molten-body-headset2.jpg" alt=""
        />
            <img className={styles.swiper_img_B} src="../../images/gradient-translucent-glass-molten-body-headset22.jpg" alt="" />

      </SwiperSlide>

{/* 3 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/168838.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/sp_a80_2tbbded.jpg" alt="" />

      </SwiperSlide>

   

{/* 4 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A} src="../../images/2148994197.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/pick-the-best-parts-for-your-pc-within-your-budget.jpg" alt="" />

      </SwiperSlide>
     
{/* 5 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/2149529371.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/154622.jpg" alt="" />

      </SwiperSlide>

     
{/* 6 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/15462.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/habib-dadkhah-S0B-pmGjdVA-unsplash (2).jpg" alt="" />

      </SwiperSlide>


{/* 7 */}
       <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A}src="../../images/20240326013834.png" alt="" />
        <img className={styles.swiper_img_B} src="../../images/2149529371 (1)2.jpg" alt="" />
      </SwiperSlide>

{/* 8 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/rendering-smart-home-device.jpg
        " alt="" />
        <img className={styles.swiper_img_B} src="../../images/1688382.jpg" alt="" />

      </SwiperSlide>

{/* 9 */}
      <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/2150763360.jpg
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
