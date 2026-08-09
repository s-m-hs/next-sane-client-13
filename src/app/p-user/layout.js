'use client'

import { SpeedDial } from 'primereact/speeddial';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import Sidebar from '@/components/madules/p-user/Sidebar'
import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './puser.module.css'
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { List, X } from "@phosphor-icons/react";
import alertN from '@/utils/Alert/AlertA';
import { MainContext } from '@/context/MainContext';



export default function layout({ children }) {
  let { xtFlagLogin } = useContext(MainContext)
  const rout = useRouter();
  const [flagButton, setFlagButton] = useState(false)
  const AlertB = () => alertN("center", "info", "برای دسترسی به پنل کاربری ابتدا با شماره همراه خود لاگین کنید !!!...", 1500);



  // useEffect(() => {
  //   if (!xtFlagLogin) {
  //     rout.push("/");
  //     console.log(xtFlagLogin)
  //     // AlertB();
  //   }
  // }, [])


  return (
    <div className={`container ${style.container}`} >
      <div className={`row ${style.row}`}  >
        <div className={`col-3 ${style.sidebar}`} > <Sidebar />




        </div>
        <div className='col-lg-9' style={{ marginTop: '50px' }}>

          <div className={` ${style.sidebar_menue}`}>
            {flagButton && <span className={`spannn ${style.span1} centerc`} ><Link href={'/p-user/profile'}
              onClick={() => setFlagButton(false)}
            >پروفایل</Link> </span>}

            {flagButton && <span className={` ${style.span2} centerc`} ><Link href={'/p-user/address'}
              onClick={() => setFlagButton(false)}
            >آدرس</Link> </span>}

            {flagButton && <span className={` ${style.span3} centerc`} ><Link href={'/p-user/order'}
              onClick={() => setFlagButton(false)}

            >سفارشات</Link> </span>}
            {flagButton && <span className={` ${style.span4} centerc`} ><Link href={'/p-user/warranty'}
              onClick={() => setFlagButton(false)}
            >گارانتی</Link> </span>}


            {flagButton && <span className={` ${style.span5} centerc`} ><Link href={'/p-user/repairs'}
              onClick={() => setFlagButton(false)}
            >تعمیرات</Link> </span>}


            {flagButton && <span className={` ${style.span6} centerc`} ><Link href={'/p-user/ticket'}
              onClick={() => setFlagButton(false)}
            >پیام ها</Link> </span>}

            <button
              style={{ backgroundColor: "var(--themA)", color: "#fff", outline: "none", border: "none" }}
              onClick={() => setFlagButton(!flagButton)} className={`  btn btn-outline-info ${style.speeddial}`}>
              {flagButton ? <X size={32} /> : <List size={32} />}

            </button>
          </div >

          {children}
        </div>
      </div>
    </div>
  )
}
