"use client";
import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProductDetail.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProducyDetailRight from "./ProducyDetailRight/ProducyDetailRight";
import ProductDetailLeft from "./ProductDetailLeft/ProductDetailLeft";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { HouseLine, Dresser, Car } from "@phosphor-icons/react";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import { MdLocalPostOffice } from "react-icons/md";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
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
    <div className={`container ${Styles.product_container}`}>
      <div className={`row ${Styles.breadcrumb_row}`}>
        <div className={`${Styles.breadcrumb} col`}>
          {revercBrad.length != 0 && (
            <>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link
                    href="/"
                  // onClick={()=>setXtFlagSpinnerShow(true)}
                  >
                    <HouseLine size={18} />
                    خانه{" "}
                  </Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <Link onClick={() => setXtFlagSpinnerShow(true)} href={`/category/${idCategory}`}>
                    <Dresser size={18} />
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
            </>
          )}
        </div>
      </div>

      <div className={`row ${Styles.product_row}`}>
        <div className={`col-md-3  ${Styles.product_right_col}`}>
          <ProducyDetailRight spec={productDetail} laptopReview={laptopReview} />
        </div>
        <div className="col-md-9 product-left-col">
          <ProductDetailLeft detail={productDetailB} />
        </div>
      </div>

      {/* <div className="row centerr">

        <div className="boxSh centerrc">
          <Car />adasd
        </div>

      </div> */}

      <div className="row boxSh">
        <div className={`col ${Styles.product_tab_div}`}>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-2"
          // fill
          // onSelect={ffc}
          // onClick={()=>ffc(id)}
          >
            <Tab eventKey="home" title="مشخصات" style={{ background: "inherit" }}>
              <div className={Styles.table_div}>
                <table className="table mt-5 table-striped">
                  <tbody>
                    {(laptopReview == null && productDetail?.length != 0) ?
                      productDetail?.map((item) => (
                        <tr key={item.id}>
                          <th>{item.name}</th>
                          <td>{item.value}</td>
                        </tr>
                      )) :
                      laptopReview != null ?
                        laptopItems.map((item) => (
                          <tr key={item.id}>
                            <td
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                                {(item.id).toLocaleUpperCase()} :
                              </div>

                              <div>{laptopReview[item.id]}</div>
                            </td>
                          </tr>
                        ))
                        : ""
                    }
                  </tbody>
                </table>

                <div className={Styles.subject_div} dangerouslySetInnerHTML={{ __html: laptopSubject?.body }} />

              </div>
            </Tab>

            <Tab eventKey="longer-tab" title="نظرات کاربران" style={{ background: "inherit" }}></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
