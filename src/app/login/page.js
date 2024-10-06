import React from 'react'
import style from './page.module.css'
import LoginTemplate from '@/components/templatess/Login/LoginTemplate'

export default function LoginPage
() {
  return (
    <div className={`container ${style.container}`}>
    <LoginTemplate/>
       
     </div>
  )
}
