"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./LoginRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash,DeviceMobile } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams, usePathname, useRouter } from 'next/navigation'
import {sha512} from "js-sha512";
import apiUrl from "@/utils/ApiUrl/apiUrl";
// import getLocalStorage from "@/utils/localStorag/localStorage";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import { InputOtp } from 'primereact/inputotp';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { InputMask } from "primereact/inputmask";
import alertQ from "@/utils/Alert/AlertQ";
import alertP from "@/utils/Alert/AlertP";




export default function LoginRight() {
const [rgister,setRegister]=useState('')
const [token, setTokens] = useState('09');
const [tokenB, setTokensB] = useState('09');
const [tokenC, setTokensC] = useState('');
const [err1,setErr1]=useState('')
const [show, setShow] = useState(false);
const [showB, setShowB] = useState(false);

const [recoveryFlag,setRecoveryFlag]=useState(false)
const [onlyOkFlag,setOnlyOkFlag]=useState(false)
const[pass1,setPass1]=useState('')
const[pass2,setPass2]=useState('')

const[localbasket,setLocalBasket]=useState([])

const classRefA=useRef()
const classRefB=useRef()
const customInput = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-input" />;
const customInputB = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-inputB" />;

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


const handleCloseB = () => setShowB(false);
const handleShowB = () => setShowB(true);
const router = useRouter()
const pathname=usePathname()
let {xtFlagLogin,setXtFlagLogin,setLocalToken,setBasketFlag,setXtFlagSpinnerShow,xtflagSpinnerShow, flagHamkar,setFlagHamkar,setLocalUpdateBasket,setCartCounter}=useContext(MainContext)


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
  //////////////////////
  const alertA=()=>alertN('center','success'," خوش آمدید",1500).then((res) => {
    setXtFlagLogin(true)
    setBasketFlag(prev=>!prev)
reset(setValue(''))
router.push('/') 
});


const alertB=()=>alertN('center','error',"دوباره امتحان کنید...",1500)
const alertC=()=>alertN('center','error',"  شماره همراه را به درستی وارد نشده است ...",1500)
const alertD=()=>alertN('center','error'," رمز ورود باید بیشتر از 3 کاراکتر باشد...",1500)
const alertF=()=>alertN('center','error'," رمز ورود با رمز تکرار یکسان نیست  ...",1500)
const alertG=()=>alertN('center','success'," رمز ورود با موفقیت تغییر کرد",1500).then((res) => {
  setShow(false)
  reset(setValue(''))

})

const alertH=()=>alertN('center','success',"",1500).then((res) => {
  classRefB.current.classList.remove( `${style.buttonB}`)
  classRefB.current.classList.add( `${style.buttonB2}`)
  sendverifyCode()
  // classRefA.current.classList.remove(`${style.hide}`)
  
  })
  const alertJ=()=>alertN('center','success',"",3000).then((res) => {
 sendMobToRecovery()
    
    })

    const alertK=()=>alertN('center','error'," کد وارد شده نادرست و یا منقضی شده است ...",1500)

    const chengePass1=(e)=>{
setPass1(e.target.value)
}

const chengePass2=(e)=>{
  setPass2(e.target.value)
  }

const sendverifyCode=()=>{
  const getLocalStorage=localStorage.getItem('loginToken')

  let obj={
    valadationCode: tokenC,
    username:tokenB
  }
  // console.log(obj)
  async function myApp(){
    const res=await fetch(`${apiUrl}/api/Customer/verifyCode`,{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${getLocalStorage}` ,
      },
      body:JSON.stringify(obj)
    }).then(res=>{
      if(res.ok){
        console.log(res)
        // return res.json()
        classRefA.current.classList.remove(`${style.hide}`)

      }else {
        alertK()      }
    })
  }
  myApp()
}

const sendCodeToRecovery=()=>{
  const getLocalStorage=localStorage.getItem('loginToken')

  if(pass1.length<4 || pass2.length<4){
    alertD()
  }else if(pass1 !== pass2){ 
    alertF()
  }
  else if(pass1 === pass2){
   async function myApp(){
  const res=await fetch(`${apiUrl}/api/Customer/recoverPassword?phoneNumber=${tokenB}&password=${pass1}`,{
    method:'PUT',
    headers:{
      "Content-Type": "application/json",
      Authorization:`Bearer ${getLocalStorage}` ,
    },
  }).then(res=>{
    if(res.ok){
      alertG()
      setOnlyOkFlag(false)
      setRecoveryFlag(false)
    }
  })
} 
myApp()
  }

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
        // classRefB.current.classList.add('loginRight-show')
        setOnlyOkFlag(true)

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
        return res.json().then(result=>{
          if(result){
            localStorage.setItem('loginToken',result.token)
            setLocalToken(result.token)
    if(localbasket?.length==0){
      alertA()
    }else{
      for (let i = 0; i < localStorage.length; i++) {
      
        const key = localStorage.key(i);
        if (key.startsWith('cartObj')) {
          const keyy=JSON.parse(localStorage.getItem(key))
          let obj={
            cyProductID:keyy.value,
            quantity: keyy.quan,
            orderItemID: 0,
          }
          console.log(obj)
          addToBasket(obj)
          localStorage.removeItem(key)
        }
      }
    
      handleShowB()
    }
    
          }else{
            alertB()
          }
        })
      }
    })
  }
  myAppPost()

}
//////////////////////////////
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
///////////////////////////////

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
    

<div className={`${style.div_input_B} centerr`}>
            <DeviceMobile  size={40} color="#19a5af" weight="fill" />
          

            <div className={`${style.card_div} card flex justify-content-center login_label_float`} >
            {/* <style scoped>
          
            </style> */}
         
            <InputMask className={`${style.inputmask}`} value={token} integerOnly length={11} onChange={(e) => setTokens(e.value)} inputTemplate={customInput} mask="99999999999" placeholder="091...."/>
            <label>شماره همراه</label>
        
            {/* <InputOtp value={token} integerOnly length={11} onChange={(e) => setTokens(e.value)} inputTemplate={customInput}/> */}
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

{flagHamkar &&  
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
              <label>رمزعبور همکار</label>
              <button className={`${style.help_Button} btn btn-warning`}>راهنمایی</button>
            </div>
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>}
         

   <div>
  
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
            {!recoveryFlag && !onlyOkFlag ?  <h3>شماره همراه خود را وارد کنید :</h3> :
             <h3>کد تایید را وارد کنید ...</h3>
}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {(!recoveryFlag && !onlyOkFlag)  ?    <div className={`${style.card_div} card flex justify-content-center`} >
            <style scoped>
          
            </style>

            <InputOtp value={tokenB} integerOnly length={11} onChange={(e) => setTokensB(e.value)} inputTemplate={customInput}/>
        </div> : 
            <div className={`${style.card_div} card flex justify-content-center`} >
            <InputOtp value={tokenC} length={6}  onChange={(e) => setTokensC(e.value)} integerOnly  inputTemplate={customInputB}/>

<button ref={classRefB} type="submit" className={tokenC.length==6 ? `${style.buttonB} btn btn-primary mt-3` : `${style.buttonB2} btn btn-primary mt-3`}
onClick={()=>{
  alertH()
  // classRefB.current.classList.remove( `${style.buttonB}`)
  // classRefB.current.classList.add( `${style.buttonB2}`)
  // classRefA.current.classList.remove(`${style.hide}`)
  }}
>ارسال کد تایید
{/* <ClockLoader color="#efefef" /> */}
</button>  
</div>}
    
    <>
    <section ref={classRefA} className={`${style.hide}`} style={{ margin:'20px' ,padding:'5px'}}>
          <div className={`${style.div_inputC} centerr`}>
            <Key size={30} color="#19a5af" weight="fill" />
            <div >
              <input 
              className={`${style.div_input_div} `}
              // minLength={6}
              name="password"
               type="text"
                placeholder="رمزعبور "
       value={pass1}
       onChange={chengePass1}
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
              // minLength={4}
              name="password"
               type="text"
                placeholder="تکرار رمزعبور "
                value={pass2}
                onChange={chengePass2}
               
         
                 />
                 {err1 && <p className={`${style.err_p}`} >{err1}</p>}
            </div>

            
  
            {/* <EyeSlash className={style.eyeicon} size={24} color="#19a5af" /> */}
          </div>

          <button className={`${style.buttonB} btn btn-info mt-2`}
          onClick={sendCodeToRecovery}
          >تایید</button>
    </section>


          {/* <button type="submit" className={`${style.buttonB} btn btn-info mt-3`}
      >تایید</button> */}
    </>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            handleClose()
            setRecoveryFlag(false)
            setTokensC('')
            setPass1('')
            setPass2('')
          } }>
            بستن
          </Button>
          {!recoveryFlag && !onlyOkFlag && <Button variant="primary" onClick={()=>alertJ()} >تایید</Button>
        }
          {/* <Button ref={classRefA} className={`${style.hide}`} variant="primary" onClick={()=>sendMobToRecovery()} >تایید</Button> */}
        </Modal.Footer>
      </Modal>


      <>
      <Button variant="primary" onClick={handleShowB}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={showB}
        onHide={handleCloseB}
        backdrop="static"
        keyboard={false}
      >
   
        <Modal.Body>
سبد خردید شما بروزرسانی شد...
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseB}>
            Close
          </Button> */}
          <Button variant="primary"onClick={()=>{
              setLocalUpdateBasket([])
              setCartCounter(0)
              setXtFlagLogin(true)
              setBasketFlag(prev=>!prev)
          reset(setValue(''))
          router.push('/') 
          }}>باشه...</Button>
        </Modal.Footer>
      </Modal>
    </>


    </>

  



      
    </div>
  );
}
