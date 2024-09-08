'use client'
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function ProfileCom() {
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
    <Tab eventKey="home" title="تیکت ها" style={{ background: 'inherit' }}>

   
    </Tab>
    <Tab eventKey="address" title="آدرس" style={{ background: 'inherit' }}>

   
</Tab>

  </Tabs>
        </div>
 )
}
