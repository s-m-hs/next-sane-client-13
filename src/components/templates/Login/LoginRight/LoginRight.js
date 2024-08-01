"use client";
import React, { useState } from "react";
import style from "./LoginRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import postApiByAlert from "@/utils/ApiUrl/apiCallBack/apiPostByAlert";
import { useRouter } from 'next/navigation'
import {sha512} from "js-sha512";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import getLocalStorage from "@/utils/localStorag/localStorage";




export default function LoginRight() {
const [rgister,setRegister]=useState('')
const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const registerOptions = {
    userName: { required: "text is required" },
    password: { required: "code is password" },
    checkbox: { required: "code is checkbox" },
  };

  const handleError = (errors) => {

  };

  //////////////////////
  const alertA = () =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: " خوش آمدید",
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
reset(setValue(''))
router.push('/') 
});
    const alertB = () =>
      Swal.fire({
        position: "center",
        icon: "error",
        title: "دوباره امتحان کنید...",
        showConfirmButton: false,
        timer: 1500,
      })
      ////////////////////////////
const login=(obj)=>{
  async function myAppPost(){
    const res=await fetch(`${apiUrl}/api/Customer/login`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${getLocalStorage}` ,
      },
      body:JSON.stringify(obj)
    }).then(res=>{
      if(res.status==200){
        return res.json()
      }
    }).then(result=>{
      if(result){
        localStorage.setItem('loginToken',result.token)
        localStorage.setItem('user',obj.un)
        alertA()
      }else{
        alertB()
      }
    })
  }
  myAppPost()

}

const handleRegistration=(data)=>{
  console.log(data);
let obj={
 un: data.userName,
  pw:sha512(data.password )  
}
login(obj)

}



  return (
    <div className={`${style.div_main} centerc`}>
      <div className={`${style.div_hr} centerr`}>
        <hr />
        <h1> وارد شوید  :</h1>

        <hr />
      </div>
      <h1>
        حساب کاربری ندارید؟ <Link href={"/register"}>ثبت نام کنید ...</Link>
      </h1>

      <div className={`${style.div_input} centerc`}>
        <form
        className={`${style.form} centerc`}
          action=""
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          <div className={`${style.div_input_B} centerr`}>
            <User size={40} color="#19a5af" weight="fill" />
            <div className="login_label_float">
              <input
              minLength={3}
                name="userName"
                type="userName"
                placeholder=" "
                {...register(`userName`, registerOptions.userName)}
              />
              <label>نام کاربری </label>
            </div>
          </div>

          <div className={`${style.div_input_B} centerr`}>
            <Key size={40} color="#19a5af" weight="fill" />
            <div className="login_label_float">
              <input 
              minLength={6}
              name="password"
               type="password"
                placeholder=" "
                {...register(`password`, registerOptions.password)}
                 />
              <label>رمزعبور</label>
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

   <div>
        {/* <h1>
          <input
          name="checkbox"
           type="checkbox"
           {...register(`checkbox`, registerOptions.checkbox)}

           />
          من شرایط سرویس و خط‌مشی رازداری را می‌پذیرم .
        </h1> */}
      </div>

    <button type="submit" className={`${style.button} btn btn-info`}
      >تایید</button>

        </form>
      </div>

   

  



      
    </div>
  );
}
