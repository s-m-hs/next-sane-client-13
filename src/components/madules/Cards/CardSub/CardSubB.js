import React, { useContext } from 'react'
import style from './CardSubB.module.css'
import Link from 'next/link'
import { MainContext } from '@/context/MainContext'

export default function CardSubB({ item }) {
    let { setXtFlagSpinnerShow } = useContext(MainContext)

    return (
        <div className={`col centerr ${style.main_div} boxSh`}>
            <Link href={`/subject/${item.id}`}
                onClick={() => setXtFlagSpinnerShow(true)}>
                <div className={`centercc ${style.div_R} `} style={{ textAlign: 'justify', }}>
                    <h2>{item.title}</h2>
                    <hr />
                    <h4>{item.describtion}</h4>
                    <img src={item.smallImg} alt={item.title} />

                </div>
            </Link>



        </div>
    )
}
