"use client"
import React, { useEffect, useRef, useState} from "react";
import styles from "./Header.module.css"
import Link from "next/link";
import SwiperA from "@/components/templates/Home/SwiperA/SwiperA";
import { MagnifyingGlass,Phone,ShoppingCart,User,EnvelopeSimple} from "@phosphor-icons/react";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";



export default function Header() {
  const [valeS, setValue] = useState(1);
  const [mainCategory, setMainCategory] = useState({});
  const [fixTop,setFixTop]=useState(false)
  const [flaga,setFlaga]=useState(true)
  const ulRef=useRef()
  const getLocalStorage=localStorage.getItem('loginToken')
  const getLocalStorageUser=localStorage.getItem('user')
  const [userName,setUserName]=useState('')
  const [flag,setFlag]=useState(false)

useEffect(()=>{
const fixNavbarToTop=()=>{
  // const currentScroll = window.pageYOffset;
  const currentScroll = window.scrollY;
  if (currentScroll > 105) {
    setFixTop(true);
  } else {
    setFixTop(false);
  }
}

window.addEventListener('scroll',fixNavbarToTop)

return()=>window.removeEventListener('scroll',fixNavbarToTop)
},[])

console.log(getLocalStorageUser);
console.log(userName); 
///////////////////////////////
const getProfile=()=>{
  async function myAppGet(){
    const res=await fetch(`${apiUrl}/api/Customer/GetProfile`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${getLocalStorage}` ,
      }
    }).then(res=>{
      console.log(res);
      if(res.status==200){
        setUserName(getLocalStorageUser)
        setFlag(true) 
      }
    })
  }
  myAppGet()
}
useEffect(()=>{
  getProfile()
},[userName])
/////////////////////////////////
  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: 2,
      str: "string",
    };
    postApi('/api/CyCategories/GetItemWChildAndRoot',obj,setMainCategory)

  };

  ////////////////////////////
  useEffect(() => {
    getCategoryById();
  }, []);

  const onmousHandle = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    }
    console.log(valeS)
  };

  return (

    <>
    {!fixTop ? 

   <div className={`container ${styles.Header}`}>
      <div className={`row ${styles.Header_top } centerr`}>

        <div className={`col col-md-8 ${styles.Header_rightSide} centerr` }>
          <div className={styles.Header_rightSide__div_img}>
            <div style={{ width: "135px", height: "105px" }}>
            <SwiperA/>
            </div>
          </div>
    <div className={`${styles.Header_rightSide__div_search}  centerc`}>
            <input
              className={styles.Header_rightSide__div_search_input}
              type="text"
              placeholder="دنبال چی میگردی...؟"
            />
 <MagnifyingGlass size={24} color="#14a5af" weight="thin" className={styles.magnifyingGlass}/> 
          </div>
{/* </div> */}
        
        </div>

        <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>
          <div className={` ${styles.Header_leftSide__div} centerr`}>
          <ShoppingCart size={24} color="#14a5af" />        </div>
          <div  className= {` ${styles.Header_leftSide__div} centerr`}>
          <EnvelopeSimple size={24} color="#14a5af" />
          </div>
          <div className={`${styles.Header_leftSide__div} centerr`}  >
            {" "}
            {userName ? <span>{userName}</span> :  <User size={24} color="#14a5af" />} 
          </div>

          <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>
            <span>02191005457</span>
            <Phone size={24} color="#ededed" weight="duotone" />      </div>
        </div>

      </div>

      <div className={`row  ${styles.header_bottom} `}  >
        <div className={`col ${styles.header_bottom__col}`}  >

          <ul className={`${styles.header_bottom__col__ul} centerr`}  >
          <li> <Link href={'/'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} > خانه</Link> </li>


            <li className="nav_link arrow_icon"  >

              دسته بندی ها
              <ul className={`${styles.header_bottom__col__ul__ul} centerc`}>
                <li
                  value={1}
                  onMouseEnter={onmousHandle}
                  className={valeS == 1 ?    ` ${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  لوازم جانبی
                  <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul }`}>
                    <div
                      className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}` }
                    >
                      {mainCategory.childs?.length &&
                        mainCategory.childs.map((item, index) => (
                          <Link
                          onClick={()=>{
                            ulRef.current.add.className('ul_hidden')
                          }}
                          key={item.id}
                          href={`/category/${item.id}`}
                            className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                          >
                            <img src={item.imageUrl} alt="" />
                            {item.text}
                          </Link>
                        ))}
                    </div>
                  </div>
                </li>

                <li
                  value={2}
                  onMouseEnter={onmousHandle}
                  className={(valeS == 2 && flaga) ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  سخت افزار
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                    <div
                     className={valeS == 2 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}` }

                      // className={valeS == 2 ? "row-cols-4 ishover" : " nohover"}
                    >
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hard .jpg" alt="" />
                        هارد
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}  >
                        <img src="../../images/hard ext.jpg" alt="" />
                        هارد اکسترنال
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/rom.jpg" alt="" />
                        رم
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}  >
                        <img src="../../images/cpu.jpg" alt="" />
                        سی پی یو
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/main.jpg" alt="" />
                        مادربرد
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/cooler.jpg" alt="" />
                        خنک کننده
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/power.jpg" alt="" />
                        پاور
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2} >
                        <img src="../../images/kase.jpg" alt="" />
                        کیس
                      </Link>
                    </div>
                  </div>
                </li>
                <li
                  value={4}
                  onMouseEnter={onmousHandle}
                  className={valeS == 4 ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  {" "}
                  مبدل ها
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`} >
                    <div
                     className={valeS == 4 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}` }

                      // className={valeS == 4 ? "row-cols-4 ishover" : " nohover"}
                    >
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/pci.jpg" alt="" />
                        کارت ها
                      </Link>
                      <Link   href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/vga.jpg" alt="" />
                        VGA
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hdmi.jpg" alt="" />
                        HTMI
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/display.jpg" alt="" />
                        DISPLAY PORT
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/sound.jpg" alt="" />
                        SOUND
                      </Link>
                    </div>
                  </div>
                </li>
                <li
                  value={6}
                  onMouseEnter={onmousHandle}
                  className={valeS == 6 ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  لپ تاپ
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}  >
                    <div
                      className={valeS == 6 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}` }

                      // className={valeS == 6 ? "row-cols-4 ishover" : " nohover"}
                    >
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/asus.jpg" alt="" />
                        ASUS
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/lenovo.jpg" alt="" />
                        LENOVO
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hp.jpg" alt="" />
                        HP
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/acer.jpg" alt="" />
                        ACER
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/microsoft.jpg" alt="" />
                        MICROSOFT
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="nav_link">فروش اقساط   </li>
            <li>خدمات</li>
            <li> <Link href={'/'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} > تماس با ما</Link> </li>
            <li> <Link href={'/about'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} >درباره ما</Link> </li>
            <li> <Link href={'/'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} >ورود </Link> </li>
            <li> <Link href={'/register'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} >عضویت </Link> </li>
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
    </div>   :

 
    <div className={`container ${styles.containerfix}`}>
      <div className={`row ${styles.Header_top } centerr`}>

        <div className={`col col-md-8 ${styles.Header_rightSide} centerr` }>
          <div className={styles.Header_rightSide__div_img}>
            <div style={{ width: "80px", height: "50px" }}>
            <SwiperA/>
            </div>
          </div>
    <div className={`${styles.Header_rightSide__div_search}  centerc`}>
            <input
              className={styles.Header_rightSide__div_search_input}
              type="text"
              placeholder="دنبال چی میگردی...؟"
            />
 <MagnifyingGlass size={24} color="#14a5af" weight="thin" className={styles.magnifyingGlass}/> 
          </div>
        
        </div>

        <div className={`col col-md-4 ${styles.Header_leftSide} centerr`}>
          <div className={` ${styles.Header_leftSide__div} centerr`}>
          <ShoppingCart size={24} color="#14a5af" />        </div>
          <div  className= {` ${styles.Header_leftSide__div} centerr`}>
          <EnvelopeSimple size={24} color="#14a5af" />
          </div>
          <div className={`${styles.Header_leftSide__div} centerr`}  >
            {" "}
            {userName ? <h1>'username'</h1> :  <User size={24} color="#14a5af" />} 
          </div>

          <div className={`col-lg-4 ${styles.Header_leftSide__number_div} centerr`}>
            <span>02191005457</span>
            <Phone size={24} color="#ededed" weight="duotone" />      </div>
        </div>

      </div>

      <div className={`row  ${styles.header_bottom_fix} `}  >
        <div className={`col ${styles.header_bottom__col}`}  >

          <ul className={`${styles.header_bottom__col__ul_fix} centerr`}  >
          <li> <Link href={'/'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} > خانه</Link> </li>


            <li className="nav_link arrow_icon"  >

              دسته بندی ها
              <ul className={`${styles.header_bottom__col__ul__ul} centerc`}>
                <li
                  value={1}
                  onMouseEnter={onmousHandle}
                  className={valeS == 1 ?    ` ${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  لوازم جانبی
                  <div className={` container centerr ${styles.header_bottom__col__ul__ul__ul }`}>
                    <div
                      className={valeS == 1 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}` }
                    >
                      {mainCategory.childs?.length &&
                        mainCategory.childs.map((item, index) => (
                          <Link key={index}
                          onClick={()=>{
                            ulRef.current.add.className('ul_hidden')
                          }}
                          href={`/category/${item.id}`}
                            className={`${styles.header_bottom__col__ul__ul__ul__link2}`}
                          >
                            <img src={item.imageUrl} alt="" />
                            {item.text}
                          </Link>
                        ))}
                    </div>
                  </div>
                </li>

                <li
                  value={2}
                  onMouseEnter={onmousHandle}
                  className={valeS == 2 ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  سخت افزار
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}>
                    <div
                     className={valeS == 2 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}` }
                    >
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hard .jpg" alt="" />
                        هارد
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}  >
                        <img src="../../images/hard ext.jpg" alt="" />
                        هارد اکسترنال
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/rom.jpg" alt="" />
                        رم
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}  >
                        <img src="../../images/cpu.jpg" alt="" />
                        سی پی یو
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/main.jpg" alt="" />
                        مادربرد
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/cooler.jpg" alt="" />
                        خنک کننده
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/power.jpg" alt="" />
                        پاور
                      </Link>
                      <Link href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2} >
                        <img src="../../images/kase.jpg" alt="" />
                        کیس
                      </Link>
                    </div>
                  </div>
                </li>
                <li
                  value={4}
                  onMouseEnter={onmousHandle}
                  className={valeS == 4 ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  {" "}
                  مبدل ها
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`} >
                    <div
                     className={valeS == 4 ? `row-cols-4 ${styles.ishover}` : `${styles.nohover}` }
                    >
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/pci.jpg" alt="" />
                        کارت ها
                      </Link>
                      <Link   href={'/'} className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/vga.jpg" alt="" />
                        VGA
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hdmi.jpg" alt="" />
                        HTMI
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/display.jpg" alt="" />
                        DISPLAY PORT
                      </Link>
                      <Link  href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/sound.jpg" alt="" />
                        SOUND
                      </Link>
                    </div>
                  </div>
                </li>
                <li
                  value={6}
                  onMouseEnter={onmousHandle}
                  className={valeS == 6 ?    `${styles.liiii2_a}` : `${styles.liiii2}`  }
                >
                  لپ تاپ
                  <div className={`container  centerr ${styles.header_bottom__col__ul__ul__ul}`}  >
                    <div
                      className={valeS == 6 ? `row-cols-6 ${styles.ishover}` : `${styles.nohover}` }
                    >
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/asus.jpg" alt="" />
                        ASUS
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/lenovo.jpg" alt="" />
                        LENOVO
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/hp.jpg" alt="" />
                        HP
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/acer.jpg" alt="" />
                        ACER
                      </Link>
                      <Link href={'/'}  className={styles.header_bottom__col__ul__ul__ul__link2}>
                        <img src="../../images/microsoft.jpg" alt="" />
                        MICROSOFT
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="nav_link">فروش اقساط   </li>
            <li>خدمات</li>
            <li> <Link href={'/'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} > تماس با ما</Link> </li>
            <li> <Link href={'/about'}style={{listStyle:'none',textDecoration:'none',color:'inherit'}} >درباره ما</Link> </li>
          </ul>
        </div>
{/* 
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
        </div>  */}
      </div>
    </div> 
    }
    </>
   
  );
}