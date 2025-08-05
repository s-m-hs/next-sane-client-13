"use client";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import React, { useContext, useEffect, useState } from "react";
import style from "./SubjecArea.module.css";
import CardSub from "../Cards/CardSub/CardSub";
import { MainContext } from "@/context/MainContext";
import { useRouter } from "next/navigation";

export default function SubjecArea() {
  const route = useRouter()

  const [allSubjects, setAllSubjects] = useState([]);
  const allSubjectsSlice = allSubjects.slice().reverse().slice(0, 3);
  const getAllSubject = () => {
    // const getLocalStorage=localStorage.getItem('loginToken')
    let obj = {
      cat: "magazine",
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/GetSubjectByCat`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result)
          setAllSubjects(result.itemList);
        });
    }
    myApp();
  };
  useEffect(() => {
    getAllSubject();
  }, []);

  return (
    <div className={`container ${style.container}  `}>
      {/* <h2>مقالات صانع :</h2> */}
      <button className="btn btn-warning" onClick={() => route.push('/subject')}>همه مقالات</button>
      <div className={`row row-cols-auto mt-3  ${style.row} centerr`}>
        {allSubjects?.length != 0 &&
          allSubjectsSlice.map((item) => <CardSub item={item} />)}
      </div>
    </div>
  );
}
