'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './Prifile.module.css'
import { useForm } from "react-hook-form";
import { IdentificationBadge,IdentificationCard,UserCircle ,DeviceMobile ,EnvelopeSimple ,CheckCircle,CheckFat,Asterisk ,CloudArrowUp ,Image } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';



export default function ProfileCom() {
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");


  // const getLocalStorage=localStorage.getItem('loginToken')
let {cyUserID,username,name,family,email,mobile,userSrc,xtFlagLogin,setFlagProfile,setXtFlagSpinnerShow,xtflagSpinnerShow}=useContext(MainContext)
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
function fileUploadHandler(file,setImgUrlll){

  // event.preventDefault()
  let formData = new FormData();
  formData.append('File', file)
  formData.append('Name', '')
  formData.append('Description', '')
  formData.append('IsPrivate', false)
  // console.log(formData.get('File')); 
  async function myAppPostFile() {
    const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
      method: 'POST',
      // headers: {
      //   // Authorization: `Bearer ${cmsContext.token.token}`,
      //   // 'accept': '*/*',
      //   // 'Content-Type': 'multipart/form-data',
      //   // // "Content-Type": "application/json",

      // },
      body: formData
    }).then(res => {
      // console.log(res)
      return res.json()
    }).then(
      (result) => {
        // console.log(result)
       setImgUrlll(result.adress)
       
      }
    ).catch(err=>console.log(err))
  }
  myAppPostFile()
}


const fileChange = (e) => {
  setFile(e.target.files[0]);
};

const fileChange2 = (e) => {
  setFile("");
  setImgUrl(e.target.value);
};

useEffect(() => {
  if (file) {
    fileUploadHandler(file, setImgUrl);
  }
}, [file]);

console.log(`${apiUrl}/${imgUrl}`)
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
  userImageUrl: `${apiUrl}/${imgUrl}`,
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
              disabled
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

            <div className={ `login_label_float ${style.input_img}`}>
                <div className={ ` ${style.profile_img_div}`}>
                <CloudArrowUp size={48} color='#fff' weight="duotone" />
                    <input
                    type="file"
                    placeholder="برای پروفایل خود یک عکس انتخاب کن..."
                    className={ ` ${style.profile_img_input}`} 
                    onChange={fileChange}
                  />
                  <h3>عکس پروفایل خود را انتخاب کنید...</h3>
                 
                  
                  <img
                    className={ ` ${style.profile_img_image}`} 
                    src= {userSrc ? userSrc :`${apiUrl}/${imgUrl}`}
                    alt=""
                  />{" "}
             
                </div  >
    
            </div>  
            <div  className={ ` ${style.url_image_div}`} >

              { imgUrl ? 
                <img 
                                className={ ` ${style.url_image}`} 

            src= { `${apiUrl}/${imgUrl}`} alt="profile-Image" /> :
<Image size={48} weight="duotone"  color='#14a5af'/>

              }
               

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
