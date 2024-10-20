'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardB from '../../Cards/CardB/CardB';
// import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import apiUrl from '@/utils/ApiUrl/apiUrl';
// import styles from './SwiperC.module.css'


export default function SwiperC({title,categoryCode}) {
  const [productByCatArray,setProductByCatArray]=useState([])
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);


const getProductByCat=()=>{
  let obj={
    cat:categoryCode,
    pageNumber: 0,
    pageSize: 100
  }
  // console.log(obj)
  async function myApp(){
    const res=await fetch(`${apiUrl}/api/CyProducts/GetProductByCat`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(obj)
    }).then(res=>{
      // console.log(res)
      return res.json()
    }).then(result=>{
      // console.log(result)
      setProductByCatArray(result)
    }).catch(err=>console.log(err))
  }
  myApp() 
}
useEffect(()=>{
  getProductByCat()
},[])

// console.log(productByCatArray)
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
        {productByCatArray?.itemList?.map((item,index)=> 
  <SwiperSlide key={index}
   >
    <CardB 
      clickSpinner={()=>setFlagSpinnerShow(true)}
      id={item.id}
        imgSrc={item.mainImage} title={item.name} price={item.price}
        /></SwiperSlide>
        )}
      
    
        
      </Swiper>
    
    </div>
  
    </>
  )
}
