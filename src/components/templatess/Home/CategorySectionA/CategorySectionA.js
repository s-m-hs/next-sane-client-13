"use client";
import React, { useEffect, useState } from "react";
import CardA from "@/components/madules/Cards/CardA/CardA";
import styles from "./CategorySectionA.module.css";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import Link from "next/link";

export default function CategorySectionA({ categoryId, title }) {
  const [mainCategory, setMainCategory] = useState({});
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);

  const clickHandler = () => {
    setFlagSpinnerShow(true);
  };
  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: categoryId,
      str: "string",
    };
    postApi("/api/CyProductCategory/GetItemWChildAndRoot", obj, setMainCategory);
  };

  ////////////////////////////
  useEffect(() => {
    getCategoryById();
  }, []);

  return (
    <>
      {flagSpinnerShow && <div className={`row ${styles.spinner_row}`}></div>}
      <div className="container">
        <div className={`row mt-1 ${styles.title_row}`}>
          <div className="col" style={{ marginRight: "50px", marginTop: "30px" }}>
            <h1 className={styles.title}>
              <span className={styles.title_bar}></span>
              {`دسته بندی ${title}`}
            </h1>
          </div>
          {/* <div className={`col-auto ${styles.more_col}`}>
            <Link href={`/category/${categoryId}`} className={styles.more_link}>
              مشاهده همه
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            </Link>
          </div> */}
        </div>
        {/* <div className="row">
              <div className="col-12 centerr">
                <SpinnerA size={300} />
              </div>
            </div> */}
        {!mainCategory.childs && (
          <>
            <div className="row">
              <div className="col-12 centerr">
                <SpinnerA size={300} />
              </div>
            </div>
          </>
        )}

        {mainCategory.childs && (
          <>
            <div className={`row row-cols-6  ${styles.bcatitem}`}>
              {mainCategory.childs.map((item, index) => (
                <CardA
                  datos="fade-up"
                  key={item.id}
                  imgSrc={item.imageUrl}
                  category={`category`}
                  id={item.id}
                  text={item.name}
                />
              ))}
            </div>
            <div className={`row row-cols-auto  ${styles.bcatitemB}`}>
              {mainCategory.childs.map((item, index) => (
                <CardA
                  datos=""
                  key={item.id}
                  imgSrc={item.imageUrl}
                  category={`category`}
                  id={item.id}
                  text={item.name}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>

    //  </div>
  );
}
