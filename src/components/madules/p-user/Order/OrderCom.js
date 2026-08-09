"use client";
import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "./OrderCom.module.css";
import { MainContext } from "@/context/MainContext";
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
import alertN from "@/utils/Alert/AlertA";
import DateFormat from "@/utils/DateFormat";
import { Sidebar } from "primereact/sidebar";

export default function OrderCom() {
  const router = useRouter();
  const [allOrder, setAllOrder] = useState([]);
  const reverceAllOrder = allOrder?.slice().reverse();
  const [OrderId, setOrderId] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderArrayByDetail, setorderArrayByDetail] = useState([]);

  let { setXtFlagSpinnerShow, xtflagSpinnerShow } = useContext(MainContext);

  const stateArraySelect = [
    { id: 1, state: "ارسال جهت استعلام گیری  " },
    { id: 2, state: "درانتظار تایید مشتری" },
    { id: 3, state: "تایید مشتری" },
    { id: 4, state: "در حال تامین" },
    { id: 5, state: "تحویل داده شده" },
    { id: 6, state: "لغو شده" },
    { id: 7, state: " همه سفارشات" },
  ];
  const handleOrder = (id) => {
    getOrderByOrderID(id);
    setOrderId(id);
    setXtFlagSpinnerShow(true);
    router.push(`/p-user/order/${id}`);
  };
  const getOrderByOrderID = (id) => {
    setorderArrayByDetail([]);
    // const getLocalStorage = localStorage.getItem('loginToken')

    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrders/GetOrderDetails?OrderId=${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            // Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          setorderArrayByDetail(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  const getAllOrder = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrders/GetOrdersByStatus?Status=1`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          setAllOrder(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  return (
    <div>


      <div className={`container ${style.container}`}>
        <div className={`row ${style.row}`}>
          <div className={`col ${style.col} `}>


            <div className="sane-shipment-banner "
              style={{ fontSize: "18px", textAlign: '-webkit-center' }}
            // className={`table table-responsive table-hover table-striped ${style.order_allorder} `}
            >
              <table className="table table-bordered">
                <thead className="order-table-user">
                  <tr>
                    <th> شناسه مشتری</th>
                    <th> کد پیگیری سفارش</th>
                    {/* <th>تاریخ ثبت سفارش</th> */}
                    {/* <th>مبلغ نهایی </th> */}
                    <th> جزییات </th>
                  </tr>
                </thead>

                <tbody>
                  {allOrder?.length != 0 &&
                    reverceAllOrder?.map((item) => (
                      <tr>
                        <td>{item.cyUserID}</td>
                        <td>{item.id}</td>
                        {/* <td><DateFormat dateString={`${item?.orderDate}`} /></td> */}
                        {/* <td>{`${(item.totalAmount/10).toLocaleString()}`} تومان</td> */}
                        {/* <td>{item.statusText}</td> */}
                        <td>
                          <button
                            className="btn btn-light p-3"
                            style={{ backgroundColor: "var(--themA)", color: "#fff", border: "none" }}
                            onClick={() => {
                              handleOrder(item.id)
                              // setVisible(true);
                            }}
                          >
                            جزيیات سفارش
                          </button>
                          {/* <Sidebar
                          visible={visible}
                          onHide={() => setVisible(false)}
                          fullScreen
                        >
                          <div className="container">
                            <div className="row">
                              <div className="col">
                                {orderArrayByDetail?.length != 0 && (
                                  <div
                                    className={`table table-striped table-hover ${style.basket_table}`}
                                  >
                                    <thead>
                                      <tr>
                                        <th>تصویر کالا</th>
                                        <th>عنوان کالا</th>
                                        <th>تعداد</th>
                                        <th>قیمت واحد(تومان)</th>
                                        <th className={`${style.th}`}>
                                          قیمت کل(تومان)
                                        </th>{" "}
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {orderArrayByDetail?.map((item) => (
                                        <tr>
                                          <td>
                                            <img
                                              className={` ${style.image} boxSh`}
                                              src={`${item.cyProductImgUrl}`}
                                              alt={item.partNumber}
                                            />
                                          </td>
                                          <td>{item.partNumber}</td>
                                          <td>{item.quantity}</td>
                                          <td>
                                            {item.unitOfferPrice
                                              ? `${(
                                                item.unitOfferPrice / 10
                                              ).toLocaleString()} `
                                              : `${(
                                                item.unitPrice / 10
                                              ).toLocaleString()} `}
                                          </td>
                                          <td>
                                            {(
                                              item.totalPrice / 10
                                            ).toLocaleString()}{" "}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Sidebar> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>

      {/* </Tab>
<Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}> */}

    </div>
  );
}
