"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';
import "swiper/css/pagination";
import style from "./SwiperD.module.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MainContext } from "@/context/MainContext";
import CardB from "@/components/madules/Cards/CardB/CardB";
import apiUrl from "@/utils/ApiUrl/apiUrl";
// import styles from './SwiperC.module.css'
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import Example from "./Example";
import { ClockLoader } from "react-spinners";

export default function SwiperD({ title, categoryCode }) {
  const [productByCatArray, setProductByCatArray] = useState([]);
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);
  let { offer } = useContext(MainContext);
  const getProductByCat = () => {
    let obj = {
      cat: categoryCode,
      pageNumber: 0,
      pageSize: 100,
    };
    // console.log(obj)
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProducts/GetProductByCat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          setProductByCatArray(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  useEffect(() => {
    getProductByCat();
  }, []);
  return (
    <>
      <div className={`container ${style.container} boxSh`}>
        <div className="row centerr">
          <div className={`col-lg-2 ${style.right_div} centerc`}>
           <p>شگفتانه روز</p>
            <Example />

            <ClockLoader color="#fd2121" size={100} speedMultiplier={0.3} />
          </div>

          <div className={` col-lg-10 ${style.swipercomb_div}`}>
            <span
              className={` ${style.swipercomb_title}`}
              style={{ marginRight: "50px" }}
            >
              {title}
            </span>

            <Swiper
              // loop={true}
              slidesPerView={1}
              spaceBetween={20}
              // centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              // autoplay={{
              //   delay: 3000,
              //   disableOnInteraction: false,
              // }}
              // navigation={true}
              breakpoints={{
                450: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
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
              className={`${style.swiperCustom} mySwiperB swiperCustom `} 
            >
              {productByCatArray?.itemList
                ?.slice()
                .reverse()
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <CardB
                      clickSpinner={() => setFlagSpinnerShow(true)}
                      id={item.id}
                      imgSrc={item.mainImage}
                      title={item.name}
                      price={Number(item.price) / 10}
                      supply={item.supply}
                      categoryCode={categoryCode}
                      cyProductCategoryId={item.cyProductCategoryId}
                      noOffPrice={Number(item.noOffPrice) / 10}
                      offer={offer}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
