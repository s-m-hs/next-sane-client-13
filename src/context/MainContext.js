'use client'
// import { createContext } from "react";



// export const MainContext=createContext()



import React, { createContext, useState } from 'react';

const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [xtFlag, setXtFlag] = useState(false);

    return (
        <MainContext.Provider value={{xtFlag, setXtFlag}}>
            {children}
        </MainContext.Provider>
    );
};

export { MainContext, MainProvider };