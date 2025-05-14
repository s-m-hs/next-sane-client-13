import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import style from "./SpinnerC.module.css";

export default function SpinnerC({ size }) {
  return (
    <div className={`${style.ScaleLoader}`}>
      <ScaleLoader color="rgba(25, 165, 175)" size={size} speedMultiplier={1} />
    </div>
  );
}
