import React, { use, useContext, useEffect, useState } from "react";

import SwiperProduct from "../SwiperProduct/SwiperProduct";
import Styles from "./ProductDetailLeft.module.css";
import { MainContext } from "@/context/MainContext";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import addToCart from "@/utils/Functions/addToCart";
import alertN from "@/utils/Alert/AlertA";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import Head from "next/head";

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
    ).then((res) => {});
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
    if (detail?.supply !== 0 && detail.supply) {
      // console.log('object')
      setFlagSupply(true);
    }
  }, [detail]);

  return (
    <>
      <div className="container " style={{ height: "600px" }}>
        <div
          className={`${Styles.row_detail} row mt-1 centerc`}
          style={{ height: "600px" }}
        >
          {detail && (
            <>
              <div
                className={`col-6 ${Styles.ProductDetailL_main_divright} centerc mt-5`}
              >
                <div
                  className={`${Styles.ProductDetailL_divright} centerc mt-5`}
                >
                  <h1 className={Styles.ProductDetailL_div__title}>
                    {detail.name}
                  </h1>
                  <span className={Styles.ProductDetailL_div__description}>
                    {detail.description}
                  </span>
                  {/* <span className={Styles.ProductDetailL_div__partn}  >پارت نامبر: 90MP03F0-BMUA00</span> */}
                  <div
                    className={`${Styles.ProductDetailL_detail} centerc mt-5`}
                  >
                    {detail.spec?.slice(0, 3).map((item) => (
                      <span> {`${item.name} : ${item.value}`}</span>
                    ))}
                  </div>

                  <div
                    className={`${Styles.ProductDetailL_divMiddle} centerc mt-5`}
                  >
                    {detail.supply != 0 ? (
                      <>
                        {offer == 1 && (
                          <span
                            className={Styles.ProductDetailL_divMiddle_offprice}
                          >
                            {(Number(detail.price) / 10)?.toLocaleString()}{" "}
                            تومان
                          </span>
                        )}

                        {offer !== 1 &&
                          detail.noOffPrice === detail.price &&
                          detail?.cyCategoryId && (
                            <>
                              <span
                                className={
                                  Styles.ProductDetailL_divMiddle_offprice
                                }
                              >
                                {(
                                  (Number(detail.noOffPrice) / 10) *
                                  offer
                                )?.toLocaleString()}{" "}
                                تومان
                              </span>
                              <span
                                className={`${Styles.ProductDetailL_divMiddle_offprice} ${Styles.underline}`}
                              >
                                {(Number(detail.price) / 10)?.toLocaleString()}{" "}
                                تومان
                              </span>
                            </>
                          )}

                        {detail.noOffPrice !== detail.price &&
                          detail?.cyCategoryId && (
                            <>
                              <span
                                className={
                                  Styles.ProductDetailL_divMiddle_offprice
                                }
                              >
                                {(
                                  Number(detail.noOffPrice) / 10
                                )?.toLocaleString()}{" "}
                                تومان
                              </span>
                              <span
                                className={`${Styles.ProductDetailL_divMiddle_offprice} ${Styles.underline}`}
                              >
                                {(Number(detail.price) / 10)?.toLocaleString()}{" "}
                                تومان
                              </span>
                            </>
                          )}
                        {/* 
                        <span className={Styles.ProductDetailL_divMiddle_count}>
                          موجودی محصول: موجود
                        </span> */}
                      </>
                    ) : (
                      <span className={Styles.ProductDetailL_divMiddle_count}>
                        ناموجود
                      </span>
                    )}
                  </div>

                  {flagSupply && (
                    <div
                      className={`${Styles.ProductDetailL_left} centerc mt-5`}
                    >
                      <button
                        className={`${Styles.addButton} btn btn-info`}
                        onClick={() => {
                          xtFlagLogin
                            ? addToBasket()
                            : addToCart(detail.id, "1", setCartCounter);
                        }}
                      >
                        افزودن به سبد خرید
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`${Styles.ProductDetailL_divright_swiper} col-12 col-md-6`}
              >
                <SwiperProduct
                  src={detail.mainImage}
                  srcB={detail.images?.split("*,*")}
                />

                {flagSupply && (
                  <button
                    className={`${Styles.ProductDetailL_divright_swiper_button} btn btn-info`}
                    onClick={() => {
                      // const getLocalStorage=localStorage.getItem('loginToken')
                      // let obj=[{
                      //   cyProductID:detail.id,
                      //   quantity: 1
                      // }]
                      xtFlagLogin
                        ? addToBasket()
                        : // updateBasket(getLocalStorage,obj,setBasketFlag,AlertA)
                          addToCart(detail.id, "1", setCartCounter);
                    }}
                  >
                    {" "}
                    افزودن به سبد خرید
                  </button>
                )}
              </div>

              <div
                className={`${Styles.ProductDetailL_divright_swiper_bottom} col-12`}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-6 centerc">
                      <span className={Styles.ProductDetailL_div__title}>
                        {detail.name}
                      </span>
                      <span className={Styles.ProductDetailL_div__description}>
                        {detail.description}
                      </span>
                      <div
                        className={`${Styles.ProductDetailL_detail} centerc mt-5`}
                      >
                        {detail.spec?.slice(0, 3).map((item) => (
                          <span> {`${item.name} : ${item.value}`}</span>
                        ))}
                      </div>
                    </div>

                    <div className="col-6">
                      <div
                        className={`${Styles.ProductDetailL_left_price} centerc mt-5`}
                      >
                        {detail.supply != 0 ? (
                          <>
                            {/* 
          {detail.noOffPrice===detail.price ?    <span className={Styles.ProductDetailL_divMiddle_offprice} >{(Number(detail.price)/10)?.toLocaleString()} تومان</span>
          : <>
               <span className={Styles.ProductDetailL_divMiddle_offprice} >{(Number(detail.noOffPrice)/10)?.toLocaleString()} تومان</span>
             <span className={`${Styles.ProductDetailL_divMiddle_offprice} ${Styles.underline}`} >{(Number(detail.price)/10)?.toLocaleString()} تومان</span>
     
          </>
        
              } */}
                            {/* sdfsdfsdf */}
                            {offer == 1 && detail?.cyCategoryId && (
                              <span
                                className={
                                  Styles.ProductDetailL_divMiddle_offprice
                                }
                              >
                                {(Number(detail.price) / 10)?.toLocaleString()}{" "}
                                تومان
                              </span>
                            )}

                            {offer !== 1 &&
                              detail.noOffPrice === detail.price &&
                              detail?.cyCategoryId && (
                                <>
                                  <span
                                    className={
                                      Styles.ProductDetailL_divMiddle_offprice
                                    }
                                  >
                                    {(
                                      (Number(detail.noOffPrice) / 10) *
                                      offer
                                    )?.toLocaleString()}{" "}
                                    تومان
                                  </span>
                                  <span
                                    className={`${Styles.ProductDetailL_divMiddle_offprice} ${Styles.underline}`}
                                  >
                                    {(
                                      Number(detail.price) / 10
                                    )?.toLocaleString()}{" "}
                                    تومان
                                  </span>
                                </>
                              )}

                            {detail.noOffPrice !== detail.price &&
                              detail?.cyCategoryId && (
                                <>
                                  <span
                                    className={
                                      Styles.ProductDetailL_divMiddle_offprice
                                    }
                                  >
                                    {(
                                      Number(detail.noOffPrice) / 10
                                    )?.toLocaleString()}{" "}
                                    تومان
                                  </span>
                                  <span
                                    className={`${Styles.ProductDetailL_divMiddle_offprice} ${Styles.underline}`}
                                  >
                                    {(
                                      Number(detail.price) / 10
                                    )?.toLocaleString()}{" "}
                                    تومان
                                  </span>
                                </>
                              )}

                            {/* <span
                              className={Styles.ProductDetailL_divMiddle_count}
                            >
                              موجودی محصول: موجود
                            </span> */}
                          </>
                        ) : (
                          <span
                            className={Styles.ProductDetailL_divMiddle_count}
                          >
                            ناموجود
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
