"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SwiperB.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";

export default function SwiperB() {
  const swiperRef = useRef(null);
  const [parameterSlider, setParameterSlider] = useState(0);
  const [sliderImg, setSliderImg] = useState("");
  const [catArray, setCatArray] = useState([]);
  const [bigImg, setBigImg] = useState([]);
  const [smallImg, setSmallImg] = useState([]);
  const [sliderRotate, setSliderRotate] = useState('')

  const getSlider = (cat) => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    let obj = {
      cat: cat,
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/GetSubjectByCat`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
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
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/${id}`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
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
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/18`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
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

  const keyShow = (id) => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    ApiGetX2(`/api/CyKeyDatas/${id}`, setSliderRotate)
  };


  useEffect(() => {
    sliderParameter();
    getBanner(42);
    keyShow(1016)
    getSlider("org-slider-img");
  }, []);
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        if (swiperInstance.activeIndex === 0) {
          swiperInstance.params.autoplay.delay = 8000; // 10 ثانیه برای اسلاید اول
        } else {
          swiperInstance.params.autoplay.delay = 4000; // 4 ثانیه برای بقیه
        }
        swiperInstance.autoplay.start(); // برای اعمال تغییرات
      });
    }
  }, []);
  return (<>
    {sliderRotate?.tag && <Swiper
      // loop={true}
      ref={swiperRef}
      spaceBetween={30}

      autoplay={
        sliderRotate.value == "1" &&
        { delay: 3000, disableOnInteraction: false }
      }

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
            // style={{ cursor: "pointer" }}
            src={sliderImg.bigImg}
            alt={sliderImg.title}
          // onClick={() => {
          //   window.scrollTo({
          //     top: 300,
          //     behavior: "smooth",
          //   });
          // }}
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

    </Swiper>}
  </>

  );
}
