'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import getLocalStorage from '@/utils/localStorag/localStorage';
const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [xtFlagLogin, setXtFlagLogin] = useState(false);
    const [xtflagSpinnerShow, setXtFlagSpinnerShow] = useState(false);
    const [flagProfile,setFlagProfile]=useState(false)
    const [cartCounter, setCartCounter] = useState(0)
    const [localUpdateBasket,setLocalUpdateBasket]=useState([])
    const [basketFlag,setBasketFlag]=useState(false)
    const [getBasket,setGetBasket]=useState([])
    const [localToken,setLocalToken]=useState('')
    const[cyUserID,setCyUserID]=useState('')
    const[username,setUsername]=useState('')
    const [name,setName]=useState('')
    const [family,setFamily]=useState('')
    const [email,setEmail]=useState('')
    const [mobile,setMobile]=useState('')
    const [address,setAddress]=useState(null)
    // const getLocalStorage=localStorage.getItem('loginToken')


    const getBaskett=()=>{  
        setGetBasket([])  
          async function myAppGet(){
            const res=await fetch(`${apiUrl}/api/CyOrders/GetBasketForUser`,{
              method:'GET', 
               headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${localToken ? localToken : getLocalStorage }`
              },
            }).then(res=>{
              console.log(res)
              return res.json()
            }).then(result=>{
              console.log(result)
              if(result.cyOrderItems){
                setGetBasket(result.cyOrderItems)  
                setCartCounter(result.cyOrderItems?.length)
              }
              // console.log(result.cyOrderItems)
            }).catch(err=>console.log(err))
          }
          myAppGet()
        }

const getProfile=()=>{
async function myApp(){
  const res=await fetch(`${apiUrl}/api/Customer/GetProfile`,{
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${localToken ? localToken : getLocalStorage }`
    },
  }).then(res=>{
    console.log(res)
    if(res.status==200){
    return  res.json()
    }
  }).then(result=>{
    if(result){
   setCyUserID(result.cyUserID)
    setUsername(result.username)
    setName(result.name)
    setFamily(result.family) 
    setEmail(result.email)
    setMobile(result.mobile)   
    }
   
    console.log(result)
  }) 
}
myApp()
}
/////////////////////////
useEffect(()=>{
  getProfile()
},[xtFlagLogin,flagProfile])

        useEffect(()=>{ 
          getBaskett()
        },[basketFlag])
  

    return (
        <MainContext.Provider value={{xtFlagLogin, setXtFlagLogin,xtflagSpinnerShow, setXtFlagSpinnerShow,cartCounter, setCartCounter, localUpdateBasket,
            setLocalUpdateBasket,basketFlag,setBasketFlag,getBasket,setGetBasket,localToken,setLocalToken,cyUserID,setCyUserID,username,setUsername,name,family,email,mobile,setFlagProfile,address,setAddress}}>
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };