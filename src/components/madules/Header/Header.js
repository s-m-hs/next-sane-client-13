"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import {
  MagnifyingGlass,
  BuildingApartment,
  UserCheck,
  SignOut,
  Wrench,
  ShoppingCart,
  User,
  House,
  UserCircleGear,
  ChatCircleText,
  ExclamationMark,
  Laptop,
  HandPointing,
  Heart,
  Headset,
  Truck,
  List,
  CaretDown,
  InstagramLogo,
  TelegramLogo,
} from "@phosphor-icons/react";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import { MainContext } from "@/context/MainContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import alertN from "@/utils/Alert/AlertA";
import { Modal } from "react-bootstrap";
import { DotLoader } from "react-spinners";
import CardA from "../Cards/CardA/CardA";
import LogOut from "@/utils/Functions/LogOut";
import requstedCouponSetToFalse from "@/utils/Functions/requstedCouponSetToFalse";
import SwiperA from "@/components/templatess/Home/SwiperA/SwiperA";

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
    flagThem,
    messageNotification,
    setMessageNotification,
    flagMessageNotification,
    setFlagMessageNotification,
    setFlagHamkar,
    setOffer,
    resetFlagCart,
    setResetFlagCart,
    couponState,
    coupon,
    setCoupon,
    setCouponState,
    searchInput,
    setSearchInput,
    setSearchResult,
    setFlagSearchInHeader,
  } = useContext(MainContext);
  const ulRefA = useRef();
  const pathname = usePathname();
  const rout = useRouter();
  const [valeS, setValue] = useState(1);
  const [mainCategory, setMainCategory] = useState({});
  const [mainCategoryB, setMainCategoryB] = useState({});
  const [fixTop, setFixTop] = useState(false);
  const [flagCateMobile, setFlagCateMobile] = useState(true);
  const [show, setShow] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [flagSearch, setFlagSearch] = useState(false);
  const [offBanner, setOffBanner] = useState([]);
  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const AlertA = () => alertN("center", "info", "محصولی در سبد خرید شما موجود نیست...", 1500);
  const AlertB = () =>
    alertN("center", "info", "برای دسترسی به پنل کاربری ابتدا با شماره همراه خود لاگین کنید !!!...", 1500);
  const AlertC = () =>
    alertN(
      "center",
      "info",
      "برای تبادل پیام وارتباط با قسمتهای مختلف فروشگاه لطفا با حساب کاربری خود وارد شوید ",
      3000
    );

  /////////////////////////////theming
  const getOffer = () => {

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOffers`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setOffer(result[0]);
          });
        }
      });
    }
    myApp();
    // async function myApp() {
    //   const res = await fetch(`${apiUrl}/api/CyKeyDatas/13`, {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((res) => {
    //     if (res.ok) {
    //       return res.json().then((result) => {
    //         setOffer(Number(result.value));
    //       });
    //     }
    //   });
    // }
    // myApp();
  };
  const getAllTicket = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyTicket/getUserTickets`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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

  useEffect(() => {
    getAllTicket();
  }, [flagMessageNotification, xtFlagLogin]);

  useEffect(() => {
    if (flagThem) {
      document.documentElement.style.setProperty("--white1ffffff", "#393939");
      document.documentElement.style.setProperty("--white1ffffff2", "#464646");
      document.documentElement.style.setProperty("--gray3", "#9b9b9b");
      document.documentElement.style.setProperty("--white2", "#d6d6d6");
      document.documentElement.style.setProperty("--black0", "#ffffff");
      document.documentElement.style.setProperty("--black33b4359", "#ffffff");
      document.documentElement.style.setProperty("--yellow", "#ffebcd");
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
    setSearchInput(e.target.value);
  };

  const submitSearch = () => {
    setSearchResult([]);
    if (searchInput.length == 0) return rout.push("/");
    setFlagSearchInHeader(true);
    setXtFlagSpinnerShow(true);
    rout.push(`/search/${searchInput}`);
  };

  ////////////////////////////
  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 120) {
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
    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/Customer/GetProfile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    }
    myAppGet();
  };

  useEffect(() => {
    const chekKey2 = (e) => {
      if (e.keyCode == 13 && searchInput && searchInput.length > 0 && !pathname.includes("/search")) {
        submitSearch();
      } else if (e.keyCode == 27 && show) {
        setShow(false);
      }
    };
    window.addEventListener("keydown", chekKey2);
    return () => window.removeEventListener("keydown", chekKey2);
  });

  useEffect(() => {
    if (xtFlagLogin) {
      getProfile();
      requstedCouponSetToFalse();
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
  ////////////////////////////
  useEffect(() => {
    getCategoryById(3);
    getCategoryById(2);
  }, []);

  // useEffect(() => {
  //   ////to set offer :if couponState is false, get offer from value by admin
  //   if (!couponState) {
  //     getOffer();
  //   } else if (couponState) {
  //     const discount = coupon?.discountAmount;
  //     setOffer(discount);
  //   }
  // }, [couponState]);

  useEffect(() => {
    ///// to check if couponState is false, isRequested state set to false and coupon not set untile user want(this is when user onclick coupon button on basketdetail-page)
    // if (!pathname.includes("basket")) {
    //   if (couponState) {
    //     getOffer();
    //     setCouponState(false);
    //     setCoupon(null);
    //   }
    // }
    getOffer();
  }, [pathname]);


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
          <DotLoader color={`var(--sd-primary)`} size="280px" speedMultiplier={1} />
        </div>
      )}

      {/* ================= DESKTOP HEADER ================= */}
      <section className={`${styles.A} ${fixTop ? styles.A_fixed : ""}`}>
        {/* announcement strip */}
        <div className={styles.topbar}>
          <div className={`container ${styles.topbar_inner}`}>
            <div className={styles.topbar_right}>
              <span className={styles.topbar_item}>
                <Truck size={16} weight="duotone" /> ارسال سریع به سراسر کشور
              </span>
              <span className={styles.topbar_sep}></span>
              <span className={styles.topbar_item}>
                <Headset size={16} weight="duotone" /> پشتیبانی: 37835456-025
              </span>
            </div>
            <div className={styles.topbar_left}>
              <Link href={"https://eitaa.com/sane_camputer"} title="ایتا" className={styles.topbar_social}>
                <img src="/images/eitaa-icon-colorful.png" alt="eitaa" />
              </Link>
              <Link href={"https://t.me/sane_camputer"} title="تلگرام" className={styles.topbar_social}>
                <TelegramLogo size={15} weight="duotone" />
              </Link>
              <Link href={"https://instagram.com/it_sane"} title="اینستاگرام" className={styles.topbar_social}>
                <InstagramLogo size={15} weight="duotone" />
              </Link>
            </div>
          </div>
        </div>

        {/* main bar */}
        <div className={styles.mainbar}>
          <div className={`container ${styles.mainbar_inner}`}>
            {/* logo */}
            <Link href={"/"} className={styles.brand}>
              <div style={{ width: "135px", height: "105px" }}>
                <SwiperA />
              </div>
              {/* <img className={styles.brand_logo} src="/images/photo_2024-05-30_19-08-29.jpg" alt="کامپیوترصانع" /> */}
              <span className={styles.brand_text}>
                <span className={styles.brand_name}>کامپیوترصانع</span>
                <span className={styles.brand_tagline}>فروشگاه تخصصی کامپیوتر و دیجیتال</span>
              </span>
            </Link>

            {/* search */}
            <div className={styles.search}>
              <MagnifyingGlass size={22} weight="duotone" className={styles.search_icon} />
              <input
                className={styles.search_input}
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchInput}
                onChange={searchChange}
              />
              <button className={styles.search_btn} onClick={submitSearch}>
                جستجو
              </button>
            </div>

            {/* actions */}
            <div className={styles.actions}>
              {/* account */}
              {xtFlagLogin && name !== "SaneUser" && (
                <span className={styles.account_name}>{name?.toUpperCase()}</span>
              )}
              <div className={styles.account}>
                <Link
                  href={!xtFlagLogin ? "/register" : "/p-user/profile"}
                  className={styles.icon_btn}
                  title={!xtFlagLogin ? "ورود / ثبت‌نام" : "پنل کاربری"}
                  onClick={() => setXtFlagSpinnerShow(true)}
                >
                  {userSrc ? (
                    <img src={userSrc} alt="user-profile" className={styles.icon_btn_img} />
                  ) : !xtFlagLogin ? (
                    <User size={22} weight="duotone" />
                  ) : (
                    <UserCircleGear size={22} weight="duotone" />
                  )}
                </Link>

                {xtFlagLogin && (
                  <div className={styles.account_menu}>
                    <Link href="/p-user/profile" onClick={() => setXtFlagSpinnerShow(true)}>
                      <UserCircleGear size={16} weight="duotone" /> پنل کاربری
                    </Link>
                    <Link href="/p-user/order" onClick={() => setXtFlagSpinnerShow(true)}>
                      <Truck size={16} weight="duotone" /> پیگیری سفارش
                    </Link>
                    <button
                      onClick={() => {
                        exitHandler();
                        setMessageNotification([]);
                        setFlagMessageNotification((prev) => !prev);
                      }}
                    >
                      <SignOut size={16} weight="duotone" /> خروج
                    </button>
                  </div>
                )}
              </div>

              {/* favorites */}
              <Link href={"/favorite"} className={styles.icon_btn} title="علاقه‌مندی‌ها" onClick={() => setXtFlagSpinnerShow(true)}>
                <Heart size={22} weight="duotone" />
              </Link>

              {/* chat */}
              {xtFlagLogin ? (
                <Link href={"/p-user/ticket"} className={styles.icon_btn} title="پیام‌ها" onClick={() => setXtFlagSpinnerShow(true)}>
                  <ChatCircleText size={22} weight="duotone" />
                  {messageNotification?.filter((filter) => filter.status == 1)?.length != 0 && (
                    <span className={`${styles.badge} ${styles.badge_chat}`}>!</span>
                  )}
                </Link>
              ) : (
                <div className={styles.icon_btn} title="پیام‌ها" onClick={AlertC}>
                  <ChatCircleText size={22} weight="duotone" />
                </div>
              )}

              {/* cart */}
              {resetFlagCart && (
                <Link href={cartCounter != 0 ? "/basket" : "#"} className={styles.icon_btn} title="سبد خرید">
                  <ShoppingCart size={22} weight="duotone" />
                  {cartCounter !== 0 && <span className={`${styles.badge} ${styles.badge_cart}`}>{cartCounter}</span>}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* navbar */}
        <div className={styles.navbar}>
          <div className={`container ${styles.navbar_inner}`}>
            <ul className={styles.navlist}>
              <li>
                <Link href={"/"} className={styles.navlink}>
                  <House size={16} weight="duotone" /> خانه
                </Link>
              </li>

              <li className={styles.has_mega}>
                <span className={styles.navlink}>
                  <List size={16} weight="duotone" /> دسته‌بندی‌ها <CaretDown size={12} weight="bold" />
                </span>
                <div className={styles.mega}>
                  <div className={`container ${styles.mega_inner}`}>
                    <div className={styles.mega_tabs}>
                      <button
                        onMouseEnter={() => setValue(1)}
                        className={valeS == 1 ? styles.mega_tab_active : styles.mega_tab}
                      >
                        لوازم جانبی
                      </button>
                      <button
                        onMouseEnter={() => setValue(2)}
                        className={valeS == 2 ? styles.mega_tab_active : styles.mega_tab}
                      >
                        سخت افزار
                      </button>
                    </div>
                    <div className={valeS == 1 ? `${styles.mega_grid} ${styles.mega_show}` : styles.mega_hidden}>
                      {valeS == 1 &&
                        mainCategory.childs?.map((item, index) => (
                          <Link
                            key={index}
                            onClick={() => setXtFlagSpinnerShow(true)}
                            href={`/category/${item.id}`}
                            className={styles.mega_item}
                          >
                            <img src={item.imageUrl} alt={item.name || "Category image"} />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                    </div>
                    <div className={valeS == 2 ? `${styles.mega_grid} ${styles.mega_show}` : styles.mega_hidden}>
                      {valeS == 2 &&
                        mainCategoryB.childs?.map((item, index) => (
                          <Link
                            key={index}
                            onClick={() => setXtFlagSpinnerShow(true)}
                            href={`/category/${item.id}`}
                            className={styles.mega_item}
                          >
                            <img src={item.imageUrl} alt={item.name || "Category image"} />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link href={"/computers"} className={styles.navlink} onClick={() => setXtFlagSpinnerShow(true)}>
                  <Laptop size={16} weight="duotone" /> سیستم‌های اسمبل‌شده
                </Link>
              </li>

              {xtFlagLogin && (
                <li className={styles.has_dropdown}>
                  <span className={styles.navlink}>
                    <Wrench size={16} weight="duotone" /> خدمات <CaretDown size={12} weight="bold" />
                  </span>
                  <div className={styles.dropdown}>
                    <Link href={"/p-user/warranty"} onClick={() => setXtFlagSpinnerShow(true)}>
                      گارانتی
                    </Link>
                    <Link href={"/p-user/repairs"} onClick={() => setXtFlagSpinnerShow(true)}>
                      تعمیرات
                    </Link>
                  </div>
                </li>
              )}

              {!xtFlagLogin ? (
                <li>
                  <Link href={"/register"} className={styles.navlink} onClick={() => setXtFlagSpinnerShow(true)}>
                    <UserCheck size={16} weight="duotone" /> ورود
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={"/p-user/profile"} className={styles.navlink} onClick={() => setXtFlagSpinnerShow(true)}>
                    <User size={16} weight="duotone" /> پنل کاربری
                  </Link>
                </li>
              )}

              <li>
                <Link href={"/contactus"} className={styles.navlink} onClick={() => setXtFlagSpinnerShow(true)}>
                  <BuildingApartment size={16} weight="duotone" /> تماس با ما
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= MOBILE HEADER ================= */}
      <section className={styles.B} >
        <div className="container">
          <div className={`${styles.mobi_header} row  centerr`}>
            <Link href={"/"}>
              <img src="/images/Sane_Logo_Purple.jpg" alt="logo" />
              {/* <img src="/images/photo_2024-05-30_19-08-29.jpg" alt="logo" /> */}
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
                    <UserCircleGear size={35} color={`var(--them)`} weight="duotone" />
                  </span>
                </Link>
              )}

              {xtFlagLogin ? (
                <Link href={"/p-user/ticket"} onClick={() => setXtFlagSpinnerShow(true)}>
                  <ChatCircleText size={30} color={`var(--them)`} weight="duotone" className={styles.sphere} />
                  {
                    messageNotification?.filter((filter) => filter.status == 1)?.length != 0 && (
                      <ExclamationMark size={28} weight="bold" className={`${styles.shopicon_bagetB} centerc`} />
                    )
                  }
                </Link>
              ) : (
                <ChatCircleText
                  size={30}
                  color={`var(--them)`}
                  weight="duotone"
                  className={styles.sphere}
                  onClick={() => {
                    AlertC();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* mobile dropdown menu */}
      <section className={styles.D}>
        {isMenuOpen && (
          <div className="dropdownMenu">
            <div className={` container centerr ${styles.mobile_dropdownMenu_li}`}>
              <div className={`row ${styles.ishover}`}>
                <div className="col-12">
                  <div>
                    <button
                      className={!flagCateMobile ? `btn btn-secondary ${styles.rightside_button_cate_mob}` : `btn btn-secondary ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(true)}
                    >
                      لوازم جانبی
                    </button>
                    <button
                      className={flagCateMobile ? `btn btn-secondary  ${styles.rightside_button_cate_mob}` : `btn btn-secondary ${styles.active_button_header}`}
                      onClick={() => setFlagCateMobile(false)}
                    >
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
          </div>
        )}
      </section>

      {/* mobile bottom bar */}
      <section className={styles.C}>
        <div className={`container left-0 ${styles.C_Contaner} `}>
          <div className={`${styles.mobi_bottomHeader} row`}>
            <div className="col">
              <ul className={`${styles.bottomHeader_ul} centerr `}>
                <li className={styles.hamburger_li}>
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
                    <House size={28} weight="duotone" color={`var(--sd-primary)`} />
                  </Link>
                </li>

                <li
                  className={`${styles.hamburger_li} centerr`}
                  onClick={() => {
                    toggleMenu();
                    ulRefA.current.classList.remove("header_hidden_ulRefA");
                  }}
                >
                  <button className={`hamburger ${isMenuOpen ? "open" : ""}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </button>
                </li>

                <li
                  className={`${styles.bottomHeader_ul_category}`}
                  onClick={() => {
                    if (ulRefA.current.classList.value.includes("header_hidden_ulRefA")) {
                      ulRefA.current.classList.remove("header_hidden_ulRefA");
                    } else {
                      ulRefA.current.classList.add("header_hidden_ulRefA");
                    }
                  }}
                >
                  <User size={28} weight="duotone" color={`var(--sd-primary)`} />

                  <div className={`${styles.bottomHeader_ul_category_div}`} ref={ulRefA}>
                    {xtFlagLogin && (
                      <>
                        <Link
                          href={"/p-user/profile"}
                          onClick={() => {
                            setMenuOpen(false);
                            setXtFlagSpinnerShow(true);
                          }}
                        >
                          <User size={15} color={`var(--sd-primary)`} />
                          <span>پروفایل من</span>
                        </Link>

                        <Link
                          href={"/p-user/order"}
                          onClick={() => {
                            setMenuOpen(false);
                            setXtFlagSpinnerShow(true);
                          }}
                        >
                          <ShoppingCart size={15} color={`var(--sd-primary)`} />
                          <span>پیگری سفارش</span>
                        </Link>
                      </>
                    )}

                    {!xtFlagLogin && (
                      <Link
                        href={"/register"}
                        onClick={() => {
                          setMenuOpen(false);
                          setXtFlagSpinnerShow(true);
                        }}
                      >
                        <UserCheck size={15} color={`var(--sd-primary)`} />
                        <span>ورود</span>
                      </Link>
                    )}

                    {xtFlagLogin && (
                      <Link
                        href={"/favorite"}
                        onClick={() => {
                          setMenuOpen(false);
                          setXtFlagSpinnerShow(true);
                        }}
                      >
                        <Heart size={15} color={`var(--sd-primary)`} />
                        <span>علاقه مندی ها</span>
                      </Link>
                    )}

                    <Link
                      href={"/contactus"}
                      onClick={() => {
                        setMenuOpen(false);
                        setXtFlagSpinnerShow(true);
                      }}
                    >
                      <BuildingApartment size={15} color={`var(--sd-primary)`} />
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
                        <SignOut size={15} color={`var(--sd-primary)`} />
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
                      <ShoppingCart size={28} weight="duotone" color={`var(--sd-primary)`} />
                    </Link>
                  )}
                </li>

                <li className={styles.hamburger_li}>
                  <Link
                    href={"/computers"}
                    style={{
                      listStyle: "none",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    onClick={() => {
                      setMenuOpen(false);
                      setXtFlagSpinnerShow(true);
                      ulRefA.current.classList.remove("header_hidden_ulRefA");
                    }}
                  >
                    <Laptop size={28} weight="duotone" color={`var(--sd-primary)`} />
                  </Link>
                </li>

                <li
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <MagnifyingGlass size={28} weight="duotone" color={`var(--sd-primary)`} />
                </li>
                <div className={`${styles.sidebar_mobile} `}>
                  <Modal show={show} onHide={() => setShow(false)} fullScreen>
                    <Modal.Header closeButton className={`${styles.modal_header}`}></Modal.Header>
                    <div className={`${styles.Header_rightSide__div_search}  centerc`}>
                      <input
                        className={styles.Header_rightSide__div_search_input}
                        type="text"
                        placeholder="دنبال چی میگردی...؟"
                        value={searchInput}
                        onChange={searchChange}
                      />
                      <button
                        className={`btn btn-light ${styles.magnifyingGlassB}`}
                        onClick={() => {
                          setSearchResult([]);
                          if (searchInput.length == 0) return rout.push("/");
                          setFlagSearchInHeader(true);
                          setXtFlagSpinnerShow(true);
                          setShow(false);
                          rout.push(`/search/${searchInput}`);
                        }}
                      >
                        جستجو
                        <HandPointing style={{ fontSize: "18px" }} />
                      </button>
                    </div>
                  </Modal>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
