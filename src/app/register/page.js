import React from 'react'
import style from './page.module.css'
import RegisterTemplate from '@/components/templatess/Register/RegisterTemplate'
export const metadata = {
  title: " صفحه ثبت نام کامپیوترصانع",
  description: " Sane Anformatic Collection",
};

export default function Register() {
  return (
    <div className={`container ${style.container}`} >
   <RegisterTemplate/>
      
    </div>
  )
}
