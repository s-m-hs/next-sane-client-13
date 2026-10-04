"use client";

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styles from "./SerachComp.module.css"
import { MainContext } from '@/context/MainContext'
import Link from 'next/link';
import ApiPostX1 from '@/utils/ApiServicesX/ApiPostX1';
import { useRouter } from 'next/navigation';
import TypeIt from 'typeit-react';
import { NOOffer } from '@/utils/DataStore';

export default function SearchComp({ param }) {
    let { offer, searchInput, setSearchInput, searchResult, setSearchResult, flagSearchInHeader, setFlagSearchInHeader, setXtFlagSpinnerShow } = useContext(MainContext)

    const rout = useRouter()
    //////////////
    let obj = {
        name: param,
        productCategoryCode: null,
        productCategoryId: null,
        categoryCode: null,
        manufacturerName: null,
        pageNumber: 0,
        pageSize: 1000,
    };
    const func = (result) => {
        setSearchResult(result)
        setXtFlagSpinnerShow(false)
    }
    const searchBox = () => ApiPostX1(`/api/CyProducts/SearchProductsClient`, obj, func)

    useEffect(() => {
        setSearchInput(param)

    }, [])
    useEffect(() => {
        setFlagSearchInHeader(false)
        setSearchResult([])
        searchBox()
    }, [flagSearchInHeader])

    //////////////
    return (
        <div className='container boxSh p-3'>
            <div className={`${styles.searchbox} `}>

                {searchResult?.itemList?.length != 0
                    ? searchResult?.itemList?.map((item) => {
                        if (item.cyCategoryId) {
                            return (
                                <Link

                                    href={`/product/${item.id}`}
                                    onClick={() => {
                                        setXtFlagSpinnerShow(true);
                                    }}
                                >
                                    <div
                                        className={`${styles.div_searchbox}  m-1 boxSh`}
                                    >
                                        <img src={item.smallImage} alt={item.name} />


                                        <div className='centerc'>
                                            <span>{item.name}</span>
                                            <span className={item.supply != 0 ? styles.supply : styles.noSupply}>{(item.supply != 0 && item.isToSale) ?
                                                '' :
                                                (item.supply != 0 && !item.isToSale) ?
                                                    " موجود-استعلام قیمت" : "استعلام قیمت"}</span>

                                            {(item.supply != 0 && item.isToSale) &&
                                                (offer.offerType == NOOffer && (item.noOffPrice == item.price)) &&

                                                <span className={styles.price}>{(item.resultPrice / 10).toLocaleString()} تومان</span>}


                                            {(item.supply != 0 && item.isToSale) &&
                                                (offer.offerType != NOOffer || (item.noOffPrice != item.price)) &&
                                                <>
                                                    <span className={styles.price}>{(item.resultPrice / 10).toLocaleString()} تومان</span>

                                                    <span className={styles.underline}>{(item.noOffPrice / 10).toLocaleString()} تومان</span>
                                                </>



                                            }

                                        </div>

                                    </div>
                                </Link>
                            );
                        }
                    })
                    :

                    <>

                        <TypeIt
                            options={{
                                strings: ["نتیجه ای برای جستجوی شما پیدا نشد 🤔 "],
                                speed: 20,
                                // loop: true,
                                waitUntilVisible: true,
                                deleteSpeed: 100,
                            }}
                        />
                    </>
                }
            </div>

        </div>
    )
}
