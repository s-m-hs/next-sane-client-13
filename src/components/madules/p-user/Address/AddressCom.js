"use client";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "./AddressCom.module.css";
import { useForm } from "react-hook-form";
import { IdentificationBadge, City, Mailbox, PhoneCall, DeviceMobile, EnvelopeSimple, CheckCircle, CheckFat, Asterisk, User } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import RemoveApi from "@/utils/ApiUrl/apiCallBack/apiRemove";
export default function AddressCom() {
  let { address, setFlagAddress, setXtFlagSpinnerShow, name, cyUserID } = useContext(MainContext);
  const AlertA = () => alertN("right", "success", "آدرس با موفقیت ثبت شد  ...", 1500);
  const AlertB = () =>
    alertN("right", "success", "آدرس با موفقیت حذف شد  ...", 1500).then((res) => {
      setFlagAddress((prev) => !prev);
    });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const handleError = (errors) => {};
  const provinces = [
    { id: 1, name: "آذربایجان شرقی" },
    { id: 2, name: "آذربایجان غربی" },
    { id: 3, name: "اردبیل" },
    { id: 4, name: "اصفهان" },
    { id: 5, name: "البرز" },
    { id: 6, name: "ایلام" },
    { id: 7, name: "بوشهر" },
    { id: 8, name: "تهران" },
    { id: 9, name: "چهارمحال و بختیاری" },
    { id: 10, name: "خراسان جنوبی" },
    { id: 11, name: "خراسان رضوی" },
    { id: 12, name: "خراسان شمالی" },
    { id: 13, name: "خوزستان" },
    { id: 14, name: "زنجان" },
    { id: 15, name: "سمنان" },
    { id: 16, name: "سیستان و بلوچستان" },
    { id: 17, name: "فارس" },
    { id: 18, name: "قزوین" },
    { id: 19, name: "قم" },
    { id: 20, name: "کردستان" },
    { id: 21, name: "کرمان" },
    { id: 22, name: "کرمانشاه" },
    { id: 23, name: "کهگیلویه و بویراحمد" },
    { id: 24, name: "گلستان" },
    { id: 25, name: "گیلان" },
    { id: 26, name: "لرستان" },
    { id: 27, name: "مازندران" },
    { id: 28, name: "مرکزی" },
    { id: 29, name: "هرمزگان" },
    { id: 30, name: "همدان" },
    { id: 31, name: "یزد" },
  ];

  const addNameToProfile = (Usname) => {
    ///=>  برای گرفتن نام کاربر در صورتی ک پروفایل کاربر فیلد نام برابر باشد با پیشفرض سیستم
    //  =SaneUser
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/Customer/updateOnlyName?Usid=${cyUserID}&name=${Usname}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(err));
    }
    myApp();
  };

  const handleRegistration = (data) => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    if (name === "SaneUser") {
      addNameToProfile(data.name);
    }
    let obj = {
      id: 0,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      phone: data.phone,
      mobile: data.mobile,
    };
    async function myAppPost() {
      const res = await fetch(
        `${apiUrl}/api/CyAddress/PostAddress
    `,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${getLocalStorage}`,
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          // console.log(res);
          if (res.ok) {
            AlertA();
            return res.json();
          }
        })
        .then((result) => {
          setFlagAddress((prev) => !prev);
          reset(setValue(""));
        })
        .catch((err) => console.log(err));
    }
    myAppPost();
  };

  const removeHandler = (id) => {
    // const getLocalStorage = localStorage.getItem("loginToken");

    RemoveApi("api/CyAddress", id, AlertB);
  };

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, []);
  // console.log(address)
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
        <Tab eventKey="home" title=" لیست آدرس های من" style={{ background: "inherit" }}>
          <div className={`container ${style.container}`}>
            <div className={`row ${style.row}`}>
              <div className={`col ${style.col} boxSh`}>
                <div className="row">
                  <div className={`col col-lg-6 ${style.col_6} `}>
                    <form action="" onSubmit={handleSubmit(handleRegistration, handleError)}>
                      {name === "SaneUser" && ( ///=>در صورت پیشفرض بودن نام پروفایل  اینپوت گرفتن نام فعال میشود
                        <div className={`login_label_float ${style.input} centerr`}>
                          <input
                            name="name"
                            type="name"
                            placeholder=""
                            // value={name}
                            {...register(`name`, {
                              required: "وارد کردن نام کاربری الزامی است...",
                              minLength: {
                                value: 3,
                                message: "نام کاربری باید حداقل ۳ حرف باشد",
                              },
                            })}
                          />
                          <label>نام کاربری </label>
                          <User size={38} color="#14a5af" weight="duotone" className={style.icon} />
                          {errors.name && (
                            <span
                              style={{
                                color: "red",
                                fontSize: "12px",
                                position: "absolute",
                                bottom: "0px",
                                right: "30px",
                              }}
                            >
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                      )}

                      <div className={`login_label_float `} style={{ position: "relative" }}>
                        <select
                          className={`login_label_float ${style.input_state} `}
                          //   style={{border:' 1px solid #EAEAEF' , width:'100%', color:'rgb(172 172 173)',outline:'none'}}
                          {...register("state", {
                            required: " وارد کردن استان الزامی است ...",
                          })}
                          isInvalid={!!errors.state}
                        >
                          <option value="" key="">
                            استان ...
                          </option>
                          {provinces.map((item, index) => (
                            <option key={index} value={`${item.name}`}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <span
                            style={{
                              width: "100%",
                              color: "red",
                              fontSize: "12px",
                              position: "absolute",
                              bottom: "-10px",
                              right: "30px",
                            }}
                          >
                            {errors.state.message}
                          </span>
                        )}
                      </div>

                      <div className={`login_label_float ${style.input} centerr`}>
                        <input
                          name="city"
                          type="userName"
                          placeholder=" "
                          // value={name}
                          {...register(`city`)}
                        />
                        <label> شهر </label>
                        <City size={38} color="#14a5af" weight="duotone" className={style.icon} />
                      </div>

                      <div className={`login_label_float ${style.input} centerr`}>
                        <input
                          name="address"
                          type="userName"
                          placeholder=" "
                          // value={name}
                          {...register(`address`)}
                        />
                        <label> آدرس ... </label>
                        <City size={38} color="#14a5af" weight="duotone" className={style.icon} />
                      </div>

                      <div className={`login_label_float ${style.input} centerr`}>
                        <input
                          name="postalCode"
                          type="userName"
                          placeholder=" "
                          // value={name}
                          {...register(`postalCode`)}
                        />
                        <label> کد پستی </label>
                        <Mailbox size={38} color="#14a5af" weight="duotone" className={style.icon} />
                      </div>

                      <div className={`login_label_float ${style.input} centerr`}>
                        <input
                          name="phone"
                          type="userName"
                          placeholder=" "
                          // value={name}
                          {...register(`phone`)}
                        />
                        <label> شماره ثابت </label>
                        <PhoneCall size={38} color="#14a5af" weight="duotone" className={style.icon} />
                      </div>

                      <div className={`login_label_float ${style.input} centerr`}>
                        <input
                          name="mobile"
                          type="userName"
                          placeholder=" "
                          // value={name}
                          {...register(`mobile`)}
                        />
                        <label> شماره همراه </label>
                        <DeviceMobile size={38} color="#14a5af" weight="duotone" className={style.icon} />
                      </div>

                      <div className={`col ${style.col_button}`}>
                        <button className={`btn btn-info ${style.button}`}>
                          تایید
                          <CheckCircle size={32} color="#fff" weight="duotone" />
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className={`col-12 col-lg-6 ${style.col_6}`}>
                    <table className={`table ${style.table}`}>
                      <thead>
                        <tr key="">
                          <th>آدرس</th>
                          <th>کدپستی</th>
                          <th>تلفن ثابت/تلفن همراه</th>
                          <th>حذف</th>
                        </tr>
                      </thead>

                      <tbody>
                        {address &&
                          address?.map((item) => (
                            <tr key="">
                              <td>
                                {" "}
                                {item.state}-{item.city}-{item.address}{" "}
                              </td>
                              <td>{item.postalCode}</td>
                              <td>
                                {item.phone}-{item.mobile}
                              </td>
                              <td>
                                <button className="btn btn-danger" onClick={() => removeHandler(item.id)}>
                                  حذف
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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
