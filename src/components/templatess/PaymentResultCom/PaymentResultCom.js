"use client";

import { MainContext } from "@/context/MainContext";
import alertQ from "@/utils/Alert/AlertQ";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import style from "./PaymentResultCom.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import alertN from "@/utils/Alert/AlertA";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import SpinnerC from "@/utils/SpinnerC/SpinnerC";

export default function PaymentResultCom({ param }) {
  const rout = useRouter();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [flagSpinner, setFlagSpinner] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const trackId = searchParams.get("trackId");
  const success = searchParams.get("success");

  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");
  let { setXtFlagSpinnerShow, setPaymentState } = useContext(MainContext);
  const route = useRouter();
  const [verifyDetailB, setVerifyDetailB] = useState({});
  const [verifyDetail, setVerifyDetail] = useState({});

  const alertA = () =>
    alertQ(
      "center",
      "error",
      "تراكنش ناموفق می باشد ...",
      "متوجه شدم ..."
    ).then((res) => {
      route.push("/basket");
    });
  const alertB = () =>
    alertQ("center", "error", "مشکلی پیش آمده ...", "متوجه شدم ...").then(
      (res) => {
        setFlagSpinner(false);
        route.push("/basket");
      }
    );
  const alertC = () =>
    alertN("center", "success", "پرداخت با موفقیت انجام شد", "1500");

  const verifyPayment = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    let obj = {
      orderId: param,
      trackId: trackId,
    };

    //     let obj = {
    //   orderId: param,
    //   authority: authority,
    // };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/ZarinPal/verifyPayZibal`,
        // const res = await fetch(`${apiUrl}/api/ZarinPal/varifyPay`,
        {
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
            return res.json().then((result) => {
              setVerifyDetailB(result)
              // setVerifyDetail(result);
              setXtFlagSpinnerShow(false);
              setFlagSpinner(false);
            });
          } else {
            alertB();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    myApp();
  };


  useEffect(() => {
    console.log(success)
    console.log(verifyDetailB)
    if (success == 1) {
      verifyPayment();
      setShow(true);
    } else if (status != 1) {
      alertA();
    }
  }, [success]);

  // useEffect(() => {
  //   if (status === "OK") {
  //     verifyPayment();
  //     setShow(true);
  //   } else if (status === "NOK") {
  //     alertA();
  //   }
  // }, [status]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
    // setVerifyDetail({});
  }, []);
  return (
    <div className="container">
      {flagSpinner && <SpinnerC title="در حال ثبت سفارش" />}
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
            <div className={`row ${style.row}`}>
              <div className={`col text-center ${style.detail_div} boxSh`}>

                <div>
                  <table class="table mt-4">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> شرح</th>
                      </tr>
                    </thead>
                    <tbody className={style.tbody}>
                      <tr>
                        <th scope="row">وضعیت خرید</th>
                        <td>موفق</td>
                      </tr>
                      <tr>
                        <th scope="row">کد پیگیری </th>
                        <td>{verifyDetailB.RefNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">message</th>
                        <td colspan="2">{verifyDetailB.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                {/* <div>
                  <table class="table mt-4">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col"> شرح</th>
                      </tr>
                    </thead>
                    <tbody className={style.tbody}>
                      <tr>
                        <th scope="row">وضعیت خرید</th>
                        <td>موفق</td>
                      </tr>
                      <tr>
                        <th scope="row">کد پیگیری </th>
                        <td>{verifyDetail.ref_id}</td>
                      </tr>
                      <tr>
                        <th scope="row">message</th>
                        <td colspan="2">{verifyDetail.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                <button
                  className="btn btn-warning m-4"
                  onClick={() => {
                    setPaymentState(true);
                    rout.push("/"); // اول به صفحه اصلی هدایت کن

                  }}
                >
                  بازگشت به صفحه اصلی
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
