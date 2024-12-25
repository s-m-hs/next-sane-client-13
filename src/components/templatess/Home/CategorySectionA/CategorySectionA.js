"use client";
import React, { useEffect, useState } from "react";
import CardA from "@/components/madules/Cards/CardA/CardA";
import styles from "./CategorySectionA.module.css";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";


export default function CategorySectionA({categoryId,title}) {
  const [mainCategory, setMainCategory] = useState({});
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);
// console.log(mainCategory);

const clickHandler=()=>{
  setFlagSpinnerShow(true)
}
// console.log(mainCategory);
  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: categoryId,
      str: "string",
    };
postApi('/api/CyProductCategory/GetItemWChildAndRoot',obj,setMainCategory)
  };

  ////////////////////////////
  useEffect(() => {
    getCategoryById();
  }, []);

  // console.log(mainCategory)
  return (
    <>
         {flagSpinnerShow && <div className={`row ${styles.spinner_row}`}>


</div>}
      <div className="container">
        <div  className={`row mt-1 ${styles.title_row}`}>
          <div
            className="col"
            style={{ marginRight: "50px", marginTop: "30px" }}
          >
            <h1 className={styles.title}>{`دسته بندی ${title}:`}</h1>
          </div>
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
              // click={console.log(item)}
              datos='fade-up'
                key={item.id}
                imgSrc={item.imageUrl}
                category={`category`}
                id={item.id}
                text={item.name
                }
              />
            ))}
          </div>
             <div className={`row row-cols-auto  ${styles.bcatitemB}`}>
             {mainCategory.childs.map((item, index) => (
               <CardA
              //  click={console.log(item)}
               datos=''
                 key={item.id}
                 imgSrc={item.imageUrl}
                 category={`category`}
                 id={item.id}
                 text={item.name
                 }
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
