import React from 'react'
import style from './LoginTemplate.module.css'
import LoginLeft from './LoginLeft/LoginLeft'
import LoginRight from './LoginRight/LoginRight'

export default function LoginTemplate() {
  return (
    <>
         <div className={`row ${style.row} centerc`} >
            <div className={`col-12  col-lg-6 centerc  ${style.col_right}`}><LoginRight/></div>
            <div className={`col-12  col-lg-6 centerc  ${style.col_left}`} ><LoginLeft/></div>
        </div>
    </>
  )
}
