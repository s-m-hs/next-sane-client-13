import React, { useRef, useState } from 'react';
import Styles from  './SwiperProduct.module.css';
import ImageMagnifier from '@/utils/Functions/magnifier';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function SwiperProduct() {


    const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
    {/* <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      spaceBetween={10}
      navigation={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
      className={Styles.mySwiperE2} 
    >
       <SwiperSlide>
       <div>
            <ImageMagnifier 
                src="../../images/products/mouse/2021-9-a4tech-bloody-a60-652d0606eb21a6b54f50b1c9.webp"
                width={400}
                height={300}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={3}
                alt="Sample Image"
            />
        </div>
   </SwiperSlide>

   <SwiperSlide>
   <div>
            <ImageMagnifier 
               src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-652d06068716201626d0f36e.webp"
                width={400}
                height={300}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={3}
                alt="Sample Image"
            />
        </div>
   </SwiperSlide>

   <SwiperSlide>
   <div>
            <ImageMagnifier 
                src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1 (1).webp"
                width={400}
                height={300}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={3}
                alt="Sample Image"
            />
        </div>
   </SwiperSlide>

   <SwiperSlide>
   <div>
            <ImageMagnifier 
                src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1.webp" 
                width={300}
                height={200}
                magnifierHeight={100}
                magnifierWidth={100}
                zoomLevel={3}
                alt="Sample Image"
            />
        </div>
   </SwiperSlide>

   <SwiperSlide>
   <div>
            <ImageMagnifier 
                src="../../images/products/mouse/2021-9-a4tech-bloody-a60-bottom-652d06058716201626d0f36a.webp"
                width={400}
                height={300}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={3}
                alt="Sample Image"
            />
        </div>
   </SwiperSlide>



    </Swiper> */}


{/*     
    <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className={Styles.mySwiperE}
    >
        <SwiperSlide>
     <img src="../../images/products/mouse/2021-9-a4tech-bloody-a60-652d0606eb21a6b54f50b1c9.webp" />
   </SwiperSlide>

   <SwiperSlide>
     <img src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-652d06068716201626d0f36e.webp" />
   </SwiperSlide>

   <SwiperSlide>
     <img src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1 (1).webp" />
   </SwiperSlide>

   <SwiperSlide>
     <img src="../../images/products/mouse/2021-9-a4tech-bloody-a60-left-side-652d0605eb21a6b54f50b1c1.webp" />
   </SwiperSlide>

   <SwiperSlide>
     <img src="../../images/products/mouse/2021-9-a4tech-bloody-a60-bottom-652d06058716201626d0f36a.webp" />
   </SwiperSlide>
    </Swiper> */}
  </>  )
}
