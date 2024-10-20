"use client";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "./WarrantyCom.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { MainContext } from "@/context/MainContext";
import { Accordion, AccordionTab } from 'primereact/accordion';



export default function WarrantyCom() {
  const [warantyArray,setWarantyArray]=useState([])
  const [warrantyDetail,setWarrantyDetail]=useState({})
  
  let{setXtFlagSpinnerShow}=useContext(MainContext)

const getWarranty=()=>{
  const getLocalStorage=localStorage.getItem('loginToken')
  async function myApp(){
    const res = await fetch(`${apiUrl}/api/CyGuarantee/getForUser`,{
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${getLocalStorage}`
      },

    }).then(res=>{
      // console.log(res)
      if(res.status==200){
        return res.json()
      }
    }).then(result=>{
      // console.log(result)
      setWarantyArray(result)
    })
  }
  myApp()
}
console.log(warantyArray)

useEffect(()=>{
getWarranty()
},[])
  useEffect(()=>{
  setXtFlagSpinnerShow(false)
  },[])
  return (
    <div>
      <Tabs
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-2"
        // fill
        // onSelect={ffc}
        // onClick={()=>ffc(id)}
      >
        <Tab
          eventKey="home"
          title="  لیست گارانتی"
          style={{ background: "inherit" }}
        >
          <div className={`container ${style.container}`}>
            <div className={`row ${style.row}`}>
              <div className={`col ${style.col} boxSh`}>
                <div className="row">
                  <div className={`col-md-2 centerc ${style.warrantyCod_col_right}`}>
                    <button
                      className={`btn btn-outline-success m-2  ${style.button_code}`}
                      disabled
                    >
                      شماره پذیرش
                    </button>


                   {warantyArray?.length!=0 && warantyArray?.map((item=>(
// {warantyArray?.}
                  
                          <button
                      className={item.type== 0 ? `btn btn-outline-info m-1 ${style.button_code}` : `${style.btn_hide}`}
                      onClick={()=>{setWarrantyDetail(item)
                  
                      }}
                    >
                      {item.guaranteeID}
                    </button>
                   )))}
                
                  </div>
                  <div className=" col-md-10">
                    <div className="row">
                    <div  className={ `card ${style.AccordionTab_card}`}>
            <Accordion activeIndex={0}>
                <AccordionTab className={`${style.AccordionTab}`} header="شماره پذیرش">
                {warantyArray?.length!=0 && warantyArray?.map((item=>(
                          <button
                      className={item.type== 0 ? `btn btn-outline-info m-1 ${style.button_codeB}` :`${style.btn_hide}`}
                      onClick={()=>{setWarrantyDetail(item)
                  
                      }}
                    >
                      {item.guaranteeID}
                    </button>
                   )))}
                </AccordionTab>
            </Accordion>
        </div>
                    <button
                      className={`btn btn-info m-1 ${style.button_code}`}
                      disabled
                    >
                      {warrantyDetail.guaranteeID}
                    </button>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.productName}
                          />
                          <label>
                            نام محصول
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                           value={warrantyDetail?.guaranteeCompany}

                          />
                          <label>
                            شرکت گارانتی کننده
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.createDate}
                          />
                          <label>
                            تاریخ تحویل
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
              
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.productStatus}
                          />
                          <label>
                            وضعیت کالا
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.guarantreePrice}
                          />
                          <label>
                            هزینه گارانتی
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                    <div className="col-12">
                        <div className={`${style.textarea_div} centerr`} >
                        <label> <button className="btn btn-light" disabled>ایراد کالا طبق اظهار مشتری:
                        </button>  </label>
                          <textarea 
                          value={warrantyDetail?.productProblem}
                          disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className={`${style.textarea_div} centerr`} >
                        <label> <button className="btn btn-light" disabled>ملاحظات:
                        </button>  </label>
                          <textarea 
                          value={warrantyDetail?.details}
                          disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div  className={`${style.textarea_div} centerr`} >
                          <label> <button className="btn btn-light" disabled>توضیحات شرکت گارانتی کننده:
                            </button>  </label>
                          <textarea 
                          bvalue={warrantyDetail?.companyExplaination}
                          disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>
                      <hr/>
                      <hr/>
                      <hr/>
                      <hr/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* </Tab>
<Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}> */}
        </Tab>
      </Tabs>
    </div>
  );
}
