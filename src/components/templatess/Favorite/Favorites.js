'use client'


import CardC from '@/components/madules/Cards/CardC/CardC'
import ApiGetX2 from '@/utils/ApiServicesX/ApiGetX2'
import React, { useContext, useEffect, useState } from 'react'
import Styles from './Favorites.module.css'
import { IoIosCloseCircleOutline } from "react-icons/io";
import ApiDeleteX from '@/utils/ApiServicesX/ApiDeleteX'
import ApiDeleteX2 from '@/utils/ApiServicesX/ApiDeleteX2'
import { MainContext } from '@/context/MainContext'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import ApiGetX3 from '@/utils/ApiServicesX/ApiGetX3'
export default function Favorites() {
  let { setXtFlagSpinnerShow, xtFlagSpinnerShow } = useContext(MainContext);
  const rout = useRouter();

  const [userFavorites, setUserFavorites] = useState([])
  const alertPu = (position, icon, title, timer) =>
    Swal.fire({
      position: "center",
      icon: "info",
      title: "محصولی در لیست علاقه مندی های شما موجود نیست 🤔",
      showConfirmButton: true,
      confirmButtonText: "باشه",
    }).then((res) => {
      rout.push("/");
    });

  const funcA = () => {

    alertPu("center", "info", "لطفا ابتدا با شماره همراه خود وارد شوید(کمتراز 30 ثانیه 😊) ", 1000);

  }
  const getUserFavorites = () => {
    ApiGetX3(`/api/CyUsers/getUserFavories`, setUserFavorites, funcA)
  }
  const deleteFav = (proId) => ApiDeleteX2(`/api/CyUsers/deletFavorite?proId=${proId}`, getUserFavorites)




  useEffect(() => {
    getUserFavorites()
    setXtFlagSpinnerShow(false);

  }, [])

  return (
    <div className='container centerrc'>

      <div className={`row row-cols-auto  centerr ${Styles.category_row}`}>

        {userFavorites?.length != 0 &&
          userFavorites?.map((item, index) => {
            return item.isShow &&
              (
                <div
                  key={index}
                  className={`centerc ${Styles.products_col}`}
                >
                  <span className={`${Styles.span}`} onClick={() => {
                    deleteFav(item.id)
                  }}>
                    <IoIosCloseCircleOutline size={25} color='var(--themA)' /></span>

                  <CardC
                    parentId={null}
                    id={item.id}
                    imgSrc={item.smallImage}
                    title={item.name}
                    price={Number(item.resultPrice) / 10}
                    noOffPrice={Number(item.noOffPrice) / 10}
                    offPrice={null}
                    supply={item.supply}
                    isToSale={item.isToSale}
                    verifyHam={null}
                    offerState={null}
                    isFavor={item.isFavorite}
                    isShowHeart={false}
                  />
                </div>
              )
          })

        }
      </div>
    </div>
  )
}
