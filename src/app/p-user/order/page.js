"use client"
import OrderCom from '@/components/madules/p-user/Order/OrderCom'
import { MainContext } from '@/context/MainContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



export default function Order() {
  let { setXtFlagSpinnerShow } = useContext(MainContext)
  const router = useRouter();
  const [tabId, setTabId] = useState('')
  const [orderCode, setOrderCode] = useState('')

  const ffc = (tabName) => {
    setTabId(tabName)
  }
  const handleOrder = () => {
    if (!orderCode) return;

    setXtFlagSpinnerShow(true);

    router.push(`/p-user/order/${orderCode}`);
  };

  return (
    <Tabs
      defaultActiveKey="orderById"
      id="fill-tab-example"
      className="mb-2"
      // fill
      onSelect={ffc}
    // onClick={()=>ffc(id)}
    >
      <Tab eventKey="orderById" title="پیگیری سفارش" style={{ background: 'inherit' }}>
        <div className='centercc'>
          <div className='centerr p-5' >

            <input type="number"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              className='input-box' placeholder='کد پیگیری سفارش را وارد کنید  ...' />
            <button
              onClick={handleOrder}
              disabled={!orderCode}
              className="btn btn-light btn-lg"
              style={{
                backgroundColor: "var(--themA)",
                color: "var(--themC)"
              }}
            >
              تایید
            </button>
          </div>
          <img src="../../../../../images/orderSearch.png" alt="" className='p-5' style={{ width: "95%", maxWidth: "600px" }} />

        </div>



      </Tab>

      <Tab eventKey="allOrder" title="سفارشات" style={{ background: 'inherit' }}>

        <OrderCom />
      </Tab>


    </Tabs>
  )
}

