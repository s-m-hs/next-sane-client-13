"use client";

import styles from "./sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import Social from "./Social";
import Side from "./Side";
// import swal from "sweetalert";

const Sidebar = () => {
  const path = usePathname();

  // const logoutHandler = () => {
  //   swal({
  //     title: "آیا از خروج اطمینان دارید؟",
  //     icon: "warning",
  //     buttons: ["نه", "آره"],
  //   }).then((result) => {
  //     //code
  //   });
  // };
  return (
    // <aside className={styles.sidebar}>
    //   <div className={styles.sidebar_header}>
    //     <p>خوش اومدی کاربر عزیز</p>
    //   </div>
    //   <ul className={styles.sidebar_main}>
    //     {/* {path.includes("/p-user") ? ( */}
    //       <>
    //         <Link href={"/p-user/profile"} className={styles.sidebar_link_active}>
    //           <ImReply />
    //           پروفایل من
    //         </Link>
            
    //         <Link href={"/p-user/order"}>
    //           <FaShoppingBag />
    //           سفارش ها
    //         </Link>
    //         <Link href={"/p-user/ticket"}>
    //           <MdSms />
    //           تیکت های پشتیبانی
    //         </Link>
    //         <Link href={"/p-user"}>
    //           <FaComments />
    //           کامنت ها
    //         </Link>
           
    //       </>
    //     {/* )
    //      : (
    //       <>
    //         <Link href={"/p-admin"} className={styles.sidebar_link_active}>
    //           <ImReply />
    //           پیشخوان
    //         </Link>

    //         <Link href={"/p-admin/products"}>
    //           <FaShoppingBag />
    //           محصولات
    //         </Link>
    //         <Link href={"/p-admin/users"}>
    //           <FaUsers />
    //           کاربران
    //         </Link>
    //         <Link href={"/p-admin/comments"}>
    //           <FaComments />
    //           کامنت ها
    //         </Link>

    //         <Link href={"/p-admin/tickets"}>
    //           <MdSms />
    //           تیکت ها
    //         </Link>
    //         <Link href={"/p-admin/discount"}>
    //           <MdOutlineAttachMoney />
    //           تخفیفات
    //         </Link>
    //       </>
    //     )} */}
    //   </ul>
    //   <div className={styles.logout} >
    //     <MdLogout />
    //     خروج
    //   </div>
    // </aside>
<>
<div>
      <Side/>
      <Social />
    </div>
</>
  );
};

export default Sidebar;
