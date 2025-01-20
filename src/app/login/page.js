import React from 'react'
import style from './page.module.css'
import LoginTemplate from '@/components/templatess/Login/LoginTemplate'

export const metadata = {
  title: "صفحه ورود کامپیوترصانع",
  description: " صفحه ورود کامپیوترر صانع ",
  // icons: {
  //   icon: "../../images/photo_2024-05-30_19-08-29.jpg",
  // },
};
export default function LoginPage
() {
  return (
    <div className={`container ${style.container}`}>
    <LoginTemplate/>
       
     </div>
  )
}
