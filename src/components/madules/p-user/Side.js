'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from './Side.module.css';
import Link from 'next/link';
import { UserList,AddressBook,ShoppingBagOpen,PaperPlaneTilt,SignOut } from "@phosphor-icons/react";
import { MainContext } from '@/context/MainContext';
import { useRouter,usePathname } from 'next/navigation';
import alertKey from '@/utils/Alert/AlertKey';

const Side = () => {
  const [activeLink, setActiveLink] = useState('profile'); // Track the active link
let {setXtFlagLogin,setCartCounter}=useContext(MainContext)
const rout=useRouter()
const pathname = usePathname();

console.log(pathname)
  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link when clicked
  };
  const exitHandler=()=>{
 
  alertKey("question",'برای خروج از پنل کاربری اطمینان دارید؟؟؟').then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('loginToken')
      setXtFlagLogin(false)
      setCartCounter(0)
      rout.push('/')

    }
  });
}

useEffect(()=>{
  if(pathname==='/p-user/address'){
    setActiveLink('address')
  }

  else if(pathname==='/p-user/order'){
    setActiveLink('order')
  }
   else if(pathname==='/p-user/ticket'){
    setActiveLink('ticket')
  }
},[])


  return (
    <aside className={styles.sidebar}>
      <p>پنل کاربری </p>

      <Link href="/p-user/profile"
       className={activeLink === 'profile' ? styles.active : ''}
       onClick={() => handleLinkClick('profile')}
      >
      <UserList size={32} weight="light" />       پروفایل من
      </Link>

      <Link href={"/p-user/address"}
           className={activeLink === 'address' ? styles.active : ''}
           onClick={() => handleLinkClick('address')}
      >
      <AddressBook size={32} weight="light" />        آدرس
      </Link>

      <Link href={"/p-user/order"}
        className={activeLink === 'order' ? styles.active : ''}
        onClick={() => handleLinkClick('order')}>
      <ShoppingBagOpen size={32} weight="light" />سفارشات      </Link>

      <Link href={"/p-user/ticket"}
           className={activeLink === 'ticket' ? styles.active : ''}
           onClick={() => handleLinkClick('ticket')}>
      <PaperPlaneTilt size={32} weight="light" />        تیکت ها
      </Link>

      {/* <Link href={'/'}  onClick={exitHandler}> */}
      <span className={styles.span} onClick={exitHandler}>
      <SignOut size={32} weight="light"   />        خروج

      </span>
      {/* </Link> */}
    </aside>
  );
};

export default Side;
