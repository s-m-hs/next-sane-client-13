"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css"
import SwiperA from "@/components/templatess/Home/SwiperA/SwiperA";
import { MagnifyingGlass, Phone,SignIn,BuildingApartment,Barcode,UserCheck, SignOut,Wrench,Fingerprint ,ShoppingCart, User, EnvelopeSimple, House,TextIndent , XCircle } from "@phosphor-icons/react";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import { MainContext } from "@/context/MainContext";
import Dropdown from 'react-bootstrap/Dropdown';
import { DotLoader, PuffLoader } from "react-spinners";
import Link from "next/link";
import { useRouter } from "next/navigation";
import alertN from "@/utils/Alert/AlertA";
import { Modal, Tooltip } from "react-bootstrap";
import CardA from "../Cards/CardA/CardA";
// import { motion , useScroll,AnimatePresence} from "framer-motion"






export default function Header() {
  const [valeS, setValue] = useState(1);
  const [mainCategory, setMainCategory] = useState({});
  const [mainCategoryB, setMainCategoryB] = useState({});
  const [fixTop, setFixTop] = useState(false)
  const [flaga, setFlaga] = useState(true)
  const [flagCateMobile,setFlagCateMobile]=useState(true)
  const ulRef = useRef()
  const ulRefA = useRef()

  console.log(ulRefA.current);
  // const getLocalStorage = localStorage.getItem('loginToken')
  // const getLocalStorageUser = localStorage.getItem('user')
  const [userName, setUserName] = useState('')
  const [flag, setFlag] = useState(false)

  // const { scrollYProgress } = useScroll()

  const [isMenuOpen, setMenuOpen] = useState(false);

  const [searchType, setSearchType] = useState('')
  const [searchBoxArr, setSearchBoxArr] = useState([])
  const [flagSearch, setFlagSearch] = useState(false)

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  let { xtFlagLogin, setXtFlagLogin, xtflagSpinnerShow, setXtFlagSpinnerShow, cartCounter, setCartCounter, localToken } = useContext(MainContext)
  const rout = useRouter()
  const AlertA = () => alertN('center', 'info', "محصولی در سبد خرید شما موجود نیست...", 1500);

  /////////////////////////////////
  const searchChange = (e) => {
    setSearchType(e.target.value)

  }
  const searchBox = () => {
    const getLocalStorage = localStorage.getItem('loginToken')
    setFlagSearch(false)
    async function myApp() {
      let obj = {
        name: searchType,
        productCategoryCode: null,
        productCategoryId: null,
        categoryCode: null,
        manufacturerName: null,
        pageNumber: 0,
        pageSize: 1000
      }
      console.log(obj)
      const res = await fetch(`${apiUrl}/api/CyProducts/SearchProducts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          return res.json()
        }
      }).then(result => {
        if (result) {
          setFlagSearch(true)
          setSearchBoxArr(result)
        } else {
          setFlagSearch(false)
        }
        //   console.log(result)
      })
    }
    myApp()
  }
  console.log(searchBoxArr)
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
    }

    window.addEventListener('scroll', fixNavbarToTop)

    return () => window.removeEventListener('scroll', fixNavbarToTop)
  }, [])

  const exitHandler = () => {
    localStorage.removeItem('loginToken')
    setXtFlagLogin(false)
    setCartCounter(0)
    rout.push('/')
    console.log('object')
  }

  ///////////////////////////////
  const getProfile = () => {
    const getLocalStorage = localStorage.getItem('loginToken')
    const getLocalStorageUser = localStorage.getItem('user')


    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/Customer/GetProfile`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalStorage}`,
        }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          setUserName(getLocalStorageUser)
          setFlag(true)
          setXtFlagLogin(true)

        }
      })
    }
    myAppGet()
  }

  useEffect(()=>{
    const chekKey2=(e)=>{
      console.log(e)
      if(e.keyCode==13 && searchType!==''){
        searchBox()
      }else if(e.keyCode==27 && flagSearch){
setFlagSearch(false)
setSearchType('')
      }

    }
    window.addEventListener('keydown',chekKey2)
    return()=>window.removeEventListener('keydown',chekKey2)
  })

  useEffect(() => {
    getProfile()
  }, [userName, xtFlagLogin])
  /////////////////////////////////
  const getCategoryById = (id) => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: id,
      str: "string",
    };
    if(id==3){
      postApi('/api/CyProductCategory/GetItemWChildAndRoot', obj, setMainCategory)
    }else if(id==2){
      postApi('/api/CyProductCategory/GetItemWChildAndRoot', obj, setMainCategoryB)

    }
    

  };

  ////////////////////////////
  useEffect(() => {
    getCategoryById(3);
    getCategoryById(2);
  }, []);

  const onmousHandle = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    }
  };

  return (
    <>
 {xtflagSpinnerShow && 
 <div className={`${styles.DotLoader_div}`}><DotLoader
className={`${styles.DotLoader}`}
    color="rgba(25, 165, 175)"
    size='280px'
    speedMultiplier={1}
  />
   </div>
  }




      <section className={styles.A}>

        {!fixTop ?

          <div className={`container ${styles.Header}`}>





            <div className={`row ${styles.Header_top} centerr`}>

              <div className={`col col-md-8 ${styles.Header_rightSide} centerr`}>
                <div className={styles.Header_rightSide__div_img}>
                  <div style={{ width: "135px", height: "105px" }}>
                    <SwiperA />
                  </div>
                </div>

                <div className={`${styles.Header_rightSide__div_search}  centerc`}>
                  <input
                    className={styles.Header_rightSide__div_search_input}
                    type="text"
                    placeholder="دنبال چی میگردی...؟"
                    value={searchType}
                    onChange={searchChange}
                  />
                  <MagnifyingGlass size={24} color="#14a5af" weight="thin" className={styles.magnifyingGlass}
                    onClick={() => { searchBox() }} />
                  {flagSearch && <div className={`${styles.Header_rightSide__div_searchbox} `} >
                    <span><XCircle size={24} onClick={() => {
                      setFlagSearch(false)
                      setSearchType('')
                      }} /></span>
                    {searchBoxArr.itemList?.length != 0 ? searchBoxArr.itemList?.map(item => (
                      <Link href={`/product/${item.id}`} onClick={()=>setXtFlagSpinnerShow(true)}
> 
                       <div className={`${styles.Header_rightSide__div_searchbox_div} centerr `} >
                        <span>{item.name}</span>
                        <img src={item.smallImage} alt="" />
                      </div>
                      </Link>
                    
                    )) : ''}



                  </div>}

                </div>
                {/* </div> */}

              </div>

              <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>

                {xtFlagLogin &&


                  <>
                    <Dropdown className={styles.user_button}>
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        <span className={styles.user_span}>{userName.toUpperCase()}</span>      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="/p-user/profile"
                          onClick={() => setXtFlagSpinnerShow(true)}>پنل کاربری </Dropdown.Item>
                        <Dropdown.Item onClick={exitHandler}>خروج</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>

                }
                <Link href={!xtFlagLogin ? '/login' : '/p-user/profile'}>
                  <div
                    onClick={() => setXtFlagSpinnerShow(true)}
                    className={`${styles.Header_leftSide__div} centerr`}  >
                    <User size={24} color="#14a5af" />
                    {!xtFlagLogin ?
                      <span className={`${styles.Header_leftSide__div_span} `} >وارد حساب کاربری خود شوید...</span> :
                      <span className={`${styles.Header_leftSide__div_span} `} >وارد پنل کاربری خود شوید...</span>}
                  </div>
                </Link>


                <Link href={cartCounter != 0 ? '/basket' : '#'}  >
                  <div
                    onClick={() => {
                      if (cartCounter != 0) {
                        setXtFlagSpinnerShow(true)
                      } else {
                        AlertA()
                      }


                    }}
                    className={`${styles.Header_leftSide__div} centerr`}>
                    <ShoppingCart size={24} color="#14a5af" />
                    {cartCounter != 0 && <span className={`${styles.shopicon_baget} centerc`} >{cartCounter}</span>}
                  </div>
                </Link>

                <div className={` ${styles.Header_leftSide__div} centerr`}>
                  <EnvelopeSimple size={24} color="#14a5af" />
                </div>




                <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>

                  <span>02191005457</span>
                  <Phone size={24} color="#ededed" weight="duotone" />
                </div>





              </div>

            </div>

            <div className={`row  ${styles.header_bottom} `}  >
              <div className={`col ${styles.header_bottom__col}`}  >

                <ul className={`${styles.header_bottom__col__ul} centerr`}  >
                  <li   onClick={() => setXtFlagSpinnerShow(true)}
                  > <Link href={'/'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} > خانه</Link> </li>


                  <li className="nav_link arrow_icon"  >

                    دسته بندی ها
                    <ul className={`${styles.header_bottom__col__ul__ul} centerc`}
                      ref={ulRef}
                    >
                      <li
                        value={1}
                        onMouseEnter={onmousHandle}
                        className={valeS == 1 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
                        لوازم جانبی
                        <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div
                            className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}
                          >
                            {mainCategory.childs?.length &&
                              mainCategory.childs.map((item, index) => (
                                <Link
                                  key={index}
                                  onClick={()=>setXtFlagSpinnerShow(true)}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                                >
                                  <img src={item.imageUrl} alt={item.name || 'Category image'} />
                                  {item.name}
                                </Link>

                              ))}
                          </div>
                        </div>
                      </li>

                      <li
                        value={2}
                        onMouseEnter={onmousHandle}
                        className={(valeS == 2 && flaga) ? `${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
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
                                  onClick={()=>setXtFlagSpinnerShow(true)}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                                >
                                  <img src={item.imageUrl} alt={item.name || 'Category image'} />
                                  {item.name}
                                </Link>

                              ))}
                          </div>
                        </div>
                      </li>


                      <li
                        value={6}
                        onMouseEnter={onmousHandle}
                        className={valeS == 6 ? `${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
                        لپ تاپ
                        <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}  >
                          <div
                            className={valeS == 6 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}

                          // className={valeS == 6 ? "row-cols-4 ishover" : " nohover"}
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
                      </li>
                    </ul>



                  </li>
                  {/* <li className="nav_link">فروش اقساط   </li> */}

                  <li className="nav_link arrow_icon" >خدمات
                    <ul className={`${styles.header_bottom__col__ul__ul_service} centerc`}>


                      <Link
                       href={'/p-user/warranty'}>
                        <li
                      onClick={() => setXtFlagSpinnerShow(true)}
                          value={11}
                          onMouseEnter={onmousHandle}
                          className={valeS == 11 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                        >گارانتی</li></Link>



                      <Link href={'/p-user/repairs'}>
                        <li                   
                          onClick={() => setXtFlagSpinnerShow(true)}
                          value={12}
                          onMouseEnter={onmousHandle}
                          className={valeS == 12 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                        >تعمیرات</li></Link>


                    </ul>
                  </li>
                  <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/contactus'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} > تماس با ما</Link> </li>

                  {
                    !xtFlagLogin ? <>
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/login'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >ورود </Link> </li>
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/register'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >عضویت </Link> </li>
                    </> :
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/p-user/profile'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >پنل کاربری </Link> </li>

                  }
                  <li> <Link  href={'/about'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} >درباره ما</Link> </li>

                </ul>
              </div>

              <div className={styles.header_bottom__col_logo}  >
                <Link href={'/'}>
                  <img
                    className={styles.sphere3}
                    src="../../../images/eitaa-icon-colorful.png"
                    alt=""
                  />
                </Link>
                <Link href={'/'}>
                  {" "}
                  <img
                    className={styles.sphere2}
                    src="../../../images/icons8-instagram-2048.png"
                    alt=""
                  />
                </Link>
                <Link href={'/'}>
                  {" "}
                  <img
                    className={styles.sphere}
                    src="../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>

          :


          <div className={`container ${styles.containerfix}`}>
            <div className={`row ${styles.Header_top} centerr`}>

              <div className={`col col-md-8 ${styles.Header_rightSide} centerr`}>
                <div className={styles.Header_rightSide__div_img}>
                  <div style={{ width: "80px", height: "50px" }}>
                    <SwiperA />
                  </div>
                </div>
                <div className={`${styles.Header_rightSide__div_search}  centerc`}>
                  <input
                    className={styles.Header_rightSide__div_search_input}
                    type="text"
                    placeholder="دنبال چی میگردی...؟"
                    value={searchType}
                    onChange={searchChange}
                  />
                  <MagnifyingGlass size={24} color="#14a5af" weight="thin" className={styles.magnifyingGlass}
                    onClick={() => { searchBox() }} />
                  {flagSearch && <div className={`${styles.Header_rightSide__div_searchbox} `} >
                    <span><XCircle size={24} onClick={() => {
                      setFlagSearch(false)
                      setSearchType('')
                      }} /></span>
                    {searchBoxArr.itemList?.length != 0 ? searchBoxArr.itemList?.map(item => (
                      <Link
                      onClick={()=>setXtFlagSpinnerShow(true)}
                      href={`/product/${item.id}`}> 
                       <div className={`${styles.Header_rightSide__div_searchbox_div} centerr `} >
                        <span>{item.name}</span>
                        <img src={item.smallImage} alt="" />
                      </div>
                      </Link>
                    
                    )) : ''}



                  </div>}

                </div>

              </div>

              <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>

                <div className="centerc">

                </div>
                {xtFlagLogin && <span className={styles.user_span}>{userName.toUpperCase()}</span>}

                <Link href={!xtFlagLogin ? '/login' : '/p-user/profile'}>
                  <div
                    onClick={() => setXtFlagSpinnerShow(true)}
                    className={`${styles.Header_leftSide__div} centerr`}  >
                    <User size={24} color="#14a5af" />
                    {!xtFlagLogin ?
                      <span className={`${styles.Header_leftSide__div_span} `} >وارد حساب کاربری خود شوید...</span> :
                      <span className={`${styles.Header_leftSide__div_span} `} >وارد پنل کاربری خود شوید...</span>}
                  </div>
                </Link>

              
                <Link href={cartCounter != 0 ? '/basket' : '#'}  >
                  <div
                    onClick={() => {
                      if (cartCounter != 0) {
                        setXtFlagSpinnerShow(true)
                      } else {
                        AlertA()
                      }


                    }}
                    className={`${styles.Header_leftSide__div} centerr`}>
                    <ShoppingCart size={24} color="#14a5af" />
                    {cartCounter != 0 && <span className={`${styles.shopicon_baget} centerc`} >{cartCounter}</span>}
                  </div>
                </Link>



                <div className={` ${styles.Header_leftSide__div} centerr`}>
                  <EnvelopeSimple size={24} color="#14a5af" />
                </div>


                <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>
                  <span>02191005457</span>
                  <Phone size={24} color="#ededed" weight="duotone" />      </div>


              </div>

            </div>

            <div className={`row  ${styles.header_bottom_fix} `}  >
              <div className={`col ${styles.header_bottom__col}`}  >

                <ul className={`${styles.header_bottom__col__ul_fix} centerr`}  >
                  <li onClick={()=>setXtFlagSpinnerShow(true)}> <Link href={'/'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} > خانه</Link> </li>


                  <li className="nav_link arrow_icon"  >

                    دسته بندی ها
                    <ul className={`${styles.header_bottom__col__ul__ul} centerc`}>
                      <li
                        value={1}
                        onMouseEnter={onmousHandle}
                        className={valeS == 1 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
                        لوازم جانبی
                        <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div
                            className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}`}
                          >
                            {mainCategory.childs?.length &&
                              mainCategory.childs.map((item, index) => (

                                <Link
                                onClick={()=>setXtFlagSpinnerShow(true)}
                                  key={index}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                          
                                >
                                  <img src={item.imageUrl} alt={item.name || 'Category image'} />
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

                      <li
                        value={2}
                        onMouseEnter={onmousHandle}
                        className={(valeS == 2 && flaga) ? `${styles.liiii2_a}` : `${styles.liiii2}`}
                      >
                        سخت افزار
                        <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                          <div
                            className={valeS == 2 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}`}

                          // className={valeS == 2 ? "row-cols-4 ishover" : " nohover"}
                          >
                           {mainCategoryB.childs?.length &&
                              mainCategoryB.childs.map((item, index) => (
                                <Link
                                onClick={()=>setXtFlagSpinnerShow(true)}
                                  key={index}
                                  href={`/category/${item.id}`}
                                  className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                               
                                >
                                  <img src={item.imageUrl} alt={item.name || 'Category image'} />
                                  {item.name}
                                </Link>

                              ))}
                          </div>
                        </div>
                      </li>

                    
                      <li
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
                      </li>
                    </ul>
                  </li>
                  {/* <li className="nav_link">فروش اقساط   </li> */}
                  <li className="nav_link arrow_icon" >خدمات
                    <ul className={`${styles.header_bottom__col__ul__ul_service} centerc`}>


                   <Link
                       href={'/p-user/warranty'}>
                        <li
                      onClick={() => setXtFlagSpinnerShow(true)}
                          value={11}
                          onMouseEnter={onmousHandle}
                          className={valeS == 11 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                        >گارانتی</li></Link>



<Link href={'/p-user/repairs'}>
                        <li                   
                          onClick={() => setXtFlagSpinnerShow(true)}
                          value={12}
                          onMouseEnter={onmousHandle}
                          className={valeS == 12 ? ` ${styles.liiii2_a}` : `${styles.liiii2}`}
                        >تعمیرات</li></Link>




                    </ul>
                  </li>        <li> <Link href={'/contactus'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} > تماس با ما</Link> </li>

                  {
                    !xtFlagLogin ? <>
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/login'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >ورود </Link> </li>
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/register'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >عضویت </Link> </li>
                    </> :
                      <li onClick={() => setXtFlagSpinnerShow(true)}> <Link href={'/p-user/profile'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}
                      >پنل کاربری </Link> </li>

                  }


                  <li> <Link href={'/about'} style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }} >درباره ما</Link> </li>
                </ul>

                <div className={styles.header_bottom__col_logo}  >
                  <Link href={'/'}>
                    <img
                      className={styles.sphere3}
                      src="../../../images/eitaa-icon-colorful.png"
                      alt=""
                    />
                  </Link>
                  <Link href={'/'}>
                    {" "}
                    <img
                      className={styles.sphere2}
                      src="../../../images/icons8-instagram-2048.png"
                      alt=""
                    />
                  </Link>
                  <Link href={'/'}>
                    {" "}
                    <img
                      className={styles.sphere}
                      src="../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png"
                      alt=""
                    />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        }
      </section>



      <section className={styles.B}>
        <div className="container">

          <div className={`${styles.mobi_header} row`}  >
            <img src="images/photo_2024-05-30_19-08-29.jpg" alt="" />

          </div>
        </div>
      </section>

      <section className={styles.D} >
        {isMenuOpen && (
          <div className="dropdownMenu">
            <div className={` container centerr ${styles.mobile_dropdownMenu_li}`}>
              <div
                // className='row-cols-6 '
                className={`row ${styles.ishover}`}
              >
                <div className="col-2">
                             <div>
            <button className={!flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob }`: `btn btn-outline-info ${styles.active_button_header }`} 
            onClick={()=>setFlagCateMobile(true)}
            >              لوازم جانبی 
            </button>
         
            <button className={flagCateMobile ? `btn btn-outline-info ${styles.rightside_button_cate_mob }`: `btn btn-outline-info ${styles.active_button_header }`} 
                        onClick={()=>setFlagCateMobile(false)}

            >              سخت افزار  
            </button>          
</div> 
                   {/* {mainCategory.childs?.length &&
                  mainCategory.childs.map((item, index) => (
                    <Link
                    onClick={()=>setXtFlagSpinnerShow(true)}
                      key={index}
                      href={`/category/${item.id}`}
                      className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                
                    >
                      <img src={item.imageUrl} alt={item.name || 'Category image'} />
                      {item.name}
                    </Link>
                  ))} */}
                  </div>
                <div className="col-10">


{flagCateMobile ?   mainCategory.childs && (
          <div className={`row row-cols-2 ${styles.bcatitem}`}>
            {mainCategory.childs.map((item, index) => (
              <CardA
              // click={clickHandler}
              datos={''}
                key={item.id}
                imgSrc={item.imageUrl}
                category={`category`}
                id={item.id}
                text={item.name
                }
              />
            ))}
          </div>
        )  :  mainCategoryB.childs && (
          <div className={`row row-cols-1 ${styles.bcatitem}`}>
            {mainCategoryB.childs.map((item, index) => (
              <CardA
              // click={clickHandler}
              datos={''}
                key={item.id}
                imgSrc={item.imageUrl}
                category={`category`}
                id={item.id}
                text={item.name
                }
              />
            ))}
          </div>
        ) }



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
        <div className={`container left-0 ${styles.C_Contaner} `} >

          <div className={`${styles.mobi_bottomHeader} row`} >
            <div className="col">


              <ul className={`${styles.bottomHeader_ul} centerr`}>
                <li className={`${styles.hamburger_li}centerr`}>
                  <House size={20} />
                  <Link href={'/'}
                    style={{ listStyle: 'none', textDecoration: 'none', color: 'inherit' }}>خانه
                  </Link>
                </li>

                <li className={`${styles.hamburger_li} centerr`} onClick={toggleMenu}>
                  {/* Hamburger/Close icon */}
                  <button className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </button>
                  محصولات 
                </li>

                <li className={`${styles.bottomHeader_ul_category}`}
                onClick={()=>{
                  console.log(ulRefA.current.classList.value);
if(ulRefA.current.classList.value === 'Header_bottomHeader_ul_category_div__flSYL header_hidden_ulRefA'){
  ulRefA.current.classList.remove('header_hidden_ulRefA')
}else {
  ulRefA.current.classList.add('header_hidden_ulRefA')

}
                   
                }}>
                <TextIndent  size={20} />دسته بندی ها
                
                <div className={`${styles.bottomHeader_ul_category_div}`}
                ref={ulRefA}
                >

                  {xtFlagLogin ?  
                  <Link href={'/p-user/warranty'}>
                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                        پروفایل من</span></Link> :

                        
                        <Link href={'/p-user/warranty'}>
                          <SignIn  size={15} />
                        <span onClick={() => setXtFlagSpinnerShow(true)}
                             
                                > 
                             ورود</span></Link>}


  <Link href={'/p-user/warranty'}>
       <UserCheck  size={15} />
                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                         عضویت</span></Link>

                        <Link href={'/p-user/warranty'}>
                        <Barcode size={15} />
                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                        گارانتی</span></Link>


   <Link href={'/p-user/warranty'}>
   <Wrench size={15} />
                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                        خدمات</span></Link>
  
   <Link href={'/p-user/warranty'}>
   <BuildingApartment size={15} />


                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                        تماس با ما</span></Link>

  
   <Link href={'/p-user/warranty'}>
   <SignOut size={15} />
                  <span onClick={() => setXtFlagSpinnerShow(true)}
                       
                          > 
                        خروج</span></Link>

                </div>
                
                </li>


                <li>
                  <ShoppingCart size={20} />سبدخرید</li>
          


                <li>
                  <MagnifyingGlass size={20} />
                  جسنجو</li>
              </ul>


            </div>
          </div>
        </div>

      </section>
    </>

  );
}