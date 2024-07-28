'use client'
import React, { useEffect, useState } from 'react'
import style from './ScrollToTop.module.css'
import {CaretUp} from "@phosphor-icons/react";


export default function ScrollToTopt() {
    const [fixTop,setFixTop]=useState(false)


    const goToTop=()=>{
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      }
      useEffect(()=>{

      const fixNavbarToTop=()=>{
        const currentScroll = window.scrollY;
        currentScroll > 300 ? setFixTop(true)   :  setFixTop(false) 
      }
       window.addEventListener('scroll',fixNavbarToTop)

      
      return()=>window.removeEventListener('scroll',fixNavbarToTop)
      },[])

  return (
    
 <div data-aos="fade-right"
  className={!fixTop ? `${style.circle} centerc` : `${style.circle_visibil} centerc`} 
    onClick={goToTop}
    >
      <CaretUp size={32} color="#fff" />
      </div>

    
  )
}
