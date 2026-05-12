"use client";
import dynamic from "next/dynamic";
const SwiperC = dynamic(() => import("@/components/madules/Swiper/SwiperC/SwiperC"), { ssr: false });
const CategorySectionA = dynamic(() => import("@/components/templatess/Home/CategorySectionA/CategorySectionA"), { ssr: false });
const BrandArea = dynamic(() => import("@/components/madules/BrandArea/BrandArea"), { ssr: false });
const BanerA = dynamic(() => import("@/components/madules/Baner/BanerA"), {
  ssr: false,
});

// import BanerA from '@/components/madules/Baner/BanerA';
// import BrandArea from '@/components/madules/BrandArea/BrandArea';
// import SwiperC from '@/components/madules/Swiper/SwiperC/SwiperC';
// import CategorySectionA from '@/components/templatess/Home/CategorySectionA/CategorySectionA';
import SwiperB from "@/components/templatess/Home/SwiperB/SwiperB";
import SwiperF from "@/components/templatess/Home/SwiperF/SwiperF";
import SwiperG from "@/components/templatess/Home/SwiperG/SwiperG";
import VerticalSlideshow from "@/components/templatess/Home/VerticalSlideshow/VerticalSlideshow";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import { usePathname } from "next/navigation";

// import getLocalStorage from '@/utils/localStorag/localStorage';
import { use, useContext, useEffect, useState } from "react";
import SubjecArea from "@/components/madules/SubjecArea/SubjecArea";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import SwiperD from "@/components/templatess/Home/SwiperD/SwiperD";
import Head from "next/head";

export default function Home() {
  const pathname = usePathname();

  let { paymentState } = useContext(MainContext);
  const alertA = () => alertN("center", "success", "محصولات با موفقیت به سبد خرید شما اضافه شد", 500);
  // const getLocalStorage=localStorage.getItem('loginToken')
  const [key, setKey] = useState("");
  const [keyB, setKeyB] = useState("");
  const [keyOfferSlider, setKeyOfferSlider] = useState("");

  const brandLogA = [
    { id: 1, brand: "A4.jpg", url: "https://www.a4tech.com/" },
    { id: 2, brand: "rapoo.jpg", url: "https://www.rapoo-eu.com/" },
    { id: 3, brand: "razer.jpg", url: "https://www.razer.com/" },
    { id: 4, brand: "tesco.jpg", url: "https://tsco.ir/" },
    { id: 5, brand: "earldom.jpg", url: "https://www.earldom.com/" },
    { id: 6, brand: "Logitech-Symbol.png", url: "https://www.logitech.com/" },
    // 'A4.jpg','rapoo.jpg','razer.jpg','tesco.jpg','proone.jpg','logitech.jpg'
  ];
  const brandLogoB = [
    { id: 1, brand: "asus.jpg", url: "https://www.asus.com/" },
    { id: 2, brand: "sp.jpg", url: "https://www.silicon-power.com/web//" },
    { id: 3, brand: "wd.jpg", url: "" },
    { id: 4, brand: "samsung.jpg", url: "https://www.samsung.com/us/" },
    { id: 5, brand: "giga.jpg", url: "https://www.gigabyte.com/" },
    { id: 6, brand: "green.png", url: "https://green.ir/" },
    // 'asus.jpg','sp.jpg','wd.jpg','samsung.jpg','giga.jpg','coolermaaster.jpg'
  ];

  const keyShow = (id, func) => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            func(result);
          });
        }
      });
    }
    myApp();
  };

  useEffect(() => {
    keyShow(11, setKey);
    keyShow(15, setKeyB);
    keyShow(14, setKeyOfferSlider);
  }, []);
  useEffect(() => {
    if (paymentState) {
      setTimeout(() => {
        window.location.reload(true); // بعد از کمی تأخیر رفرش کن
      }, 500);
    }
  }, [paymentState]);

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-lg-8 home-swiperB-col">
            <SwiperB />
          </div>
          <div className="col-4 home-miniSwiper">
            <VerticalSlideshow />
            <SwiperF />
          </div>
          {/* <SwiperD categoryCode='SUPRIZ DAY' title={'فوق العاده ها:'}/> */}

          {keyOfferSlider?.value === "1" && <SwiperC categoryCode="offer-Basket" title={`سبد فروش ویژه💰:`} />}

          {keyB?.value === "1" ? <SwiperC categoryCode="new" title={"جدیدترین ها:"} /> : ""}
          <CategorySectionA title="لوازم جانبی" categoryId={3} />
          <BrandArea brandArray={brandLogA} fileRoot={"1"} />
          <SwiperC categoryCode="best-sellers" title={"پرفروش ترین ها :"} />
          <div className="mobile-swiperf">
            <SwiperF />
          </div>

          <CategorySectionA title="سخت افزار" categoryId={2} />
          <BrandArea brandArray={brandLogoB} fileRoot={"2"} />
          {key?.value === "1" ? <SwiperC categoryCode="hardwairebestseller" title={"پرفروش ترین های سخت افزار :"} /> : ""}
          <SubjecArea />
          <BanerA />
        </div>
      </div>
    </>
  );
}
