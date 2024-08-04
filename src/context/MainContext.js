'use client'
// import { createContext } from "react";



// export const MainContext=createContext()



import React, { createContext, useState } from 'react';

const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [xtFlagLogin, setXtFlagLogin] = useState(false);
    const [xtflagSpinnerShow, setXtFlagSpinnerShow] = useState(false);
    const [cartCounter, setCartCounter] = useState(0)
    const [localUpdateBasket,setLocalUpdateBasket]=useState([])



    return (
        <MainContext.Provider value={{xtFlagLogin, setXtFlagLogin,xtflagSpinnerShow, setXtFlagSpinnerShow,cartCounter, setCartCounter, localUpdateBasket,
            setLocalUpdateBasket,}}>
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };