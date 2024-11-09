'use client'
import Layout from '@/components/layouts/UserPanelLayout'
import TabCom from '@/components/madules/p-user/TabCom';
import TicketCom from '@/components/madules/p-user/Ticket/TicketCom';
import { MainContext } from '@/context/MainContext';
import React, { useContext, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Ticket() {
  let{setXtFlagSpinnerShow}=useContext(MainContext)

  useEffect(()=>{
    setXtFlagSpinnerShow(false)
  },[])
  return (
<TicketCom/>
  )
}
