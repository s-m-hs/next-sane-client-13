import React, { useRef, useState } from 'react'
import style from './TicketCom.module.css'
import { useForm } from "react-hook-form";

export default function TicketCom() {
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
    console.log(data)
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
                          name='title'
                          {...register('title')}
                          />
                          <label>
                            عنوان پیام 
                          </label>
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
