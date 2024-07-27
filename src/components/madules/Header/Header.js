"use client"
import React, { useEffect, useState} from "react";
import styles from "./Header.module.css"
import Link from "next/link";
import SwiperA from "@/components/templates/Home/SwiperA/SwiperA";
import { MagnifyingGlass,Phone,ShoppingCart,User,EnvelopeSimple} from "@phosphor-icons/react";


// import apiUrl from "../../utils/apiUrl";


export default function Header() {
  const [valeS, setValue] = useState(1);
  const [mainCategory, setMainCategory] = useState({});

  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: 2,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(
        `http://sapi.sanecomputer.com/api/CyCategories/GetItemWChildAndRoot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          setMainCategory(result);
          console.log(mainCategory);
        });
    }
    myAppGet();
  };
  // console.log(imgSrcProp);

  ////////////////////////////
  useEffect(() => {
    getCategoryById();
    // console.log(mainCategory.childs[0].imageUrl)
  }, []);

  const onmousHandle = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    }
    console.log(valeS)
  };

  return (
      <div className={`container ${styles.Header}`}>
      <div className={`row ${styles.Header_top } centerr`}>

        <div className={`col col-md-8 ${styles.Header_rightSide} centerr` }>
          <div className={styles.Header_rightSide__div_img}>
            <div style={{ width: "135px", height: "105px" }}>
            <SwiperA/>
            </div>
          </div>
{/* <div className={styles.search_div}> */}
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
            <User size={24} color="#14a5af" />
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
                          href={'/'}
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
  );
}