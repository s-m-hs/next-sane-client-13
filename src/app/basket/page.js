'use client'
import React, { useContext, useEffect } from 'react'
import { MainContext } from '@/context/MainContext'

export default function basket() {
    let { setXtFlagSpinnerShow,}=useContext(MainContext)
useEffect(()=>{
    setXtFlagSpinnerShow(false)
},[])
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-8'>
                <div>
                    <table className='table table-hove'>

    <thead>
        <tr key="">
            <th>محصول</th>
            <th>قیمت</th>
            <th>تعداد</th>
        </tr>
    </thead>
    <tbody>
        <tr key="">
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
    </tbody>
                    </table>
                </div>
            </div>
            <div className='col-4'></div>
        </div>
    </div>
  )
}
