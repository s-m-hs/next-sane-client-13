import React from 'react'
import style from './page.module.css'
import RegisterTemplate from '@/components/templatess/Register/RegisterTemplate'
export default function Register() {
  return (
    <div className={`container ${style.container}`} >
   <RegisterTemplate/>
      
    </div>
  )
}
