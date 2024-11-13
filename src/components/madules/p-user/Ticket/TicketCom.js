import React, { useContext, useRef, useState } from 'react'
import style from './TicketCom.module.css'
import { useForm } from "react-hook-form";
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { MainContext } from '@/context/MainContext';

export default function TicketCom() {
let{cyUserID,mobile}=useContext(MainContext)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
      } = useForm({
        defaultValues: {},
      });
      const handleError = (errors) => {};

    // const[tickettitle,setTickettitle]=useState('')
    // const[ticketFirstDetaile,setTicketFirstDetaile]=useState('')


    const classRefA=useRef()

const handleRegistration=(data)=>{
  const getLocalStorage = localStorage.getItem('loginToken')

    console.log(data)
let obj={
  id: 0,
  topic: data.detail,
  title: data.title,
  userId: cyUserID,
  phoneNumber: mobile,
  status: 1,
  openedAt: "2024-11-13T13:52:11.320Z",
  closedAt: "2024-11-13T13:52:11.320Z"
}
console.log(obj)
    async function myApp(){
      const res= await fetch(`${apiUrl}/api/CyTicket/createTicket`,{
        method:'POST',
     
          headers: {
            Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj)
      }).then(res=>{
        console.log(res)
        if(res.status==200){
          res.json()
        }
      }).then(result=>{
        console.log(result)
        async function myApp(){
          const res=await fetch(``)
        }

      })
    }
    myApp()

}




  return (
    <div className='container'>

        <div className='row mt-1 boxSh'>
            <div className='col-lg-1'>
                <button className='btn btn-primary btn-lg'
                onClick={()=>{
                    console.log('object')
                    classRefA.current.classList.remove('create_ticket')
                }}
                > ایجاد پیام جدید </button>
            </div>
            <div className='col-lg-11 create_ticket' ref={classRefA}>

          <form  action=""
                      onSubmit={handleSubmit(handleRegistration, handleError)}> 

          <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input 
                          placeholder='یک عنوان به دلخواه برای پیام خود بنویس...'
                          name='title'
                          {...register('title')}
                          />
                          {/* <label>
                            عنوان پیام 
                          </label> */}
                        </div>
               

                    
                        <div
              

                        >
                          <textarea
                          name='detail'
                          {...register('detail')}
                          className={`login_label_float ${style.textarea} centerr`}
                    placeholder='پیامت اینجا بنویس'
                          />
                   
                        </div>

                        <button className={`btn btn-info ${style.createbutton}`}
                        
                        >ارسال پیام</button>
                    
          </form>
                    

            </div>
        </div>

        <div className='row'></div>
    </div>
  )
}
