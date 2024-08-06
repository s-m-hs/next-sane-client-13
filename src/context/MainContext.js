'use client'

import React, { createContext, useEffect, useState } from 'react';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import { getLocalStorage } from '@/utils/localStorag/localStorage';

const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [xtFlagLogin, setXtFlagLogin] = useState(false);
    const [xtflagSpinnerShow, setXtFlagSpinnerShow] = useState(false);
    const [cartCounter, setCartCounter] = useState(0)
    const [localUpdateBasket,setLocalUpdateBasket]=useState([])
    const [basketFlag,setBasketFlag]=useState(false)
    const [getBasket,setGetBasket]=useState([])


    const getBaskett=()=>{  
        setGetBasket()  
          async function myAppGet(){
            const res=await fetch(`${apiUrl}/api/CyOrders/GetBasketForUser`,{
              method:'GET', 
               headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${getLocalStorage}`
              },
            }).then(res=>{
              console.log(res)
              return res.json()
            }).then(result=>{
              if(result.cyOrderItems){
                setGetBasket(result.cyOrderItems)  
    
              }
              // console.log(result.cyOrderItems)
            }).catch(err=>console.log(err))
          }
          myAppGet()
        }
        
        useEffect(()=>{ 
          getBaskett()
        },[basketFlag])
  

    return (
        <MainContext.Provider value={{xtFlagLogin, setXtFlagLogin,xtflagSpinnerShow, setXtFlagSpinnerShow,cartCounter, setCartCounter, localUpdateBasket,
            setLocalUpdateBasket,basketFlag,setBasketFlag,getBasket,setGetBasket}}>
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };