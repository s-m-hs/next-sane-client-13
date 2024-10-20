import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import style from './SpinnerA.module.css'


export default function SpinnerA({size}) {
  return (
    <div className={`${style.PuffLoader}`}>
      <PuffLoader
    color="rgba(25, 165, 175)"
    size={size}
    speedMultiplier={1}
  /></div>
  )
}
