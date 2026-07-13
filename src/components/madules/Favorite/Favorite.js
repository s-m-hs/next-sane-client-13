"use client"
import React, { useContext, useState } from 'react'
import { Heart } from "@phosphor-icons/react";
import alertAA from '@/utils/Alert/AlertAA';
import ApiPostX0 from '@/utils/ApiServicesX/ApiPostX0';
import AlertInfo from '@/utils/Alert/AlertInfo';
import { MainContext } from '@/context/MainContext';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { ShareNetwork } from "@phosphor-icons/react";
export default function Favorite(props) {
    let { xtFlagLogin } = useContext(MainContext)
    const rout = useRouter();

    const [isfavor, setIsFavor] = useState(false)
    const alertPu = (position, icon, title, timer) =>
        Swal.fire({
            position: "center",
            icon: "info",
            title: "لطفا ابتدا با شماره همراه خود وارد شوید(کمتراز 30 ثانیه 😊) ",
            showConfirmButton: true,
            confirmButtonText: "باشه",
        }).then((res) => {
            rout.push("/register");
        });
    const funcA = (msg) => {
        alertAA(msg)
        setIsFavor(true)
    }
    const funcB = (msg) => {
        AlertInfo(msg)
    }
    const addFavorite = () => {
        let obj = {
            cyProductId: props.id
        }

        ApiPostX0(`/api/CyUsers/addFavorite`, obj, funcA, funcB)
    }
    return (
        <div onClick={() => {
            if (xtFlagLogin) {

                addFavorite()
            } else {
                alertPu("center", "info", "لطفا ابتدا با شماره همراه خود وارد شوید(کمتراز 30 ثانیه 😊) ", 1000);
            }
        }}>
            {(props.isFavorite || isfavor) ? <Heart size={20} weight="fill" color="var(--them)" />
                : <Heart size={20} weight="thin" color="var(--them)" />}
            {/* 
                        {(props.isFavorite || isfavor) ? <Heart size={20} weight="fill" color="#f50000" />
                : <Heart size={20} weight="thin" color="#f50000" />} */}
        </div>
    )
}
