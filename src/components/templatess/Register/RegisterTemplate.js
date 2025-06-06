import React from "react";
import style from "./RegisterTemplate.module.css";
import RegisterRight from "./RegisterRight/RegisterRight";
import RegisterLeft from "./RegisterLeft/RegisterLeft";
import RegisterRightNoPass from "./RegisterRight/RegisterRightNoPass";
export default function RegisterTemplate() {
  return (
    <>
      <div className={`row ${style.row} centerc`}>
        <div className={`col-12  col-lg-6 centerc   ${style.col_right}`}>
          <RegisterRightNoPass />
        </div>

        <div className={`col-12 col-lg-6 centerc   ${style.col_left}`}>
          <RegisterLeft />
        </div>
      </div>
    </>
  );
}
