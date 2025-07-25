"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import SwiperA from "@/components/templatess/Home/SwiperA/SwiperA";
import {
  MagnifyingGlass,
  Phone,
  SignIn,
  BuildingApartment,
  Barcode,
  UserCheck,
  SignOut,
  Wrench,
  Fingerprint,
  ShoppingCart,
  User,
  EnvelopeSimple,
  House,
  TextIndent,
  XCircle,
  SunDim,
  UserCircleGear,
  ChatText,
  ChatCircleText,
  Bell,
  ExclamationMark,
  Laptop,
  UsersThree,
} from "@phosphor-icons/react";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import { MainContext } from "@/context/MainContext";
import Dropdown from "react-bootstrap/Dropdown";
import { DotLoader, PuffLoader } from "react-spinners";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import alertN from "@/utils/Alert/AlertA";
import { Alert, Modal, Tooltip } from "react-bootstrap";
import CardA from "../Cards/CardA/CardA";
// import { motion , useScroll,AnimatePresence} from "framer-motion"
import { Sidebar } from "primereact/sidebar";
import alertQ from "@/utils/Alert/AlertQ";
import updateBasket from "@/utils/ApiUrl/updateBasket";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import LogOut from "@/utils/Functions/LogOut";
// import RotatingGlobe from "@/utils/RotatingGlobe";

