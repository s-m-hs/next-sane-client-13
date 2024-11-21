import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './VerticalSlideshow.module.css'

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
          spaceBetween={100}
          slidesPerView={1}
          pagination={{ clickable: true }}
        //   navigation
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        // scrollbar={{ draggable: true }}
          style={{ width: "100%",  maxHeight:'350px' }}
          modules={[Pagination, Navigation, Scrollbar,Autoplay]}
        >
             <SwiperSlide >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  backgroundColor: "#f4f4f4",
                  marginBottom:'120px'

                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/rog-strix-z790-h-gaming-wifi-image-10-600x6002.jpg"style={{width:'100%'}} alt="" />
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
                  marginBottom:'120px'

                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/download2.png" style={{width:'100%'}} alt="" />
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
                  marginBottom:'120px'

                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/LD00061243592.png" style={{width:'100%'}}alt="" />
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
                  marginBottom:'120px'
                //   border: "1px solid #ccc",
                }}
              >
               <img src="../../images/mini_swiper/81sfez9WktL2.jpg" style={{width:'100%'}}alt="" />
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
               <img src="../../images/mini_swiper/71E7Nnlt-JL._AC_UF1000,1000_QL80_2.jpg"style={{width:'100%'}} alt="" />
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
               <img src="../../images/mini_swiper/Xgaming-27-inch-165Hz-144Hz-Curved-Gaming-Monitor-Ultra-Wide-16-9-1440p-PC-Monitor-Laptop-2-Speakers-1ms-AMD-QHD2K-2560-x-1440p-HDR-Computer-Support_be788a05-2e83-43a2.jpg" style={{width:'100%'}}alt="" />
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
               <img src="../../images/mini_swiper/sp_a80_2tbbded.jpg" style={{width:'100%'}}alt="" />
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
               <img src="../../images/mini_swiper/9c27637ac04643a7c3a5cd8704994332-hi2.jpg" style={{width:'100%'}}alt="" />
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
               <img src="../../images/mini_swiper/WD My Passport 500 GB External Hard Disk-1200x900.jpg" style={{width:'100%'}}alt="" />
              </div>
            </SwiperSlide>
      
        </Swiper>
      ))}
    </div>
  );
};

export default VerticalSlideshow;
