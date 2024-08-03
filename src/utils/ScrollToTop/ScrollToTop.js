'use client'
import React, { useEffect, useState } from 'react'
import style from './ScrollToTop.module.css'
import {CaretUp,CaretDown} from "@phosphor-icons/react";


export default function ScrollToTopt() {
    const [fixTop,setFixTop]=useState(false)


    const goToTop=()=>{
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      }
      const goToBottom=()=>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
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
    
    >
      <CaretUp  onClick={goToTop} size={28} color="#fff" />
      <CaretDown onClick={goToBottom} size={28} color="#fff" />
      </div>

    
  )
}
