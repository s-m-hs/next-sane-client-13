"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./RegisterRight.module.css";
import Link from "next/link";
import { User, Key, EyeSlash, DeviceMobile } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import postApiByAlert from "@/utils/ApiUrl/apiCallBack/apiPostByAlert";
import { useRouter } from "next/navigation";
import { MainContext } from "@/context/MainContext";
import alertN from "@/utils/Alert/AlertA";
import { InputOtp } from "primereact/inputotp";
// import axios from "axios";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { InputMask } from "primereact/inputmask";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { InputNumber } from "primereact/inputnumber";
import { useRef } from "react";
export default function RegisterRight() {
  const router = useRouter();
  const [token, setTokens] = useState("09");
  const [tokenB, setTokensB] = useState("");
  const [flagInput, setFlagInput] = useState(false);
  const [err1, setErr1] = useState("");
  const [flagErrorCheckbox, setFlagErrorCheckbox] = useState(false);
  const [localbasket, setLocalBasket] = useState([]);
  const [showB, setShowB] = useState(false);
  const handleShowB = () => setShowB(true);
  const handleCloseB = () => setShowB(false);

  const customInput = ({ events, props }) => <input {...events} {...props} type="text" className="custom-otp-input" />;
  const customInputB = ({ events, props }) => <input {...events} {...props} type="text" className="custom-otp-inputB" />;

  let { xtFlagLogin, setXtFlagLogin, setXtFlagSpinnerShow, xtflagSpinnerShow, setLocalUpdateBasket, setCartCounter, setBasketFlag } = useContext(MainContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const registerOptions = {
    userName: { required: "text is required" },
    password: { required: "code is password" },
    checkbox: { required: "code is checkbox" },
  };

  const handleError = (errors) => {
    if (errors.password) {
      setErr1(errors.password.message);
    } else if (errors.checkbox) {
      setFlagErrorCheckbox(true);
      // setErr1(errors.checkbox)
    } else {
      setErr1("");
    }
  };
  const alertA = () =>
    alertN("center", "success", "خوش آمدید 🙂", 1500).then((res) => {
      setXtFlagLogin(true);
      reset(setValue(""));
    });
  const alertD = () =>
    alertN("center", "success", "کد تایید برای شما ارسال شد", 1500).then((res) => {
      setFlagInput(true);
      reset(setValue(""));
    });
  const alertB = (meg) => alertN("center", "error", meg, 2000);
  const alertC = () => alertN("center", "error", "  شماره همراه به درستی وارد نشده است ...", 1500);
  const alertE = () => alertN("center", "error", "  رمز عبور و تکرار آن یکسان نیست...", 1500);

  ////////////////////////////

  const addToBasket = (obj) => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/addToBasket`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        if (res.status == 200) {
        } else if (res.status == 400) {
          // AlertB()
        }
      });
    }
    myApp();
  };

  const handleRegistration = (data) => {
    let obj = {
      un: token,
      pw: "sanepassword",
      name: "SaneUser",
    };
    if (token.length == 11 && !flagInput) {
      postApiByAlert("/api/Customer/register3", obj, alertD, alertB);
      setFlagErrorCheckbox(false);
    } else if (tokenB.length == 6 && flagInput) {
      let obj = {
        valadationCode: tokenB,
        username: token,
      };
      async function myAppGet() {
        const res = await fetch(`${apiUrl}/api/Customer/verifyCode2`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            if (res.status == 200) {
              return res.json().then((result) => {
                if (localbasket?.length == 0) {
                  alertA();
                } else {
                  localbasket?.forEach((item) => {
                    let obj = {
                      cyProductID: item.value,
                      quantity: 1,
                      orderItemID: 0,
                    };
                    addToBasket(obj);
                  });

                  handleShowB();
                }
              });
            } else if (res.status == 400) {
              return res.json().then((result) => {
                alertB(result.response);
              });
            }
          })
          .catch((err) => {
            console.log(err.code);
          });
      }
      myAppGet();
    } else alertC();
  };


  useEffect(() => {
    if (tokenB.length == 6 && flagInput) {
      handleRegistration()
    }
  }, [tokenB])
  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);

  // for now if locale has any product or no=>>>
  useEffect(() => {
    const getLocalStorageProd = JSON.parse(localStorage.getItem("cartObj")) || [];
    setLocalBasket(getLocalStorageProd);
  }, []);

  const inputsRef = useRef()

  useEffect(() => {
    if (flagInput) {
      inputsRef.current?.focus();
      startOtpListener();
    }

    return () => {
      stopOtpListener();
    };
  }, [flagInput]);
  const otpListenerRef = useRef(null);

  const startOtpListener = () => {
    if (!navigator.credentials || !("OTPCredential" in window)) return;

    const ac = new AbortController();
    otpListenerRef.current = ac;
    navigator.credentials.get({ otp: { transport: ["sms"] } })
      .then((otpCredential) => {
        if (otpCredential && otpCredential.code) {
          const digitsOnly = otpCredential.code.replace(/\D/g, "");
          setTokensB(digitsOnly);
        }
      })
      .catch((err) => {
        console.error("OTP Error:", err);
      });
  };
  const stopOtpListener = () => {
    if (otpListenerRef.current) {
      otpListenerRef.current.abort();
      otpListenerRef.current = null;
    }
  };


  return (
    <div className={`${style.div_main} centerc`}>
      <img className={style.img} src="../../../../../images/register/8380015.jpg" alt="image" />
      <div className={`${style.div_hr} centerc`}>
        <h1>{`ورود`}</h1>
        <h5> {`با رمز یکبار مصرف ...`}</h5>

        <hr />
      </div>

      <div className={`${style.div_input} centerc`}>
        <form className={`${style.form} centerc`} action="" onSubmit={handleSubmit(handleRegistration, handleError)}>
          {!flagInput ? (
            <>
              <div className={`${style.div_input_B} centerr`}>
                <DeviceMobile size={40} color={`var(--themB)`} weight="fill" />

                <div className={`${style.card_div} card flex justify-content-center login_label_float`}>
                  <InputMask


                    id="phone"
                    className={`${style.inputmask}`}
                    value={token}
                    integerOnly
                    length={11}
                    onChange={(e) => setTokens(e.value)}
                    inputTemplate={customInput}
                    mask="99999999999"
                    placeholder="شماره همراه"
                  />
                  <label>شماره همراه</label>
                </div>
              </div>

              <button type="submit" className={`${style.button} btn btn-info`}>
                تایید
              </button>
            </>
          ) : (
            <>
              <div className={`${style.card_div} card flex justify-content-center`}>
                <input
                  ref={inputsRef}
                  className={`${style.verifi_input} form-control text-center`}
                  placeholder=" ...کد پیامک شده را وارد کنید"
                  // onChange={(e) => setTokensB(e.target.value)}
                  onChange={(e) => {
                    const val = e.target.value;

                    // فقط اعداد باشه و حداکثر 6 رقم
                    if (val.length <= 6) {
                      setTokensB(val);
                    }
                  }}
                  value={tokenB}
                  type="number"
                />
                {/* <InputMask id="verifycode" value={tokenB} length={6} onChange={(e) => setTokensB(e.value)} integerOnly inputTemplate={customInputB} /> */}

                <button type="submit" className={tokenB?.length == 6 ? `${style.buttonB} btn btn-primary` : `${style.buttonB2} btn btn-primary`}>
                  ارسال کد تایید
                </button>
              </div>
            </>
          )}
        </form>
        <>
          <Modal show={showB} onHide={handleCloseB} backdrop="static" keyboard={false}>
            <Modal.Body>سبد خرید شما بروزرسانی شد...</Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={handleCloseB}>
            Close
          </Button> */}
              <Button
                variant="primary"
                onClick={() => {
                  localStorage.removeItem("cartObj");
                  setCartCounter(0);
                  setXtFlagLogin(true);
                  setBasketFlag((prev) => !prev);
                  reset(setValue(""));
                  // router.push("/");
                }}
              >
                باشه...
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}
