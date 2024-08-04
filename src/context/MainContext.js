'use client'
// import { createContext } from "react";



// export const MainContext=createContext()



import React, { createContext, useState } from 'react';

const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [xtFlag, setXtFlag] = useState(false);
    const [xtflagSpinnerShow, setXtFlagSpinnerShow] = useState(false);
    const [cartCounter, setCartCounter] = useState(0)


    return (
        <MainContext.Provider value={{xtFlag, setXtFlag,xtflagSpinnerShow, setXtFlagSpinnerShow,cartCounter, setCartCounter}}>
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };