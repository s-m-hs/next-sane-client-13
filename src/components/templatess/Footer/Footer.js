'use client'
import React from 'react'
import style from './Footer.module.css'
import { MagnifyingGlass,Phone,ShoppingCart,User,EnvelopeSimple} from "@phosphor-icons/react";
import Link from 'next/link';


export default function Footer() {
  return (
    <div className={`container  ${style.container}`} >
        <div className={`row centerc ${style.rowtop}`} >
            <div className='col-8'>
                <div className= 'centerc'>
                    <img className={style.logo} src="../../../../../../images/photo_2024-05-30_19-08-29.jpg" alt="logo" />
                    <div className={`${style.eatadiv} centerr`} >

<div>
<Phone className={style.sphere} size={24} color='rgb(20, 165, 175)'
 weight="duotone" /> 
    021-91005457</div>

<div>
<Link href={'/'}>
            <img
              className={style.sphere}  
              src="../../../../../../images/eitaa-icon-colorful.png"
              alt=""
            />
            eitaa.com/Sane_camputer
          </Link> 

</div>

<div>
<Link href={'/'}>
            <img
              className={style.sphere}  
              src="../../../../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png"
              alt=""
            />
            t.me/SANE_IT
          </Link> 
</div>

<div>
<Link href={'/'}>
            <img
              className={style.sphere}  
              src="../../../../../../images/icons8-instagram-2048.png"
              alt=""
            />
           instagram.com/sane_computer
          </Link> 
</div>

                    </div>
                </div>
            </div>
            <div className='col-4'></div>
        </div>

        <div className={`row centerr ${style.rowbuttom}`}  >
            <div className={`col-5 centerc ${style.col}`}   >
              <h1>درباره کامپیوترصانع</h1>
              <h3> کامپیوترصانع فعالیت خود را از سال 1380 در زمینۀ فروش قطعات کامپیوتر و کالاهای دیجیتال به صورت آنلاین از طریق وبسایت و آفلاین از طریق فروشگاه فیزیکی شروع نموده و نمایندگی رسمی پخش محصولات بسیاری از شرکت‌های ایرانی و خارجی را داشته و تا کنون به تمام شهرهای کوچک و بزرگ ایران ارسال کالا داشته و در این زمینه یکی از پیشتازهای این عرصه می‌باشد.</h3>
              <h5>کلیه حقوق مادی و معنوی سایت برای مجموعه صانع  محفوظ است.</h5>
            </div>
            <div className='col-4'></div>
            <div className='col-3'>
              <img src="../../../../../../images/brand/enamad.png"     alt="namad" />
            </div>

        </div>

        </div>
  )
}
