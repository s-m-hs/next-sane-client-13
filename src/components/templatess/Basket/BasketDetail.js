"use client";
import style from "./BasketDetail.module.css";
import { MainContext } from "@/context/MainContext";
import apiCallProdDetails from "@/utils/ApiUrl/apiCallProDetails";
import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";
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
    offer
  } = useContext(MainContext);
  const [toBuy, setToBuy] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [basket, setBasket] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [basket2, setBasket2] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);
  const [payState, setPayState] = useState(1)
  const [ziroSupply, setZiroSupply] = useState([])
  const [flagZiroSupply, setFlagZiroSupply] = useState(false)
  const [adressId, setAdressId] = useState('')
  const [localbasket, setLocalBasket] = useState([]);
  const [flagLocal, setFlagLocal] = useState(false)
  const handleClose = () => setShow(false);
  const handleCloseB = () => setShowB(false);
  const handleShow = () => setShow(true);
  const handleShowB = () => setShowB(true);
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
    alertN(
      "center",
      "success",
      " سبد خرید با موفقیت به روزرسانی شد...",
      500
    ).then((res) => setBasketFlag((prev) => !prev));


  const removeHan = (id) => {
    const getLocalStorage = localStorage.getItem("loginToken");
    RemoveApi("api/CyOrders/deleteItem", id, getLocalStorage, AlertA)
    cartCounter >= 1 ? setCartCounter((prevCounter) => prevCounter - 1) : ''

  };
  ///////////////////////////////
  const directToZarin = () => {
    const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/ZarinPal/pay?orderId=${getBasket[0].cyOrderID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage}`,
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

  const handleRegisterShop = () => {
    const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrders/sendToPending?id=${getBasket[0].cyOrderID}&addressId=${adressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage}`,
          },
        }
      )
        .then((res) => {
          if (res.status == 200) {
            return res.json().then(result => {
              setGetBasket([]);
              setCartCounter(0);
              handleClose();
              AlertC();
            })
          } else {
            return res.json().then(result => {
              alert(result.response)
            })
          }
        })

    }
    myApp();
  };

  const handleGoToProfile = () => {
    rout.push("/p-user/profile");
  };

  ////////////for remove from ui in mode:localstorage===>
  const removeItem = (id) => {
    ///for remove from ui==>
    let getLocalStorageProd =
      JSON.parse(localStorage.getItem("cartObj")) || [];
    setToBuy((prevToBuy) => prevToBuy.filter((item) => item.id !== id));

    ///for remove from oldlocale and set newlocal to local==>
    getLocalStorageProd = getLocalStorageProd.filter(filter => filter.value !== id)
    localStorage.setItem('cartObj', JSON.stringify(getLocalStorageProd))

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
          title: "لطفا ابتدا ثبت نام کنید(کمتراز 1 دقیقه ...) ",
          showConfirmButton: true,
          confirmButtonText: "تایید",
        }).then((res) => {
          rout.push("/register");
        });
      alertN();
    }


    else if (ziroSupply?.length != 0) {
      handleShowB()
    } else if (ziroSupply?.length == 0) {
      handleShow()
    }
  };

  useEffect(() => {
    setZiroSupply([])
    getBasket?.forEach(item => {
      if (item.supply == 0) {
        setFlagZiroSupply(false)
        setZiroSupply(prev => [...prev, item.productCode])
      }
    })
  }, [getBasket])



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
    const getLocalStorage = localStorage.getItem("loginToken");
    if (xtFlagLogin) {
      updateBasket(getLocalStorage, basket, setBasketFlag, AlertB);
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
    // console.log("updateQuantity");
    let basketArray = [];
    basket.forEach((item) => {
      if (item.cyProductID !== id) {
        basketArray.push(item);
      }
    });
    basketArray.push({ cyProductID: id, quantity: newQuantity });
    setBasket(basketArray);
    // console.log(basketArray);
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
  }, []);



  useEffect(() => {
    const getLocalStorageProd =
      JSON.parse(localStorage.getItem("cartObj")) || [];
    setLocalBasket(getLocalStorageProd);
    setFlagLocal(true)
    if (localbasket.length != 0) {
      console.log(localbasket)
      localbasket?.forEach(item => {
        apiCallProdDetails(item.value, addItem, setIsApiCalled);
      })
    }

  }, [flagLocal]);


  ///to add total price
  useEffect(() => {
    const data = getBasket.map((item) => ({

      totalPrice: item.unitOfferPrice === item.unitPrice ? item.totalPrice * offer : item.unitOfferPrice

    }));
    const calculateTotalPrice = () => {
      const totalPrice = data.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotal(totalPrice);
    };
    calculateTotalPrice();
    // console.log(total);
  }, [getBasket]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  useEffect(() => {
    if (address && address?.length != 0) {
      setAdressId(address[0]?.id)
    }
  }, [address])



  console.log(getBasket)
  console.log(address)
  console.log(adressId)
  console.log(toBuy)
  return (
    <div className={`container ${style.container}`}>
      <div className="row mt-5 ">
        <div className={`col-lg-8 centerc  ${style.col_8} boxSh`}>
          <div className={` ${style.col_8_div_table} `}>
            {/* <button onClick={() => {
              setCartCounter(0)
              localStorage.clear(); setToBuy([]); setBasket([]);setLocalUpdateBasket([]) }}>clear</button> */}
            <table className="table table-hover">
              <thead>
                <tr key="">
                  <th>تصویر کالا</th>
                  <th>عنوان کالا</th>
                  <th>تعداد</th>
                  <th>قیمت واحد</th>
                  <th className={`${style.th}`}>قیمت کل</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {!xtFlagLogin && toBuy.length == 0 ? (
                  <div className={`row ${style.spinner_row}`}>
                    <div className="col">
                      <DotLoader color="rgba(25, 167, 175)" size={250} />
                    </div>
                  </div>
                ) : toBuy.length !== 0 ? (
                  toBuy.map((item) => (
                    <CartItem
                      key={item.id}
                      name={item["name"]}
                      smallImage={item["smallImage"]}
                      // totalPrice={item.noOffPrice}
                      unitPrice={offer == 1 && item.noOffPrice === item.price ? Number(item.price) / 10 :
                        item.noOffPrice !== item.price ? Number(item.noOffPrice) / 10 :
                          offer != 1 && (Number(item.price) / 10) * offer
                      }
                      id={item["id"]}
                      cyProductID={item.id}
                      quantity={
                        localUpdateBasket?.length === 0
                          ? 1
                          : localUpdateBasket.filter(
                            (filter) => filter.value.value === item.id
                          )[0]?.value.quan || 1
                      }
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
                        totalPrice={(offer == 1 && item.unitOfferPrice === item.unitPrice) ? Number(item.totalPrice) / 10 :
                          item.unitOfferPrice !== item.unitPrice ? Number(item.unitOfferPrice) / 10 :
                            offer !== 1 && (Number(item.totalPrice) / 10) * offer
                        }
                        unitPrice={(offer == 1 && item.unitOfferPrice === item.unitPrice) ? (Number(item.unitPrice) / 10) :
                          item.unitOfferPrice !== item.unitPrice ? (Number(item.unitOfferPrice) / 10) :
                            offer !== 1 && (Number(item.unitPrice) / 10) * offer
                        }
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
        <div className={` container  ${style.col_8_bottom_div_1} centerc`}>
          <div className="row">
            <div className="col-6">
              <div className={`  ${style.col_8_bottom_div_2} centerr`}>
                <button
                  type="button"
                  className={
                    flagUpdate
                      ? `${style.btn} btn btn-outline-info`
                      : `${style.btn_hide}`
                  }
                  onClick={updateBasketHandler}
                >
                  به روز رسانی سبد خرید
                </button>
              </div>
              {xtFlagLogin && <button
                type="button"
                className={
                  (flagUpdate || getBasket?.length == 0)
                    ? `${style.btn_hide}`
                    : `${style.btn} btn btn-outline-info`
                }
                onClick={paymentHandler}
              >
                تکمیل خرید
              </button>}

              {
                !xtFlagLogin &&
                <button
                  type="button"
                  className={
                    flagUpdate
                      ? `${style.btn_hide}`
                      : `${style.btn} btn btn-outline-info`
                  }
                  onClick={paymentHandler}
                >
                  تکمیل خرید
                </button>
              }

            </div>
            {Number(total) != 0 && <div className="col-6">

              <div className={` ${style.colPrice_mobile}`}>
                {/* <div className={`centerc ${style.cath_div_mobile}`}>

  <span> <input   className={`${style.cath_input}`} type='radio' checked /> <span className="m-2">پرداخت آنلاین</span> 
  </span>

  <span> <input   className={` ${style.cath_input}`} type='radio'  /><span className="m-2">پرداخت در محل</span> 
  </span>
  
</div> */}
                <button
                  className={`btn btn-outline  ${style.colPrice_mobile_btn1}`}
                  disabled
                >
                  <span>مجموع سبد خرید :</span>
                  <br />
                  <span className={`  ${style.colPrice_mobile_span2}`}>
                    {((Number(total) / 10)).toLocaleString()} تومان
                  </span>
                  <img
                    src="./images/shop photo/12083346_Wavy_Bus-17_Single-09.png"
                    alt="basket-image"
                    className={style.colPrice_mobile_shopimg}
                  />
                </button>
              </div>
            </div>}


          </div>
        </div>

        <div className={`col-lg-4 centerc ${style.col_4} boxSh`}>
          <div>
            <div className="centerc" style={{ alignItems: "center" }}>
              <button
                type="button"
                className={
                  flagUpdate
                    ? `${style.btn} btn btn-outline-info`
                    : `${style.btn_hide}`
                }
                onClick={updateBasketHandler}
              >
                به روز رسانی سبد خرید
              </button>
            </div>

            <div>
              <div className="centerc" style={{ alignItems: "center" }}>

                {xtFlagLogin && <button
                  type="button"
                  className={
                    (flagUpdate || getBasket?.length == 0)
                      ? `${style.btn_hide}`
                      : `${style.btn} btn btn-outline-info`
                  }
                  onClick={paymentHandler}
                >
                  تکمیل خرید
                </button>}

                {
                  !xtFlagLogin && <button
                    type="button"
                    className={
                      flagUpdate
                        ? `${style.btn_hide}`
                        : `${style.btn} btn btn-outline-info`
                    }
                    onClick={paymentHandler}
                  >
                    تکمیل خرید
                  </button>
                }

              </div>
            </div>

            {/* <div className={`centerc ${style.cath_div}`} >
              
            <span> <input   className={`${style.cath_input}`} type='radio'  value={1} />
            <span className="m-2">پرداخت آنلاین</span> 
            </span>

              <span> <input   className={` ${style.cath_input}`} type='radio'  value={2}/><span className="m-2">پرداخت در محل</span> 
              </span>
      
            </div> */}
            {Number(total) != 0 && <div className={`centerr ${style.colPrice}`}>
              <button
                className={`btn btn-outline-warning ${style.btn1}`}
                disabled
              >
                <img
                  src="./images/shop photo/12083346_Wavy_Bus-17_Single-09.png"
                  alt="basket-image"
                  className={style.shopimg}
                />

                <span>مجموع سبد خرید :</span>
                <br />
                <span>{((Number(total) / 10)).toLocaleString()} تومان</span>
              </button>
            </div>}



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
                <Form.Select aria-label="Default select example"
                  onChange={(e) => setAdressId(e.target.value)}
                >
                  {address?.map((item) => (
                    <option value={item.id}>
                      {item.state}-{item.address}-کد پستی :{item.postalCode}
                    </option>
                  ))}
                  {/* <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> */}
                </Form.Select>
              </>
            ) : (
              <>
                <h2>
                  شما آدرس ثبت شده ای ندارید لطفا آدرس خود را ثبت بفرمایید...
                </h2>
                <Link
                  href={"./p-user/address"}
                  onClick={() => setXtFlagSpinnerShow(true)}
                >
                  <button className="btn btn-success">ثبت آدرس</button>
                </Link>
              </>
            )}

            <div className={`centerc ${style.cath_div}`}>
              <span>
                <input
                  className={`${style.cath_input}`}
                  type="radio"
                  name="payment"
                  defaultChecked
                  value={1}
                  onChange={(e) => setPayState(e.target.value)}
                />
                <span className="m-2">پرداخت آنلاین</span>
              </span>

              <span>
                <input
                  className={` ${style.cath_input}`}
                  name="payment"
                  type="radio"
                  value={2}
                  onChange={(e) => setPayState(e.target.value)}
                />
                <span className="m-2">پرداخت در محل (تهران و قم)</span>
              </span>
            </div>

            {/* {address?.length == 0 && (
              <div className={`${style.mobileAdd_div} centerr`}>
                <h1>  شما آدرس ثبت شده ای ندارید ،لطفا ابتدا یک آدرس ثت کنید!!!</h1>
                <button
                  className={`btn btn-success ${style.btnGoToMobile}`}
                  onClick={handleGoToProfile}
                >
                  <HandTap size={32} weight="thin" /> ثبت شماره موبایل
                </button>
              </div>
            )} */}
          </Modal.Body>

          <Modal.Footer>
            <button
              className={`btn btn-danger ${style.btn_modal_close}`}
              onClick={handleClose}
            >
              <X size={16} color="#fff" weight="duotone" />
              بستن
            </button>
            <button
              className={
                address?.length !== 0
                  ? `btn btn-info ${style.btn_modal_ok}`
                  : `btn btn-info ${style.btn_modal_ok_disable}`
              }
              onClick={payState == 1 ? directToZarin : handleRegisterShop}
            // onClick={handleRegisterShop}
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
              <ul className={`${style.ul_ziroSupply}`} >
                {ziroSupply?.length != 0 && ziroSupply.map(item => (
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
            <button
              className={`btn btn-danger ${style.btn_modal_close}`}
              onClick={handleCloseB}
            >
              <X size={16} color="#fff" weight="duotone" />
              بستن
            </button>

          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
