"use client";
import React, { useEffect, useState } from "react";
import CardA from "@/components/madules/Cards/CardA/CardA";
import styles from "./CategorySectionA.module.css";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";


export default function CategorySectionA({categoryId,title}) {
  const [mainCategory, setMainCategory] = useState({});
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);
console.log(mainCategory);
const  mainCategory2={
  "item": {
      "id": 3,
      "name": "لوازم جانبی",
      "code": "",
      "orderValue": 2,
      "rootId": null,
      "imageUrl": null,
      "description": null,
      "productCount": 0
  },
  "root": null,
  "childs": [
      {
          "id": 4,
          "name": "موس",
          "code": "mainmouse",
          "orderValue": 3,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/موس.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 5,
          "name": "کیبرد",
          "code": "mainkeyboard",
          "orderValue": 4,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/کیبرد44.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 6,
          "name": "کیبرد و موس",
          "code": "mainkey&mouse",
          "orderValue": 5,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/کیبرد وموس.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 7,
          "name": "پد موس",
          "code": "mainmouse",
          "orderValue": 6,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/پد موس.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 8,
          "name": "فن خنک کننده لپتاپ",
          "code": "maincoolpad",
          "orderValue": 7,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/کول پد.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 9,
          "name": "دسته بازی",
          "code": "maingamepad",
          "orderValue": 8,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/دسته بازی.png",
          "description": null,
          "productCount": 0
      },
      {
          "id": 10,
          "name": "ساعت هوشمند",
          "code": "mainwatch",
          "orderValue": 9,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/ساعت هوشمند.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 11,
          "name": "کابل",
          "code": "mainkable",
          "orderValue": 10,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/کابل شارژ.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 12,
          "name": "هدست",
          "code": "mainheadset",
          "orderValue": 11,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/هدست1.webp",
          "description": null,
          "productCount": 0
      },
      {
          "id": 13,
          "name": "پاوربانک",
          "code": "mainpowerbonk",
          "orderValue": 12,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/پاوربانک.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 15,
          "name": "اسپیکر",
          "code": "mianspeaker",
          "orderValue": 13,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/اااااا.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 16,
          "name": "پایه موبایل",
          "code": "mainholder",
          "orderValue": 14,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/پایه موبا.webp",
          "description": null,
          "productCount": 0
      },
      {
          "id": 17,
          "name": "شارژر",
          "code": "maincharger",
          "orderValue": 15,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/شارژر.webp",
          "description": null,
          "productCount": 0
      },
      {
          "id": 18,
          "name": "فندکی ماشین",
          "code": "mainfandaki",
          "orderValue": 16,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/فندکی.png",
          "description": null,
          "productCount": 0
      },
      {
          "id": 19,
          "name": "فلش",
          "code": "mainflash",
          "orderValue": 17,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/فلش.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 21,
          "name": "انواع تبدیل",
          "code": "maintabdil",
          "orderValue": 18,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/تبدیل.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 22,
          "name": "کیف",
          "code": "mainbag",
          "orderValue": 19,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/کیف لبتاب.jpg",
          "description": null,
          "productCount": 0
      },
      {
          "id": 23,
          "name": "دیگر محصولات",
          "code": "other",
          "orderValue": 20,
          "rootId": 3,
          "imageUrl": "http://sapi.sanecomputer.com/GFiles/24-09-16/9999999.jpg",
          "description": null,
          "productCount": 0
      }
  ]
}
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

  console.log(mainCategory)
  return (
    <>
         {flagSpinnerShow && <div className={`row ${styles.spinner_row}`}>


</div>}
      <div>
        <div  className="row mt-5">
          <div
            className="col"
            style={{ marginRight: "50px", marginTop: "30px" }}
          >
            <h1 className={styles.title}>{`دسته بندی ${title}:`}</h1>
          </div>
        </div>

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
              // click={clickHandler}
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
               // click={clickHandler}
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
