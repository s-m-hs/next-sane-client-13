import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";


export default function SpinnerA({size}) {
  return (
    <div><PuffLoader
    color="rgba(25, 165, 175)"
    size={size}
    speedMultiplier={1}
  /></div>
  )
}
