"use client";

import ProductCard from "@/components/templatess/AsemblySystem/ProductCard";
import { MainContext } from "@/context/MainContext";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
    let { setXtFlagSpinnerShow } = useContext(MainContext)
    const searchParams = useSearchParams();

    const [hwList, setHWList] = useState([]);
    const [flag, setFlag] = useState(false)
    const [searchSystems, setSearchSystems] = useState([])


    useEffect(() => {

        const map = {
            mainId: 1,
            cpuId: 2,
            ramId: 3,
            vgaId: 4,
            ssdId: 5,
            powerId: 8,
            caseId: 9
        };

        const result = [];

        Object.entries(map).forEach(([paramName, parentHardWare]) => {

            const value = searchParams.get(paramName);

            if (value) {

                result.push({
                    parentHardWare: parentHardWare,
                    cyProductId: Number(value),
                    name: ""
                });

            }

        });

        setHWList(result);
        setFlag(true)

    }, [searchParams]);

    const searchSystem = () => {
        let obj = { hardwares: hwList }

        async function myApp() {
            const res = await fetch(`${apiUrl}/api/SysPC2/Search`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)

            }).then(res => {
                if (res.ok) return res.json().then(result => {
                    setSearchSystems(result)
                    setXtFlagSpinnerShow(false)
                })
            })
        }
        myApp()
    }

    useEffect(() => {
        if (hwList?.length != 0) {
            searchSystem()
        }
    }, [flag])

    useEffect(() => {
        setXtFlagSpinnerShow(true)
    }, [])

    return (
        <div className="boxSh p-1 ">

            <section className="flex-grow-1 mt-5" >
                {searchSystems?.length == 0 ? (
                    <div className="sane-card p-5 text-center sane-text-sub" style={{ height: '400px', marginTop: "100px" }}> سیستمی با مشخصات فیلتر شده پیدا نشد</div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                        {
                            searchSystems.map((item) => (
                                <div className="col" key={item.id}>
                                    <ProductCard product={item} />
                                </div>
                            ))}
                    </div>
                )}
            </section>

        </div>
    );
}