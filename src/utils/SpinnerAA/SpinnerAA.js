import React from "react";
import style from "./SpinnerAA.module.css";
import { DotLoader } from "react-spinners";

export default function SpinnerAA() {
  return (
    <div className={`${style.DotLoader}`}>
      <DotLoader color={`var(--them)`} size="280px" speedMultiplier={1} />
    </div>
  );
}
