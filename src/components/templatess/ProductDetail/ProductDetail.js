"use client";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProductDetail.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProducyDetailRight from "./ProducyDetailRight/ProducyDetailRight";
import ProductDetailLeft from "./ProductDetailLeft/ProductDetailLeft";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  HouseLine,
  Dresser,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowCounterClockwise,
  ChatCircleDots,
} from "@phosphor-icons/react";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import { laptopItems } from "@/utils/DataStore";

// import ProductDetailL from '../../Components/ProductDetail/ProductDetailL'

export default function ProductDetail({ param }) {
  const [productDetail, setProductDetail] = useState([]);
  const [productDetailB, setProductDetailB] = useState({});
  const [idCategory, setIdCategory] = useState("");
  const [braCram, setBramCram] = useState([]);
  const [laptopReview, setLaptopReview] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const [laptopSubject, setLaptopSubject] = useState(null)
  const revercBrad = braCram?.slice().reverse();
  let { nameCategory, setXtFlagSpinnerShow, offer } = useContext(MainContext);
  console.log(laptopReview)
  const getProductById = (id) => {
    async function myAppPost() {
      const res = await fetch(`${apiUrl}/api/CyProducts/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result) {
            setProductDetail(result.spec);
            setIdCategory(result.cyProductCategoryId);
            setProductDetailB(result);
            setLaptopReview(result?.cyLaptop)
            setSubjectId(result?.cyLaptop?.cySubjectId)
          }
        })
        .catch((err) => console.log(err));
    }
    myAppPost();
  };

  const getBroadCrum = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProducts/breadcrumbs/${param}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setBramCram(result);
          });
        }
      });
    }
    myApp();
  };
  console.log(laptopSubject, subjectId)
  const getsubjectDetail = () => {
    // const getLocalStorage = localStorage.getItem("loginToken");
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/${subjectId}`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((resullt) => {
          setLaptopSubject(resullt);
        });
    }
    myApp();
  };
  useEffect(() => {
    if (subjectId) {
      getsubjectDetail()
      // ApiGetX2(`CySubjects/${subjectId}`, setLaptopSubject)
    }
  }, [subjectId])
  useEffect(() => {
    setIdCategory("");
    getProductById(param);
    getBroadCrum();
  }, [param]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, []);

  console.log(productDetail, productDetailB)
  return (
    <div className={`container ${Styles.page}`}>
      {/* ===== نوار مسیر ===== */}
      <div className={Styles.breadcrumbWrap}>
        {revercBrad.length != 0 && (
          <Breadcrumb className={Styles.breadcrumb}>
            <Breadcrumb.Item>
              <Link href="/">
                <HouseLine size={16} weight="fill" />
                خانه
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link
                onClick={() => setXtFlagSpinnerShow(true)}
                href={`/category/${idCategory}`}
              >
                <Dresser size={16} weight="fill" />
                {revercBrad[0]}
              </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item active href="/">
              {revercBrad[1]}
            </Breadcrumb.Item>

            {revercBrad[2] && (
              <Breadcrumb.Item active href="/">
                {revercBrad[2]}
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        )}
      </div>

      {/* ===== کارت اصلی محصول ===== */}
      <div className={Styles.detailCard}>
        <div className="row g-0">
          <div className={`col-lg-9 ${Styles.mainCol}`}>
            <ProductDetailLeft detail={productDetailB} />
          </div>
          <div className={`col-lg-3 ${Styles.specCol}`}>
            <ProducyDetailRight
              spec={productDetail}
              laptopReview={laptopReview}
            />
          </div>
        </div>
      </div>

      {/* ===== مزیت‌های خرید ===== */}
      <div className={Styles.trustRow}>
        <div className={Styles.trustItem}>
          <Truck size={22} weight="duotone" className={Styles.trustIcon} />
          <span className={Styles.trustText}>ارسال سریع به سراسر کشور</span>
        </div>
        <div className={Styles.trustItem}>
          <ShieldCheck size={22} weight="duotone" className={Styles.trustIcon} />
          <span className={Styles.trustText}>ضمانت اصالت کالا</span>
        </div>
        <div className={Styles.trustItem}>
          <CreditCard size={22} weight="duotone" className={Styles.trustIcon} />
          <span className={Styles.trustText}>پرداخت امن آنلاین</span>
        </div>
        <div className={Styles.trustItem}>
          <ArrowCounterClockwise
            size={22}
            weight="duotone"
            className={Styles.trustIcon}
          />
          <span className={Styles.trustText}>بازگشت تا ۷ روز</span>
        </div>
      </div>

      {/* ===== تب‌های توضیحات ===== */}
      <div className={Styles.tabsCard}>
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className={Styles.tabs}
        >
          <Tab
            eventKey="home"
            title="مشخصات"
            style={{ background: "inherit" }}
          >
            <div className={Styles.tableWrap}>
              <div className={Styles.specTable}>
                <table className="table table-striped">
                  <tbody>
                    {laptopReview == null && productDetail?.length != 0
                      ? productDetail?.map((item) => (
                          <tr key={item.id}>
                            <th>{item.name}</th>
                            <td>{item.value}</td>
                          </tr>
                        ))
                      : laptopReview != null
                      ? laptopItems.map((item) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: "bolder",
                                  marginLeft: "10px",
                                }}
                              >
                                {item.id.toLocaleUpperCase()} :
                              </div>

                              <div>{laptopReview[item.id]}</div>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>

              {laptopSubject?.body && (
                <div
                  className={Styles.subjectDiv}
                  dangerouslySetInnerHTML={{ __html: laptopSubject.body }}
                />
              )}
            </div>
          </Tab>

          <Tab
            eventKey="longer-tab"
            title="نظرات کاربران"
            style={{ background: "inherit" }}
          >
            <div className={Styles.commentsEmpty}>
              <ChatCircleDots size={44} weight="duotone" />
              <p>هنوز نظری برای این محصول ثبت نشده است.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
