import React from "react";
import styles from "./userPanelLayout.module.css";
// import Topbar from "../madules/p-user/Topbar";
import Sidebar from "../madules/p-user/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        {/* <Sidebar /> */}
        <div className={styles.contents}>
          {/* <Topbar /> */}
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
