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
// import axios from "axios";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { InputMask } from "primereact/inputmask";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';


export default function RegisterRight() {
const router = useRouter()
const [token, setTokens] = useState('09');
const [tokenB, setTokensB] = useState('');
const [flagInput,setFlagInput]=useState(false)
const [err1,setErr1]=useState('')
const [flagErrorCheckbox,setFlagErrorCheckbox]=useState(false)
const[localbasket,setLocalBasket]=useState([])
const [showB, setShowB] = useState(false);
const handleShowB = () => setShowB(true);
const handleCloseB = () => setShowB(false);

const customInput = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-input" />;
const customInputB = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-inputB" />;


let {xtFlagLogin,setXtFlagLogin,setXtFlagSpinnerShow,xtflagSpinnerShow,setLocalUpdateBasket,setCartCounter,setBasketFlag}=useContext(MainContext)

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

    }else if(errors.checkbox){
      console.log(errors.checkbox.message);
      setFlagErrorCheckbox(true)
      // setErr1(errors.checkbox)

    } else {
      setErr1('')

    }
  };

 const alertA=()=>alertN('center','success','ثبت نام با موفقیت انجام شد',1500).then((res) => {
    setXtFlagLogin(true)
reset(setValue(''))
router.push('/') 
});
const alertD=()=>alertN('center','success','کد تایید برای شما ارسال شد',1500).then((res) => {
  setFlagInput(true)
reset(setValue(''))

});
const alertB=(meg)=>alertN('center','error',meg,2000)
const alertC=()=>alertN('center','error',"  شماره همراه به درستی وارد نشده است ...",1500)
const alertE=()=>alertN('center','error',"  رمز عبور و تکرار آن یکسان نیست...",1500)

      ////////////////////////////

      const addToBasket=(obj)=>{
        const getLocalStorage =localStorage.getItem('loginToken')
      
        async function myApp(){
          const res=await fetch(`${apiUrl}/api/CyOrders/addToBasket`,{
            method:'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${ getLocalStorage }`
            }, 
            body:JSON.stringify(obj)
          }).then(res=>{
            console.log(res);
            if (res.status==200){
              // setBasketFlag(prev=>!prev)
              // AlertA()    
              }else if(res.status==400){
                // AlertB()
              }
          }
        
        )
        }
        myApp()
      }

