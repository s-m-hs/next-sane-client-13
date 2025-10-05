"use client";

import React, { useContext, useEffect } from "react";
import style from "./Contact.module.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
// import { icon } from "leaflet"
// import { HouseLine,Dresser} from "@phosphor-icons/react";
import { MainContext } from "@/context/MainContext";

import GoogleMapReact from "google-map-react";
import GoogleMap from "google-map-react";
import MyGreatPlace from "./MyGreatPlace.js";
import {
  MagnifyingGlass,
  Phone,
  SignIn,
  BuildingApartment,
  Barcode,
  UserCheck,
  SignOut,
  Wrench,
  Fingerprint,
  ShoppingCart,
  User,
  EnvelopeSimple,
  House,
  TextIndent,
  XCircle,
} from "@phosphor-icons/react";
import Link from "next/link";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Contact({ center = [34.64259043104306, 50.890225000643426], zoom = 18, greatPlaceCoords = { lat: 34.64259043104306, lng: 50.890225000643426 } }) {
  let { setXtFlagSpinnerShow, xtflagSpinnerShow } = useContext(MainContext);

  // const defaultProps = {
  //   center: {
  //     lat: 34.62829620983138,
  //     lng: 50.878898715923015
  //   },
  //   zoom: 11
  // };

  // const ICON = icon({
  //     iconUrl: "./Location-icon-design-on-transparent-background-PNG.png",
  //     iconSize: [32, 32],

  //   })
  //////////////////////
  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);

  return (
    <div className="container">
      <div className="row">
        <div className={`row ${style.row}`}>
          <div className={`col-md-6 centerc boxSh ${style.col_right}`}>
            <div>
              <img
                className={style.img}
                //  src="../../../../../images/photo_2024-06-07_23-49-30.jpg"
                src="../../../../../images/4soo.png"
                alt="sane-contact"
              />
            </div>

            <h5>تماس با کامپیوترصانع</h5>
            <h1>اطلاعات تماس:</h1>
            {/* <h3>دفتر مرکزی : تهران میدان ولیعصر(عج) شماره تماس : 91005457-021</h3>

            <hr /> */}
            <h3>قم ابتدای 55 متری عماریاسر روبروی مجتمع تجاری الزهرا(س) سرای بزرگ چارسو پلاک 34 و 35 شماره تماس : 37839322-37835457-37835456 (025)</h3>
            <Link href={"https://balad.ir/p/2vF8vyl1goeizX"}>کامپیوترصانع را از اینجا مسیریابی کنید...</Link>

            {/* <hr />
            <h3>شعبه دو : مشهد خیابان عدل خمینی بین کوچه 60 و 62 شماره تماس : 09224203488</h3>

            <hr /> */}
          </div>

          <div className={`col-md-6 centerc boxSh ${style.col_left}`}>
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMap
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                center={center}
                zoom={zoom}
              >
                {/* <MyGreatPlace lat={34.62829620983138} lng={50.878898715923015} text={'A'} /> */}
                <MyGreatPlace {...greatPlaceCoords} text={"*"} />
              </GoogleMap>

              {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact> */}
            </div>

            {/* <MapContainer
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

   <Marker position={[34.62829620983138, 50.878898715923015]  }>
          <Popup > Sane_Computer</Popup>
        </Marker> 
      </MapContainer>        */}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import GoogleMap from 'google-map-react';
// import MyGreatPlace from './my_great_place.jsx';

// const SimpleMapPage = ({ center = [59.938043, 30.337157], zoom = 9, greatPlaceCoords = { lat: 59.724465, lng: 30.080121 } }) => {
//   return (
//     <GoogleMap
//       // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
//       center={center}
//       zoom={zoom}>
//       <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
//       <MyGreatPlace {...greatPlaceCoords} text={'B'} /* road circle */ />
//     </GoogleMap>
//   );
// };

// export default SimpleMapPage;
