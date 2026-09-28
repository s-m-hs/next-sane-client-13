"use client";
import style from "./BasketDetail.module.css";
import { MainContext } from "@/context/MainContext";
import apiCallProdDetails from "@/utils/ApiUrl/apiCallProDetails";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { DotLoader, ScaleLoader } from "react-spinners";
import RemoveApi from "@/utils/ApiUrl/apiCallBack/apiRemove";
import alertN from "@/utils/Alert/AlertA";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import {
  HandTap,
  CheckCircle,
  X,
  ShoppingCart,
  ArrowLeft,
  Ticket,
  Trash,
  CreditCard,
  Package,
  Gift,
} from "@phosphor-icons/react";
import alertQ from "@/utils/Alert/AlertQ";
import Link from "next/link";
import { GiClick, GiCheckMark } from "react-icons/gi";
import SpinnerC from "@/utils/SpinnerC/SpinnerC";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export default function BasketDetailAutoCoupon() {
  let {
    setXtFlagSpinnerShow,
    xtFlagLogin,
    localUpdateBasket,
    setLocalUpdateBasket,
    setCartCounter,
    cartCounter,
    getBasket,
    setGetBasket,
    setBasketFlag,
    xtflagSpinnerShow,
    address,
    offer,
    coupon,
    setCoupon,
    couponState,
    setCouponState,
    cyUserID,
  } = useContext(MainContext);
  const [toBuy, setToBuy] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [basket, setBasket] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [basket2, setBasket2] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [nonOfftotal, setNonOffTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [payState, setPayState] = useState(1);
  const [ziroSupply, setZiroSupply] = useState([]);
  const [flagZiroSupply, setFlagZiroSupply] = useState(false);
  const [adressId, setAdressId] = useState("");
  const [localbasket, setLocalBasket] = useState([]);
  const [flagLocal, setFlagLocal] = useState(false);
  const [flagSpinner, setFlagSpinner] = useState(false);
  const [postA, setPostA] = useState(0);
  const [postB, setPostB] = useState(0);
  const [postState, setPostState] = useState(0);
  const [dataReady, setDataReady] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseB = () => setShowB(false);
  const handleCloseC = () => setShowC(false);
  const handleShow = () => setShow(true);
  const handleShowB = () => setShowB(true);
  const handleShowC = () => setShowC(true);

  const rout = useRouter();

  const AlertA = () =>
    alertN("center", "info", "حذف با موفقیت انجام شد...", 1000).then((res) =>
      setBasketFlag((prev) => !prev)
    );
  const AlertC = () =>
    alertQ(
      "center",
      "success",
      "خرید شما با موفقیت انجام شد میتوانید سفارش خود را از پنل کاربری بخش سفارشات پیگیری نمایید",
      "باشه..."
    ).then((res) => rout.push("/"));

  const AlertB = () =>
    alertN("center", "success", " سبد خرید با موفقیت به روزرسانی شد...", 500).then(
      (res) => setBasketFlag((prev) => !prev)
    );

  const AlertG = () => {
    if (!couponState) {
      alertN("center", "success", "کد تخفیف شما با موفقیت اعمال شد ", 1500);
    } else if (couponState) {
      alertN("center", "info", "کد تخفیف شما فعال شده است ", 1500);
    }
  };

  const AlertE = () =>
    alertN(
      "center",
      "info",
      "مشکلی در اعمال کد تخفیف به وجود آمده مجددا تلاش بفرمایید",
      1500
    );
  const removeHan = (id) => {
    RemoveApi("api/CyOrders/deleteItem", id, AlertA);
    cartCounter >= 1
      ? setCartCounter((prevCounter) => prevCounter - 1)
      : "";
  };

  const alertF = () =>
    alertN("center", "warning", "لطفا نحوه ارسال کالا را انتخاب بفرمایید 😊", 2000);

  const directToZarin = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/ZarinPal/pay?orderId=${getBasket[0].cyOrderID}&addressId=${address[0].id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            rout.push(`${result.url}`);
          });
        }
      });
    }
    myApp();
  };

  const requestCouponFn = (couItemId, state) => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyCoupon/requestCoupon?CoupItemId=${couItemId}&state=${state}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          directToZarin();
        } else {
          AlertE();
        }
      });
    }
    myApp();
  };

  const couponI = coupon?.couponAvailable;
  const payment = () => {
    setFlagSpinner(true);
    if (couponState) {
      requestCouponFn(couponI[0]?.id, 1);
    } else {
      directToZarin();
    }
  };

  const handleRegisterShop = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrders/sendToPending?id=${getBasket[0].cyOrderID}&addressId=${adressId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.status == 200) {
          return res.json().then((result) => {
            setGetBasket([]);
            setCartCounter(0);
            handleClose();
            AlertC();
          });
        } else {
          return res.json().then((result) => {
            alert(result.response);
          });
        }
      });
    }
    myApp();
  };

  const handleGoToProfile = () => {
    rout.push("/p-user/profile");
  };

  ////////////for remove from ui in mode:localstorage===>
  const removeItem = (id) => {
    let getLocalStorageProd =
      JSON.parse(localStorage.getItem("cartObj")) || [];
    setToBuy((prevToBuy) =>
      prevToBuy.filter((item) => item.id !== id)
    );

    getLocalStorageProd = getLocalStorageProd.filter(
      (filter) => filter.value !== id
    );
    localStorage.setItem(
      "cartObj",
      JSON.stringify(getLocalStorageProd)
    );
  };
  const removeFromCart = (id) => {
    setCartCounter((prevCounter) => prevCounter - 1);
    removeItem(id);
  };
  ///////////////////////////////////////////
  const paymentHandler = () => {
    if (!xtFlagLogin) {
      Swal.fire({
        position: "center",
        icon: "info",
        title:
          "لطفا ابتدا با شماره همراه خود وارد شوید(کمتراز 30 ثانیه 😊) ",
        showConfirmButton: true,
        confirmButtonText: "تایید",
      }).then((res) => {
        rout.push("/register");
      });
    } else if (ziroSupply?.length != 0) {
      handleShowB();
    } else if (ziroSupply?.length == 0) {
      handleShow();
    }
  };

  useEffect(() => {
    setZiroSupply([]);
    getBasket?.forEach((item) => {
      if (item.supply == 0) {
        setFlagZiroSupply(false);
        setZiroSupply((prev) => [...prev, item.productCode]);
      }
    });
  }, [getBasket]);

  const addItem = (item) => {
    setToBuy((prevToBuy) => {
      const itemExists = prevToBuy.some(
        (existingItem) => existingItem.id === item.id
      );
      if (!itemExists) {
        return [...prevToBuy, item];
      }
      return prevToBuy;
    });
  };

  const updateBasketHandler = () => {
    if (xtFlagLogin) {
      updateBasket(basket, setBasketFlag, AlertB);
      setFlagUpdate(false);
    } else {
      let uniqueItemsMap = new Map();

      localUpdateBasket.forEach((item) => {
        uniqueItemsMap.set(item.value.value, item);
      });

      basket.forEach((item) => {
        let newKey = `cartObj${item.cyProductID}`;
        let newValue = {
          value: item.cyProductID,
          quan: item.quantity.toString(),
        };
        uniqueItemsMap.set(item.cyProductID, {
          key: newKey,
          value: newValue,
        });
      });

      let uniqueItemsArray = Array.from(uniqueItemsMap.values());
      setBasket2(uniqueItemsArray);
      setLocalUpdateBasket(uniqueItemsArray);

      uniqueItemsArray.forEach((item) => {
        localStorage.setItem(item.key, JSON.stringify(item.value));
      });

      setFlagUpdate(false);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    let basketArray = [];
    basket.forEach((item) => {
      if (item.cyProductID !== id) {
        basketArray.push(item);
      }
    });
    basketArray.push({ cyProductID: id, quantity: newQuantity });
    setBasket(basketArray);
    setFlagUpdate(true);
  };

  const loadCartItem = () => {
    const item = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cartObj")) {
        item.push({ key, value: JSON.parse(localStorage.getItem(key)) });
      }
    }
    setCartItem(item);
  };

  useEffect(() => {
    const cyProductIDs = basket.map((item) => item.cyProductID);
    const uniqueArray = cartItem.filter(
      (item) => !cyProductIDs.includes(item.value.value)
    );
    setBasket2(uniqueArray);
  }, [basket]);

  useEffect(() => {
    loadCartItem();
    setFlagSpinner(false);
    const timer = setTimeout(() => setDataReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getLocalStorageProd =
      JSON.parse(localStorage.getItem("cartObj")) || [];
    setLocalBasket(getLocalStorageProd);
    setFlagLocal(true);
    if (localbasket.length != 0) {
      localbasket?.forEach((item) => {
        apiCallProdDetails(item.value, addItem, setIsApiCalled);
      });
    }
  }, [flagLocal]);

  useEffect(() => {
    if (coupon?.couponAvailable) {
      handleShowC();
    }
  }, [coupon]);

  ///to add total price
  useEffect(() => {
    const data = getBasket.map((item) => ({
      totalPrice:
        item.unitOfferPrice === item.unitPrice
          ? Math.ceil((item.totalPrice * offer) / 1000) * 1000
          : item.unitOfferPrice,
    }));

    const data2 = getBasket.map((item) => ({
      totalPrice: item.unitOfferPrice,
    }));
    const calculateTotalPrice = () => {
      const totalPrice = data.reduce((acc, item) => acc + item.totalPrice, 0);
      const totalnoneOff = data2.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
      setTotal(totalPrice);
      setNonOffTotal(totalnoneOff);
    };
    calculateTotalPrice();
  }, [getBasket, offer]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  useEffect(() => {
    if (address && address?.length != 0) {
      setAdressId(address[0]?.id);
    }
  }, [address]);

  useEffect(() => {
    if (xtFlagLogin && getBasket && getBasket.length > 0) {
      setDataReady(true);
    }
  }, [getBasket, xtFlagLogin]);

  ////post Section
  const postStateChange = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrders/postState?orderId=${getBasket[0]?.cyOrderID}&postState=${postState}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/Json",
          },
        }
      ).catch((err) => console.log(err));
    }
    myApp();
  };

  useEffect(() => {
    if (postState != 0) {
      postStateChange();
    }
  }, [postState]);

  /////////////////coupon Section
  const getActiveCoupon = (userId) => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyCoupon/getActiveCouponByUserId?userId=${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setCoupon(result);
          });
        }
      });
    }
    myApp();
  };

  useEffect(() => {
    if (cyUserID) {
      getActiveCoupon(cyUserID);
    }
    ApiGetX2(`/api/CyKeyDatas/1013`, setPostA);
    ApiGetX2(`/api/CyKeyDatas/1014`, setPostB);
  }, []);

  // محاسبات
  const itemCount = xtFlagLogin
    ? getBasket?.length || 0
    : toBuy?.length || 0;
  const displayTotal = Number(total || 0);
  const displayOldTotal = Number(nonOfftotal || 0);
  const hasDiscount = displayOldTotal > displayTotal;

  const clearCart = () => {
    Swal.fire({
      title: "خالی کردن سبد خرید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله،خالی کن",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        setCartCounter(0);
        localStorage.clear();
        setToBuy([]);
        setBasket([]);
        setLocalUpdateBasket([]);
        rout.push("/");
      }
    });
  };

  return (
    <>
      {flagSpinner && (
        <div className={style.spinnerOverlay}>
          <SpinnerC />
        </div>
      )}

      <div className={`container ${style.page}`}>
        {/* ===== HEADER ===== */}
        <div className={style.header}>
          <div className={style.headerTitle}>
            <h1>
              <ShoppingCart
                size={28}
                weight="fill"
                style={{ color: "var(--sd-primary)", marginLeft: "0.6rem" }}
              />
              سبد خرید من
            </h1>
            {itemCount > 0 && (
              <span className={style.headerBadge}>{itemCount}</span>
            )}
          </div>

          {itemCount > 0 && (
            <div className={style.headerActions}>
              <button className={style.clearBtn} onClick={clearCart}>
                <Trash size={16} weight="duotone" />
                خالی کردن سبد
              </button>
              <Link href="/" className={style.continueLink}>
                <ArrowLeft size={16} weight="bold" />
                ادامه خرید
              </Link>
            </div>
          )}
        </div>

        {/* ===== لودینگ اولیه ===== */}
        {!xtFlagLogin && toBuy.length === 0 && !dataReady && (
          <div className={style.spinnerWrap}>
            <DotLoader color={"var(--sd-primary)"} size={120} />
          </div>
        )}

        {/* ===== سبد خالی ===== */}
        {dataReady && itemCount === 0 && (
          <div className={style.emptyState}>
            <ShoppingCart size={72} weight="thin" color="var(--sd-border)" />
            <h2>سبد خرید شما خالی است!</h2>
            <p>محصولی را به سبد خرید خود اضافه کنید</p>
            <div className={style.emptyCta}>
              <Link href="/">
                <button className={style.checkoutBtn} style={{ width: "auto", padding: "1rem 3rem" }}>
                  <ArrowLeft size={20} weight="bold" />
                  بازگشت به فروشگاه
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* ===== MAIN GRID ===== */}
        {itemCount > 0 && (
          <div className={style.grid}>
            {/* ===== ستون سمت چپ: محصولات ===== */}
            <div className={style.cartColumn}>
              {!xtFlagLogin && toBuy.length !== 0
                ? toBuy.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <CartItem
                        name={item["name"]}
                        smallImage={item["smallImage"]}
                        unitPrice={
                          offer == 1 && item.noOffPrice === item.price
                            ? Number(item.price) / 10
                            : item.noOffPrice !== item.price
                              ? Number(item.noOffPrice) / 10
                              : offer != 1 &&
                                Math.ceil(
                                  (item.price / 10) * offer / 1000
                                ) *
                                  1000
                        }
                        id={item["id"]}
                        cyProductID={item.id}
                        quantity={
                          localUpdateBasket?.length === 0
                            ? 1
                            : localUpdateBasket.filter(
                                (filter) =>
                                  filter.value.value === item.id
                              )[0]?.value.quan || 1
                        }
                        updateQuantity={updateQuantity}
                        handleRemove={removeFromCart}
                      />
                    </motion.div>
                  ))
                : getBasket != null &&
                  getBasket.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <CartItem
                        products={getBasket}
                        name={item.partNumber}
                        smallImage={item.cyProductImgUrl}
                        totalPrice={
                          offer == 1 &&
                          item.unitOfferPrice === item.unitPrice
                            ? Number(item.totalPrice) / 10
                            : item.unitOfferPrice !== item.unitPrice
                              ? Number(item.unitOfferPrice) / 10
                              : offer !== 1 &&
                                Math.ceil(
                                  ((item.totalPrice) / 10) *
                                    offer /
                                    1000
                                ) *
                                  1000
                        }
                        unitPrice={
                          offer == 1 &&
                          item.unitOfferPrice === item.unitPrice
                            ? Number(item.unitPrice) / 10
                            : item.unitOfferPrice !== item.unitPrice
                              ? Number(item.unitOfferPrice) / 10
                              : offer !== 1 &&
                                Math.ceil(
                                  ((item.unitPrice) / 10) *
                                    offer /
                                    1000
                                ) *
                                  1000
                        }
                        WithoutOffPrice={item.unitPrice / 10}
                        id={item.id}
                        cyProductID={item.cyProductID}
                        quantity={item.quantity}
                        updateQuantity={updateQuantity}
                        remove={removeHan}
                        supply={item.supply}
                      />
                    </motion.div>
                  ))}

              <AnimatePresence>
                {flagUpdate && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      className={style.updateBtn}
                      onClick={updateBasketHandler}
                    >
                      به‌روزرسانی سبد خرید
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ===== ستون سمت راست: خلاصه سفارش ===== */}
            <div className={style.summaryColumn}>
              <div className={style.summaryCard}>
                <h2 className={style.summaryTitle}>خلاصه سفارش</h2>

                <div className={style.summaryRow}>
                  <span className={style.summaryLabel}>تعداد کالا</span>
                  <span className={style.summaryValue}>
                    {itemCount.toLocaleString()} عدد
                  </span>
                </div>

                <div className={style.summaryRow}>
                  <span className={style.summaryLabel}>مبلغ کل</span>
                  <span className={style.summaryValue}>
                    {(displayOldTotal / 10).toLocaleString()} تومان
                  </span>
                </div>

                {hasDiscount && (
                  <div className={style.couponDiscountRow}>
                    <span>تخفیف</span>
                    <span>
                      -{(displayOldTotal - displayTotal) / 10 > 0
                        ? ((displayOldTotal - displayTotal) / 10).toLocaleString()
                        : "0"}{" "}
                      تومان
                    </span>
                  </div>
                )}

                <div className={style.summaryRowTotal}>
                  <span className={style.summaryLabel}>مبلغ قابل پرداخت</span>
                  <span className={`${style.summaryValue} ${style.totalValue}`}>
                    {(displayTotal / 10).toLocaleString()} تومان
                  </span>
                </div>

                {hasDiscount && (
                  <div style={{ marginTop: "0.4rem" }}>
                    <span className={style.oldTotalValue}>
                      {(displayOldTotal / 10).toLocaleString()} تومان
                    </span>
                  </div>
                )}

                {/* ===== کد تخفیف خودکار ===== */}
                {xtFlagLogin && coupon?.couponAvailable && (
                  <div className={style.couponBanner}>
                    <div>
                      <span className={style.couponBannerText}>
                        <Gift size={18} weight="fill" style={{ marginLeft: "0.4rem" }} />
                        کد تخفیف شما:
                      </span>
                      <div className={style.couponBannerCode}>
                        {coupon?.code}
                      </div>
                    </div>
                    <button
                      className={style.couponBannerBtn}
                      disabled={couponState}
                      onClick={() => {
                        setCouponState(true);
                        AlertG();
                      }}
                    >
                      {!couponState ? (
                        <>
                          <GiClick style={{ fontSize: "16px" }} />
                          {"  "}
                          فعالسازی
                        </>
                      ) : (
                        "✅ فعال شد"
                      )}
                    </button>
                  </div>
                )}

                {/* ===== دکمه‌ها ===== */}
                <div className={style.actionsSection}>
                  {flagUpdate && (
                    <button
                      className={style.updateBtn}
                      onClick={updateBasketHandler}
                    >
                      به‌روزرسانی سبد خرید
                    </button>
                  )}

                  <button
                    className={style.checkoutBtn}
                    onClick={paymentHandler}
                    disabled={flagUpdate || getBasket?.length == 0}
                  >
                    <CreditCard size={22} weight="fill" />
                    {xtFlagLogin ? "تکمیل خرید" : "ورود و ثبت سفارش"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== موبایل بار ===== */}
      {itemCount > 0 && (
        <div className={style.mobileBar}>
          <div className={style.mobileBarTotal}>
            <span className={style.mobileBarTotalLabel}>مبلغ قابل پرداخت</span>
            <span className={style.mobileBarTotalPrice}>
              {(displayTotal / 10).toLocaleString()} تومان
            </span>
            {hasDiscount && (
              <span className={style.mobileBarOldPrice}>
                {(displayOldTotal / 10).toLocaleString()} تومان
              </span>
            )}
          </div>
          <button
            className={style.mobileBarBtn}
            onClick={paymentHandler}
            disabled={flagUpdate}
          >
            <Package size={18} weight="fill" style={{ marginLeft: "0.4rem" }} />
            {xtFlagLogin ? "تکمیل خرید" : "ورود و ثبت سفارش"}
          </button>
        </div>
      )}

      {/* ==============================
          MODAL: پرداخت
          ============================== */}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        dialogClassName={style.modalContent}
        centered
      >
        <Modal.Header closeButton className={style.modalHeader}>
          <h4 style={{ fontWeight: 800 }}>نهایی‌سازی سفارش</h4>
        </Modal.Header>

        <Modal.Body className={style.modalBody}>
          {address?.length != 0 ? (
            <>
              <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>
                آدرس تحویل سفارش
              </h5>
              <Form.Select
                className={style.addressSelect}
                onChange={(e) => setAdressId(e.target.value)}
              >
                {address?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.state} - {item.address} - کد پستی: {item.postalCode}
                  </option>
                ))}
              </Form.Select>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <h5 style={{ fontWeight: 700, marginBottom: "1.2rem" }}>
                شما آدرس ثبت شده‌ای ندارید
              </h5>
              <Link
                href={"./p-user/address"}
                onClick={() => setXtFlagSpinnerShow(true)}
              >
                <button
                  className={style.checkoutBtn}
                  style={{
                    width: "auto",
                    padding: "0.8rem 2.4rem",
                    fontSize: "1.4rem",
                  }}
                >
                  ثبت آدرس جدید
                </button>
              </Link>
            </div>
          )}

          <div className={style.paymentSection}>
            <h5 style={{ fontWeight: 700, marginBottom: "1rem" }}>
              روش پرداخت
            </h5>
            <label className={style.paymentOption}>
              <input
                type="radio"
                name="payment"
                defaultChecked
                value={1}
                onChange={(e) => setPayState(e.target.value)}
              />
              <CreditCard
                size={20}
                weight="fill"
                style={{ color: "var(--sd-primary)" }}
              />
              <span style={{ fontWeight: 600 }}>پرداخت آنلاین (درگاه بانکی)</span>
            </label>

            <h5
              style={{
                fontWeight: 700,
                marginTop: "1.6rem",
                marginBottom: "1rem",
              }}
            >
              روش ارسال
            </h5>

            <div
              className={`${style.postOption} ${
                postState == 1 ? style.postOptionActive : ""
              }`}
              onClick={() => setPostState(1)}
            >
              {postState == 1 ? (
                <FiCheckSquare color="var(--sd-primary)" fontSize="20px" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank fontSize="20px" />
              )}
              <div
                className={style.postEditor}
                dangerouslySetInnerHTML={{ __html: `${postA?.value}` }}
              />
            </div>

            <div
              className={`${style.postOption} ${
                postState == 2 ? style.postOptionActive : ""
              }`}
              onClick={() => setPostState(2)}
            >
              {postState == 2 ? (
                <FiCheckSquare color="var(--sd-primary)" fontSize="20px" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank fontSize="20px" />
              )}
              <div
                className={style.postEditor}
                dangerouslySetInnerHTML={{ __html: `${postB?.value}` }}
              />
            </div>

            <p className={style.postNote}>
              سفارش پس از تایید نهایی واحد فروش حداکثر طی ۴۸ ساعت کاری تحویل پست
              میگردد.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className={style.modalFooter}>
          <button className={style.modalBtnClose} onClick={handleClose}>
            <X size={16} weight="duotone" />
            بستن
          </button>
          <button
            className={`${style.modalBtnConfirm} ${
              address?.length === 0 ? style.modalBtnConfirmDisabled : ""
            }`}
            onClick={
              postState == 0 ? alertF : payState == 1 ? payment : handleRegisterShop
            }
          >
            <CheckCircle size={18} weight="fill" />
            تایید و پرداخت
          </button>
        </Modal.Footer>
      </Modal>

      {/* ==============================
          MODAL: اخطار موجودی صفر
          ============================== */}
      <Modal
        size="lg"
        show={showB}
        onHide={handleCloseB}
        dialogClassName={style.modalContent}
        centered
      >
        <Modal.Header closeButton className={style.modalHeader}>
          <h4 style={{ fontWeight: 800, color: "var(--sd-danger)" }}>
            ❌ موجودی برخی محصولات به اتمام رسیده
          </h4>
        </Modal.Header>

        <Modal.Body className={style.modalBody}>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            لطفا موارد زیر را از سبد خرید خود حذف کنید:
          </p>
          <ul className={style.ziroList}>
            {ziroSupply?.length != 0 &&
              ziroSupply.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </Modal.Body>

        <Modal.Footer className={style.modalFooter}>
          <button className={style.modalBtnClose} onClick={handleCloseB}>
            <X size={16} weight="duotone" />
            بستن
          </button>
        </Modal.Footer>
      </Modal>

      {/* ==============================
          MODAL: اعلان کد تخفیف
          ============================== */}
      <Modal
        show={showC}
        onHide={handleCloseC}
        backdrop="static"
        keyboard={false}
        dialogClassName={style.modalContent}
        centered
        size="sm"
      >
        <Modal.Body style={{ textAlign: "center", padding: "2.4rem" }}>
          <Gift size={48} weight="fill" style={{ color: "var(--sd-primary)", marginBottom: "1rem" }} />
          <p
            style={{
              fontSize: "1.6rem",
              fontWeight: 600,
              lineHeight: 2,
            }}
          >
            شما یک کد تخفیف دارید!
            <br />
            برای استفاده از کد تخفیف خود روی{" "}
            <strong style={{ color: "#f59e0b" }}>باکس زرد رنگ</strong> کلیک
            کنید.
          </p>
        </Modal.Body>
        <Modal.Footer
          style={{
            border: "none",
            justifyContent: "center",
            padding: "0 2rem 2rem",
          }}
        >
          <button
            className={style.checkoutBtn}
            style={{
              width: "auto",
              padding: "0.8rem 3rem",
              fontSize: "1.4rem",
            }}
            onClick={handleCloseC}
          >
            متوجه شدم ...
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}