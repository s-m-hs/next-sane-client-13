'use client'
import React, { useEffect } from 'react'
import Aos from 'aos'
import "aos/dist/aos.css"
  
export default function AOSInit() {
    useEffect(()=>{
Aos.init(  {
     offset: 200,
    duration: 300,
    // easing: 'ease-in-sine',
    easing: 'linear',
    delay: 100,
  })
    })
  return null
}