export default function Header() {
  let {
    xtFlagLogin,
    name,
    userSrc,
    setUserSrc,
    setXtFlagLogin,
    xtflagSpinnerShow,
    setXtFlagSpinnerShow,
    cartCounter,
    setCartCounter,
    setLocalUpdateBasket,
    flagThem,
    setFlagThem,
    messageNotification,
    setMessageNotification,
    flagMessageNotification,
    setFlagMessageNotification,
    setFlagHamkar,
    flagHamkar,
    setOffer,
    resetFlagCart,
    setResetFlagCart,
    couponState,
    coupon,
    setCouponState,
  } = useContext(MainContext);
  const [valeS, setValue] = useState(1);
  const [mainCategory, setMainCategory] = useState({});
  const [mainCategoryB, setMainCategoryB] = useState({});
  const [fixTop, setFixTop] = useState(false);
  const [flaga, setFlaga] = useState(true);
  const [flagCateMobile, setFlagCateMobile] = useState(true);
  const ulRef = useRef();
  const ulRefA = useRef();
  const [visible, setVisible] = useState(false);
  const [visibleB, setVisibleB] = useState(false);
  const pathname = usePathname();
  const rout = useRouter();
  // const authority = searchParams.get('Authority');
  // const status = searchParams.get('Status');

  const [userName, setUserName] = useState("");
  const [flag, setFlag] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const [searchType, setSearchType] = useState("");
  const [searchTypeB, setSearchTypeB] = useState("");
  const [searchBoxArr, setSearchBoxArr] = useState([]);
  const [flagSearch, setFlagSearch] = useState(false);
  const [offBanner, setOffBanner] = useState([]);
  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const AlertA = () => alertN("center", "info", "محصولی در سبد خرید شما موجود نیست...", 1500);
  const AlertB = () => alertN("center", "info", "شما هنوز ثبت نام نکرده اید !!!...", 1500);
  const AlertC = () => alertN("center", "info", "برای تبادل پیام وارتباط با قسمتهای مختلف فروشگاه لطفا با حساب کاربری خود وارد شوید ", 3000);
  const alertD = () => alertN("center", "success", "محصولات با موفقیت به سبد خرید شما اضافه شد", 500);

  /////////////////////////////theming
  const getOffer = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/13`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setOffer(Number(result.value));
          });
        }
      });
    }
    myApp();
  };
  const getAllTicket = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyTicket/getUserTickets`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
        // body:JSON.stringify(obj)
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json().then((result) => {
              setMessageNotification(result);
            });
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  // useEffect(()=>{
  //   setFlagMessageNotification(prev=>!prev)
  // },[])
  useEffect(() => {
    getAllTicket();
  }, [flagMessageNotification, xtFlagLogin]);

  const changeTheme = () => {
    setFlagThem((prev) => !prev);
  };

  useEffect(() => {
    if (flagThem) {
      document.documentElement.style.setProperty("--white1ffffff", "#393939");
      document.documentElement.style.setProperty("--white1ffffff2", "#464646");
      document.documentElement.style.setProperty("--gray3", "#9b9b9b");
      document.documentElement.style.setProperty("--white2", "#d6d6d6");
      document.documentElement.style.setProperty("--black0", "#ffffff");
      document.documentElement.style.setProperty("--black33b4359", "#ffffff");
      document.documentElement.style.setProperty("--yellow", "##ffebcd");
    } else {
      document.documentElement.style.setProperty("--white1ffffff", "#ffffff");
      document.documentElement.style.setProperty("--white1ffffff2", "#ffffff");
      document.documentElement.style.setProperty("--gray3", "#555");
      document.documentElement.style.setProperty("--white2", "#ffffff");
      document.documentElement.style.setProperty("--black0", "#000000");
      document.documentElement.style.setProperty("--yellow", "#ffebcd");
    }
  }, [flagThem]);

  /////////////////////////////////
  const searchChange = (e) => {
    setSearchType(e.target.value);
  };
  const searchChangeB = (e) => {
    setSearchTypeB(e.target.value);
  };
  const searchBox = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    setFlagSearch(false);
    async function myApp() {
      let obj = {
        name: searchType ? searchType : searchTypeB,
        productCategoryCode: null,
        productCategoryId: null,
        categoryCode: null,
        manufacturerName: null,
        pageNumber: 0,
        pageSize: 1000,
      };
      // console.log(obj)
      const res = await fetch(`${apiUrl}/api/CyProducts/SearchProducts`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          if (result) {
            setFlagSearch(true);
            setSearchBoxArr(result);
          } else {
            setFlagSearch(false);
          }
          //   console.log(result)
        });
    }
    myApp();
  };
  useEffect(() => {
    if (searchTypeB.length > 2) {
      searchBox();
    } else if (searchTypeB.length < 3) {
      setSearchBoxArr([]);
    }
  }, [searchTypeB]);

  ////////////////////////////
  useEffect(() => {
    const fixNavbarToTop = () => {
      // const currentScroll = window.pageYOffset;
      const currentScroll = window.scrollY;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavbarToTop);

    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  const exitHandler = () => {
    LogOut("/api/Customer/logout", function () {
      localStorage.removeItem("cartObj");
      setXtFlagLogin(false);
      setCartCounter(0);
      rout.push("/");
      setUserSrc("");
    });
  };

  ///////////////////////////////
  const getProfile = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    // const getLocalStorageUser = localStorage.getItem("user");

    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/Customer/GetProfile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
      }).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          // setUserName(getLocalStorageUser);
          setFlag(true);
          // setXtFlagLogin(true);
        } else {
          // localStorage.removeItem("loginToken");
        }
      });
    }
    myAppGet();
  };

  useEffect(() => {
    const chekKey2 = (e) => {
      // console.log(e)
      if (e.keyCode == 13 && searchType !== "") {
        searchBox();
        setVisible(true);
      } else if (e.keyCode == 13 && searchTypeB !== "") {
        searchBox();
        setVisibleB(true);
      } else if (e.keyCode == 27 && flagSearch) {
        setFlagSearch(false);
        setSearchType("");
        setSearchTypeB("");
      }
    };
    window.addEventListener("keydown", chekKey2);
    return () => window.removeEventListener("keydown", chekKey2);
  });

  useEffect(() => {
    if (xtFlagLogin) {
      getProfile();
    }
    if (localStorage.getItem("cartObj")) {
      localStorage.removeItem("cartObj");
    }
  }, [xtFlagLogin]);
  /////////////////////////////////
  const getCategoryById = (id) => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: id,
      str: "string",
    };
    if (id == 3) {
      postApi("/api/CyProductCategory/GetItemWChildAndRoot", obj, setMainCategory);
    } else if (id == 2) {
      postApi("/api/CyProductCategory/GetItemWChildAndRoot", obj, setMainCategoryB);
    }
  };
  const getBanner = (id) => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/${id}`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setOffBanner(result);
          });
        }
      });
    }
    myApp();
  };
  ////////////////////////////
  useEffect(() => {
    getCategoryById(3);
    getCategoryById(2);
    getBanner(18);
  }, []);

  useEffect(() => {
    ////to set offer :if couponState is false, get offer from value by admin
    if (!couponState) {
      getOffer();
    } else if (couponState) {
      const discount = coupon?.discountAmount;
      setOffer(discount);
    }
  }, [couponState]);
  const requestCoupon = (couItemId, state) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyCoupon/requestCoupon?CoupItemId=${couItemId}&state=${state}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // console.log(res);
      });
    }
    myApp();
  };

  useEffect(() => {
    ///// to check if copuon is availble yet, isRequested state set to false(this is when site relouding:every time site relouding this check  )
    const couponItemId = coupon?.couponAvailable;
    if (couponItemId) {
      requestCoupon(couponItemId[0]?.id, 2);
    }
  }, [coupon]);
  useEffect(() => {
    ///// to check if couponState is false, isRequested state set to false and coupon not set untile user want(this is when user onclick coupon button on basketdetail-page)
    if (!pathname.includes("basket")) {
      const couponItemId = coupon?.couponAvailable;
      if (couponState) {
        getOffer();
        setCouponState(false);
        requestCoupon(couponItemId[0]?.id, 2);
      }
    }
  }, [pathname]);

  const onmousHandle = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    if (pathname.includes("/p-user") && !xtFlagLogin) {
      rout.push("/");
      AlertB();
    }

    if (!pathname.includes("/login")) {
      setFlagHamkar(false);
    }
    if (pathname.includes("login") && xtFlagLogin) {
      rout.push("/");
    }
    if (pathname.includes("register") && xtFlagLogin) {
      rout.push("/");
    }
  }, [pathname, xtFlagLogin]);
  useEffect(() => {
    return () => localStorage.removeItem("cartObj");
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("logintoken");
  //   if (token) {
  //     fetch("/api/auth/sync-token", {
  //       method: "POST",
  //       headers: {
  //         "x-login-token": token, // توکن را در هدر می‌فرستیم
  //       },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    setResetFlagCart(false);
    setTimeout(() => {
      setResetFlagCart(true);
    }, 0.1);
  }, cartCounter);
  return (
    <>
      {xtflagSpinnerShow && (
        <div className={`${styles.DotLoader_div}`}>
          <DotLoader className={`${styles.DotLoader}`} color="rgba(25, 165, 175)" size="280px" speedMultiplier={1} />
        </div>
      )}

      <section className={styles.A}>
        {!fixTop ? (
          <div className={`container ${styles.Header} boxSh`}>
            <div className={`row ${styles.Header_top} centerr`}>
              <div className={`col col-md-8 ${styles.Header_rightSide} centerr`}>
                <div className={styles.Header_rightSide__div_img}>
                  {/* <img src="../images/banner/20offer - Copy.png" alt="" /> */}
                  {offBanner?.orderValue == 1 && <img src={offBanner.bigImg} alt={offBanner.title} />}
                  {/* <img src="../images/banner/vecteezy_mega-sale-20-percent-off-right-side-view-3d-render-object_17193891 (1).png" alt="" /> */}

                  <div style={{ width: "135px", height: "105px" }}>
                    <SwiperA />
                  </div>
                </div>

                <div className={`${styles.Header_rightSide__div_search}  centerc boxSh`}>
                  <input className={styles.Header_rightSide__div_search_input} type="text" placeholder="دنبال چی میگردی...؟" value={searchType} onChange={searchChange} />
                  <MagnifyingGlass
                    size={24}
                    color="#14a5af"
                    weight="thin"
                    className={styles.magnifyingGlass}
                    onClick={() => {
                      setVisible(true);
                      searchBox();
                    }}
                  />

                  <div className={`${styles.sidebar_input_div} `}>
                    <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                      {flagSearch && (
                        <div className="container">
                          <div className={`${styles.Header_rightSide__div_search}  centerc boxSh`}>
                            {" "}
                            <input className={styles.Header_rightSide__div_search_input} type="text" placeholder="دنبال چی میگردی...؟" value={searchType} onChange={searchChange} />
                            <MagnifyingGlass
                              size={24}
                              color="#14a5af"
                              weight="thin"
                              className={styles.magnifyingGlass}
                              onClick={() => {
                                setVisible(true);
                                searchBox();
                              }}
                            />
                          </div>

                          <div className={`row row-cols-3 ${styles.Header_rightSide__div_searchbox} `}>
                            {/* <span><XCircle size={24} onClick={() => {
                      setFlagSearch(false)
                      setSearchType('')
                    }} /></span> */}
                            {searchBoxArr.itemList?.length != 0
                              ? searchBoxArr.itemList?.map((item) => {
                                if (item.cyCategoryId) {
                                  return (
                                    <Link
                                      href={`/product/${item.id}`}
                                      onClick={() => {
                                        setFlagSearch(false);
                                        setSearchBoxArr([]);
                                        setSearchType("");
                                        setXtFlagSpinnerShow(true);
                                        setVisible(false);
                                      }}
                                    >
                                      <div className={`${styles.Header_rightSide__div_searchbox_div} centerr `}>
                                        <span>{item.name}</span>
                                        <img src={item.smallImage} alt={item.name} />
                                      </div>
                                    </Link>
                                  );
                                }
                              })
                              : ""}
                          </div>
                        </div>
                      )}
                    </Sidebar>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>
                {xtFlagLogin && (
                  <>
                    <Dropdown className={styles.user_button} size="lg">
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        {name !== "SaneUser" && <span className={styles.user_span}>{name?.toUpperCase()}</span>}{" "}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={styles.user_p}>
                        <Dropdown.Item>
                          <Link style={{ color: "inherit" }} href="/p-user/profile" onClick={() => setXtFlagSpinnerShow(true)}>
                            <p>پنل کاربری</p>
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            exitHandler();
                            setMessageNotification([]);
                            setFlagMessageNotification((prev) => !prev);
                          }}
                        >
                          <p> خروج</p>{" "}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
                <Link href={!xtFlagLogin ? "/register" : "/p-user/profile"}>
                  <div onClick={() => setXtFlagSpinnerShow(true)} className={`${styles.Header_leftSide__div} centerr`}>
                    {userSrc ? <img src={userSrc} alt="user-profile" className={`${styles.Header_user_img}`} /> : <User size={24} color="#14a5af" />}

                    {!xtFlagLogin ? (
                      <span className={`${styles.Header_leftSide__div_span} `}>وارد حساب کاربری خود شوید...</span>
                    ) : (
                      <span className={`${styles.Header_leftSide__div_span} `}>وارد پنل کاربری خود شوید...</span>
                    )}
                  </div>
                </Link>

                {resetFlagCart && (
                  <Link href={cartCounter != 0 ? "/basket" : "#"}>
                    <div
                      onClick={() => {
                        if (cartCounter != 0) {
                          setXtFlagSpinnerShow(true);
                        } else {
                          AlertA();
                        }
                      }}
                      className={`${styles.Header_leftSide__div} centerr`}
                    >
                      <ShoppingCart size={24} color="#14a5af" />
                      {cartCounter !== 0 && <span className={`${styles.shopicon_baget} centerc`}>{cartCounter}</span>}
                    </div>
                  </Link>
                )}

                {xtFlagLogin ? (
                  <Link href={"/p-user/ticket"}>
                    <div className={` ${styles.Header_leftSide__div} centerr`} onClick={() => setXtFlagSpinnerShow(true)}>
                      <ChatCircleText size={28} weight="duotone" color="#14a5af" />
                      {messageNotification?.filter((filter) => filter.status == 1)?.length != 0 && <span className={`${styles.shopicon_baget} centerc`}> !</span>}
                      {/* <ChatCircleText size={30}  color="#14a5af" weight="duotone" className={styles.sphere} /> */}
                    </div>
                  </Link>
                ) : (
                  <div className={` ${styles.Header_leftSide__div} centerr`}>
                    <ChatCircleText
                      size={28}
                      color="#14a5af"
                      weight="duotone"
                      onClick={() => {
                        AlertC();
                      }}
                    />
                  </div>
                )}

                {/* <div className={` ${styles.Header_leftSide__div} centerr`}
                onClick={changeTheme}
                >
                <SunDim size={28} color="#14a5af" weight="duotone" />
                </div> */}

                <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>
                  <div className={` ${styles.mobiNumber_div} centerc`}>
                    <span>
                      02191005457 <Phone size={18} color="#ededed" weight="duotone" />
                    </span>
                    <span>کامپیوترصانع</span>
                  </div>

                  {/* <Phone size={24} color="#ededed" weight="duotone" /> */}
                </div>
              </div>
            </div>

            <div className={`row  ${styles.header_bottom} `}>
              <div className={`col ${styles.header_bottom__col}`}>
                <ul className={`${styles.header_bottom__col__ul} centerr`}>
                  <li
                  // onClick={() => setXtFlagSpinnerShow(true)}
                  >
                    {" "}
                    <Link
                      href={"/"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {" "}
                      <House size={15} /> خانه
                    </Link>{" "}
                  </li>

                  <li className="nav_link arrow_icon">
                    <TextIndent size={15} />
                    دسته بندی ها
                    <ul className={`${styles.header_bottom__col__ul__ul} centerc`} ref={ulRef}>
                      <li value={1} onMouseEnter={onmousHandle} className={valeS == 1 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}>
                        لوازم جانبی
                        <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}>
                            {mainCategory.childs?.length &&
                              mainCategory.childs.map((item, index) => (
                                <Link
                                  key={index}
                                  onClick={() => setXtFlagSpinnerShow(true)}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2} centerc`}
                                >
                                  <img src={item.imageUrl} alt={item.name || "Category image"} />
                                  {item.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </li>

                      <li value={2} onMouseEnter={onmousHandle} className={valeS == 2 && flaga ? `${styles.liiii2_a}` : `${styles.liiii2}`}>
                        سخت افزار
                        <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div
                            className={valeS == 2 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}`}

                          // className={valeS == 2 ? "row-cols-4 ishover" : " nohover"}
                          >
                            {mainCategoryB.childs?.length &&
                              mainCategoryB.childs.map((item, index) => (
                                <Link
                                  key={index}
                                  onClick={() => setXtFlagSpinnerShow(true)}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2} centerc`}
                                >
                                  <img src={item.imageUrl} alt={item.name || "Category image"} />
                                  {item.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav_link">فروش اقساط   </li> */}

                  {xtFlagLogin && (
                    <li className="nav_link arrow_icon">
                      <Wrench size={15} />
                      خدمات
                      <ul className={`${styles.header_bottom__col__ul__ul_service} centerc`}>
                        <Link href={"/p-user/warranty"}>
                          <li
                            onClick={() => setXtFlagSpinnerShow(true)}
                            value={11}
                            onMouseEnter={onmousHandle}
                            className={valeS == 11 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                          >
                            گارانتی
                          </li>
                        </Link>

                        <Link href={"/p-user/repairs"}>
                          <li
                            onClick={() => setXtFlagSpinnerShow(true)}
                            value={12}
                            onMouseEnter={onmousHandle}
                            className={valeS == 12 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                          >
                            تعمیرات
                          </li>
                        </Link>
                      </ul>
                    </li>
                  )}

                  {!xtFlagLogin ? (
                    <>

                      <li onClick={() => setXtFlagSpinnerShow(true)}>
                        {" "}
                        <Link
                          href={"/register"}
                          style={{
                            listStyle: "none",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <UserCheck size={15} />
                          ورود{" "}
                        </Link>{" "}
                      </li>
                    </>
                  ) : (
                    <li onClick={() => setXtFlagSpinnerShow(true)}>
                      {" "}
                      <Link
                        href={"/p-user/profile"}
                        style={{
                          listStyle: "none",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <User size={15} />
                        پنل کاربری{" "}
                      </Link>{" "}
                    </li>
                  )}

                  <li onClick={() => setXtFlagSpinnerShow(true)}>
                    {" "}
                    <Link
                      href={"/computerparts"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {" "}
                      <Laptop size={15} />
                      محاسبه گر سیستم
                    </Link>{" "}
                  </li>
                  {/* 
                  <li onClick={() => setFlagHamkar(true)}>
                    <Link href={'/login'}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <UsersThree size={15} />
                      ورود همکاران(پخش عمده)</Link>
                  </li> */}

                  <li onClick={() => setXtFlagSpinnerShow(true)}>
                    {" "}
                    <Link
                      href={"/contactus"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {" "}
                      <BuildingApartment size={15} />
                      تماس با ما
                    </Link>{" "}
                  </li>
                </ul>
              </div>

              <div className={styles.header_bottom__col_logo}>
                <Link href={"https://eitaa.com/sane_camputer"}>
                  <img className={styles.sphere3} src="../../../images/eitaa-icon-colorful.png" alt="eitaa" />
                </Link>
                <Link href={"https://it_sane"}>
                  {" "}
                  <img className={styles.sphere2} src="../../../images/icons8-instagram-2048.png" alt="instagram" />
                </Link>
                <Link href={"https://t.me/sane_camputer"}>
                  {" "}
                  <img className={styles.sphere} src="../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png" alt="telegram" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={`container ${styles.containerfix}`}>
            <div className={`row ${styles.Header_top} centerr`}>
              <div className={`col col-md-8 ${styles.Header_rightSide} centerr`}>
                <div className={styles.Header_rightSide__div_img}>
                  {offBanner?.orderValue == 1 && <img className={styles.Header_rightSide__div_imgB} src={offBanner.bigImg} alt={offBanner.title} />}
                  <div style={{ width: "80px", height: "50px" }}>
                    <SwiperA />
                  </div>
                </div>
                <div className={`${styles.Header_rightSide__div_search}  centerc`}>
                  <input className={styles.Header_rightSide__div_search_input} type="text" placeholder="دنبال چی میگردی...؟" value={searchType} onChange={searchChange} />
                  <MagnifyingGlass
                    size={24}
                    color="#14a5af"
                    weight="thin"
                    className={styles.magnifyingGlass}
                    onClick={() => {
                      setVisible(true);
                      searchBox();
                    }}
                  />

                  <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                    {flagSearch && (
                      <div className="container">
                        <div className={`row row-cols-3 ${styles.Header_rightSide__div_searchbox} `}>
                          {/* <span><XCircle size={24} onClick={() => {
                      setFlagSearch(false)
                      setSearchType('')
                    }} /></span> */}
                          {searchBoxArr.itemList?.length != 0
                            ? searchBoxArr.itemList?.map((item) => {
                              if (item.mainImage) {
                                return (
                                  <Link
                                    href={`/product/${item.id}`}
                                    onClick={() => {
                                      setFlagSearch(false);
                                      setSearchBoxArr([]);
                                      setSearchType("");
                                      setXtFlagSpinnerShow(true);
                                      setVisible(false);
                                    }}
                                  >
                                    <div className={`${styles.Header_rightSide__div_searchbox_div} centerr `}>
                                      <span>{item.name}</span>
                                      <img src={item.smallImage} alt={item.name} />
                                    </div>
                                  </Link>
                                );
                              }
                            })
                            : ""}
                        </div>
                      </div>
                    )}
                  </Sidebar>
                </div>
              </div>

              <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>
                <div className="centerc"></div>
                {xtFlagLogin && name !== "SaneUser" && <span className={styles.user_span}>{name?.toUpperCase()}</span>}

                <Link href={!xtFlagLogin ? "/login" : "/p-user/profile"}>
                  <div onClick={() => setXtFlagSpinnerShow(true)} className={`${styles.Header_leftSide__div} centerr`}>
                    {userSrc ? <img src={userSrc} alt="user-profile" className={`${styles.Header_user_img}`} /> : <User size={24} color="#14a5af" />}{" "}
                    {!xtFlagLogin ? (
                      <span className={`${styles.Header_leftSide__div_span} `}>وارد حساب کاربری خود شوید...</span>
                    ) : (
                      <span className={`${styles.Header_leftSide__div_span} `}>وارد پنل کاربری خود شوید...</span>
                    )}
                  </div>
                </Link>

                {resetFlagCart && (
                  <Link href={cartCounter != 0 ? "/basket" : "#"}>
                    <div
                      onClick={() => {
                        if (cartCounter != 0) {
                          setXtFlagSpinnerShow(true);
                        } else {
                          AlertA();
                        }
                      }}
                      className={`${styles.Header_leftSide__div} centerr`}
                    >
                      <ShoppingCart size={24} color="#14a5af" />
                      {cartCounter !== 0 && <span className={`${styles.shopicon_baget} centerc`}>{cartCounter}</span>}
                    </div>
                  </Link>
                )}

                {xtFlagLogin ? (
                  <Link href={"/p-user/ticket"}>
                    <div className={` ${styles.Header_leftSide__div} centerr`} onClick={() => setXtFlagSpinnerShow(true)}>
                      <ChatCircleText size={28} weight="duotone" color="#14a5af" />
                      {messageNotification?.filter((filter) => filter.status == 1)?.length != 0 && <span className={`${styles.shopicon_baget} centerc`}> !</span>}
                      {/* <ChatCircleText size={30}  color="#14a5af" weight="duotone" className={styles.sphere} /> */}
                    </div>
                  </Link>
                ) : (
                  <div className={` ${styles.Header_leftSide__div} centerr`}>
                    <ChatCircleText
                      size={28}
                      color="#14a5af"
                      weight="duotone"
                      onClick={() => {
                        AlertC();
                      }}
                    />
                  </div>
                )}
                {/* 
                <div className={` ${styles.Header_leftSide__div} centerr`}
                onClick={changeTheme}
                >
                <SunDim size={24} color="#14a5af" weight="duotone" />
                </div> */}

                <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>
                  <div className={` ${styles.mobiNumber_div} centerc`}>
                    <span>
                      02191005457
                      <Phone size={18} color="#ededed" weight="duotone" />
                    </span>
                    <span>کامپیوترصانع</span>
                  </div>
                  {/* <Phone size={24} color="#ededed" weight="duotone" />    */}
                </div>
              </div>
            </div>

            <div className={`row  ${styles.header_bottom_fix} `}>
              <div className={`col ${styles.header_bottom__col}`}>
                <ul className={`${styles.header_bottom__col__ul_fix} centerr`}>
                  <li //onClick={() => setXtFlagSpinnerShow(true)}
                  >
                    {" "}
                    <Link
                      href={"/"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <House size={15} /> خانه
                    </Link>{" "}
                  </li>

                  <li className="nav_link arrow_icon">
                    <TextIndent size={15} />
                    دسته بندی ها
                    <ul className={`${styles.header_bottom__col__ul__ul} centerc`}>
                      <li value={1} onMouseEnter={onmousHandle} className={valeS == 1 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}>
                        لوازم جانبی
                        <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}>
                            {mainCategory.childs?.length &&
                              mainCategory.childs.map((item, index) => (
                                <Link
                                  onClick={() => setXtFlagSpinnerShow(true)}
                                  key={index}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                                >
                                  <img src={item.imageUrl} alt={item.name || "Category image"} />
                                  {item.name}
                                </Link>

                                // <Link key={index}
                                //   onClick={() => {
                                //     ulRef.current.add.className('ul_hidden')
                                //   }}
                                //   href={`/category/${item.id}`}
                                //   className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                                // >
                                //   <img src={item.imageUrl} alt="" />
                                //   {item.text}
                                // </Link>
                              ))}
                          </div>
                        </div>
                      </li>

                      <li value={2} onMouseEnter={onmousHandle} className={valeS == 2 && flaga ? `${styles.liiii2_a}` : `${styles.liiii2}`}>
                        سخت افزار
                        <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div
                            className={valeS == 2 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}`}

                          // className={valeS == 2 ? "row-cols-4 ishover" : " nohover"}
                          >
                            {mainCategoryB.childs?.length &&
                              mainCategoryB.childs.map((item, index) => (
                                <Link
                                  onClick={() => setXtFlagSpinnerShow(true)}
                                  key={index}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                                >
                                  <img src={item.imageUrl} alt={item.name || "Category image"} />
                                  {item.name}
                                </Link>
                              ))}
                          </div>
                        </div>
                      </li>

                      {/* <li
                        value={6}
                        onMouseEnter={onmousHandle}
                        className={valeS == 6 ? `${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
                        لپ تاپ
                        <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}  >
                          <div
                            className={valeS == 6 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}
                          >
                            <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                              <img src="../../images/asus.jpg" alt="" />
                              ASUS
                            </Link>
                            <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                              <img src="../../images/lenovo.jpg" alt="" />
                              LENOVO
                            </Link>
                            <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                              <img src="../../images/hp.jpg" alt="" />
                              HP
                            </Link>
                            <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                              <img src="../../images/acer.jpg" alt="" />
                              ACER
                            </Link>
                            <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                              <img src="../../images/microsoft.jpg" alt="" />
                              MICROSOFT
                            </Link>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </li>
                  {/* <li className="nav_link">فروش اقساط   </li> */}
                  {xtFlagLogin && (
                    <li className="nav_link arrow_icon">
                      <Wrench size={15} />
                      خدمات
                      <ul className={`${styles.header_bottom__col__ul__ul_service} centerc`}>
                        <Link href={"/p-user/warranty"}>
                          <li
                            onClick={() => setXtFlagSpinnerShow(true)}
                            value={11}
                            onMouseEnter={onmousHandle}
                            className={valeS == 11 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                          >
                            گارانتی
                          </li>
                        </Link>

                        <Link href={"/p-user/repairs"}>
                          <li
                            onClick={() => setXtFlagSpinnerShow(true)}
                            value={12}
                            onMouseEnter={onmousHandle}
                            className={valeS == 12 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                          >
                            تعمیرات
                          </li>
                        </Link>
                      </ul>
                    </li>
                  )}

                  {!xtFlagLogin ? (
                    <>
                      {/* <li
                        onClick={() => {
                          setXtFlagSpinnerShow(true);
                          setFlagHamkar(false);
                        }}
                      >
                        {" "}
                        <Link
                          href={"/login"}
                          style={{
                            listStyle: "none",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <SignIn size={15} />
                          ورود{" "}
                        </Link>{" "}
                      </li> */}

                      <li onClick={() => setXtFlagSpinnerShow(true)}>
                        {" "}
                        <Link
                          href={"/register"}
                          style={{
                            listStyle: "none",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <UserCheck size={15} />
                          ورود{" "}
                        </Link>{" "}
                      </li>
                    </>
                  ) : (
                    <li onClick={() => setXtFlagSpinnerShow(true)}>
                      {" "}
                      <Link
                        href={"/p-user/profile"}
                        style={{
                          listStyle: "none",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <User size={15} />
                        پنل کاربری{" "}
                      </Link>{" "}
                    </li>
                  )}

                  <li onClick={() => setXtFlagSpinnerShow(true)}>
                    {" "}
                    <Link
                      href={"/computerparts"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {" "}
                      <Laptop size={15} />
                      محاسبه گر سیستم
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link
                      href={"/contactus"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <BuildingApartment size={15} /> تماس با ما
                    </Link>{" "}
                  </li>
                </ul>

                <div className={styles.header_bottom__col_logo}>
                  <Link href={"https://eitaa.com/sane_camputer"}>
                    <img className={styles.sphere3} src="../../../images/eitaa-icon-colorful.png" alt="eitaa" />
                  </Link>
                  <Link href={"https://it_sane"}>
                    {" "}
                    <img className={styles.sphere2} src="../../../images/icons8-instagram-2048.png" alt="instagram" />
                  </Link>
                  <Link href={"https://t.me/sane_camputer"}>
                    {" "}
                    <img className={styles.sphere} src="../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png" alt="telegram" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className={styles.B}>
        <div className="container">
          <div className={`${styles.mobi_header} row  centerr`}>
            <Link href={"/"}>
              <img src="/images/photo_2024-05-30_19-08-29.jpg" alt="logo" />
              {/* <RotatingGlobe/> */}
              {offBanner?.orderValue == 1 && (
                <>
                  <img className={`${styles.mobi_header_img_off} `} src={offBanner.bigImg} alt={offBanner.title} />

                  <span className={`${styles.mobi_header_span_off} `}> تخفیف ویژه روز پدر</span>
                </>
              )}
            </Link>

            <div className={styles.header_bottom__col_logo}>
              {xtFlagLogin && (
                <Link href={"/p-user/profile"}>
                  <span className={styles.sphere4}>
                    {userSrc && <img src={userSrc} alt="user-profile" className={`${styles.Header_user_img_mobile}`} />}
                    <UserCircleGear size={35} color="#14a5af" weight="duotone" />
                  </span>
                  {/* <span className={styles.sphere4} >{name?.toUpperCase()}</span> */}
                </Link>
              )}

              {xtFlagLogin ? (
                <Link href={"/p-user/ticket"} onClick={() => setXtFlagSpinnerShow(true)}>
                  {/* <ChatText size={32} weight="duotone" color="#14a5af" className={styles.sphere}/>  */}
                  <ChatCircleText size={30} color="#14a5af" weight="duotone" className={styles.sphere} />
                  {
                    messageNotification?.filter((filter) => filter.status == 1)?.length != 0 && (
                      <ExclamationMark size={28} weight="bold" className={`${styles.shopicon_bagetB} centerc`} />
                    )
                    //  <span className={`${styles.shopicon_baget} centerc`} > !</span>
                  }
                </Link>
              ) : (
                <ChatCircleText
                  size={30}
                  color="#14a5af"
                  weight="duotone"
                  className={styles.sphere}
                  onClick={() => {
                    AlertC();
                  }}
                />
              )}

              {/*      
                  <Link href={'https://eitaa.com/sane_camputer'}>
                    <img
                      className={styles.sphere3}
                      src="/images/eitaa-icon-colorful.png"
                      alt=""
                    />
                  </Link>

                  <Link href={'https://instagram.com/sane_computer_'}>
                    {" "}
                    <img
                      className={styles.sphere2}
                      src="/images/icons8-instagram-2048.png"
                      alt=""
                    />
                  </Link>

                  <Link href={'https://t.me/SANE_IT'}>
                  
                    {" "}
                    <img
                      className={styles.sphere}
                      src="/images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png"
                      alt=""
                    />
                  </Link> */}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.D}>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <div className={` container centerr ${styles.mobile_dropdownMenu_li}`}>
              <div
                // className='row-cols-6 '
                className={`row ${styles.ishover}`}
              >
                {/* <div className="col-2 ">
                  <div>
                    <button
                      className={!flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob}` : `btn btn-outline-info ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(true)}
                    >
                      {" "}
                      لوازم جانبی
                    </button>

                    <button
                      className={flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob}` : `btn btn-outline-info ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(false)}
                    >
                      {" "}
                      سخت افزار
                    </button>
                  </div>

                </div> */}
                <div className="col-12">
                  <div>
                    <button
                      className={!flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob}` : `btn btn-outline-info ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(true)}
                    >
                      {" "}
                      لوازم جانبی
                    </button>

                    <button
                      className={flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob}` : `btn btn-outline-info ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(false)}
                    >
                      {" "}
                      سخت افزار
                    </button>
                  </div>
                  {flagCateMobile
                    ? mainCategory.childs && (
                      <div className={`row row-cols-2  ${styles.bcatitem}`}>
                        {mainCategory.childs.map((item, index) => (
                          <CardA click={toggleMenu} datos={""} key={item.id} imgSrc={item.imageUrl} category={`category`} id={item.id} text={item.name} />
                        ))}
                      </div>
                    )
                    : mainCategoryB.childs && (
                      <div className={`row row-cols-2 ${styles.bcatitem}`}>
                        {mainCategoryB.childs.map((item, index) => (
                          <CardA click={toggleMenu} datos={""} key={item.id} imgSrc={item.imageUrl} category={`category`} id={item.id} text={item.name} />
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* <div>
            <button className="btn btn-outline-info">              لوازم جانبی 
            </button>
         
            <button className="btn btn-outline-info">              لوازم جانبی 
            </button>          
</div> */}
          </div>
        )}
      </section>

      <section className={styles.C}>
        <div className={`container left-0 ${styles.C_Contaner} `}>
          <div className={`${styles.mobi_bottomHeader} row`}>
            <div className="col">
              <ul className={`${styles.bottomHeader_ul} centerr `}>
                <li className={`${styles.hamburger_li}centerr`}>
                  <Link
                    href={"/"}
                    style={{
                      listStyle: "none",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    onClick={() => {
                      setMenuOpen(false);
                      ulRefA.current.classList.remove("header_hidden_ulRefA");
                    }}
                  >
                    <House size={28} weight="duotone" color="#14a5af" />
                  </Link>
                </li>

                <li
                  className={`${styles.hamburger_li} centerr`}
                  onClick={() => {
                    toggleMenu();
                    ulRefA.current.classList.remove("header_hidden_ulRefA");
                  }}
                >
                  {/* Hamburger/Close icon */}
                  <button className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </button>
                </li>

                <li
                  className={`${styles.bottomHeader_ul_category}`}
                  onClick={() => {
                    // console.log(ulRefA.current.classList.value);
                    if (ulRefA.current.classList.value === "Header_bottomHeader_ul_category_div__flSYL header_hidden_ulRefA") {
                      ulRefA.current.classList.remove("header_hidden_ulRefA");
                    } else {
                      ulRefA.current.classList.add("header_hidden_ulRefA");
                    }
                  }}
                >
                  <User size={28} weight="duotone" color="#14a5af" />

                  <div className={`${styles.bottomHeader_ul_category_div}`} ref={ulRefA}>
                    {
                      xtFlagLogin && (
                        <Link
                          href={"/p-user/profile"}
                          onClick={() => {
                            setMenuOpen(false);
                            setXtFlagSpinnerShow(true);
                          }}
                        >
                          <User size={15} color="#14a5af" />
                          <span>پروفایل من</span>
                        </Link>
                      )
                      // : (
                      //   <Link
                      //     href={"/login"}
                      //     onClick={() => {
                      //       setXtFlagSpinnerShow(true);
                      //       setFlagHamkar(false);
                      //     }}
                      //   >
                      //     <SignIn size={15} color="#14a5af" />
                      //     <span>ورود</span>
                      //   </Link>
                      // )
                    }

                    {!xtFlagLogin && (
                      <Link
                        href={"/register"}
                        onClick={() => {
                          setMenuOpen(false);
                          setXtFlagSpinnerShow(true);
                        }}
                      >
                        <UserCheck size={15} color="#14a5af" />
                        <span>ورود</span>
                      </Link>
                    )}

                    {xtFlagLogin && (
                      <>
                        <Link
                          href={"/p-user/warranty"}
                          onClick={() => {
                            setMenuOpen(false);
                            setXtFlagSpinnerShow(true);
                          }}
                        >
                          <Barcode size={15} color="#14a5af" />
                          <span>گارانتی</span>
                        </Link>

                        <Link
                          href={"/p-user/repairs"}
                          onClick={() => {
                            setMenuOpen(false);
                            setXtFlagSpinnerShow(true);
                          }}
                        >
                          <Wrench size={15} color="#14a5af" />
                          <span>تعمیرات</span>
                        </Link>
                      </>
                    )}

                    <Link
                      href={"/computerparts"}
                      onClick={() => {
                        setMenuOpen(false);
                        setXtFlagSpinnerShow(true);
                      }}
                    >
                      <Laptop size={15} color="#14a5af" />

                      <span style={{ fontSize: "13px" }}>محاسبه گر سیستم </span>
                    </Link>

                    <Link
                      href={"/contactus"}
                      onClick={() => {
                        setMenuOpen(false);
                        setXtFlagSpinnerShow(true);
                      }}
                    >
                      <BuildingApartment size={15} color="#14a5af" />

                      <span>تماس با ما</span>
                    </Link>

                    {xtFlagLogin && (
                      <Link
                        href={"/"}
                        onClick={() => {
                          exitHandler();
                          setMenuOpen(false);
                          setMessageNotification([]);
                          setFlagMessageNotification((prev = !prev));
                        }}
                      >
                        <SignOut size={15} color="#14a5af" />
                        <span>خروج</span>
                      </Link>
                    )}
                  </div>
                </li>

                <li
                  onClick={() => {
                    ulRefA.current.classList.remove("header_hidden_ulRefA");
                  }}
                >
                  {resetFlagCart && (
                    <Link
                      onClick={() => {
                        if (cartCounter != 0) {
                          setXtFlagSpinnerShow(true);
                          setMenuOpen(false);
                        } else {
                          AlertA();
                          setMenuOpen(false);
                        }
                      }}
                      className={`${styles.bottomHeader_ul_category_a} centerr`}
                      href={cartCounter != 0 ? "/basket" : "#"}
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <div className={`${styles.Header_leftSide__div_mobile} centerr`}>
                        {cartCounter != 0 && <span className={`${styles.shopicon_baget_mobile} centerc`}>{cartCounter}</span>}
                      </div>
                      <ShoppingCart size={28} weight="duotone" color="#14a5af" />
                    </Link>
                  )}
                </li>

                <li
                  onClick={() => {
                    setMenuOpen(false);
                    setVisibleB(true);
                    ulRefA.current.classList.remove("header_hidden_ulRefA");
                  }}
                >
                  <MagnifyingGlass size={28} weight="duotone" color="#14a5af" />
                </li>
                <div className={`${styles.sidebar_mobile} `}>
                  <Sidebar visible={visibleB} onHide={() => setVisibleB(false)} fullScreen>
                    <div className={`${styles.Header_rightSide__div_search}  centerc`}>
                      <input className={styles.Header_rightSide__div_search_input} type="text" placeholder="دنبال چی میگردی...؟" value={searchTypeB} onChange={searchChangeB} />
                      <MagnifyingGlass
                        size={24}
                        color="#14a5af"
                        weight="thin"
                        className={styles.magnifyingGlass}
                        onClick={() => {
                          searchBox();
                        }}
                      />

                      {flagSearch && (
                        <div className={`${styles.Header_rightSide__div_searchbox} `}>
                          {/* <span><XCircle size={24} onClick={() => {
                      setFlagSearch(false)
                      setSearchTypeB('')
                    }} 
                    /></span> */}
                          {searchBoxArr.itemList?.length != 0
                            ? searchBoxArr.itemList?.map((item) => {
                              if (item.cyCategoryId) {
                                return (
                                  <Link
                                    href={`/product/${item.id}`}
                                    onClick={() => {
                                      setFlagSearch(false);
                                      setSearchBoxArr([]);
                                      setSearchTypeB("");
                                      setXtFlagSpinnerShow(true);
                                      setVisibleB(false);
                                    }}
                                  >
                                    <div className={`${styles.Header_rightSide__div_searchbox_div} centerr `}>
                                      <span>{item.name}</span>
                                      <img src={item.smallImage} alt={item.name} />
                                    </div>
                                  </Link>
                                );
                              }
                            })
                            : ""}
                        </div>
                      )}
                    </div>
                  </Sidebar>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
