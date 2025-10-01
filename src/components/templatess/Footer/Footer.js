'use client'
import React from 'react'
import style from './Footer.module.css'
import { MagnifyingGlass, Phone, ShoppingCart, User, EnvelopeSimple } from "@phosphor-icons/react";
import Link from 'next/link';
import Script from 'next/script';


export default function Footer() {
  // function showZPTrust(){
  //   var thewindow = window.open("https://www.zarinpal.com/trustPage/"+window.location.hostname, null, "width=450, height=600, scrollbars=no, resizable=no");
  //   }


  return (
    <div className={`container  ${style.container}`} >
      <hr />
      <div className={`row centerc ${style.rowtop}`} >
        <div className='col-md-8'>
          <div className='centerc'>
            <img className={style.logo} src="../../../../../../images/photo_2024-05-30_19-08-29.jpg" alt="logo" />

            <div className={`${style.eatadiv} centerr`} >

              <div className={`${style.eatadiv_number} centerr`}>
                <Phone className={style.sphere} size={24} color='rgb(20, 165, 175)'
                  weight="duotone" />
                021-91005457</div>

              <div>
                <Link href={'https://eitaa.com/sane_camputer'}>
                  <img
                    className={style.sphere}
                    src="../../../../../../images/eitaa-icon-colorful.png"
                    alt="eitaa"
                  />
                  eitaa.com/Sane_camputer
                </Link>

              </div>

              <div>
                <Link href={'https://t.me/sane_camputer'}>
                  <img
                    className={style.sphere}
                    src="../../../../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png"
                    alt="telgram"
                  />
                  t.me/sane_camputer
                </Link>
              </div>

              <div>
                <Link href={'https://instagram.com/it_sane'}>
                  <img
                    className={style.sphere}
                    src="../../../../../../images/icons8-instagram-2048.png"
                    alt="instagram"
                  />
                  instagram.com/it_sane
                </Link>
              </div>

            </div>
          </div>
        </div>
        <div className={`col-4  ${style.empty_col}`} ></div>
      </div>

      <div className={`row centerr ${style.rowbuttom}`}  >
        <div className={` col-md-5 centerc ${style.col}`}   >
          <h1>درباره کامپیوترصانع</h1>
          <h3>فروشگاه کامپیوترصانع با بیش از دو دهه تجربه، به عنوان یکی از پیشروترین مراکز فروش قطعات کامپیوتر و کالاهای دیجیتال  به صورت آنلاین(وب سایت) وبه صورت آفلاین(فروشگاه فیزیکی) در ایران شناخته می‌شود. با ارائه محصولات متنوع از برندهای معتبر داخلی و خارجی، ارسال سریع به سراسر کشور و تضمین کیفیت، همواره در تلاشیم تا تجربه خریدی مطمئن و رضایت‌بخش را برای مشتریان خود فراهم کنیم.</h3>

          {/* <h3> کامپیوترصانع فعالیت خود را از سال 1380 در زمینۀ فروش قطعات کامپیوتر و کالاهای دیجیتال به صورت آنلاین از طریق وبسایت و آفلاین از طریق فروشگاه فیزیکی شروع نموده و نمایندگی رسمی پخش محصولات بسیاری از شرکت‌های ایرانی و خارجی را داشته و تا کنون به تمام شهرهای کوچک و بزرگ ایران ارسال کالا داشته و در این زمینه یکی از پیشتازهای این عرصه می‌باشد.</h3> */}
          <h5>کلیه حقوق مادی و معنوی سایت برای مجموعه صانع  محفوظ است.</h5>
        </div>
        <div className={`col-md-7 centerr mt-3 ${style.zarinpal}`} >

          <a href="javascript:showZPTrust();" title="دروازه پرداخت معتبر"><img src="https://cdn.zarinpal.com/badges/trustLogo/1.png" border="0" alt="دروازه پرداخت معتبر" /></a>
          <Script
            src="https://www.zarinpal.com/webservice/TrustCode" type="text/javascript"
          />


          <Link referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=561253&Code=vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=561253&Code=vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI' alt='' style={{ cursor: 'pointer' }} code='vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI' /></Link>

        </div>


        {/* <div className='col-md-3 centerr mt-2'>
        
              <Link referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=561253&Code=vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=561253&Code=vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI' alt='' style={{cursor:'pointer'}} code='vbA0Zg0ZLgr7K3DpwQiK5bsBUQ9Ny0CI'/></Link>
            </div> */}

      </div>

    </div>
  )
}
