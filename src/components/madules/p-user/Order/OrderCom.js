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

export default function OrderCom() {
  const [allOrder, setAllOrder] = useState([])
  const reverceAllOrder = allOrder.slice().reverse()
  const [stateId, setStateId] = useState(1);


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
                        <td><button className='btn btn-primary'>جزيیات سفارش</button></td>
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