const handleRegistration=(data)=>{
     let obj={
    un: token,
  pw:data.password,
    name:data.name
}
// console.log(obj)
  if(token.length==11 && !flagInput){
   
if(data.passwordRepeat===data.password){
  postApiByAlert('/api/Customer/register',obj,alertD,alertB)
  setFlagErrorCheckbox(false)

}else{
  alertE()
  setFlagErrorCheckbox(false)

}


  }else if(tokenB.length==6 && flagInput){
    let obj={
      valadationCode: tokenB,
      username:token
    }

   
      const getLocalStorage=localStorage.getItem('loginToken')

      async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/Customer/verifyCode`,
        {
          method: "POST",
          headers: {
            Authorization:`Bearer ${getLocalStorage}` ,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          if(res.status==200){
       return res.json().then(result=>{
            localStorage.setItem('loginToken',result.token)
        localStorage.setItem('user',obj.name)

        if(localbasket?.length==0){
          alertA()
        }else{
          for (let i = 0; i < localStorage.length; i++) {
          
            const key = localStorage.key(i);
            if (key.startsWith('cartObj')) {
              const keyy=JSON.parse(localStorage.getItem(key))
              let objj={
                cyProductID:keyy.value,
                quantity: keyy.quan,
                orderItemID: 0,
              }
              console.log(objj)
              addToBasket(objj)
              localStorage.removeItem(key)
            }
          }
        
          handleShowB()
        }      })
          } else if (res.status==400) {
            return res.json().then(result=>{
  alertB(result.response)
            })
              
          }
        }).catch(err=>{
          console.log(err.code)
          // console.log(err.status.code)
        } )
    }
    myAppGet();
  


// if(localbasket?.length==0){
//   postApiByAlert('/api/Customer/verifyCode',obj,alertA,alertB)

// }else{
//   postApiByAlert('/api/Customer/verifyCode',obj,function () {
//     for (let i = 0; i < localStorage.length; i++) {
  
//       const key = localStorage.key(i);
//       if (key.startsWith('cartObj')) {
//         const keyy=JSON.parse(localStorage.getItem(key))
//         let objj={
//           cyProductID:keyy.value,
//           quantity: keyy.quan,
//           orderItemID: 0,
//         }
//         console.log(objj)
//         addToBasket(objj)
//         localStorage.removeItem(key)
//       }
//     }
  
//     handleShowB()
//   },alertB)
// }


  }
  
  else(
    alertC()
  )
  // console.log(data);

}
const getLocalStorageProd=(funcc)=>{
  for (let i = 0; i < localStorage.length; i++) {

    const key = localStorage.key(i);
    if (key.startsWith('cartObj')) {
      const keyy=JSON.parse(localStorage.getItem(key))
      let obj={
        cyProductID:keyy.value,
        quantity: keyy.quan,
        orderItemID: 0,
      }
      funcc(obj)
    }
  }
}

useEffect(()=>{
setXtFlagSpinnerShow(false)
},[xtflagSpinnerShow])

// for now if locale has any product or no=>>>
useEffect(()=>{
  setLocalBasket([])
  getLocalStorageProd(function (obj) {
    setLocalBasket(prev=>[...prev,obj])
  })
  },[])  

console.log(localbasket)
  return (
    <div className={`${style.div_main} centerc`}>
       <img className={style.img} src="../../../../../images/register/8380015.jpg" alt="image" />
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
   {!flagInput ?    
   <>
<div className={`${style.div_input_B} centerr`}>
            <User size={40} color="#19a5af" weight="fill" />
          <div >
               <input
               className={`${style.div_input_div} `}
              minLength={3}
                name="name"
                type="name"
                placeholder="نام خانوادگی "
                {...register(`name`, registerOptions.userName)}
              />
  
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>


          <div className={`${style.div_input_B} centerr`}>
            <DeviceMobile  size={40} color="#19a5af" weight="fill" />
          

            <div className={`${style.card_div} card flex justify-content-center login_label_float`} >
          
                <InputMask className={`${style.inputmask}`} value={token} integerOnly length={11} onChange={(e) => setTokens(e.value)} inputTemplate={customInput} mask="99999999999" placeholder="شماره همراه"/>
            <label>شماره همراه</label>
          
        </div>
          </div>

          <div className={`${style.div_input_B} centerr`}>
            <Key size={40} color="#19a5af" weight="fill" />
            <div >
              <input 
              className={`${style.div_input_div} `}
              // minLength={6}
              name="password"
               type="password"
                placeholder="رمزعبور "
               
                {...register(`password`, {
                  required: "رمز عبور را وارد نمایید (حداقل 4 کاراکتر ) ",
                  minLength : {
                    value: 4,
                    message: 'رمز عبور وارد شده نباید کمتر از 4 کاراکتر باشد ' // JS only: <p>error message</p> TS only support string
                  }
              })}
                 />
                 {err1 && <p className={`${style.err_p}`} >{err1}</p>}
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

          
          <div className={`${style.div_input_B} centerr`}>
            <Key size={40} color="#19a5af" weight="fill" />
            <div >
              <input 
              className={`${style.div_input_div} `}
              // minLength={6}
              name="password"
               type="password"
                placeholder="تکرار رمزعبور "
               
                {...register(`passwordRepeat`, {
                  required: "رمز عبور را وارد نمایید (حداقل 4 کاراکتر ) ",
                  minLength : {
                    value: 4,
                    message: 'رمز عبور وارد شده نباید کمتر از 4 کاراکتر باشد ' // JS only: <p>error message</p> TS only support string
                  }
              })}
                 />
                 {err1 && <p className={`${style.err_p}`} >{err1}</p>}
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

   <div>
        <h1 className={flagErrorCheckbox ? `${style.chekbox}` : ''}>
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
</>
   :
   <>
               <div className={`${style.card_div} card flex justify-content-center`} >
               <InputOtp value={tokenB} length={6}  onChange={(e) => setTokensB(e.value)} integerOnly  inputTemplate={customInputB}/>

<button type="submit" className={tokenB.length==6 ? `${style.buttonB} btn btn-primary` : `${style.buttonB2} btn btn-primary`}
>ارسال کد تایید</button>  
</div>

</>
   }



 

        </form>
        <>


      <Modal
        show={showB}
        onHide={handleCloseB}
        backdrop="static"
        keyboard={false}
      >
   
        <Modal.Body>
سبد خرید شما بروزرسانی شد...
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseB}>
            Close
          </Button> */}
          <Button variant="primary"onClick={()=>{
              setCartCounter(0)
              setXtFlagLogin(true)
              setBasketFlag(prev=>!prev)
          reset(setValue(''))
          router.push('/') 
          }}>باشه...</Button>
        </Modal.Footer>
      </Modal>
    </>
      </div>

   

  



      
    </div>
  );
}
