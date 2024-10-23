"use client";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "./RepairsCom.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { MainContext } from "@/context/MainContext";
import { Accordion, AccordionTab } from 'primereact/accordion';
import DataFormatUnHoure from "@/utils/DataFormatUnHoure";
import { usePathname } from "next/navigation";



export default function WarrantyCom() {
  const [warantyArray,setWarantyArray]=useState([])
  const [warrantyDetail,setWarrantyDetail]=useState({})
  const pathname = usePathname();

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

useEffect(()=>{
  if(pathname==='/p-user/repairs'){
    setXtFlagSpinnerShow(false)
  }
})

useEffect(()=>{
getWarranty()
},[warantyArray])
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
          title="  لیست تعمیرات"
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
                          <button
                          className={item.type== 1 ? `btn btn-outline-info m-1 ${style.button_code}` : `${style.btn_hide}`}
                          onClick={()=>{setWarrantyDetail(item)
                  
                      }}
                    >
                      {item.guaranteeID}
                    </button>
                   )))}
                
                  </div>
                  <div className=" col-md-10">
                    <div className="row">
                    <div className={ `card ${style.AccordionTab_card}`}  >
            <Accordion activeIndex={0}>
                <AccordionTab className={`${style.AccordionTab}`} header="شماره پذیرش">
                {warantyArray?.length!=0 && warantyArray?.map((item=>(
                          <button
                      className={ item.type== 1 ? `btn btn-outline-info m-1 ${style.button_codeB}` :`${style.btn_hide}`}
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
                      className={`btn btn-info m-1 ${style.button_code} centerr`}
                      disabled
                    >
                    <div>
                    <span>شماره پذیرش :</span>
                    {warrantyDetail.guaranteeID}
                    </div>

                    <div>
                        <span>تاریخ تحویل:</span>
                      <DataFormatUnHoure dateString={`${warrantyDetail?.recievedDate}`} /> 
                    </div>
                    
                    </button>
                
                 
                      {/* <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                            <div className={`${style.date_div} centerc`} >
                            <span >تاریخ تحویل :</span>
                                       <DataFormatUnHoure dateString={`${warrantyDetail?.recievedDate}`} />      
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="row">
              
                    <div className="col-md-6">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.productName}
                          />
                          <label>
                            نام دستگاه
                          </label>
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.productStatus}
                          />
                          <label>
                            وضعیت دستگاه
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled
                          value={warrantyDetail?.guarantreePrice}
                          />
                          <label>
                            هزینه تعمیرات
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                    <div className="col-12">
                        <div className={`${style.textarea_div} centerr`} >
                        <label> ایراد دستگاه طبق اظهار مشتری:
                        </label>
                          <textarea 
                          value={warrantyDetail?.productProblem}
                          disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>

                      <div className={`${style.detail_div} col-12`}>
                        <div className={`${style.textarea_div} centerr`} >
                        <label> ملاحظات:
                         </label>
                          <textarea 
                          value={warrantyDetail?.details}
                          disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>
            
                    
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
