"use client";
import style from "./BasketDetail.module.css";
import { MainContext } from "@/context/MainContext";
import apiCallProdDetails from "@/utils/ApiUrl/apiCallProDetails";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { DotLoader, ScaleLoader } from "react-spinners";
import RemoveApi from "@/utils/ApiUrl/apiCallBack/apiRemove";
// import getLocalStorage from '@/utils/localStorag/localStorage';
import alertN from "@/utils/Alert/AlertA";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { HandTap, CheckCircle, X } from "@phosphor-icons/react";
import alertQ from "@/utils/Alert/AlertQ";
import Link from "next/link";
import { GiClick } from "react-icons/gi";
import { GiCheckMark } from "react-icons/gi";
import SpinnerC from "@/utils/SpinnerC/SpinnerC";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function BasketDetail() {
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

  const [postA, setPostA] = useState(0)
  const [postB, setPostB] = useState(0)
  const [postState, setPostState] = useState(0)

  const handleClose = () => setShow(false);
  const handleCloseB = () => setShowB(false);
  const handleCloseC = () => setShowC(false);

  const handleShow = () => setShow(true);
  const handleShowB = () => setShowB(true);
  const handleShowC = () => setShowC(true);

  const rout = useRouter();

  const AlertA = () => alertN("center", "info", "حذف با موفقیت انجام شد...", 1000).then((res) => setBasketFlag((prev) => !prev));
  const AlertC = () =>
    alertQ("center", "success", "خرید شما با موفقیت انجام شد میتوانید سفارش خود را از پنل کاربری بخش سفارشات پیگیری نمایید", "باشه...").then((res) => rout.push("/"));

  const AlertB = () => alertN("center", "success", " سبد خرید با موفقیت به روزرسانی شد...", 500).then((res) => setBasketFlag((prev) => !prev));

  const AlertD = () =>
    alertQ(
      "center",
      "info",
      "ضمن تبریک سال نو و تشکر از همراهی شما هموطن گرامی به اطلاع میرساند به دلیل محدودیتهای ارسال کالا در ایام تعطیلات ارسال کلیه سفارشات در تاریخ 1404/01/18  انجام میگیرد",
      "متوجه شدم ..."
    );
  const AlertG = () => {
    if (!couponState) {
      alertN("center", "success", "کد تخفیف شما با موفقیت اعمال شد ", 1500);
    } else if (couponState) {
      alertN("center", "info", "کد تخفیف شما فعال شده است ", 1500);
    }
  };

  const AlertE = () => alertN("center", "info", "مشکلی در اعمال کد تخفیف به وجود آمده مجددا تلاش بفرمایید", 1500);
  const removeHan = (id) => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    RemoveApi("api/CyOrders/deleteItem", id, AlertA);
    cartCounter >= 1 ? setCartCounter((prevCounter) => prevCounter - 1) : "";
  };

  const alertF = () => alertN('center', 'warning', 'لطفا نحوه ارسال کالا را انتخاب بفرمایید 😊', 2000)
  ///////////////////////////////

  const directToZarin = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/ZarinPal/pay?orderId=${getBasket[0].cyOrderID}&addressId=${address[0].id}`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            rout.push(`${result.url}`);
          });
        }
      });
    }
    myApp();
  };
  const requestCoupon = (couItemId, state) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyCoupon/requestCoupon?CoupItemId=${couItemId}&state=${state}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          directToZarin();
        } else {
          AlertE();
        }
      });
    }
    myApp();
  };

  const couponI = coupon?.couponAvailable; ///couponItem id to set state to requested
  const payment = () => {
    setFlagSpinner(true);
    if (couponState) {
      requestCoupon(couponI[0]?.id, 1);
    } else {
      directToZarin();
    }
  };



  const handleRegisterShop = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/sendToPending?id=${getBasket[0].cyOrderID}&addressId=${adressId}`, {
        method: "PUT",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
      }).then((res) => {
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
    ///for remove from ui==>
    let getLocalStorageProd = JSON.parse(localStorage.getItem("cartObj")) || [];
    setToBuy((prevToBuy) => prevToBuy.filter((item) => item.id !== id));

    ///for remove from oldlocale and set newlocal to local==>
    getLocalStorageProd = getLocalStorageProd.filter((filter) => filter.value !== id);
    localStorage.setItem("cartObj", JSON.stringify(getLocalStorageProd));
  };
  const removeFromCart = (id) => {
    setCartCounter((prevCounter) => prevCounter - 1);
    removeItem(id);
  };
  ///////////////////////////////////////////
  const paymentHandler = () => {
    if (!xtFlagLogin) {
      const alertN = (position, icon, title, timer) =>
        Swal.fire({
          position: "center",
          icon: "info",
          title: "لطفا ابتدا با شماره همراه خود وارد شوید(کمتراز 30 ثانیه 😊) ",
          showConfirmButton: true,
          confirmButtonText: "تایید",
        }).then((res) => {
          rout.push("/register");
        });
      alertN();
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
      const itemExists = prevToBuy.some((existingItem) => existingItem.id === item.id);
      if (!itemExists) {
        return [...prevToBuy, item];
      }
      return prevToBuy;
    });
  };

  const updateBasketHandler = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    if (xtFlagLogin) {
      updateBasket(basket, setBasketFlag, AlertB);
      setFlagUpdate(false);
    } else {
      let uniqueItemsMap = new Map();

      // افزودن آیتم‌های قبلی
      localUpdateBasket.forEach((item) => {
        uniqueItemsMap.set(item.value.value, item);
      });

      // افزودن آیتم‌های جدید
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
      // notify();
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
    const uniqueArray = cartItem.filter((item) => !cyProductIDs.includes(item.value.value));
    setBasket2(uniqueArray);
  }, [basket]);

  useEffect(() => {
    loadCartItem();
    setFlagSpinner(false)
  }, []);

  useEffect(() => {
    const getLocalStorageProd = JSON.parse(localStorage.getItem("cartObj")) || [];
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
      totalPrice: item.unitOfferPrice === item.unitPrice ? Math.ceil(item.totalPrice * offer / 1000) * 1000 : item.unitOfferPrice,
    }));

    const data2 = getBasket.map((item) => ({
      totalPrice: item.unitOfferPrice,
    }));
    const calculateTotalPrice = () => {
      const totalPrice = data.reduce((acc, item) => acc + item.totalPrice, 0);
      const totalnoneOff = data2.reduce((acc, item) => acc + item.totalPrice, 0);
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
    if (cartCounter == 0) {
      rout.push("/");
    }
  }, [cartCounter]);
  /////////////////////////////////
  // هشدار مربوط به تحویل کالا در ایام تعظیلات
  // useEffect(() => {
  //   AlertD();
  // }, []);

  ////////////////////



  ////post Section
  const postStateChange = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/postState?orderId=${getBasket[0]?.cyOrderID}&postState=${postState}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/Json'
        }
      }).catch(err => console.log(err))
    }
    myApp()
  }

  useEffect(() => {
    if (postState != 0) {
      postStateChange()
    }
  }, [postState])


  /////////////////coupon Section
  const getActiveCoupon = (userId) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyCoupon/getActiveCouponByUserId?userId=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
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
    ApiGetX2(`/api/CyKeyDatas/1013`, setPostA)
    ApiGetX2(`/api/CyKeyDatas/1014`, setPostB)
  }, []);

  return (
    <div className={`container ${style.container}`}>
      {/* <div className="ScaleLoader-louder">
        {" "}
        <ScaleLoader color="#e8c5d6" />
      </div> */}
      {flagSpinner && <SpinnerC />}
      <div className="row mt-5 ">
        <div className={`col-lg-8 centerc  ${style.col_8} boxSh`}>
          <div className={` ${style.col_8_div_table} `}>
            {/* <button onClick={() => {
              setCartCounter(0)
              localStorage.clear(); setToBuy([]); setBasket([]);setLocalUpdateBasket([]) }}>clear</button> */}
            <table className={`table table-hover ${style.table_basket} `}>
              <thead>
                <tr key="">
                  <th>تصویر کالا</th>
                  <th>عنوان کالا</th>
                  <th>تعداد</th>
                  <th>قیمت</th>
                  {/* <th className={`${style.th}`}>قیمت کل</th> */}
                  <th>جزییات</th>
                </tr>
              </thead>
              <tbody>
                {!xtFlagLogin && toBuy.length == 0 ? (
                  <div className={`row ${style.spinner_row}`}>
                    <div className="col">
                      <DotLoader color={`var(--them)`} size={250} />
                    </div>
                  </div>
                ) : toBuy.length !== 0 ? (
                  toBuy.map((item) => (
                    <CartItem
                      key={item.id}
                      name={item["name"]}
                      smallImage={item["smallImage"]}
                      // totalPrice={item.noOffPrice}
                      unitPrice={
                        offer == 1 && item.noOffPrice === item.price
                          ? Number(item.price) / 10
                          : item.noOffPrice !== item.price
                            ? Number(item.noOffPrice) / 10
                            : offer != 1 && (Math.ceil((item.price) / 10) * offer / 1000) * 1000
                      }
                      id={item["id"]}
                      cyProductID={item.id}
                      quantity={localUpdateBasket?.length === 0 ? 1 : localUpdateBasket.filter((filter) => filter.value.value === item.id)[0]?.value.quan || 1}
                      updateQuantity={updateQuantity}
                      handleRemove={removeFromCart}
                    />
                  ))
                ) : (
                  getBasket != null &&
                  // flagB &&
                  getBasket.map((item) => (
                    <>
                      <CartItem
                        products={getBasket}
                        name={item.partNumber}
                        smallImage={item.cyProductImgUrl}
                        totalPrice={
                          offer == 1 && item.unitOfferPrice === item.unitPrice
                            ? Number(item.totalPrice) / 10
                            : item.unitOfferPrice !== item.unitPrice
                              ? Number(item.unitOfferPrice) / 10
                              : offer !== 1 && (Math.ceil((item.totalPrice) / 10) * offer / 1000) * 1000
                        }
                        unitPrice={
                          offer == 1 && item.unitOfferPrice === item.unitPrice
                            ? Number(item.unitPrice) / 10
                            : item.unitOfferPrice !== item.unitPrice
                              ? Number(item.unitOfferPrice) / 10
                              : offer !== 1 && (Math.ceil((item.unitPrice) / 10) * offer / 1000) * 1000
                        }
                        WithoutOffPrice={item.unitPrice / 10} ///send to cartitem product price without off
                        id={item.id}
                        cyProductID={item.cyProductID}
                        quantity={item.quantity}
                        updateQuantity={updateQuantity}
                        remove={removeHan}
                        supply={item.supply}
                      // handleRemove={removeFromCart}
                      />
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={` container  ${style.col_8_bottom_div_1} centerc mt-3`}>
          <div className="row">
            <div className="col-6">
              <div className={`  ${style.col_8_bottom_div_2} centerr`}>
                <button type="button" className={flagUpdate ? `${style.btn} btn btn-outline-info` : `${style.btn_hide}`} onClick={updateBasketHandler}>
                  به روز رسانی سبد خرید
                </button>
              </div>

              {xtFlagLogin && (
                <>
                  {coupon?.couponAvailable && (
                    <div className={`${style.coupon_div} centerr`}>
                      <button
                        className={!couponState ? "btn btn-warning" : "btn btn-primary disabled"}
                        onClick={() => {
                          // setCouponState(!couponState);
                          setCouponState(true);
                          AlertG();
                        }}
                      >
                        {!couponState ? (
                          <>
                            <span> برای فعالسازی کدتخفیف اینجا کلیک کنید :</span>
                            <br />
                            <GiClick style={{ fontSize: "25px" }} />
                            {"  "}
                            <span>کدتخفیف شما : {coupon?.code}</span>
                          </>
                        ) : (
                          <>
                            <span> کد تخفیف روی سبدخرید شما اعمال شد</span>
                            <br />
                            <GiCheckMark style={{ fontSize: "25px" }} />
                            {"  "}
                            <span> {coupon?.code}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}


                  <button type="button" className={flagUpdate || getBasket?.length == 0 ? `${style.btn_hide}` : `${style.btn} btn btn-outline-info`} onClick={paymentHandler}>
                    تکمیل خرید
                  </button>
                </>
              )}

              {!xtFlagLogin && (
                <button type="button" className={flagUpdate ? `${style.btn_hide}` : `${style.btn} btn btn-outline-info`} onClick={paymentHandler}>
                  تکمیل خرید
                </button>
              )}
            </div>

            {Number(total) != 0 && (
              <div className="col-6">
                <div className={` ${style.colPrice_mobile}`}>
                  <button className={`btn btn-outline  ${style.colPrice_mobile_btn1}`} disabled>
                    <span>مجموع سبد خرید :</span>
                    <br />
                    <div className={`  ${style.colPrice_mobile_span2}`}>{(Number(total) / 10).toLocaleString()} تومان</div>
                    <br />
                    <div className={`${style.colPrice_nonoff_span}`}>{(Number(nonOfftotal) / 10).toLocaleString()} تومان</div>

                    <img src="./images/shop photo/12083346_Wavy_Bus-17_Single-09.png" alt="basket-image" className={style.colPrice_mobile_shopimg} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`col-lg-4 centerc ${style.col_4} boxSh`}>
          <div>
            <div className="centerc" style={{ alignItems: "center" }}>
              <button type="button" className={flagUpdate ? `${style.btn} btn btn-outline-info` : `${style.btn_hide}`} onClick={updateBasketHandler}>
                به روز رسانی سبد خرید
              </button>
            </div>

            <div>
              <div className="centerc" style={{ alignItems: "center" }}>
                {xtFlagLogin && (
                  <>
                    {coupon?.couponAvailable && (
                      <div className={`${style.coupon_div} centerr`}>
                        <button
                          className={!couponState ? "btn btn-warning" : "btn btn-primary disabled"}
                          onClick={() => {
                            // setCouponState(!couponState);
                            setCouponState(true);
                            AlertG();
                          }}
                        >
                          {!couponState ? (
                            <>
                              <span> برای فعالسازی کدتخفیف اینجا کلیک کنید :</span>
                              <br />
                              <GiClick style={{ fontSize: "25px" }} />
                              {"  "}
                              <span>کدتخفیف شما : {coupon?.code}</span>
                            </>
                          ) : (
                            <>
                              <span> کد تخفیف روی سبدخرید شما اعمال شد</span>
                              <br />
                              <GiCheckMark style={{ fontSize: "25px" }} />
                              {"  "}
                              <span> {coupon?.code}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    <button type="button" className={flagUpdate || getBasket?.length == 0 ? `${style.btn_hide}` : `${style.btn} btn btn-outline-info`} onClick={paymentHandler}>
                      تکمیل خرید
                    </button>
                  </>
                )}


                {!xtFlagLogin && (
                  <button type="button" className={flagUpdate ? `${style.btn_hide}` : `${style.btn} btn btn-outline-info`} onClick={paymentHandler}>
                    تکمیل خرید
                  </button>
                )}
              </div>
            </div>
            {Number(total) != 0 && (
              <div className={`centerr ${style.colPrice}`}>
                <button className={`btn btn-outline-warning ${style.btn1}`} disabled>
                  <img src="./images/shop photo/12083346_Wavy_Bus-17_Single-09.png" alt="basket-image" className={style.shopimg} />

                  <span>مجموع سبد خرید :</span>
                  <br />
                  <div>{(Number(total) / 10).toLocaleString()} تومان</div>
                  <br />
                  <div className={`${style.colPrice_nonoff_span}`}>{(Number(nonOfftotal) / 10).toLocaleString()} تومان</div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body style={{ fontSize: "35px" }}>
            {address?.length != 0 ? (
              <>
                <h2> آدرس های ثبت شده :</h2>
                <Form.Select aria-label="Default select example" onChange={(e) => setAdressId(e.target.value)}>
                  {address?.map((item) => (
                    <option value={item.id}>
                      {item.state}-{item.address}-کد پستی :{item.postalCode}
                    </option>
                  ))}
                </Form.Select>
              </>
            ) : (
              <>
                <h2>شما آدرس ثبت شده ای ندارید لطفا آدرس خود را ثبت بفرمایید...</h2>
                <Link href={"./p-user/address"} onClick={() => setXtFlagSpinnerShow(true)}>
                  <button className="btn btn-success">ثبت آدرس</button>
                </Link>
              </>
            )}

            <div className={`centerc ${style.cath_div}`}>
              <span>
                <input className={`${style.cath_input}`} type="radio" name="payment" defaultChecked value={1} onChange={(e) => setPayState(e.target.value)} />
                <span className="m-2">پرداخت آنلاین</span>
              </span>



              <div className={`${style.post} `} >

                <div className="centerr" onClick={() => setPostState(1)}>
                  {postState == 1 ? <FiCheckSquare color="green" fontSize="18px" /> : <MdOutlineCheckBoxOutlineBlank fontSize="18px" />}

                  <div className={`${style.postEditor}`} dangerouslySetInnerHTML={{ __html: `${postA?.value}` }}>
                  </div>

                </div>


                <div className="centerr" onClick={() => setPostState(2)}>
                  {postState == 2 ? <FiCheckSquare color="green" fontSize="18px" /> : <MdOutlineCheckBoxOutlineBlank fontSize="18px" />}
                  <div className={`${style.postEditor}`} dangerouslySetInnerHTML={{ __html: `${postB?.value}` }}>
                  </div>
                </div>


              </div>

              <h3 className={`${style.postnews}`}>سفارش پس از تایید نهایی واحد فروش حداکثر طی 48 ساعت کاری تحویل پست میگردد.</h3>

            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className={`btn btn-danger ${style.btn_modal_close}`} onClick={handleClose}>
              <X size={16} color="#fff" weight="duotone" />
              بستن
            </button>
            <button
              className={address?.length !== 0 ? `btn btn-info ${style.btn_modal_ok}` : `btn btn-info ${style.btn_modal_ok_disable}`}
              onClick={postState == 0 ? alertF : payState == 1 ? payment : handleRegisterShop}
            // onClick={payState == 1 ? directToZarin : handleRegisterShop}
            >
              <CheckCircle size={20} color="#fff" weight="duotone" />
              تایید خرید
            </button>
          </Modal.Footer>
        </Modal>

        {/* for ziroSuply product  ===> */}
        <Modal size="lg" show={showB} onHide={handleCloseB}>
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body style={{ fontSize: "35px" }}>
            <>
              <h1>موجودی محصولات زیر به اتمام رسیده است ،لطفا این موارد را از سبد خود حذف بفرمایید : </h1>
              {/* <table className="table"> */}
              <ul className={`${style.ul_ziroSupply}`}>
                {ziroSupply?.length != 0 &&
                  ziroSupply.map((item) => (
                    <li>{item}</li>
                    // <tr key="">
                    //   <th>{item}</th>
                    //     </tr>
                  ))}
              </ul>
              {/* </table> */}
            </>
          </Modal.Body>

          <Modal.Footer>
            <button className={`btn btn-danger ${style.btn_modal_close}`} onClick={handleCloseB}>
              <X size={16} color="#fff" weight="duotone" />
              بستن
            </button>
          </Modal.Footer>
        </Modal>

        <>


          {/*for copupon show */}
          <Modal show={showC} onHide={handleCloseC} backdrop="static" keyboard={false}>
            <Modal.Body>
              <p className="text-center" style={{ fontSize: "18px", fontWeight: "600" }}>
                {`شما یک کد تخفیف دارید برای استفاده از کد تخفیف خود روی  `}
                <p style={{ color: "#ffc107", fontSize: "larger", fontWeight: "600" }}>کادر زرد رنگ</p>
                {`کلیک کنید`}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseC();
                }}
              >
                متوجه شدم ...
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </>
    </div>
  );
}
