"use client";
import React from "react";
import style from "./RegisterRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash } from "@phosphor-icons/react";

export default function RegisterRight() {
  return (
    <div className={`${style.div_main} centerc`}>
      <div className={`${style.div_hr} centerr`}>
        <hr />
        <h1>ثبت نام کنید :</h1>

        <hr />
      </div>
      <h1>
        از قبل حساب کاربری دارید؟ <Link href={"/"}>وارد شوید...</Link>
      </h1>

      <div className={`${style.div_input} centerc`}>

        <div className={`${style.div_input_B} centerr`}>
          <User size={40} color="#19a5af" weight="fill" />
          <div className="login_label_float">
            <input type="text" placeholder=" " />
            <label>نام کاربری </label>
          </div>
        </div>

        <div className={`${style.div_input_B} centerr`}>
          <Key size={40} color="#19a5af" weight="fill" />
          <div className="login_label_float">
            <input type="password" placeholder=" " />
            <label>رمزعبور</label>
          </div>
          {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}

        </div>

      </div>

      <div>
        <h1>
          <input type="checkbox" />
          من شرایط سرویس و خط‌مشی رازداری را می‌پذیرم .
        </h1>
      </div>

      <button className={`${style.button} btn btn-info`}>تایید</button>
    </div>
  );
}
