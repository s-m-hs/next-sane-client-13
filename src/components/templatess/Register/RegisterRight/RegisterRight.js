"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./RegisterRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash,DeviceMobile  } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import postApiByAlert from "@/utils/ApiUrl/apiCallBack/apiPostByAlert";
import { useRouter } from 'next/navigation'
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import { InputOtp } from 'primereact/inputotp';



export default function RegisterRight() {
const router = useRouter()
const [token, setTokens] = useState('09');
const [err1,setErr1]=useState('')

const customInput = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-input" />;


let {xtFlagLogin,setXtFlagLogin,setXtFlagSpinnerShow,xtflagSpinnerShow}=useContext(MainContext)


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
    if(errors.password){
      setErr1(errors.password.message)

    }else(setErr1(''))
console.log(err1)
  };
 const alertA=()=>alertN('center','success','ثبت نام با موفقیت انجام شد',1500).then((res) => {
    setXtFlagLogin(true)
reset(setValue(''))
router.push('/') 
});
const alertB=()=>alertN('center','error'," ثبت نام انجام نشد دوباره تلاش کنید...",1500)

      ////////////////////////////
const handleRegistration=(data)=>{
  // console.log(data);
let obj={
    un: token,
  pw:data.password
}
console.log(obj)
  postApiByAlert('/api/Customer/register',obj,alertA,alertB)
}

useEffect(()=>{
setXtFlagSpinnerShow(false)
},[xtflagSpinnerShow])

  return (
    <div className={`${style.div_main} centerc`}>
       <img className={style.img} src="../../../../../images/register/8380015.jpg" alt="" />
      <div className={`${style.div_hr} centerr`}>
        <hr />
        <h1>ثبت نام کنید </h1>

        <hr />
      </div>
      <h1>
        از قبل حساب کاربری دارید؟ <Link 
        onClick={()=>setXtFlagSpinnerShow(true)}
        href={'/login'}>وارد شوید...</Link>
      </h1>

      <div className={`${style.div_input} centerc`}>
        <form
        className={`${style.form} centerc`}
          action=""
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          <div className={`${style.div_input_B} centerr`}>
            <DeviceMobile  size={40} color="#19a5af" weight="fill" />
            {/* <div className="login_label_float">
               <input
              minLength={3}
                name="userName"
                type="userName"
                placeholder=" "
                {...register(`userName`, registerOptions.userName)}
              />
  
            </div> */}

            <div className={`${style.card_div} card flex justify-content-center`} >
            <style scoped>
          
            </style>

            <InputOtp value={token} length={11} onChange={(e) => setTokens(e.value)} inputTemplate={customInput}/>
        </div>
          </div>

          <div className={`${style.div_input_B} centerr`}>
            <Key size={40} color="#19a5af" weight="fill" />
            <div className="login_label_float">
              <input 
              // minLength={6}
              name="password"
               type="text"
                placeholder="adsdsa "
               
                {...register(`password`, {
                  minLength : {
                    value: 6,
                    message: 'رمز عبور وارد شده نباید کمتر از 6 کاراکتر باشد ' // JS only: <p>error message</p> TS only support string
                  }
              })}
                 />
                 {err1 && <p className={`${style.err_p}`} >{err1}</p>}
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

   <div>
        <h1>
          <input
          name="checkbox"
           type="checkbox"
           {...register(`checkbox`, registerOptions.checkbox)}

           />
          من شرایط سرویس و خط‌مشی رازداری را می‌پذیرم .
        </h1>
      </div>

    <button type="submit" className={`${style.button} btn btn-info`}
      >تایید</button>

        </form>
      </div>

   

  



      
    </div>
  );
}
