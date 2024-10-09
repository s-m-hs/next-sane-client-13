'use client'

import { SpeedDial } from 'primereact/speeddial';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import Sidebar from '@/components/madules/p-user/Sidebar'
import React, { useEffect, useRef, useState } from 'react'
import style from './puser.module.css'
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from 'primereact/button';
import Link from 'next/link';
import {  List ,X } from "@phosphor-icons/react";



export default function layout({ children }) {
  const [flagButton,setFlagButton]=useState(true)



// useEffect(()=>{
//   window.addEventListener('click',function name() {
//     setFlagButton(false)
//   })
// })
  

  return (
    <div className={ `container ${style.container}`} >
      <div className={ `row ${style.row}`}  >
        <div className={ `col-3 ${style.sidebar}`} > <Sidebar />

  


        </div>
        <div className='col-lg-9' style={{marginTop:'50px'}}> 

     
            {/* <div className={` ${style.speeddial_div}`} style={{ position: 'relative',  }}>
              <span className={` ${style.span} centerc`} >پروفایل </span>
                <Toast ref={toast} />
                <SpeedDial aria-labelledby="Options"  className={` ${style.speeddial}`} model={items} radius={80} type="semi-circle" direction="down" style={{ left: 'calc(50% - 2rem)', top: 0 }} ></SpeedDial>
            </div> */}
      {flagButton &&   <span className={`spannn ${style.span1} centerc`} ><Link href={'/p-user/profile'}  
      onClick={()=>setFlagButton(false)}
      >پروفایل</Link> </span>}
    
{flagButton &&  <span className={` ${style.span2} centerc`} ><Link href={'/p-user/address'} 
      onClick={()=>setFlagButton(false)}
      >آدرس</Link> </span>}
     
     {flagButton &&     <span className={` ${style.span3} centerc`} ><Link href={'/p-user/order'}  
           onClick={()=>setFlagButton(false)}

     >سفارشات</Link> </span>}
   {flagButton &&    <span className={` ${style.span4} centerc`} ><Link href={'/p-user/warranty'}
         onClick={()=>setFlagButton(false)}
         >گارانتی</Link> </span>}
   

      {flagButton &&  <span className={` ${style.span5} centerc`} ><Link href={'/p-user/repairs'} 
            onClick={()=>setFlagButton(false)}
            >خدمات</Link> </span>}

     <button  onClick={()=>setFlagButton(!flagButton)} className={`  btn btn-outline-info ${style.speeddial}`}>
      {flagButton ? <X size={32} /> :  <List size={32} />}
    
     </button>
                {/* <SpeedDial onClick={()=>setFlagButton(!flagButton)} aria-labelledby="Options" model={items}className={` ${style.speeddial}`}  direction="up" transitionDelay={80} showIcon="pi pi-bars" hideIcon="pi pi-times" buttonClassName="p-button-outlined" /> */}
        

        {/* <div className={ `${style.menuebutton}`}>
      <Button
      className={ `${style.button}`}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        دسته بندی 
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div> */}
          { children }
        </div>
      </div>
    </div>
  )
}
