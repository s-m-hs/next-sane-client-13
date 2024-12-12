import React, { useContext } from 'react'
import style from './CardSub.module.css'
import Link from 'next/link'
import { MainContext } from '@/context/MainContext'

export default function CardSub({item}) {
  let {setXtFlagSpinnerShow}=useContext(MainContext)

  return (
    <div className={`col centerr ${style.main_div} boxSh`}>
<Link href={`/subject/${item.id}`}
onClick={()=>setXtFlagSpinnerShow(true)}> 
<div className={`centerc ${style.div_R}`}>
<h2>{item.title}</h2>
<hr />
<h3>{item.describtion}</h3>
<img src={item.smallImg} alt={item.title} />

</div>
</Link>



    </div>
  )
}
