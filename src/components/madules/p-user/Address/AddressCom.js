'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './AddressCom.module.css'
import { useForm } from "react-hook-form";
import { IdentificationBadge,City ,Mailbox  ,PhoneCall , DeviceMobile ,EnvelopeSimple ,CheckCircle,CheckFat,Asterisk   } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';
import alertN from '@/utils/Alert/AlertA';
export default function AddressCom() {

  let{address,setAddress}=useContext(MainContext)



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
      };
      const provinces = [
        { id: 1, name: 'تهران' },
        { id: 2, name: 'اصفهان' },
        { id: 3, name: 'خراسان رضوی' },
        { id: 4, name: 'فارس' },
        { id: 5, name: 'آذربایجان شرقی' },
        { id: 6, name: 'مازندران' },
        { id: 7, name: 'کرمان' },
        { id: 8, name: 'گلستان' },
        { id: 9, name: 'قم' },
        { id: 10, name: 'کرمانشاه' },
        { id: 11, name: 'هرمزگان' },
        { id: 12, name: 'سمنان' },
        { id: 13, name: 'لرستان' },
        { id: 14, name: 'آذربایجان غربی' },
        { id: 15, name: 'خراسان شمالی' },
        { id: 16, name: 'کهگیلویه و بویراحمد' },
        { id: 17, name: 'زنجان' },
        { id: 18, name: 'بوشهر' },
        { id: 19, name: 'سیستان و بلوچستان' },
        { id: 20, name: 'ایلام' },
        { id: 21, name: 'اردبیل' },
        { id: 22, name: 'یزد' },
        { id: 23, name: 'قزوین' },
        { id: 24, name: 'البرز' },
        { id: 25, name: 'خراسان جنوبی' },
        { id: 26, name: 'تهران بزرگ' }
      ];
      const handleRegistration = (data) => {
        const getLocalStorage=localStorage.getItem('loginToken')

        let obj = {
          id: 0,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          phone: data.phone,
          mobile: data.mobile
        }
        async function myAppPost() {
          const res = await fetch(`${apiUrl}/api/CyAddress/PostAddress
    `, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getLocalStorage}`,
            },
            body: JSON.stringify(obj)
          }).then(res => {
            console.log(res)
            if (res.ok) {
              return res.json()
            }
          }).then(result => {
            // setAddress(result)
           
            reset(setValue(''))
          }).catch(err => console.log(err))
        }
        myAppPost()
      }

console.log(address);

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
<Tab eventKey="home" title=" لیست آدرس های من" style={{ background: 'inherit' }}>
<div className={`container ${style.container}`}>
<div className={ `row ${style.row}`}>

<div className={`col ${style.col} boxSh` }>

<div className='row'>

<div className={`col-md-6 col-lg-6 ${style.col_6} `} >

<form   action=""
                onSubmit={handleSubmit(handleRegistration, handleError)}  >
<select 
                      className={ `login_label_float ${style.input_state} `}
                    //   style={{border:' 1px solid #EAEAEF' , width:'100%', color:'rgb(172 172 173)',outline:'none'}}
                      {...register("state")}>
                        {provinces.map((item,index) => <option key={index} value={`${item.name}`}>{item.name}</option>
                        )}
                      </select>

            <div className={ `login_label_float ${style.input} centerr`}  >
              <input
                name="city"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`city`)}
              />
              <label> شهر  </label>
              <City  size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div> 



            <div className={ `login_label_float ${style.input} centerr`}  >
              <input
                name="address"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`address`)}
              />
              <label> آدرس ... </label>
              <City  size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div> 

            <div className={ `login_label_float ${style.input} centerr`}  >
              <input
                name="postalCode"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`postalCode`)}
              />
              <label>  کد پستی  </label>
              <Mailbox  size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div> 

            <div className={ `login_label_float ${style.input} centerr`}  >
              <input
                name="phone"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`phone`)}
              />
              <label>  شماره ثابت  </label>
              <PhoneCall  size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div> 

            <div className={ `login_label_float ${style.input} centerr`}  >
              <input
                name="mobile"
                type="userName"
                placeholder=" "
                // value={name}
                {...register(`mobile`)}
              />
              <label>  شماره همراه  </label>
              <DeviceMobile  size={38} color="#14a5af" weight="duotone"className={style.icon} />
            </div> 

            <div className={`col ${style.col_button}`} >
<button className={`btn btn-info ${style.button}`} > 
  تایید
  <CheckCircle  size={32} color="#fff" weight="duotone" />
</button>

</div>
</form>


</div>


<div className={`col-md-6 col-lg-6 ${style.col_6}`} >
<table className='table'>

  <thead>
    <tr key="">
      <th>آدرس</th>
      <th>کدپستی</th>
      <th>تلفن ثابت/تلفن همراه</th>
      <th>حذف</th>
    </tr>
  </thead>

<tbody>

{address && address.map(item=>(
    <tr key="">
  <td> {item.state}-{item.city}-{item.address}  </td>
  <td>{item.postalCode}</td>
  <td>{item.phone}-{item.mobile}</td>
  <td><button className='btn btn-danger'>حذف</button></td>
  </tr>
))
}


</tbody>

</table>

</div>
</div>






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
