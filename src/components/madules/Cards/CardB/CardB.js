import React, { useContext, useEffect, useState } from "react";
import styles from "./CardB.module.css";
import Link from "next/link";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import addToCart from "@/utils/Functions/addToCart";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import alertQ from "@/utils/Alert/AlertQ";
import Favorite from "../../Favorite/Favorite";
import ShareButton from "../../ShareButton/ShareButton";

export default function CardB({
  imgSrc,
  title,
  price,
  id,
  clickSpinner,
  supply,
  cyProductCategoryId,
  categoryCode,
  offer,
  noOffPrice,
  isFavor
}) {
  let { setXtFlagSpinnerShow, setNameCategory } = useContext(MainContext);


  const AlertC = () =>
    alertQ(
      "center",
      "info",
      " برای استعلام قیمت میتوانید با همکاران ما ارتباط داشته باشید،همکاران ما در کم ترین زمان پاسخ شما را خواهند داد (از ابزارک گفتگو پایین سمت راست استفاده کنید)...",
      "باشه ..."
    ).then((res) => { });

  useEffect(() => {
    return () => setNameCategory("");
  }, []);
  return (
    <div className={`${styles.container} centerc`}>
      <div className={`${styles.favorite}`}>
        <Favorite id={id} isFavorite={isFavor} />

      </div>

      <div className={`${styles.share}`}>
        <ShareButton productId={id} />
      </div>

      <Link href={`/product/${id}`} onClick={() => setXtFlagSpinnerShow(true)}>
        {" "}
        <img className={`${styles.img}`} src={imgSrc} alt={`${title}`} />
      </Link>

      <span className={styles.title}> {title} </span>
      {/* <span>368,000</span> */}
      {supply != 0 ? (
        <>


          {(offer == 1 && noOffPrice === price) ?

            <span className={styles.price}>
              {price?.toLocaleString()}تومان{" "}
            </span>
            :

            <div className="centerc">
              <span className={styles.price}>
                {(price).toLocaleString()}تومان{" "}

              </span>
              <span className={`${styles.noOffPrice} ${styles.underline}`}>
                {noOffPrice?.toLocaleString()}تومان{" "}
              </span>
            </div>

          }
        </>
      ) : // parentId == 2 ?
        categoryCode === "hardwairebestseller" ? (
          <span
            onClick={() => AlertC()}
            style={{ cursor: "pointer" }}
            className={styles.price}
          >
            استعلام قیمت
          </span>
        ) : (
          <span className={styles.price}>استعلام قیمت</span>
        )}

      {/* <div className={`${styles.icon_div} centerr`}   >
        <ShoppingCart size={24} color="#19a7af" weight="duotone"

onClick={()=>{
  if(xtFlagLogin ){
if(supply!=0){
  addToBasket()
}else if(supply==0 && categoryCode==='hardwairebestseller' ){
  AlertC()
}
  }else{
    if(supply!=0){
      addToCart(id,'1',setCartCounter)
    }else if(supply==0){
    AlertC()
  }
  }
}}

    />
        <Heart size={24} color="#19a7af" weight="duotone" />
  

        </div> */}

      <div></div>
    </div>
  );
}
