"use client";


import React from 'react'
import style from './Contact.module.css'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { icon } from "leaflet"
import { HouseLine,Dresser} from "@phosphor-icons/react";

export default function Contact() {

    // let  position={[35.72021225108499, 51.42222691580869]}
    // let  center={[35.72021225108499, 51.42222691580869]}
    const ICON = icon({
        iconUrl: "./Location-icon-design-on-transparent-background-PNG.png",
        iconSize: [32, 32],
        
      })
  
  return (
    <div className='container'>
        <div className='row'>
        <div className={`row ${style.row}`} >
            <div className={`col-6 centerc boxSh ${style.col_right}`}>
            <div >
    <img  className={style.img} src="../../../../../images/photo_2024-06-07_23-49-30.jpg" alt="" />
</div>

<h5>تماس با ما</h5>
<h1>اطلاعات تماس:</h1>
<h3>استان قم</h3>
<h3>بلوار سمیه نبش کوچه 6 پلاک 128</h3>
<h3>شماره تماس: 37835457</h3>



            </div>
            <div className={`col-6 centerc boxSh ${style.col_left}`} >
            <MapContainer
        className={style.map}
        center={[34.62829620983138, 50.878898715923015]}
        zoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

<Marker icon={ICON} position={[34.62829620983138, 50.878898715923015]} >
<Popup  > Sane_Computer</Popup>
</Marker>

        {/* <Marker position={[34.62829620983138, 50.878898715923015]  }>
          <Popup > Sane_Computer</Popup>
        </Marker> */}
      </MapContainer>       
           </div>
        </div>
        </div>
    </div>
  )
}
