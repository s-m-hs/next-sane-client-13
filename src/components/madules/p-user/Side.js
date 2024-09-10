// components/Sidebar.js

import React, { useState } from 'react';
import styles from './Side.module.css';
import Link from 'next/link';
import { UserList,AddressBook,ShoppingBagOpen,PaperPlaneTilt,SignOut } from "@phosphor-icons/react";

const Side = () => {
  const [activeLink, setActiveLink] = useState(null); // Track the active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link when clicked
  };


  return (
    <aside className={styles.sidebar}>
      <p>پنل کاربری </p>

      <Link href="/p-user/profile"
       className={activeLink === 'profile' ? styles.active : ''}
       onClick={() => handleLinkClick('profile')}
      >
      <UserList size={32} weight="light" />       پروفایل من
      </Link>

      <Link href="#"
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

      <Link href={'/'}>
      <SignOut size={32} weight="light" />        خروج
      </Link>
    </aside>
  );
};

export default Side;
