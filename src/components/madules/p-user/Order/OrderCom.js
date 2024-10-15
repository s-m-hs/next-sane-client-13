'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './OrderCom.module.css'
import { MainContext } from '@/context/MainContext';
import { useForm } from "react-hook-form";
import { IdentificationBadge, IdentificationCard, UserCircle, DeviceMobile, EnvelopeSimple, CheckCircle, CheckFat, Asterisk } from "@phosphor-icons/react";
import { useRouter } from 'next/navigation';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import alertN from '@/utils/Alert/AlertA';
import DateFormat from '@/utils/DateFormat';
import { Sidebar } from 'primereact/sidebar';

export default function OrderCom() {
  const [allOrder, setAllOrder] = useState([])
  const reverceAllOrder = allOrder?.slice().reverse()
  const [OrderId, setOrderId] = useState(1);
  const [visible, setVisible] = useState(false);
  const [orderArrayByDetail, setorderArrayByDetail] = useState([])



  let { setXtFlagSpinnerShow } = useContext(MainContext)


  const stateArraySelect = [
    { id: 1, state: "ارسال جهت استعلام گیری  " },
    { id: 2, state: "درانتظار تایید مشتری" },
    { id: 3, state: "تایید مشتری" },
    { id: 4, state: "در حال تامین" },
    { id: 5, state: "تحویل داده شده" },
    { id: 6, state: "لغو شده" },
    { id: 7, state: " همه سفارشات" },
  ];

  const getOrderByOrderID = (id) => {
    const getLocalStorage = localStorage.getItem('loginToken')

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/GetOrderDetails?OrderId=${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getLocalStorage}`,
            "Content-Type": "application/json",
          }
        }
      ).then(res => {
        console.log(res)
        if (res.status == 200) {
          return res.json()
        }
      }).then(result => {
        console.log(result)
        setorderArrayByDetail(result)
      }).catch(err => console.log(err))
    }
    myApp()
  }
  const getAllOrder = () => {
    const getLocalStorage = localStorage.getItem('loginToken')
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/GetOrdersByStatus?Status=1`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          return res.json()
        }
      }).then(result => {
        console.log(result)
        setAllOrder(result)
      }).catch(err => console.log(err))
    }
    myApp()
  }
  useEffect(() => {
    getAllOrder()
  }, [])

  useEffect(() => {
    setXtFlagSpinnerShow(false)
  }, [])
  return (

    <div >
      <Tabs
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-2"
      // fill
      // onSelect={ffc}
      // onClick={()=>ffc(id)}
      >
        <Tab eventKey="home" title="  لیست سفارشات" style={{ background: 'inherit' }}>
          <div className={`container ${style.container}`}>
            <div className={`row ${style.row}`}>

              <div className={`col ${style.col} boxSh`}>

                {/* <div>    
  <label className="order--state-selectlabel">دسته بندی :</label>
          <select
            className="order-state"
            onChange={(e) => {
              if (e.target.value) {
                setStateId(e.target.value);
             
              } else {
                setStateId(e.target.value);
                // setStateArray([]);
                // setOrdeDetail([]);
                // setOrderID("");
              }
            }}
          >
            {stateArraySelect.map((item) => (
              <>
                <option key={item.id} value={item.id}>
               
                  {item.state}
                </option>
              </>
            ))}
          </select>
        </div> */}

                <div className={`table table-responsive table-hover table-striped ${style.order_allorder} `} >

                  <thead>
                    <tr>
                      <th> شناسه مشتری</th>
                      <th>شناسه سفارش</th>
                      <th>تاریخ ثبت سفارش</th>
                      {/* <th>وضعیت سفارش</th> */}
                      <th>تغییر وضعیت </th>
                    </tr>

                  </thead>



                  <tbody>
                    {allOrder?.length != 0 && reverceAllOrder?.map((item => (
                      <tr>
                        <td>{item.cyUserID}</td>
                        <td>{item.id}</td>
                        <td><DateFormat dateString={`${item.orderDate}`} /></td>
                        {/* <td>{item.statusText}</td> */}
                        <td><button className='btn btn-primary' onClick={() => {
                          getOrderByOrderID(item.id)
                          setOrderId(item.id)
                          setVisible(true)
                        }}>جزيیات سفارش</button>
                          <Sidebar

                            visible={visible} onHide={() => setVisible(false)} >

                            <div className='container'>
                              <div className='row'>
                                <div className='col'>

                                  {orderArrayByDetail?.length != 0 &&
                                    <div className={`table table-striped table-hover ${style.basket_table}`}>

                                      <thead>
                                        <tr>
                                          <th>تصویر کالا</th>
                                          <th>عنوان کالا</th>
                                          <th>تعداد</th>
                                          <th>قیمت واحد</th>
                                          <th className={`${style.th}`}>قیمت کل</th>  </tr>
                                      </thead>

                                      <tbody>
                                        {orderArrayByDetail?.map((item)=>(
                                            <tr>
                                        <td><img className={` ${style.image} boxSh`} src={`${item.cyProductImgUrl}`} alt="" /></td>  
                                        <td>{item.partNumber}</td>  
                                        <td>{item.quantity}</td>  
                                        <td>{item.unitOfferPrice ? item.unitOfferPrice: item.unitPrice }</td>  
                                        <td>{item.totalPrice}</td>  
                                        </tr>
                                        ))}
                                      
                                      </tbody>

                                    </div>
                                  }
                                </div>
                              </div>
                            </div>

                          </Sidebar>
                        </td>
                      </tr>
                    )))}

                  </tbody>


                </div>



              </div>



            </div>


          </div>

          {/* </Tab>
<Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}> */}


        </Tab>

      </Tabs>
    </div>
  )
}
