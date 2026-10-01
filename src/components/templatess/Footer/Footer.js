'use client'
import React from 'react'
import style from './Footer.module.css'
import { Phone, ShoppingCart, User, House, Sparkle, List, PhoneCall, SignIn } from "@phosphor-icons/react";
import Link from 'next/link';
import Script from 'next/script';


export default function Footer() {

  const quickLinks = [
    { href: '/', label: 'خانه', icon: <House size={18} weight="duotone" /> },
    // { href: '/offer', label: 'پیشنهادهای شگفت‌انگیز', icon: <Sparkle size={18} weight="duotone" /> },
    { href: '/category', label: 'دسته‌بندی محصولات', icon: <List size={18} weight="duotone" /> },
    { href: '/contactus', label: 'تماس با ما', icon: <PhoneCall size={18} weight="duotone" /> },
    { href: '/login', label: 'ورود / ثبت‌نام', icon: <SignIn size={18} weight="duotone" /> },
  ];

  return (
    <footer className={style.footer}>
      <div className={`container ${style.inner} `}>

        {/* top: logo + socials */}
        <div className={`row align-items-center ${style.rowtop} sd-fade-up`}>
          <div className="col-md-7 centercc">
            <img className={style.logo} src="../../../../../../images/Sane_Logo_2_Purple.jpg" alt="logo" />
            <p className={style.tagline}>
              فروشگاه تخصصی قطعات کامپیوتر و کالاهای دیجیتال — از سال ۱۳۸۰
            </p>
          </div>
          <div className={`col-md-5 centerr ${style.socials} sd-fade-up sd-delay-2`}>
            <Link className={style.social} href={'https://eitaa.com/sane_camputer'} title="ایتا">
              <img src="../../../../../../images/eitaa-icon-colorful.png" alt="eitaa" />
            </Link>
            <Link className={style.social} href={'https://t.me/sane_camputer'} title="تلگرام">
              <img src="../../../../../../images/Jowhareh_galleries_5_poster_13cf28d3-554d-426a-a1b6-79463537f52c.png" alt="telgram" />
            </Link>
            <Link className={style.social} href={'https://instagram.com/it_sane'} title="اینستاگرام">
              <img src="../../../../../../images/icons8-instagram-2048.png" alt="instagram" />
            </Link>
          </div>
        </div>

        <div className={style.divider}></div>

        {/* middle: about + quick links */}
        <div className="row">
          <div className={`col-md-7 ${style.about} sd-fade-up sd-delay-1`}>
            <h2>درباره کامپیوترصانع</h2>
            <p>
              فروشگاه کامپیوترصانع با بیش از دو دهه تجربه، به عنوان یکی از پیشروترین مراکز فروش قطعات کامپیوتر و کالاهای دیجیتال به صورت آنلاین (وب‌سایت) و آفلاین (فروشگاه فیزیکی) در ایران شناخته می‌شود. با ارائه محصولات متنوع از برندهای معتبر داخلی و خارجی، ارسال سریع به سراسر کشور و تضمین کیفیت، همواره در تلاشیم تا تجربه خریدی مطمئن و رضایت‌بخش را برای مشتریان خود فراهم کنیم.
            </p>
          </div>
          <div className={`col-md-5 ${style.links} sd-fade-up sd-delay-2`}>
            <h2>لینک‌های سریع</h2>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <span className={style.linkIcon}>{l.icon}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* trust badges */}
        <div className={`centerr ${style.badges} sd-fade-up sd-delay-3`}>
          <a href="javascript:showZPTrust();" title="دروازه پرداخت معتبر" className={style.badgeCard}>
            <img src="https://cdn.zarinpal.com/badges/trustLogo/1.png" border="0" alt="دروازه پرداخت معتبر" />
          </a>
          <Script
            src="https://www.zarinpal.com/webservice/TrustCode" type="text/javascript"
          />
          <Link referrerpolicy='origin' target='_blank' className={style.badgeCard}
            href='https://trustseal.enamad.ir/?id=700230&Code=a8FjgWM5i8to9rFSEZ8yLJWRTVVC9Utd'>
            <img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=700230&Code=a8FjgWM5i8to9rFSEZ8yLJWRTVVC9Utd' alt='' code='a8FjgWM5i8to9rFSEZ8yLJWRTVVC9Utd' />
          </Link>
        </div>

        {/* bottom bar */}
        <div className={`centerr ${style.bottom}`}>
          <span>کلیه حقوق مادی و معنوی سایت برای مجموعه صانع محفوظ است. © ۱۴۰۵</span>
        </div>

      </div>
    </footer>
  )
}
