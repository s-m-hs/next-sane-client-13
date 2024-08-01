import React from 'react'
import style from './LoginTemplate.module.css'
import LoginLeft from './LoginLeft/LoginLeft'
import LoginRight from './LoginRight/LoginRight'

export default function LoginTemplate() {
  return (
    <>
         <div className={`row ${style.row}`} >
            <div className={`col-6 centerc boxSh ${style.col_right}`}><LoginRight/></div>
            <div className={`col-6 centerc boxSh ${style.col_left}`} ><LoginLeft/></div>
        </div>
    </>
  )
}
