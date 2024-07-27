import React, { useState, useEffect, useRef } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import { useRouter } from "next/router";
import CategoryProducts from "./CategoryProducts/CategoryProducts";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-flip";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, EffectFlip, Pagination, Navigation } from "swiper/modules";


export default function CategoryDetaile() {
  const route = useRouter();
console.log(route.query.id)
  const [mainCategory, setMainCategory] = useState({});
  const [mainCatChilds, setMainCatChilds] = useState([]);
  const [flagPro, setFlagPro] = useState(false);

  const styleRef = useRef();

  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: route.query.id,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyCategories/GetItemWChildAndRoot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          setMainCategory(result);
          console.log(mainCategory.childs);
          setMainCatChilds(mainCategory.childs);
          // console.log(mainCatChilds);
        });
    }
    myAppGet();
  };
  ////////////////////////////
  const changeId = () => {
    console.log("first");
    // styleRef.current.classList.add("category-mySwiperD__hide");
    // setMainCatChilds([])
    // setFlagPro(prev=>!prev)
    setFlagPro(true);
    // console.log(flagPro);
    console.log(mainCategory.childs);

  };
  //////////////////////////////
  useEffect(() => {
    if (route.query.id !== null) {
      getCategoryById();
    }
  }, []);
  console.log(mainCategory.childs);

  return (
    <div className={`container  centerc ${Styles.category}`} >
      <div className={`row row-cols-6  centerr ${Styles.category_row}`}>
        {mainCategory.childs != null &&
          mainCategory.childs.map((item, index) => (
            <>
              <div className={`centerc ${Styles.category__cart_div}`}>
                <CardAButton imgSrc={item.imageUrl}  changeIdProp={changeId} />
                <span>{item.text} </span>
              </div>
            </>
          ))}
      </div>
      {mainCategory.childs !== 0 && (
        <div className="row">
          <div className="col-12">
            <CategoryProducts />
          </div>
        </div>
      )}

      {flagPro && (
        <div className="row">
          <div className="col-12">
            <CategoryProducts />
          </div>
        </div>
      )}
    </div>
  );
}
