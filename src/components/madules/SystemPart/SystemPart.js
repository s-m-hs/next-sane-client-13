"use client";
import { MainContext } from "@/context/MainContext";
import hardWareData from "@/utils/exelData";
import SearchBoxB from "@/utils/SearchBoxB";
import {
  DownloadSimple,
  HandPointing,
  ArrowCounterClockwise,
  XCircle,
} from "@phosphor-icons/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import style from "./SystemPart.module.css";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import Modal from "react-bootstrap/Modal";
import apiUrl from "@/utils/ApiUrl/apiUrl";

export default function SystemPart() {
  const [lgShow, setLgShow] = useState(false);
  const [resetSearchbox, setResetSearchbox] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [getExel, setGetExel] = useState([]);
  const [priceArray, setPriceArray] = useState([]);
  const [keyHelp, setKeyHelp] = useState("");
  const classRefA = useRef();
  // const [isSaving, setIsSaving] = useState(false);
  const [prices, setPrices] = useState([]); // لیست قیمت‌ها
  const [quantities, setQuantities] = useState([]); // لیست تعداد محصولات
  let { setXtFlagSpinnerShow, xtflagSpinnerShow } = useContext(MainContext);
  const getPriceArray = () => {
    // const getLocalStorage = localStorage.getItem('loginToken')

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/10`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${getLocalStorage}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json().then((result) => {
          setPriceArray(JSON.parse(result.tag));
        });
      });
    }
    myApp();
  };
  useEffect(() => {
    getPriceArray();
  }, []);

  const HardWareName = [
    { id: 1, name: "مادربرد  (MAINBOARD)" },
    { id: 2, name: "سی پی یو  (CPU)" },
    { id: 3, name: "رم  (RAM)" },
    { id: 4, name: "کارت گرافیک  (GRAFIC)" },
    { id: 5, name: "هارد  (SATA-NVME) SSD" },
    { id: 6, name: "هارد (HDD) " },
    { id: 7, name: "پاور  (POWER)" },
    { id: 8, name: "کیس  (CASE)" },
    { id: 9, name: "خنک کننده  (COOLING)" },
    { id: 10, name: "مانیتور  (MONITOR)" },
    // { id: 11, name: 'KEY & MOUSE' },
    // { id: 12, name: 'DVD_R' },
    // { id: 13, name: 'OTHER' },
  ];

  const systemSample = [
    {
      id: "1",
      title: "سیستم خانگی و اداری سطح 1",
      src: "/images/system/Capture1.PNG",
      color: "#56cdff",
    },
    {
      id: "2",
      title: "سیستم خانگی و اداری سطح 2",
      src: "/images/system/Capture2.PNG",
      color: "#34e619",
    },
    {
      id: "3",
      title: "سیستم خانگی و اداری سطح 3",
      src: "/images/system/Capture3.PNG",
      color: "#9d66f5",
    },
    {
      id: "4",
      title: "سیستم گیمینگ و مهندسی سطح 1",
      src: "/images/system/Capture4.PNG",
      color: "#ffbc00",
    },
    {
      id: "5",
      title: "سیستم گیمینگ و مهندسی سطح 2",
      src: "/images/system/Capture5.PNG",
      color: "#e056d2",
    },
    {
      id: "6",
      title: "سیستم گیمینگ و مهندسی سطح 3",
      src: "/images/system/Capture6.PNG",
      color: "#ff4d37",
    },
  ];

  const cardClickHandle = (src) => {
    classRefA.current.classList.add("SystemPart-show");
    setImageSrc(src);
  };
  // const getdataExel=()=>{
  //   const getLocalStorage=localStorage.getItem('loginToken')
  //   async function myApp() {
  //     const res=await fetch(`${apiUrl}/api/CyGuarantee?phoneNumber=09196025114`,{
  //       method:'GET',
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${getLocalStorage}`,
  //         }

  //     }).then(res=>{
  //       if(res.ok){
  //        return res.json()
  //       }
  //     }).then(result=>{
  //       console.log(result)
  //       setGetExel(result)
  //     })
  //   }
  //   myApp()
  // }
  // useEffect(()=>{
  //   getdataExel()
  // },[])
  const generatePDF = () => {
    // setIsSaving(true); // نمایش اسپینر
    setXtFlagSpinnerShow(true); // نمایش اسپینر
    const element = document.querySelector(".systemTable"); // بخش فاکتور
    html2canvas(element)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("قطعات سیستم.pdf"); // ذخیره فایل
        // setIsSaving(false); // مخفی کردن اسپینر پس از ذخیره شدن
        setXtFlagSpinnerShow(false); // مخفی کردن اسپینر پس از ذخیره شدن
      })
      .catch(() => {
        // setIsSaving(false); // در صورت خطا نیز اسپینر غیرفعال شود
        setXtFlagSpinnerShow(false); // در صورت خطا نیز اسپینر غیرفعال شود
        alert("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      });
  };

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
  const getkeyHelp = (id) => {
    // const getLocalStorage =localStorage.getItem('loginToken')

    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",

          // Authorization:`Bearer ${ getLocalStorage }`
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setKeyHelp(result.value);
          });
        }
      });
    }
    myApp();
  };

  useEffect(() => {
    getkeyHelp(12);
  }, []);
  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  return (
    <div className={`container `}>
      {/* {isSaving && (
            <div className="spinner-overlay">
                <SpinnerA size={50} />
            </div>
        )} */}
      <div className={`row ${style.systemdetailsample_container}`}>
        <div
          ref={classRefA}
          className={`col-md-5 ${style.systemdetailsample_div} `}
        >
          <XCircle
            size={32}
            color="#ad00ff"
            onClick={() =>
              classRefA.current.classList.remove("SystemPart-show")
            }
          />
          <img src={imageSrc} alt="" />
        </div>
        <div className="col-md-7"></div>
      </div>

      <div className="row boxSh ">
        <div className={`col-md-5 ${style.div_r} p-5`}>
          <h1>سیستم های پیشنهادی :</h1>
          <div className="container  ">
            <div className={`row row-cols-3 mt-5 ${style.div_card} `}>
              {systemSample.map((item) => (
                <div
                  className={`col ${style.card} boxSh`}
                  style={{ backgroundColor: `${item.color}` }}
                  onClick={() => {
                    cardClickHandle(item.src);
                  }}
                >
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-7 p-5 systemTable">
          <div className={` ${style.detail} `}>
            <div
              className={`${style.col} `}
              dangerouslySetInnerHTML={{ __html: `${keyHelp}` }}
            ></div>

            <div
              className={` ${style.li_click}`}
              onClick={() => setLgShow(true)}
            >
              جهت راهنمایی و توضیحات بیشتر کلیک کنید ...
              <HandPointing size={32} className={style.handIcon} />
            </div>
            {/* <ul>
              <li>
                قیمت اعلام شده صرفا جهت اطلاع شما مشتری گرامی از قیمت تقریبی
                تمام شده سیستم میباشد ...
              </li>
              <li>
                بدیهی است قیمت نهایی سیستم بعد از تایید نهایی همکاران ما اعلام
                میشود...
              </li>
              <li>
                قیمت اعلام شده شامل هزینه اسمبل و راه اندازی سیستم (نصب سیستم
                عامل ویندوز- درایور- آنتی ویروس اورجینال و برنامه های کاربردی از
                قبیل مجموعه آفیس ، پلیر ،مرورگر و ... می باشد)...
              </li>
              <li>
                جهت مشاوره و یا تایید نهایی سیستم فایل ذخیره شده را طبق راهنمایی لینک پایین  
               تیکت نمایید و یا از ابزارک پایین سمت راست صفحه جهت چت کردن با همکاران ما اقدام بفرمایید  ...
              </li>
              <li
                className={` ${style.li_click}`}
                onClick={() => setLgShow(true)}
              >
                جهت راهنمایی و توضیحات بیشتر کلیک کنید ...
                <HandPointing size={32} className={style.handIcon} />
              </li>
            </ul> */}
          </div>

          <div>
            <table className={`table table-hover  ${style.table}`}>
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
                        // array={hardWareData}
                        array={priceArray}
                        placeholder={"..."}
                        id="manufacturerNameForAdd"
                        onPriceChange={(price) =>
                          handlePriceChange(price, index)
                        }
                        onClear={() => handleClear(index)}
                        reset={resetSearchbox}
                      />
                    </td>
                    <td className={`${style.td_number}`}>
                      <input
                        type="number"
                        placeholder="1"
                        min="1"
                        value={quantities[index] || ""}
                        onChange={(e) =>
                          handleQuantityChange(e.target.value, index)
                        }
                        onBlur={
                          (e) =>
                            !e.target.value && handleQuantityChange("", index) // حذف مقدار
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
              <button className="btn btn-primary" onClick={generatePDF}>
                ذخیره
                <DownloadSimple size={32} />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  setResetSearchbox(!resetSearchbox);
                  setPrices(HardWareName.map(() => 0));
                  setPrices([]); // صفر کردن تمام مقادیر قیمت‌ها
                }}
              >
                بازنشانی
                <ArrowCounterClockwise size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className={`${style.modal_div}`}>
            <h5>
              بعد از انتخاب کلید ذخیره ،لیست قطعات درخواستی شما به صورت فایل pdf
              در دستگاه شما ذخیره میشود...
            </h5>
            <img src="../../../../images/help/help1.png" alt="" />
            <hr />
            <img src="../../../../images/help/help2.png" alt="" />

            <h5>
              سپس با حساب کاربری خود وارد شوید (در صورت نداشتن حساب از قسمت
              عضویت یک حساب کاربری بسازید ) و وارد قسمت تیکتها شوید...
            </h5>
            <img src="../../../../images/help/help3.png" alt="" />
            <hr />

            <h5>
              در این بخش با انتخاب کلید ایجاد پیام جدید و سپس انتخاب یک عنوان
              دلخواه برای پیام خود و در آخر با انتخاب فایل ذخیره از دستگاه خود
              گزینه ارسال پیام را کلیک کنید،بعد از این مرحله همکاران ما بعد از
              بررسی قطعات درخواستی شما نتیجه را از همین بخش تیکتها به اطلاع شما
              میرسانند.
            </h5>
            <img src="../../../../images/help/help4.png" alt="" />
          </div>
        </Modal.Body>
      </Modal>
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
