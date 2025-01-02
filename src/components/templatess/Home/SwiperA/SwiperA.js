import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './SwiperA.module.css'

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";


import { Autoplay, EffectCube, Pagination } from "swiper/modules";
export default function SwiperA() {
  return (
<>
<Swiper
                  loop={true}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                  effect={"cube"}
                  grabCursor={true}
                  cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                  }}
                  // pagination={true}
                  modules={[Autoplay, EffectCube, Pagination]}
                  className={styles.swiper} 
                >
                  <SwiperSlide className={styles.swiper_slide}>
                    <img src="../../images/photo_2024-05-30_19-08-29.jpg" />
                  </SwiperSlide>
                  <SwiperSlide className={styles.swiper_slide} >
                    <img src="../../images/photo_2024-05-30_19-08-242.jpg" />
                  </SwiperSlide>
                  <SwiperSlide  className={styles.swiper_slide}>
                    <img src="../../images/1005639-خنده-دار-اقامت-ربات-سفید.jpg" />
                  </SwiperSlide>
              
                </Swiper>
</>  )
}
