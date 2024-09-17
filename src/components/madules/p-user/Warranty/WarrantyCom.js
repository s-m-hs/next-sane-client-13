"use client";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "./WarrantyCom.module.css";
import { useForm } from "react-hook-form";
import {
  IdentificationBadge,
  IdentificationCard,
  UserCircle,
  DeviceMobile,
  EnvelopeSimple,
  CheckCircle,
  CheckFat,
  Asterisk,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
export default function WarrantyCom() {
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
                  <div className="col-md-2 centerc">
                    <button
                      className={`btn btn-outline-success m-2  ${style.button_code}`}
                      disabled
                    >
                      شماره پذیرش
                    </button>
                    <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>
                    <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>
                    <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>
                    <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>
                    <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>  <button
                      className={`btn btn-outline-info m-1 ${style.button_code}`}
                    >
                      25386
                    </button>
                  </div>
                  <div className=" col-md-10">
                    <div className="row">
                    <button
                      className={`btn btn-info m-1 ${style.button_code}`}
                      disabled
                    >
                      25386
                    </button>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled/>
                          <label>
                            نام محصول
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled/>
                          <label>
                            شرکت گارانتی کننده
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled/>
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
                          <input disabled/>
                          <label>
                            وضعیت کالا
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className={`login_label_float ${style.input} centerr`}
                        >
                          <input disabled/>
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
                          <textarea disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className={`${style.textarea_div} centerr`} >
                        <label> <button className="btn btn-light" disabled>ملاحظات:
                        </button>  </label>
                          <textarea disabled
                            className={`login_label_float ${style.input} centerr`}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div  className={`${style.textarea_div} centerr`} >
                          <label> <button className="btn btn-light" disabled>توضیحات شرکت گارانتی کننده:
                            </button>  </label>
                          <textarea disabled
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
