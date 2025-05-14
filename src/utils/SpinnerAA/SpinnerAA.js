import React from "react";
import style from "./SpinnerAA.module.css";
import { DotLoader } from "react-spinners";

export default function SpinnerAA() {
  return (
    <div className={`${style.DotLoader}`}>
      <DotLoader color="rgba(25, 165, 175)" size="280px" speedMultiplier={1} />
    </div>
  );
}
