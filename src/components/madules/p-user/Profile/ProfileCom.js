'use client'
import React, { useContext, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './Prifile.module.css'
import { useForm } from "react-hook-form";
import { IdentificationBadge,IdentificationCard,UserCircle ,DeviceMobile ,EnvelopeSimple ,CheckCircle,CheckFat   } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';



export default function ProfileCom() {
  const getLocalStorage=localStorage.getItem('loginToken')
let {cyUserID,username,name,family,email,mobile,xtFlagLogin}=useContext(MainContext)
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
  const alertA=()=>alertN('center','success'," اطلاعات با موفقیت ثبت شد",1500).then((res) => {
    // setXtFlagLogin(true)
  reset(setValue(''))
  router.push('/') 
  });
  const router = useRouter()
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
  username:username
}
console.log(obj)
async function myApp(){
  const res=await fetch(`${apiUrl}/api/Customer/UpdateProfile`,{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${getLocalStorage}`
    },
    body:JSON.stringify(obj)
  }).then(res=>{
    console.log(res)
if(res.status==200){
  alertA()
  return res.json()
}
  }
  ).then(result=>console.log(result))
}

myApp()

}
console.log(name)


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
useEffect(()=>{
  update() 

},[xtFlagLogin])


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
              minLength={3}
                name="update.name"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`update.name`,)}
              />
              <label>نام  </label>
              <IdentificationBadge size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div>  

<div className={ `login_label_float ${style.input}`}>
              <input
              minLength={3}
                name="update.family"
                type="userName"
                placeholder=" "
                {...register(`update.family`, registerOptions.family)}
              />
              <label>نام خانوادگی </label>
              <IdentificationCard  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  

            <div className={ `login_label_float ${style.input}`}>
              <input
            value={username.toUpperCase()}
            disabled
                // {...register(`userName`, registerOptions.userName)}
              />
              <label>نام کاربری </label>
              <UserCircle  size={38} color="#14a5af" weight="duotone"className={style.icon} />

            </div>  
            
            </div>
<div className={` col-md-12 col-lg-6 ${style.colB}` }>
<div className={ `login_label_float ${style.input}`}>
              <input
              minLength={3}
                name="update.mobile"
                type="number"
                placeholder=" "
                {...register(`update.mobile`, registerOptions.mobile)}
              />
              <label> موبایل  </label>
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
