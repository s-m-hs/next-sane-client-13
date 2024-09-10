'use client'
import React, { useEffect } from 'react'
import Aos from 'aos'
import "aos/dist/aos.css"
  
export default function AOSInit() {
    useEffect(()=>{
Aos.init(  {
     offset: 100,
    duration: 100,
    // easing: 'ease-in-sine',
    easing: 'linear',
    delay: 10,
  })
    })
  return null
}