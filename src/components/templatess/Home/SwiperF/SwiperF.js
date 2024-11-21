import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Typewriter from "typewriter-effect";

import style from './SwiperF.module.css';

// import required modules
import { EffectFlip, Pagination, Navigation,Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        // navigation={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        modules={[EffectFlip, Pagination, Navigation,Autoplay]}
        className="mySwiperF"
      >
     <SwiperSlide>
<div className={`${style.type_div2}`}>
       <h1 className={`${style.type_h2}`}>
                      <Typewriter
                        options={{
                          strings: [" فروش انواع لوازم جانبی کامپیوتر و ملزومات آن با تنوع کم نظیر شامل انواع موس ،کیبرد ،اسپیکر،هدست،پاور بانک و ..."],

                            autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
</div>

 
        </SwiperSlide>

        <SwiperSlide>
<div className={`${style.type_div3}`}>

       <h1 className={`${style.type_h3}`}>
                      <Typewriter
                        options={{
                          strings: ["مشاوره ،فروش واسمبل انواع سیستمهای خانگی ،اداری،گیمینگ ،مهندسی و ... "],

                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>

    
</div>

 
        </SwiperSlide>

        <SwiperSlide>
<div className={`${style.type_div}`}>
       <h1 className={`${style.type_h1}`}>
                      <Typewriter
                        options={{
                            strings: ["پخش همکار و ارسال سفارش به تمام نقاط کشور..."],

                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
</div>

 
        </SwiperSlide>

        <SwiperSlide>
<div className={`${style.type_div5}`}>
       <h1 className={`${style.type_h5}`}>
                      <Typewriter
                        options={{
                            strings: [" مشاوره و فروش انواع لپ تاپ های خانگی ،اداری ،گیمینگ ،مهندسی و..."],

                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
</div>

 
        </SwiperSlide>
   



        <SwiperSlide>
<div className={`${style.type_div4}`}>
       <h1 className={`${style.type_h4}`}>
                      <Typewriter
                        options={{
                          strings: [" ارايه انواع خدمات نرم افزاری وسخت افزاری جهت ارتقا انواع سیستمهای PC و لپ تاپ "],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
</div>

 
        </SwiperSlide>

   

  
      </Swiper>
    </>
  );
}
