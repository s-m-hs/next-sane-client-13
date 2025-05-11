"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import apiUrl from "@/utils/ApiUrl/apiUrl";
// import getLocalStorage from '@/utils/localStorag/localStorage';
const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [xtFlagLogin, setXtFlagLogin] = useState(false);
  const [xtflagSpinnerShow, setXtFlagSpinnerShow] = useState(false);
  const [flagProfile, setFlagProfile] = useState(false);
  const [flagAddress, setFlagAddress] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);
  const [localUpdateBasket, setLocalUpdateBasket] = useState([]);
  const [basketFlag, setBasketFlag] = useState(false);
  const [getBasket, setGetBasket] = useState([]);
  const [localToken, setLocalToken] = useState("");
  const [cyUserID, setCyUserID] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState(null);
  const [userSrc, setUserSrc] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [flagThem, setFlagThem] = useState(false);
  const [flagMessageNotification, setFlagMessageNotification] = useState(false);
  const [messageNotification, setMessageNotification] = useState([]);
  const [authority, setAuthority] = useState("");
  const [zarrinStatus, setZarrinStatus] = useState("");
  const [flagHamkar, setFlagHamkar] = useState(false);
  const [verifyHamkar, setVerifyHamkar] = useState(false);
  const [offer, setOffer] = useState();
  const [resetFlagCart, setResetFlagCart] = useState(true);
  const [paymentState, setPaymentState] = useState(false);
  const [coupon, setCoupon] = useState([]);
  const [couponState, setCouponState] = useState(false);

  // const getLocalStorage=localStorage.getItem('loginToken')

  const getBaskett = () => {
    const getLocalStorage = localStorage.getItem("loginToken");

    setGetBasket([]);

    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/CyOrders/GetBasketForUser`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              if (result.cyOrderItems) {
                setGetBasket(result.cyOrderItems);
                setCartCounter(result.cyOrderItems?.length);
              }
            });
          }
        })

        .catch((err) => console.log(err));
    }
    myAppGet();
  };

  const getProfile = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/Customer/GetProfile`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
          // Authorization:`Bearer ${localToken ? localToken : getLocalStorage }`
        },
      })
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          if (result) {
            setCyUserID(result.cyUserID);
            setUsername(result.username);
            setName(result.name);
            setFamily(result.family);
            setEmail(result.email);
            setMobile(result.mobile);
            setUserSrc(result.userImageUrl);
          }

          // console.log(result)
        });
    }
    myApp();
  };
  const getAddress = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyAddress`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localToken ? localToken : getLocalStorage}`,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result);
          setAddress(result);
        });
    }
    myApp();
  };

  const getActiveCoupon = (userId) => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyCoupon/getActiveCouponByUserId?userId=${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json().then((result) => {
            console.log(result);
            setCoupon(result);
          });
        }
      });
    }
    myApp();
  };
  useEffect(() => {
    if (cyUserID) {
      getActiveCoupon(cyUserID);
    }
  }, [cyUserID]);

  console.log(coupon);

  const refreshToken = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/Customer/refreshToken`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              setXtFlagLogin(true);
            });
          } else {
            setXtFlagLogin(false);
          }
        })
        .catch((err) => {
          setXtFlagLogin(false);
        });
    }
    myApp();
  };
  const intervalId = () => {
    setInterval(() => {
      refreshToken();
    }, 600000);
  };

  useEffect(() => {
    refreshToken();
    intervalId();
    clearInterval(intervalId);
  }, []);

  /////////////////////////
  useEffect(() => {
    if (xtFlagLogin) {
      getProfile();
      getAddress();
    }
  }, [xtFlagLogin, flagProfile, flagAddress]);

  useEffect(() => {
    if (xtFlagLogin) {
      getBaskett();
    }
  }, [basketFlag, xtFlagLogin]);

  return (
    <MainContext.Provider
      value={{
        xtFlagLogin,
        setXtFlagLogin,
        xtflagSpinnerShow,
        setXtFlagSpinnerShow,
        cartCounter,
        setCartCounter,
        localUpdateBasket,
        setLocalUpdateBasket,
        basketFlag,
        setBasketFlag,
        getBasket,
        setGetBasket,
        localToken,
        setLocalToken,
        cyUserID,
        setCyUserID,
        username,
        setUsername,
        name,
        family,
        email,
        mobile,
        setFlagProfile,
        address,
        setAddress,
        flagAddress,
        setFlagAddress,
        nameCategory,
        setNameCategory,
        flagThem,
        setFlagThem,
        flagMessageNotification,
        setFlagMessageNotification,
        messageNotification,
        setMessageNotification,
        userSrc,
        setUserSrc,
        authority,
        setAuthority,
        zarrinStatus,
        setZarrinStatus,
        flagHamkar,
        setFlagHamkar,
        verifyHamkar,
        setVerifyHamkar,
        offer,
        setOffer,
        resetFlagCart,
        setResetFlagCart,
        paymentState,
        setPaymentState,
        coupon,
        setCoupon,
        couponState,
        setCouponState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
