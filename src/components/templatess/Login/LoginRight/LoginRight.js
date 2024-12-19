"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./LoginRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash,DeviceMobile } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import {sha512} from "js-sha512";
import apiUrl from "@/utils/ApiUrl/apiUrl";
// import getLocalStorage from "@/utils/localStorag/localStorage";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import { InputOtp } from 'primereact/inputotp';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';





export default function LoginRight() {
const [rgister,setRegister]=useState('')
const [token, setTokens] = useState('09');
const [tokenB, setTokensB] = useState('09');
const [tokenC, setTokensC] = useState('');
const [err1,setErr1]=useState('')
const [show, setShow] = useState(false);
const [recoveryFlag,setRecoveryFlag]=useState(false)
const classRefA=useRef()
const classRefB=useRef()
const customInput = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-input" />;
const customInputB = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-inputB" />;

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const router = useRouter()
// const getLocalStorage=localStorage.getItem('loginToken')
let {xtFlagLogin,setXtFlagLogin,setLocalToken,setBasketFlag,setXtFlagSpinnerShow,xtflagSpinnerShow}=useContext(MainContext)


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
  const alertA=()=>alertN('center','success'," خوش آمدید",1500).then((res) => {
    setXtFlagLogin(true)
reset(setValue(''))
router.push('/') 
});
const alertB=()=>alertN('center','error',"دوباره امتحان کنید...",1500)
const alertC=()=>alertN('center','error',"  شماره همراه را به درستی وارد نشده است ...",1500)

const sendCodeToRecovery=()=>{

}


const sendMobToRecovery=()=>{
  const getLocalStorage=localStorage.getItem('loginToken')
if(tokenB.length==11){
    async function myApp(){
    const res=await fetch(`${apiUrl}/api/Customer/sendRecoveryCode?phoneNumber=${tokenB}`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${getLocalStorage}` ,
      },
    }).then(res=>{
      if(res.ok){
        setRecoveryFlag(true)
        classRefB.current.classList.add('loginRight-show')

      }
    }
     
    )
  }
  myApp()
}else{
  alertC()
}

}


      ////////////////////////////
const login=(obj)=>{
  async function myAppPost(){
    const getLocalStorage=localStorage.getItem('loginToken')
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
        // localStorage.setItem('user',obj.name)
        setLocalToken(result.token)
        alertA()
        setBasketFlag(prev=>!prev)
      }else{
        alertB()
      }
    })
  }
  myAppPost()

}

const handleRegistration=(data)=>{
  // console.log(data);
let obj={
 un: token,
  pw:sha512(data.password )  
}
if(token.length==11){
  login(obj)

}else{
  alertC()

}

}
useEffect(()=>{
  setXtFlagSpinnerShow(false)
},[xtflagSpinnerShow])


  return (
    <div className={`${style.div_main} centerc`}>
      <img className={style.img} src="../../../../../images/register/photo_2024-08-05_16-37-06.jpg" alt="photo_2024" />

      <div className={`${style.div_hr} centerr`}>
        <hr />
        <h1> وارد شوید  :</h1>

        <hr />
      </div>
      <h2>
        حساب کاربری ندارید؟ < Link onClick={()=>setXtFlagSpinnerShow(true)}
 href={"/register"}>ثبت نام کنید ...</Link>
      </h2>

      <div className={`${style.div_input} centerc`}>
        <form
        className={`${style.form} centerc`}
          action=""
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          {/* <div className={`${style.div_input_B} centerr`}>
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
          </div> */}

<div className={`${style.div_input_B} centerr`}>
            <DeviceMobile  size={40} color="#19a5af" weight="fill" />
          

            <div className={`${style.card_div} card flex justify-content-center`} >
            <style scoped>
          
            </style>

            <InputOtp value={token} integerOnly length={11} onChange={(e) => setTokens(e.value)} inputTemplate={customInput}/>
        </div>
          </div>

          <div className={`${style.div_input_B} centerr`}>
            <Key size={40} color="#19a5af" weight="fill" />
            <div className="login_label_float">
              <input 
              minLength={4}
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

      <h3  className={`${style.h3} `} onClick={()=>setShow(true)}>رمزعبور را فراموش کرده ام ...</h3>

        </form>
      </div>

      <>
    

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header 
        // closeButton
        >
          <Modal.Title>
            {!recoveryFlag ?  <h3>شماره همراه خود را وارد کنید...</h3> :
             <h3>کد تایید را وارد کنید ...</h3>
}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!recoveryFlag ?    <div className={`${style.card_div} card flex justify-content-center`} >
            <style scoped>
          
            </style>

            <InputOtp value={tokenB} integerOnly length={11} onChange={(e) => setTokensB(e.value)} inputTemplate={customInput}/>
        </div> : 
            <div className={`${style.card_div} card flex justify-content-center`} >
            <InputOtp value={tokenC} length={6}  onChange={(e) => setTokensC(e.value)} integerOnly  inputTemplate={customInputB}/>

<button type="submit" className={tokenC.length==6 ? `${style.buttonB} btn btn-primary mt-3` : `${style.buttonB2} btn btn-primary mt-3`}
onClick={()=>sendCodeToRecovery()}
>ارسال کد تایید</button>  
</div>}
    
    <>
    <section ref={classRefA} className={`${style.hide}`}>
          <div className={`${style.div_inputC} centerr`}>
            <Key size={30} color="#19a5af" weight="fill" />
            <div >
              <input 
              className={`${style.div_input_div} `}
              // minLength={6}
              name="password"
               type="text"
                placeholder="رمزعبور "
       
                 />
                 {/* {err1 && <p className={`${style.err_p}`} >{err1}</p>} */}
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

          <div className={`${style.div_inputC} centerr`}>
            <Key size={30} color="#19a5af" weight="fill" />
            <div >
              <input 
              className={`${style.div_input_div} `}
              // minLength={6}
              name="password"
               type="text"
                placeholder="تکرار رمزعبور "
               
         
                 />
                 {err1 && <p className={`${style.err_p}`} >{err1}</p>}
            </div>

            
  
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>
    </section>


          {/* <button type="submit" className={`${style.buttonB} btn btn-info mt-3`}
      >تایید</button> */}
    </>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            handleClose()
            setRecoveryFlag(false)
            setTokensB('09')
            setTokensC('')
          } }>
            بستن
          </Button>
          <Button ref={classRefB} variant="primary" onClick={()=>sendMobToRecovery()} >تایید</Button>
          {/* <Button ref={classRefA} className={`${style.hide}`} variant="primary" onClick={()=>sendMobToRecovery()} >تایید</Button> */}
        </Modal.Footer>
      </Modal>
    </>

  



      
    </div>
  );
}
