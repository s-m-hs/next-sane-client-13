import React from 'react'
import style from './CardSub.module.css'

export default function CardSub({item}) {
  return (
    <div className={` centerr ${style.main_div}`}>

<div className={`centerc ${style.div_R}`}>
<h2>{item.title}</h2>
<hr />
<h3>{item.describtion}</h3>
<img src={item.smallImg} alt="" />

</div>


    </div>
  )
}
