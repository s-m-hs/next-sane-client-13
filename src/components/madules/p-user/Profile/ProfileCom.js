'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './Prifile.module.css'
import { useForm } from "react-hook-form";
import { IdentificationBadge,IdentificationCard,UserCircle ,DeviceMobile ,EnvelopeSimple ,CheckCircle,CheckFat,Asterisk   } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';



export default function ProfileCom() {
  // const getLocalStorage=localStorage.getItem('loginToken')
let {cyUserID,username,name,family,email,mobile,xtFlagLogin,setFlagProfile,setXtFlagSpinnerShow,xtflagSpinnerShow}=useContext(MainContext)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
 
  const handleError = (errors) => {
  alertB()
  };
  //////////////////////
  const alertA=()=>alertN('center','success'," اطلاعات با موفقیت ثبت شد",1500).then((res) => {
    // setXtFlagLogin(true)
  reset(setValue(''))
  router.push('/') 
  });
  const alertB=()=>alertN('center','error'," اطلاعات مورد نیاز را به درستی وارد کنید...",1000).then((res) => {
 
  });
  const router = useRouter()
  // console.log(errors?.update)
////////////////////////
const handleRegistration=(data)=>{
  // console.log(data);
 
      let obj={
  id: 0,
  cyUserID: cyUserID,
  name: data.update.name,
  family: data.update.family,
  email: data.update.email,
  website: "string",
  mobile: data.update.mobile,
  description: "string",
  userImageUrl: "string",
  // username:data.update.userName
  username:username
}
// console.log(obj)
async function myApp(){
  const getLocalStorage=localStorage.getItem('loginToken')
  const res=await fetch(`${apiUrl}/api/Customer/UpdateProfile`,{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${getLocalStorage}`
    },
    body:JSON.stringify(obj)
  }).then(res=>{
    // console.log(res)
if(res.status==200){
  alertA()
  return res.json()
}
  }
  ).then(result=>{
    setFlagProfile(prev=>!prev)
    // console.log(result)
  })
}

myApp()
    }





const update = () => {
  setValue("update", {
    name: name ? `${name}` : "",
    family: family ? `${family}` : "",
    email: email ? `${email}` : "",
    mobile: mobile ? `${mobile}` : "",

    // website: website ? `${website}` : "",
    // description: description ? `${description}` : "",
    // userName: getProfile.username ? `${username}` : "",
  });
};

//////////////////////
useEffect(()=>{
  setXtFlagSpinnerShow(false)
  },[xtflagSpinnerShow])
    
useEffect(()=>{
  setFlagProfile(prev=>!prev)

},[])

useEffect(()=>{
  update() 

},[mobile,xtFlagLogin])

// console.log(errors.update.mobile)
  return (
    
        <div >
              <Tabs
    defaultActiveKey="home"
    id="fill-tab-example"
    className="mb-2"
    // fill
    // onSelect={ffc}
  // onClick={()=>ffc(id)}
  >
    <Tab eventKey="home" title=" پروفایل من" style={{ background: 'inherit' }}>
<div className={`container ${style.container}`}>
<div className={ `row ${style.row}`}>

<div className={`col ${style.col} boxSh` }>
  <form  action=""
          onSubmit={handleSubmit(handleRegistration, handleError)}>
<div className={`container ${style.containerB}`}>
<div className={ `row ${style.rowB}`}>

<div className={` col-md-12 col-lg-6 ${style.colB}` }>

<div className={ `login_label_float ${style.input} centerr`}  >
              <input
              className={errors?.update?.name ? style.error : ''}
              minLength={3}
                name="update.name"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`update.name`, {
                  required: true,minLength: 3
                })}
              />
              <label><Asterisk size={12} color="#14a5af" weight="thin" />  نام  </label>
              <IdentificationBadge size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div>  

<div className={ `login_label_float ${style.input}`}>
              <input
               className={errors?.update?.family ? style.error : ''}
              minLength={3}
                name="update.family"
                type="userName"
                placeholder=" "
                {...register(`update.family`, {
                  required: true,minLength: 3
                })}
              />
              <label><Asterisk size={12} color="#14a5af" weight="thin" />نام خانوادگی </label>
              <IdentificationCard  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  

            {/* <div className={ `login_label_float ${style.input}`}>
              <input
            value={username.toUpperCase()}
            name="update.userName"

            disabled
              />
              <label>نام کاربری </label>
              <UserCircle  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>   */}
            
            </div>
<div className={` col-md-12 col-lg-6 ${style.colB}` }>
<div className={ `login_label_float ${style.input}`}>
              <input
               className={errors?.update?.mobile ? style.error : ''}
              minLength={3}
                name="update.mobile"
                type="number"
                placeholder=" "
                {...register(`update.mobile`,{ required: true,minLength: 11 })}
              />
              <label><Asterisk size={12} color="#14a5af" weight="thin" /> موبایل  </label>
              <DeviceMobile  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  

<div className={ `login_label_float ${style.input}`}>
              <input
              minLength={3}
                name="update.email"
                type="email"
                placeholder=" "
                {...register(`update.email`,)}
              />
              <label>ایمیل  </label>
              <EnvelopeSimple  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  

            <div className={ `login_label_float ${style.input}`}>
              <input
              minLength={3}
                name="userImageUrl"
                type="userName"
                placeholder=" "
              />
              <label>عکس پروفایل</label>
              <IdentificationBadge size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  
</div>
</div>
</div>

<div className={`col ${style.col_button}`} >
<button className={`btn btn-info ${style.button}`} > 
  تایید
  <CheckCircle  size={32} color="#fff" weight="duotone" />
</button>

</div>

  </form>


</div>



</div>


</div>
   
    {/* </Tab>
    <Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}> */}

   
</Tab>

  </Tabs>
        </div>
 )
}
