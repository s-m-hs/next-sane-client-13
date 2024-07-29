'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardB from '../../Cards/CardB/CardB';
// import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import styles from './SwiperC.module.css'


export default function SwiperC({title,sliderDetailProp}) {

  return (
    <>
    <div  className='swipercomb-div'
     >
          <span className='swipercomb-title' style={{marginRight:'50px'}}>{title}</span>
        <Swiper
            loop={true}
        // slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        // navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}

        className= "mySwiperB"
      >
        {sliderDetailProp.map((item,index)=>
  <SwiperSlide
   >
    <CardB key={index}
        imgSrc={item.img} title={item.title} price={item.price}
        /></SwiperSlide>
        )}
      
    
        
      </Swiper>
    
    </div>
  
    </>
  )
}
