import React, { useRef, useState } from 'react';
import Styles from  './SwiperProduct.module.css';
import ImageMagnifier from '@/utils/Functions/magnifier';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Image } from 'primereact/image';

export default function SwiperProduct({src,srcB}) {


    const [thumbsSwiper, setThumbsSwiper] = useState(null);
// console.log(srcB)
  return (
    <>
    {src && <>
     <div  className={`${Styles.swiper} centerc`}>
        <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      spaceBetween={10}
      // navigation={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
      className={Styles.mySwiperE2} 
    >
       <SwiperSlide className={Styles.swiper_slide}>
       <div>
       <Image src={src} alt="Image" width="250" preview />

            {/* <ImageMagnifier 
                src={src}
                width={500}
                height={400}
                magnifierHeight={100}
                magnifierWidth={80}
                zoomLevel={3}
                alt="Sample Image"
            /> */}
        </div>
   </SwiperSlide>

{srcB  && srcB.map(item=>(
  <>
{<>
{item &&   <SwiperSlide className={Styles.swiper_slide}>
  <div>
  <Image src={item} alt="Image" width="250" preview />
           {/* <ImageMagnifier 
              src={item}
              width={500}
              height={400}
              magnifierHeight={100}
              magnifierWidth={80}
               zoomLevel={3}
               alt="Sample Image"
           /> */}
       </div>
  </SwiperSlide>}
</>}

  </>
  

))}



    </Swiper>

    <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className={Styles.mySwiperE}
    >
        <SwiperSlide className={Styles.swiper_slide}>
     <img src={src} />
   </SwiperSlide>


{srcB && srcB.map(item=>(
  <>
  {item &&   <SwiperSlide className={Styles.swiper_slide}>
  <img src={item} />
</SwiperSlide>}
  </>

)) 
}




   {/* <SwiperSlide className={Styles.swiper_slide}>
     <img src="../../../../../images/products/mouse/2021-9-a4tech-bloody-a60-left-652d06068716201626d0f36e.webp" />
   </SwiperSlide>

   <SwiperSlide className={Styles.swiper_slide}>
     <img src="../../../../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1 (1).webp" />
   </SwiperSlide>

   <SwiperSlide className={Styles.swiper_slide}>
     <img src="../../../../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1.webp" />
   </SwiperSlide>

   <SwiperSlide className={Styles.swiper_slide}>
     <img src="../../../../../images/products/mouse/2021-9-a4tech-bloody-a60-bottom-652d06058716201626d0f36a.webp" />
   </SwiperSlide> */}
    </Swiper>
    </div>
    </>}
   
  
  </>  )
}
