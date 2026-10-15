import React, { use, useContext, useEffect, useState } from "react";

import SwiperProduct from "../SwiperProduct/SwiperProduct";
import Styles from "./ProductDetailLeft.module.css";
import { MainContext } from "@/context/MainContext";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import addToCart from "@/utils/Functions/addToCart";
import alertN from "@/utils/Alert/AlertA";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import Head from "next/head";
import Favorite from "@/components/madules/Favorite/Favorite";
import ShareButton from "@/components/madules/ShareButton/ShareButton";
import { NOOffer, product } from "@/utils/DataStore";
import PriceBox from "@/components/madules/PriceBox/PriceBox";
import { ShoppingCart, CheckCircle } from "@phosphor-icons/react";

export default function ProductDetailLeft({ detail }) {
  let {
    setCartCounter,
    xtFlagLogin,
    setBasketFlag,
    setLocalUpdateBasket,
    offer,
    localToken,
  } = useContext(MainContext);
  const [flagSupply, setFlagSupply] = useState(false);

  const AlertA = () =>
    alertN("center", "success", " به سبد خرید اضافه شد...", 1000);
  const AlertB = () =>
    alertN(
      "center",
      "info",
      " این محصول در سبد خرید شما موجود است ...",
      1000
    ).then((res) => { });
  const addToBasket = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    let obj = {
      cyProductID: detail.id,
      quantity: 1,
      orderItemID: 0,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/addToBasket`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
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

  useEffect(() => {
    if (detail?.supply !== 0 && detail.supply && detail.isToSale) {
      setFlagSupply(true);
    }
  }, [detail]);

  /* ---------- تنها نمایشی (بدون منطق) ---------- */
  const inStock = detail?.supply > 0;

  return (
    <div className={Styles.card}>
      {detail && (
        <div className={Styles.grid}>
          {/* ===== گالری تصاویر ===== */}
          <div className={Styles.galleryCol}>
            <div className={Styles.floatButtons}>
              <span className={Styles.floatBtn}>
                <Favorite id={detail.id} isFavorite={detail.isFavorite} />
              </span>
              <span className={Styles.floatBtn}>
                <ShareButton productId={detail.id} type={product} />
              </span>
            </div>

            <SwiperProduct
              src={detail.mainImage}
              srcB={detail.images?.split("*,*")}
            />
          </div>

          {/* ===== اطلاعات محصول ===== */}
          <div className={Styles.infoCol}>
            <div className={Styles.badges}>
              <span
                className={`${Styles.availBadge} ${
                  inStock ? Styles.availBadgeIn : Styles.availBadgeOut
                }`}
              >
                <CheckCircle size={14} weight="fill" />
                {inStock ? "موجود" : "ناموجود"}
              </span>

              {detail.manufacturer && (
                <span className={Styles.manufacturerBadge}>
                  {detail.manufacturer}
                </span>
              )}

              {detail.productCode && (
                <span className={Styles.codeBadge}>
                  کد کالا: {detail.productCode}
                </span>
              )}
            </div>

            <h1 className={Styles.title}>{detail.name}</h1>
            {detail.description && (
              <span className={Styles.description}>{detail.description}</span>
            )}

            {detail.spec?.slice(0, 3).length > 0 && (
              <div className={Styles.chips}>
                {detail.spec?.slice(0, 3).map((item, index) => (
                  <span key={index} className={Styles.chip}>
                    {item.name} : {item.value}
                  </span>
                ))}
              </div>
            )}

            <div className={Styles.divider} />

            <div className={Styles.priceRow}>
              {detail.supply != 0 && detail.isToSale ? (
                <>
                  {offer.offerType == NOOffer &&
                  detail.noOffPrice == detail.price ? (
                    <span className={Styles.priceMain}>
                      {(Number(detail.price) / 10)?.toLocaleString()} تومان
                    </span>
                  ) : (
                    <>
                      <span className={Styles.priceMain}>
                        {(Number(detail.resultPrice) / 10)?.toLocaleString()}{" "}
                        تومان
                      </span>
                      <span
                        className={`${Styles.priceOld} ${Styles.underline}`}
                      >
                        {(Number(detail.noOffPrice) / 10)?.toLocaleString()}{" "}
                        تومان
                      </span>
                    </>
                  )}
                </>
              ) : detail.supply != 0 && !detail.isToSale ? (
                <span className={Styles.inquiry}>استعلام قیمت</span>
              ) : (
                <span className={Styles.inquiry}>استعلام قیمت</span>
              )}
            </div>

            {flagSupply && (
              <button
                className={Styles.addButton}
                onClick={() => {
                  xtFlagLogin
                    ? addToBasket()
                    : addToCart(detail.id, "1", setCartCounter);
                }}
              >
                <ShoppingCart size={20} weight="fill" />
                افزودن به سبد خرید
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}