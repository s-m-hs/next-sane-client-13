"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import CardC from "@/components/madules/Cards/CardC/CardC";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import Swal from "sweetalert2";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { HouseLine } from "@phosphor-icons/react";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import Pagination from "@mui/material/Pagination";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import { style } from "@mui/system";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/navigation";
import { LuTableProperties } from "react-icons/lu";
import { FaArrowsAltV } from "react-icons/fa";
export default function CategoryDetaile({ param }) {
  const [mainCategory, setMainCategory] = useState({});
  const [mainCatChilds, setMainCatChilds] = useState([]);
  const [productByCat, setProductByCat] = useState([]);
  const [flag, setFlag] = useState(false);
  const [page, setPage] = React.useState(1);
  const [paginationArray, setPaginationArray] = useState([]);
  const pageCount = 100;
  const [allCount, setAllCount] = useState([]);
  const [mainCatA, setMainCatA] = useState({});
  const [mainCatB, setMainCatB] = useState({});
  const [codePro, setCodePro] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [parentId, setParentId] = useState("");
  const [hamkarPaymentState, setHamkarPaymentState] = useState("1");
  const rout = useRouter();

  // console.log(mainCategory)
  // console.log(mainCategory?.item.code)

  // const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);
  let { setNameCategory, setXtFlagSpinnerShow, verifyHamkar, offer } = useContext(MainContext);
  const styleRef = useRef();
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChange = (event, value) => {
    goToTop();
    setPage(value);
    // let code=mainCategory?.item.code
    let code = codePro;
    let obj = {
      cat: code,
      pageNumber: value - 1,
      pageSize: pageCount,
    };
    getproductByCat(obj);
  };
  const changeId = (code) => {
    // console.log(code)
    setCodePro(code);
    setPage(1);
    let obj = {
      cat: code,
      pageNumber: 0,
      pageSize: pageCount,
    };
    getproductByCat(obj);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (productByCat?.length != 0) {
      let x = allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z ? setPaginationArray(Array.from({ length: z })) : setPaginationArray([]);
    }
  }, [productByCat]);
  productByCat?.sort((a, b) => b.supply - a.supply);
  // sorted_products = sorted(productByCat, key=lambda x: x['supply'], reverse=True)
  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          // console.log(res);
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          if (result.childs?.length != 0) {
            // console.log(result)
            setMainCatChilds(result.childs);
            setMainCategory(result);
          } else {
            setMainCatChilds([]);
            setMainCategory(result);
          }
        });
    }
    myAppGet();
  };
  ////////////////////////////
  const getproductByCat = (obj) => {
    async function myApppost() {
      const res = await fetch(`${apiUrl}/api/CyProducts/GetProductByProductCat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          // console.log(res)
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          if (result.itemList?.length != 0) {
            setProductByCat(result.itemList);
            setAllCount(result.allCount);
          } else {
            setProductByCat([]);
            setAllCount(result.allCount);
          }
        })
        .catch((err) => console.log(err));
    }
    myApppost();
  };

  /////////////////////////////////sidebar==>>
  const getCategoryAccesory = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: 3,
      str: "string",
    };
    postApi("/api/CyProductCategory/GetItemWChildAndRoot", obj, setMainCatA);
  };
  const getCategoryHard = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: 2,
      str: "string",
    };
    postApi("/api/CyProductCategory/GetItemWChildAndRoot", obj, setMainCatB);
  };

  useEffect(() => {
    getCategoryAccesory();
    getCategoryHard();
  }, []);
  const getChild = () => {
    // const getLocalStorage = localStorage.getItem('loginToken')
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${getLocalStorage}`
        },
        body: JSON.stringify(obj),
      }).then((res) => {
        return res.json().then((result) => {
          // setParentId(result.root.id)
          if (result.root.rootId == null) {
            setParentId(result.root.id);
          } else {
            setParentId(result.root.rootId);
          }
        });
      });
    }
    myApp();
  };
  useEffect(() => {
    getChild();
  }, []);

  ////////////////////////////////sidebar

  //////////////////////////////

  useEffect(() => {
    if (param !== null) {
      getCategoryById();
    }
    Swal.fire({
      // iconColor:'purple',
      position: "top-end",
      icon: "success",
      toast: "true",
      width: "100px",
      // title: "Your work has been saved",
      showConfirmButton: false,
      timer: 500,
    }).then((res) => setFlag((prev) => !prev));
  }, []);

  ///////////////////////////
  useEffect(() => {
    if (mainCatChilds.length == 0 && mainCategory.item?.code) {
      let code = mainCategory.item.code;

      let obj = {
        cat: code,
        pageNumber: page - 1,
        pageSize: pageCount,
      };
      getproductByCat(obj);
    }
    setNameCategory(mainCategory.item?.name);
  }, [mainCatChilds, page]);

  useEffect(() => {
    if (mainCatChilds.length !== 0) {
      let obj = {
        cat: mainCatChilds[0]?.code,
        pageNumber: page - 1,
        pageSize: pageCount,
      };

      getproductByCat(obj);
    }

    ////for first to setcodePro==>>
    setCodePro(mainCatChilds[0]?.code);
  }, [flag]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
    // return()=>setNameCategory('')
  }, []);

  // console.log(productByCat)
  return (
    <div className={`container  centerc ${Styles.category}`}>
      <div className="row mt-5">
        <div className={`col-2  ${Styles.right_maindiv} centerc`}>
          <h1>دسته بندی ها:</h1>

          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={`${Styles.AccordionCom}`}>لوازم جانبی</Accordion.Header>
              <Accordion.Body>
                <div className={`${Styles.right_div} centerc`}>
                  {mainCatA?.childs?.length != 0 &&
                    mainCatA?.childs?.map((item) => (
                      <Link href={`/category/${item.id}`}>
                        {" "}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className={`${Styles.AccordionCom}`}>سخت افزار</Accordion.Header>
              <Accordion.Body>
                <div className={`${Styles.right_div} centerc`}>
                  {mainCatB?.childs?.length != 0 &&
                    mainCatB?.childs?.map((item) => (
                      <Link href={`/category/${item.id}`}>
                        {" "}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* <div className={`${Styles.right_div} centerc`}>
 {mainCatA?.childs?.length!=0 && mainCatA?.childs?.map(item=>(
  <Link href={`/category/${item.id}`}>  <span>{item.name}</span></Link>
  ))}

</div> */}
        </div>

        <div className={`col-12 col-md-10 ${Styles.category_col}`}>
          <div className={`row ${Styles.breadcrumb_row}`}>
            <div className={`${Styles.breadcrumb} col`}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link
                    // onClick={()=>setXtFlagSpinnerShow(true)}
                    href="/"
                  >
                    <HouseLine size={24} color="#24b8c9de" />
                    خانه/
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active href="/">
                  {mainCategory.item?.name}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          {paginationArray.length > 1 && (
            <div className="pagination-div">
              <Pagination
                count={paginationArray.length}
                page={page}
                //  ref={classRefB}
                onChange={handleChange}
                color="primary"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            </div>
          )}

          <div className={`row row-cols-auto  centerr ${Styles.category_row}`}>
            {mainCatChilds != null &&
              mainCatChilds.map((item, index) => (
                <>
                  <div key={item.id} className={`centerc ${Styles.category__cart_div}`}>
                    <CardAButton imgSrc={item.imageUrl} text={item.name} changeIdProp={() => changeId(item.code)} code={item.code} />
                    <span>{item.name} </span>
                  </div>
                </>
              ))}
          </div>

          {verifyHamkar && (
            <div className={Styles.select_div}>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setHamkarPaymentState(e.target.value);
                  // console.log(hamkarPaymentState)
                }}
              >
                <option value="1">نقدی</option>
                <option value="2">یک ماهه </option>
                <option value="3">دو ماهه</option>
                <option value="4">سه ماهه</option>
              </select>
            </div>
          )}
          <button className="btn btn-warning" style={{ fontSize: "18px" }} onClick={() => setTableShow(!tableShow)}>
            {!tableShow ? "نمایش نموداری" : "نمایش ستونی"}
            {!tableShow ? <LuTableProperties /> : <FaArrowsAltV />}
          </button>
          <div className={`row row-cols-4 centerr pt-4 ${Styles.products_card} boxSh `}>
            {productByCat?.length == 0 ? (
              // <SpinnerA size={200} />
              <div className="row">
                <div className="col-12 centerr">
                  <SpinnerA size={200} />
                </div>
              </div>
            ) : !tableShow ? (
              productByCat?.map((item, index) => (
                <div
                  key={index}
                  className={`centerc ${Styles.products_col}`}
                  // onClick={ ()=>setFlagSpinnerShow(true) }
                >
                  <CardC
                    // clickSpinner={()=>setFlagSpinnerShow(true)}
                    parentId={parentId}
                    id={item.id}
                    imgSrc={item.smallImage}
                    title={item.name}
                    price={Number(item.price) / 10}
                    offPrice={(Number(item.price) / 10) * offer}
                    supply={item.supply}
                    noOffPrice={Number(item.noOffPrice) / 10}
                    //     noOffPrice={hamkarPaymentState === '1' ? Number(item.noOffPrice / 10)-(Number(item.noOffPrice / 10)*(5/100)) :
                    //       hamkarPaymentState === '2' ? Number(item.noOffPrice / 10) :
                    //       hamkarPaymentState === '3' ? Number(item.noOffPrice / 10)+ (Number(item.noOffPrice / 10)*(5/100)) :
                    //       hamkarPaymentState === '4' ? Number(item.noOffPrice / 10)+ (Number(item.noOffPrice / 10)*(10/100)) :''

                    // }
                    verifyHam={verifyHamkar}
                    offerState={offer}
                  />
                </div>
              ))
            ) : (
              <table
                className="table table-striped table-hover
                "
              >
                <tbody>
                  {productByCat?.map((item) => (
                    <tr
                      className={`${Styles.tr} `}
                      key=""
                      onClick={() => {
                        setXtFlagSpinnerShow(true);
                        rout.push("/product/" + item.id);
                      }}
                    >
                      <td>
                        <img src={item.smallImage} alt="" />{" "}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <div className="centercc">
                          {/* <span>368,000</span> */}
                          {item.supply != 0 ? (
                            <>
                              {offer == 1 && item.noOffPrice === item.price && (
                                <>
                                  <span className={`${Styles.price} `}>{`${Number(item.price) / 10}`?.toLocaleString()} تومان </span>
                                </>
                              )}

                              {offer !== 1 && item.noOffPrice === item.price && (
                                <>
                                  <span className={Styles.noOffPrice}>{`${(Number(item.price) / 10) * offer}`?.toLocaleString()} تومان </span>

                                  <span className={`${Styles.price} ${Styles.underLine}`}>{`${Number(item.price) / 10}`?.toLocaleString()} تومان </span>
                                </>
                              )}

                              {item.noOffPrice !== item.price && (
                                <>
                                  <span className={Styles.noOffPrice}>{`${Number(item.noOffPrice) / 10}`?.toLocaleString()}تومان </span>

                                  <span className={`${Styles.price} ${Styles.underLine}`}>{`${Number(item.price) / 10}`?.toLocaleString()} تومان </span>
                                </>
                              )}
                            </>
                          ) : parentId == 2 ? (
                            <span className={Styles.estlam}>استعلام قیمت</span>
                          ) : (
                            <span
                            // className={Styles.cardprob_price}
                            >
                              ناموجود
                            </span>
                          )}
                          {/* <span>{(Number(item.price) / 10) * offer}</span>
                          <span> {Number(item.price) / 10}</span> */}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* <button onClick={clickHan}></button> */}
          </div>
          {paginationArray.length > 1 && (
            <div className={`pagination-div ${Styles.pagination_div}`}>
              <Pagination
                count={paginationArray.length}
                page={page}
                //  ref={classRefB}
                onChange={handleChange}
                color="primary"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
