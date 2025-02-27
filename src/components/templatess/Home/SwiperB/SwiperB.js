"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SwiperB.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import apiUrl from "@/utils/ApiUrl/apiUrl";

export default function SwiperB() {
  const [parameterSlider, setParameterSlider] = useState(0);
  const [sliderImg, setSliderImg] = useState("");
  const [catArray, setCatArray] = useState([]);
  const [bigImg, setBigImg] = useState([]);
  const [smallImg, setSmallImg] = useState([]);

  const getSlider = (cat) => {
    const getLocalStorage = localStorage.getItem("loginToken");
    let obj = {
      cat: cat,
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/GetSubjectByCat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              setCatArray(result.itemList);
            });
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const getBanner = (id) => {
    const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setSliderImg(result);
          });
        }
      });
    }
    myApp();
  };
  const sliderParameter = () => {
    const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/18`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setParameterSlider(Number(result.value));
          });
        }
      });
    }
    myApp();
  };

  useEffect(() => {
    sliderParameter();
    getBanner(42);
    getSlider("org-slider-img");
  }, []);

  return (
    <Swiper
      // loop={true}
      spaceBetween={30}
    
      autoplay={ sliderImg?.orderValue===1 ? {
        disableOnInteraction: false,
      } : {
        delay: 4000,
        disableOnInteraction: false,
      }}

      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className={styles.swiper}
    >
      {sliderImg?.orderValue == 1 && (
        <SwiperSlide className={styles.swiper_slide}>
          <img
            className={styles.swiper_img_A}
            style={{ cursor: "pointer" }}
            src={sliderImg.bigImg}
            alt={sliderImg.title}
            onClick={() => {
              window.scrollTo({
                top: 300,
                behavior: "smooth",
              });
            }}
          />

          <img
            className={styles.swiper_img_B}
            src={sliderImg.smallImg}
            alt={sliderImg.title}
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   window.scrollTo({
            //     top: 300,
            //     behavior: "smooth",
            //   });
            // }}
          />
        </SwiperSlide>
      )}

      {catArray.length != 0 &&
        catArray.map((item) => (
          <SwiperSlide className={styles.swiper_slide}>
            <img
              className={styles.swiper_img_A}
              src={`${item.bigImg}`}
              alt={`${item.cyCategoryId}`}
            />
            <img
              className={styles.swiper_img_B}
              src={`${item.smallImg}`}
              alt={`${item.cyCategoryId}`}
            />
          </SwiperSlide>
        ))}

      {/* 1 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
      
              <img className={styles.swiper_img_A} src="../../images/2149829123.jpg
    " alt="2149829123" />
                <img className={styles.swiper_img_B} src="../../images/acernitrolaptop-16509142145052.jpg" alt="acernitrolaptop" />

      </SwiperSlide> */}

      {/* 2 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
      <img className={styles.swiper_img_A}
          src="../../images/gradient-translucent-glass-molten-body-headset2.jpg" alt="headset"
        />
            <img className={styles.swiper_img_B} src="../../images/gradient-translucent-glass-molten-body-headset22.jpg" alt="headset22" />

      </SwiperSlide> */}

      {/* 3 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/168838.jpg
        " alt="168838" />
        <img className={styles.swiper_img_B} src="../../images/sp_a80_2tbbded.jpg" alt="sp_a80" />

      </SwiperSlide> */}

      {/* 4 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A} src="../../images/2148994197.jpg
        " alt="2148994197" />
        <img className={styles.swiper_img_B} src="../../images/pick-the-best-parts-for-your-pc-within-your-budget.jpg" alt="your-budget" />

      </SwiperSlide> */}

      {/* 5 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/2149529371.jpg
        " alt="2149529371" />
        <img className={styles.swiper_img_B} src="../../images/154622.jpg" alt="154622" />

      </SwiperSlide> */}

      {/* 6 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img  className={styles.swiper_img_A}src="../../images/15462.jpg
        " alt="15462" />
        <img className={styles.swiper_img_B} src="../../images/habib-dadkhah-S0B-pmGjdVA-unsplash (2).jpg" alt="habib" />

      </SwiperSlide> */}

      {/* 7 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A}src="../../images/20240326013834.png" alt="20240326013834" />
        <img className={styles.swiper_img_B} src="../../images/2149529371 (1)2.jpg" alt="2149529371" />
      </SwiperSlide> */}

      {/* 8 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/rendering-smart-home-device.jpg
        " alt="rendering" />
        <img className={styles.swiper_img_B} src="../../images/1688382.jpg" alt="1688382" />

      </SwiperSlide> */}

      {/* 9 */}
      {/* <SwiperSlide className={styles.swiper_slide}>
        <img className={styles.swiper_img_A} src="../../images/2150763360.jpg
        " alt="2150763360" />
        <img className={styles.swiper_img_B} src="../../images/236790_Apple_watch_9_Ultra_2_AKrales_0356.jpg" alt="Apple_watch" />

      </SwiperSlide> */}
    </Swiper>
  );
}
