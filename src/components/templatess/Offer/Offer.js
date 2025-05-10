"use client";
import React, { useEffect, useState } from "react";
import style from "./Offer.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardC from "@/components/madules/Cards/CardC/CardC";

export default function Offer() {
  const [offProduct, setOffProduct] = useState([]);
  const [offer, setOffer] = useState(0);

  const getProductByCat = () => {
    // const getLocalStorage=localStorage.getItem('loginToken')
    let obj = {
      cat: "offer-basket",
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProducts/GetProductByCat`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            console.log(result);
            setOffProduct(result.itemList);
          });
        }
      });
    }
    myApp();
  };

  const BasketOffer = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/17`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setOffer(Number(result.value));
          });
        }
      });
    }
    myApp();
  };

  useEffect(() => {
    getProductByCat();
    BasketOffer();
  }, []);
  return (
    <div className="container">
      <div
        className={`row row-cols-4 centerr pt-4 ${style.products_card} boxSh `}
      >
        {offProduct.length !== 0 &&
          offer == 1 &&
          offProduct.map((item) => (
            <div
              key={item.id}
              className={`centerc ${style.products_col}`}
              // onClick={ ()=>setFlagSpinnerShow(true) }
            >
              <CardC
                // clickSpinner={()=>setFlagSpinnerShow(true)}
                // parentId={parentId}
                id={item.id}
                imgSrc={item.smallImage}
                title={item.name}
                price={Number(item.price) / 10}
                // offPrice={(Number(item.price) / 10)}
                supply={item.supply}
                noOffPrice={Number(item.noOffPrice) / 10}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
