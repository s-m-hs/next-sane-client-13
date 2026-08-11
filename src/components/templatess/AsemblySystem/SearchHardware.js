import ApiGetX2 from '@/utils/ApiServicesX/ApiGetX2'
import apiUrl from '@/utils/ApiUrl/apiUrl'
import { ParentHardWareSearch } from '@/utils/DataStore'
import SearchBox from '@/utils/SearchBox'
import SearchBoxB from '@/utils/SearchBoxB'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { CloseButton } from 'react-bootstrap'
import Styles from './AssemblySystem.module.css'
import { MainContext } from '@/context/MainContext'
import Modal from 'react-bootstrap/Modal';
import { HandPointing } from '@phosphor-icons/react'
export default function SearchHardware(props) {
    let { setXtFlagSpinnerShow } = useContext(MainContext)
    const router = useRouter();
    const [product, setProduct] = useState([])
    const [parentId, setParentId] = useState(0)
    const [parentEnum, setParentEnum] = useState(0)
    const [hwList, setHWList] = useState([])
    const [activeLi, setActiveLi] = useState(0)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getProduct = () => {
        var url = `/api/SysPC2/productByProductCatId?proCatId=${parentId}`
        ApiGetX2(url, setProduct)
    }
    const searchSystems = () => {
        const params = new URLSearchParams();

        hwList.forEach((item) => {

            if (!item.cyProductId) {
                return;
            }

            switch (item.parentHardWare) {

                // Main
                case 1:
                    params.set("mainId", item.cyProductId);
                    break;

                // CPU
                case 2:
                    params.set("cpuId", item.cyProductId);
                    break;

                // RAM
                case 3:
                    params.set("ramId", item.cyProductId);
                    break;

                // VGA
                case 4:
                    params.set("vgaId", item.cyProductId);
                    break;

                // SSD
                case 5:
                    params.set("ssdId", item.cyProductId);
                    break;

                // Power
                case 8:
                    params.set("powerId", item.cyProductId);
                    break;

                // Case
                case 9:
                    params.set("caseId", item.cyProductId);
                    break;
            }
        });

        // console.log(params.toString());

        router.push(`/computers/search?${params.toString()}`);
    }

    useEffect(() => {
        if (parentId != 0) {
            setProduct([])
            getProduct()
        }
    }, [parentId])

    return (
        <>
            <div className="d-lg-none mb-4" style={{
                overflowX: "auto",
                position: "fixed",
                top: '130px',
                zIndex: 10000,
                backgroundColor: '#ffff',
                // height: '50px',
                width: '100%'
            }}>
                <div className="d-flex gap-2">
                    <button className='btn btn-light' onClick={() => setShow(true)}><h3 style={{ color: '#6d28d9' }}>جستجو
                        <HandPointing style={{ fontSize: "18px", transform: 'rotate(70deg)' }} />

                    </h3></button>
                    <Modal show={show} onHide={handleClose} Click={handleShow} style={{ zIndex: 10000 }}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="sane-card p-3 centerc" style={{ position: "sticky", top: "1.5rem" }}>
                                <h3>فیلتر  : </h3>
                                <ul>
                                    {ParentHardWareSearch.map(item => (

                                        <li
                                            onFocus={() => {
                                                setParentId(item.id)
                                                setParentEnum(item.enum)
                                                setActiveLi(item.id)
                                            }}

                                            key={item.enum}
                                        >
                                            <SearchBox
                                                // array={hardWareData}
                                                array={product}
                                                placeholder={item.title}
                                                id="product"
                                                parentId={parentId}
                                                setHWList={setHWList}
                                                parentEnum={parentEnum}
                                                activeLi={activeLi}
                                            // onClear={() => handleClear(index)}
                                            // reset={resetSearchbox}

                                            />
                                            {/* <span>{hwList?.filter(filter => filter.parentHardWare == item.enum)?.[0]?.name}</span> */}
                                        </li>
                                    ))}

                                </ul>

                                <hr />

                                <h4 style={{ color: "red" }}>فیلترهای انتخاب شده :</h4>
                                <ul >
                                    {hwList?.length != 0 && hwList.map(item => (
                                        <li
                                            className={`${Styles.searchli}`}
                                            style={{ listStyle: 'initial' }}
                                        >
                                            {/* <button className='btn btn-light'
                                                onClick={() => {
                                                    setHWList(prev => {
                                                        const deleted = prev.filter(filter => (
                                                            filter.cyProductId != item.cyProductId
                                                        ))
                                                        if (deleted) return deleted
                                                    }

                                                    )
                                                }}
                                            >
                                                <CloseButton />
                                            </button> */}
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>

                                <button className={hwList?.length == 0 ? 'btn btn-success btn-lg disabled' : 'btn btn-success btn-lg '} onClick={() => {
                                    searchSystems()
                                }}>جستجو کن</button>
                            </div></Modal.Body>
                    </Modal>
                </div>
            </div>
            <aside className="d-none d-lg-block flex-shrink-0 " style={{ width: "280px" }}>

                <div className="sane-card p-3 centerc" style={{ top: "1.5rem" }}>
                    <h3>فیلتر  : </h3>
                    <ul>
                        {ParentHardWareSearch.map(item => (

                            <li
                                onFocus={() => {
                                    setParentId(item.id)
                                    setParentEnum(item.enum)
                                    setActiveLi(item.id)
                                }}

                                key={item.enum}
                            >
                                <SearchBox
                                    // array={hardWareData}
                                    array={product}
                                    placeholder={item.title}
                                    id="product"
                                    parentId={parentId}
                                    setHWList={setHWList}
                                    parentEnum={parentEnum}
                                    activeLi={activeLi}
                                // onClear={() => handleClear(index)}
                                // reset={resetSearchbox}

                                />
                                {/* <span>{hwList?.filter(filter => filter.parentHardWare == item.enum)?.[0]?.name}</span> */}
                            </li>
                        ))}

                    </ul>

                    <hr />

                    <h4 style={{ color: "red" }}>فیلترهای انتخاب شده :</h4>
                    <ul >
                        {hwList?.length != 0 && hwList.map(item => (
                            <li
                                className={`${Styles.searchli}`}
                                style={{ listStyle: 'initial' }}
                            >
                                {/* <button className='btn btn-light'
                                    onClick={() => {
                                        setHWList(prev => {
                                            const deleted = prev.filter(filter => (
                                                filter.cyProductId != item.cyProductId
                                            ))
                                            if (deleted) return deleted
                                        }

                                        )
                                    }}
                                >
                                    <CloseButton />
                                </button> */}
                                {item.name}
                            </li>
                        ))}
                    </ul>

                    <button className={hwList?.length == 0 ? 'btn btn-success btn-lg disabled' : 'btn btn-success btn-lg '} onClick={() => {
                        searchSystems()
                    }}>جستجو کن</button>
                </div>
            </aside >
        </>

    )
}
