'use client'
import { MainContext } from '@/context/MainContext'
import hardWareData from '@/utils/exelData';
import SearchBoxB from '@/utils/SearchBoxB';
import {DownloadSimple,HandPointing,ArrowCounterClockwise} from "@phosphor-icons/react";

import React, { useContext, useEffect, useState } from 'react'
import style from './SystemPart.module.css'
export default function SystemPart() {
    const [prices, setPrices] = useState([]); // لیست قیمت‌ها
    const [quantities, setQuantities] = useState([]); // لیست تعداد محصولات
let{setXtFlagSpinnerShow}=useContext(MainContext)

    const HardWareName = [
    { id: 1, name: 'مادربرد  (MAINBOARD)' },
    { id: 2, name: 'سی پی یو  (CPU)' },
    { id: 3, name: 'رم  (RAM)' },
    { id: 4, name: 'کارت گرافیک  (GRAFIC)' },
    { id: 5, name: 'هارد  (SATA-NVME) SSD' },
    { id: 6, name: 'هارد (HDD) ' },
    { id: 7, name: 'پاور  (POWER)' },
    { id: 8, name: 'کیس  (CASE)' },
    { id: 9, name: 'خنک کننده  (COOLING)' },
    { id: 10, name: 'مانیتور  (MONITOR)' },
    // { id: 11, name: 'KEY & MOUSE' },
    // { id: 12, name: 'DVD_R' },
    // { id: 13, name: 'OTHER' },
];
    const handlePriceChange = (price, index) => {
        setPrices((prevPrices) => {
            const newPrices = [...prevPrices];
            newPrices[index] = price;
            return newPrices;
        });
    };
    const handleClear = (index) => {
        setPrices((prevPrices) => {
            const newPrices = [...prevPrices];
            newPrices[index] = 0; // قیمت مرتبط با مشخصات خالی می‌شود
            return newPrices;
        });
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = 0; // تعداد مرتبط نیز صفر می‌شود
            return newQuantities;
        });
    };

    const handleQuantityChange = (quantity, index) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            if (!quantity) {
                // اگر مقدار خالی شد، قیمت را هم حذف کن
                setPrices((prevPrices) => {
                    const newPrices = [...prevPrices];
                    newPrices[index] = 0; // قیمت مربوط به این قطعه صفر می‌شود
                    return newPrices;
                });
            }
            newQuantities[index] = quantity ? parseInt(quantity) : 0; // مقدار پیش‌فرض صفر
            return newQuantities;
        });
    };

    const calculateTotal = () => {
        // محاسبه مجموع اولیه
        const baseTotal = prices.reduce((acc, price, index) => {
            const quantity = quantities[index] || 1; // مقدار پیش‌فرض تعداد 1
            return acc + (price || 0) * quantity;
        }, 0);

        // اعمال درصد اضافه
        if (baseTotal <= 60000000) {
            return baseTotal + baseTotal * 0.05; // اضافه کردن 5 درصد
        } else {
            return baseTotal + baseTotal * 0.06; // اضافه کردن 6 درصد
        }
    };

    useEffect(() => {
        setXtFlagSpinnerShow(false);
    }, []);

    return (
        <div className="container ">
            <div className="row boxSh ">

            <div className= {`col-md-5 ${style.detail} p-5`}>
<ul>
    <li>قیمت اعلام شده صرفا جهت اطلاع شما مشتری گرامی از قیمت تقریبی تمام شده سیستم میباشد ...</li>
    <li>بدیهی است قیمت نهایی سیستم بعد از تایید نهایی همکاران ما اعلام میشود...</li>
    <li>قیمت اعلام شده شامل هزینه اسمبل و راه اندازی سیستم (نصب سیستم عامل ویندوز- درایور- آنتی ویروس اورجینال و برنامه های کاربردی از قبیل  مجموعه آفیس ، پلیر ،مرورگر و ... می باشد)...</li>
    <li>جهت مشاوره و یا تایید نهایی سیستم فایل ذخیره شده را برای همکاران ما تیکت نمایید ...</li>
    <li className= {` ${style.li_click}`}>جهت راهنمایی و توضیحات بیشتر کلیک کنید ...<HandPointing size={32} /></li>
</ul>
            </div>

                <div className="col-md-7 p-5">
                    <div>
                        <table className={`table table-hover ${style.table}`} >
                            <thead>
                                <tr>
                                    <th>قطعه</th>
                                    <th>مشخصات</th>
                                    <th className={`${style.th_number}`}>تعداد</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HardWareName.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <SearchBoxB
                                                array={hardWareData}
                                                placeholder={"..."}
                                                id="manufacturerNameForAdd"
                                                onPriceChange={(price) => handlePriceChange(price, index)}
                                                onClear={() => handleClear(index)}
                                            />
                                        </td>
                                        <td className={`${style.td_number}`}>
                                    
                                               <input
                                                type="number"
                                                placeholder="1"
                                                min="1"
                                                value={quantities[index] || ''}
                                                onChange={(e) => handleQuantityChange(e.target.value, index)}
                                                onBlur={(e) =>
                                                    !e.target.value && handleQuantityChange('', index) // حذف مقدار
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={`${style.total_div} systemAs-total-but centerr`}>
                            <h3>مجموع کل:</h3>
                            <input
                                type="text"
                                readOnly
                                placeholder={`${calculateTotal().toLocaleString()} تومان`}
                            />
                            <button className='btn btn-primary'>ذخیره
                            <DownloadSimple size={32} />
                            </button>
                            <button className='btn btn-warning'>بازنشانی
                            <ArrowCounterClockwise size={32} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default function SystemPart() {
//     const [dataProp, setDataProp] = useState([]);
//     const [xtSearchB, setXtSearchB] = useState('');
//     const [xtSearchPrice, setXtSearchPrice] = useState('');
//     const [prices, setPrices] = useState([]);
//     const [flagA,setFlagA]=useState(false)
//     const [flagB,setFlagB]=useState(false)
//     const [flagC,setFlagC]=useState(false)
//     const[resetSearchbox,setResetSearchbox]=useState(false)
// let{setXtFlagSpinnerShow}=useContext(MainContext)
// const HardWareName = [
//     { id: 1, name: 'مادربرد  (MAINBOARD)' },
//     { id: 2, name: 'سی پی یو  (CPU)' },
//     { id: 3, name: 'رم  (RAM)' },
//     { id: 4, name: 'کارت گرافیک  (GRAFIC)' },
//     { id: 5, name: 'هارد  (SATA-NVME) SSD' },
//     { id: 6, name: 'هارد (HDD) ' },
//     { id: 7, name: 'پاور  (POWER)' },
//     { id: 8, name: 'کیس  (CASE)' },
//     { id: 9, name: 'خنک کننده  (COOLING)' },
//     { id: 10, name: 'مانیتور  (MONITOR)' },
//     // { id: 11, name: 'KEY & MOUSE' },
//     // { id: 12, name: 'DVD_R' },
//     // { id: 13, name: 'OTHER' },
// ];


// const handlePriceChange = (price, index) => {
//     setPrices((prevPrices) => {
//         const newPrices = [...prevPrices];
//         newPrices[index] = price;
//         return newPrices;
//     });
// };

// const total = prices.reduce((acc, curr) => acc + curr, 0); // مجموع کل


//     useEffect(()=>{
//         setXtFlagSpinnerShow(false)
//     },[])
//   return (
//     <div className='container'>
      
//       <div className='row'>

//         <div className='col-7'>

//         <div>
//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th>قطعه</th>
//                                         <th>مشخصات</th>
//                                         {/* <th>تعداد</th> */}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {HardWareName.map((item, index) => (
//                                         <tr key={item.id}>
//                                             <td>{item.name}</td>
//                                             <td className={!flagB ? '': 'systemAs-searchtd'} >
//                                                 <SearchBoxB
//                                                     array={hardWareData}
//                                                     placeholder={' ...'}
//                                                     id="manufacturerNameForAdd"
//                                                     onPriceChange={(price) => handlePriceChange(price, index)} // دریافت تغییر قیمت
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input type="number" placeholder="1" />
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div className=' systemAs-total-but'>
//     <h6>مجموع کل :</h6>
// {/* <input type="text" placeholder={total ?`${ (total*1000).toLocaleString()}  تومان`:null} /> */}
// <input type="text" placeholder={`${ (total).toLocaleString()}  تومان`} />

// </div>
//                         </div>
//         </div>

//         <div className='col-5'></div>
//       </div>
//     </div>
//   )
// }
