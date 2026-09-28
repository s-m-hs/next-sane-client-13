"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Styles from "./CardC.module.css";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import addToCart from "@/utils/Functions/addToCart";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import alertQ from "@/utils/Alert/AlertQ";
import Favorite from "../../Favorite/Favorite";
import ShareButton from "../../ShareButton/ShareButton";
import { product } from "@/utils/DataStore";

export default function CardC({
  imgSrc,
  title,
  price,
  id,
  clickSpinner,
  supply,
  parentId,
  noOffPrice,
  verifyHam,
  offerState,
  offPrice,
  isToSale,
  isFavor,
  isShowHeart,
}) {
  let {
    setCartCounter,
    xtFlagLogin,
    setBasketFlag,
    setXtFlagSpinnerShow,
    setLocalUpdateBasket,
  } = useContext(MainContext);

  // محاسبه درصد تخفیف
  const hasDiscount = noOffPrice !== null && price !== null && Number(noOffPrice) > Number(price) && supply !== 0 && isToSale;
  const discountPercent = hasDiscount
    ? Math.round((1 - Number(price) / Number(noOffPrice)) * 100)
    : 0;

  const AlertA = () => {
    if (supply != 0) {
      alertN("center", "success", " به سبد خرید اضافه شد...", 1500);
    } else if (supply == 0) {
      alertN(
        "center",
        "success",
        " برای استعلام قیمت به سبد خرید اضافه شد...",
        1500
      );
    }
  };

  const AlertB = () =>
    alertN("center", "info", " این محصول در سبد خرید شما موجود است ...", 1000).then(
      (res) => {}
    );
  const AlertC = () =>
    alertQ(
      "center",
      "info",
      " برای استعلام قیمت میتونید با همکاران ما ارتباط داشته باشید،همکاران ما در کم ترین زمان پاسخ شما را خواهند داد (از ابزارک گفتگو- پایین صفحه ) استفاده کنید)...",
      "باشه ..."
    ).then((res) => {});
  const addToBasket = () => {
    let obj = {
      cyProductID: id,
      quantity: 1,
      orderItemID: 0,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/addToBasket`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.status == 200) {
          setBasketFlag((prev) => !prev);
          AlertA();
        } else if (res.status == 400) {
          AlertB();
        }
      });
    }
    myApp();
  };

  return (
    <div data-aos="fade-up" className={`${Styles.cardprob_container} centerc`}>
      {/* برچسب استعلام قیمت */}
      {((supply == 0 && parentId == 2) || (supply != 0 && !isToSale)) && (
        <span className={`${Styles.RequstPrice} centerc`} onClick={AlertC}>
          استعلام قیمت
        </span>
      )}

      {/* برچسب درصد تخفیف */}
      {discountPercent > 0 && (
        <span className={Styles.discountBadge}>%{discountPercent} تخفیف</span>
      )}

      {/* Favorite */}
      {isShowHeart && (
        <div className={Styles.favorite}>
          <Favorite id={id} isFavorite={isFavor} />
        </div>
      )}

      {/* Share */}
      <div className={Styles.share}>
        <ShareButton productId={id} type={product} />
      </div>

      {/* لینک محصول */}
      <Link
        className={`${Styles.cardprob_container_linkA}`}
        onClick={() => setXtFlagSpinnerShow(true)}
        href={`/product/${id}`}
      >
        <div className={Styles.imageWrap}>
          <img src={imgSrc} alt={`${title}`} />
        </div>

        <span className={Styles.cardprob_title}> {title} </span>

        {/* قیمت‌ها */}
        {supply != 0 && isToSale && (
          <div className={Styles.priceRow}>
            <span className={Styles.cardprob_price}>
              {price?.toLocaleString()} <small className={Styles.toman}>تومان</small>
            </span>
            {hasDiscount && (
              <span className={`${Styles.cardprob_noOffPrice}`}>
                {noOffPrice?.toLocaleString()} تومان
              </span>
            )}
          </div>
        )}

        {supply == 0 && parentId != 2 ? (
          <span className={Styles.cardprob_price}>ناموجود</span>
        ) : (
          ""
        )}
      </Link>

      {/* دکمه سبد خرید */}
      {verifyHam && (
        <div className={`${Styles.cardprob__icon_div} centerr`}>
          <ShoppingCart
            size={32}
            color="#bf43f9"
            weight="fill"
            onClick={() => {
              xtFlagLogin
                ? addToBasket()
                : addToCart(id, "1", setCartCounter);
            }}
          />
        </div>
      )}
    </div>
  );
}