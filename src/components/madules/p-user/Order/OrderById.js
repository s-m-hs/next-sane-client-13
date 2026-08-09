"use client"

import React, { useEffect, useState } from 'react'
import CopyableCode from '../../CopyableCode'
import { formatPrice, getOrderById, orderSteps } from './orders';
import OrderStepper from './OrderStepper';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import DateFormat from '@/utils/DateFormat';
import { sendState } from '@/utils/DataStore';
import AlertCondirm from '@/utils/Alert/AlertCondirm';
import { useRouter } from 'next/navigation';
import LoadingA from '@/utils/Loading/LoadingA';

export default function OrderById({ params }) {
    const rout = useRouter()

    const [orderDetails, setOrderDetails] = useState();
    const [loading, setLoading] = useState(true)
    const notFound = () => {
        AlertCondirm("سفارشی با این کد پیگیری یافت نشد ...", "info", "باشه ", function () {
            rout.push("/p-user/order")
        }).then(() => rout.push("/p-user/order"))
    }
    const getOrderByOrderID = (id) => {
        setOrderDetails([]);
        // const getLocalStorage = localStorage.getItem('loginToken')

        async function myApp() {
            const res = await fetch(
                `${apiUrl}/api/CyOrders/getOrderById?orderId=${params.id}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        // Authorization: `Bearer ${getLocalStorage}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((res) => {
                    if (res.status == 200) {
                        setLoading(false)
                        return res.json();
                    } else {
                        setLoading(false)
                        notFound()
                    }
                })
                .then((result) => {
                    setOrderDetails(result);
                })
                .catch((err) => console.log(err));
        }
        myApp();
    };

    useEffect(() => {
        getOrderByOrderID()
    }, [])
    return (
        <div className="d-flex flex-column flex-lg-row gap-4 mt-1">
            {loading && <LoadingA isShow={true} />}             <section className="flex-grow-1 d-flex flex-column gap-4">
                {/* هدر سفارش */}
                <div className="sane-card p-3 p-lg-4 d-flex align-items-center justify-content-between flex-wrap gap-3" >
                    <div className='centerrcb' >
                        {/* <h1 className="fw-bold sane-text-ink mb-1" style={{ fontSize: "1.25rem" }}>
                            سفارش {orderDetails?.id}
                        </h1> */}
                        <p className="small sane-text-sub mb-0" style={{ fontWeight: 600 }} >تاریخ ثبت سفارش: {
                            <DateFormat dateString={orderDetails?.orderDate} />
                        }</p>

                        <span className="badge  sane-badge-success px-3 py-2">
                            وضعیت خرید: خرید موفق
                        </span>
                    </div>

                </div>

                {/* جدول اطلاعات سفارش */}
                <div className="sane-card p-3 p-lg-4">
                    {/* <h2 className="fw-bold sane-text-ink mb-3" style={{ fontSize: "1rem" }}>
                        اطلاعات سفارش
                    </h2> */}
                    <div style={{ overflowX: "auto" }}>
                        <table className="sane-order-table">
                            <thead>
                                <tr>
                                    <th>نام خریدار</th>
                                    <th>روش پرداخت</th>
                                    <th>مقصد</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>آقای / خانم : {orderDetails?.userName}</td>
                                    <td>{sendState.filter(filter => filter.enum == orderDetails?.postState)[0]?.title}</td>
                                    <td>{orderDetails?.cyAddress?.city}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* کدهای پیگیری */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 mt-1">
                        <div className="col">
                            <CopyableCode label="کد پیگیری سفارش" value={orderDetails?.id} />
                        </div>
                        <div className="col">
                            <CopyableCode label="کد پیگیری پرداخت" value={orderDetails?.refNumber} />
                        </div>
                        <div className="col">
                            <CopyableCode label="کد مرسوله" value={orderDetails?.postCode} />
                        </div>
                    </div>
                </div>

                {/* مراحل پیگیری سفارش */}
                <div className="sane-card p-3 p-lg-4">
                    <h2 className="fw-bold sane-text-ink mb-4" style={{ fontSize: "1rem" }}>
                        وضعیت پیگیری سفارش
                    </h2>
                    <OrderStepper steps={orderSteps} currentIndex={orderDetails?.status} />

                    {orderDetails?.postCode &&
                        <div className="sane-shipment-banner mt-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <span>
                                سفارش شماره <strong dir="ltr" style={{ display: "inline-block" }}>{orderDetails?.id}</strong> با کد مرسوله{" "}
                                <strong dir="ltr" style={{ display: "inline-block" }}>{orderDetails?.postCode}</strong> توسط شرکت پست در
                                تاریخ {order.shippedDate} {currentStepLabel === "تحویل داده شد" ? "تحویل داده شد" : "ارسال گردید"}.
                            </span>
                            <a
                                href={order.postTrackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-light fw-bold flex-shrink-0"
                            >
                                پیگیری از پست
                            </a>
                        </div>}

                    {orderDetails?.statusText &&
                        <div className="sane-shipment-banner mt-4 d-flex align-items-center justify-content-between flex-wrap gap-3">توضیحات سفارش :
                            {orderDetails?.statusText}
                        </div >

                    }

                </div>




                {/* اقلام سفارش و جمع مبلغ */}
                <div className="sane-card p-3 p-lg-4">
                    <h2 className="fw-bold sane-text-ink mb-3" style={{ fontSize: "1rem" }}>
                        اقلام سفارش
                    </h2>

                    <div className="d-flex flex-column gap-3">
                        {orderDetails?.items?.map((item) => (
                            <div key={item.id} className="d-flex align-items-center gap-3 border rounded-3 p-2">
                                <div className="ratio ratio-1x1 rounded-3 overflow-hidden flex-shrink-0 position-relative" style={{ width: "64px" }}>
                                    <img src={item.cyProductImgUrl} alt={item.partNumber} fill sizes="64px" style={{ objectFit: "cover" }} />
                                </div>
                                <div className="flex-grow-1 text-truncate">
                                    <div className="fw-bold small text-truncate">{item.partNumber}</div>
                                    <div className="small sane-text-sub">تعداد: {item.quantity}</div>
                                </div>
                                <div className="fw-bold small sane-text-violet-deep flex-shrink-0">
                                    {formatPrice(item.unitOfferPrice)} تومان
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className=" mt-3 pt-3 d-flex flex-column gap-2" style={{ maxWidth: "320px", marginRight: "auto" }}>

                        <div className="d-flex justify-content-between fw-bold sane-text-violet-deep pt-2">
                            <span>مبلغ نهایی</span>
                            <span>{formatPrice(orderDetails?.totalAmount)} تومان</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
