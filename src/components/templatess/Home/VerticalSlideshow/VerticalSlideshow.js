import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation, Scrollbar,Autoplay } from "swiper/modules";

const VerticalSlideshow = () => {
  const sliderData = [
    ["Slide 1-A"
        
        , "Slide 1-B", "Slide 1-C"],
    // ["Slide 2-A", "Slide 2-B", "Slide 2-C"],
    // ["Slide 3-A", "Slide 3-B", "Slide 3-C"],
  ];

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {sliderData.map((slides, index) => (
        <Swiper
          key={index}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
        //   navigation
        // autoplay={{
        //     delay: 2000,
        //     disableOnInteraction: false,
        //   }}
        scrollbar={{ draggable: true }}
          style={{ width: "100%",  maxHeight:'350px' }}
          modules={[Pagination, Navigation, Scrollbar,Autoplay]}
        >
       
            <SwiperSlide >
              <div
                style={{
                    borderRadius:'8px',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/sp_a80_2tbbded2.jpg" style={{width:'100%'}} alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/pick-the-best-parts-for-your-pc-within-your-budget2.jpg"style={{width:'100%'}} alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/photo_2024-11-18_20-16-3402.jpg" style={{width:'100%'}}alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/photo_2024-11-18_20-16-2702.jpg" style={{width:'100%'}}alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/sp_a80_2tbbded2.jpg"style={{width:'100%'}} alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/sp_a80_2tbbded2.jpg" style={{width:'100%'}}alt="" />
              </div>
            </SwiperSlide>

            <SwiperSlide >
              <div
                style={{
                    borderRadius:'8px',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/sp_a80_2tbbded2.jpg" style={{width:'100%'}}alt="" />
              </div>
            </SwiperSlide>
      
        </Swiper>
      ))}
    </div>
  );
};

export default VerticalSlideshow;
