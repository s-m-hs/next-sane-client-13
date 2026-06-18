import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
// import Mosaic from 'react-loading-indicators'
import style from "./SpinnerC.module.css";
import CountdownLoader from "../CountdownLoader";

export default function SpinnerC({ size, title }) {
  return (
    <div className={`${style.ScaleLoader}`}>
      <CountdownLoader />

      <h4 style={{ color: 'var(--them)' }}>{title}</h4>
      <ScaleLoader color='var(--them)' size={size} speedMultiplier={1} />
      {/* <Mosaic color="#32cd32" size="large" text="درحال ثبت عملیات" textColor="" /> */}
    </div>
  );
}
