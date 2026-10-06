"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import CardC from "@/components/madules/Cards/CardC/CardC";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import Pagination from "@mui/material/Pagination";
import postApi from "@/utils/ApiUrl/apiCallBack/apiPost";
import { motion, AnimatePresence } from "framer-motion";
import {
  HouseLine,
  Layout,
  Rows,
  ShoppingBag,
  SlidersHorizontal,
  CaretLeft,
} from "@phosphor-icons/react";
import { NOOffer } from "@/utils/DataStore";
import LoadingA from "@/utils/Loading/LoadingA";

export default function CategoryDetaile({ param }) {
  const [mainCategory, setMainCategory] = useState([]);
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
  const [proByCatFlag, setProByCatFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const rout = useRouter();

  let { setNameCategory, setXtFlagSpinnerShow, verifyHamkar, offer } =
    useContext(MainContext);
  const styleRef = useRef();

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (event, value) => {
    goToTop();
    setPage(value);
    let code = codePro;
    let obj = {
      cat: code,
      pageNumber: value - 1,
      pageSize: pageCount,
    };
    getproductByCat(obj);
  };

  const changeId = (code) => {
    setCodePro(code);
    setPage(1);
    let obj = {
      cat: code,
      pageNumber: 0,
      pageSize: pageCount,
    };
    getproductByCat(obj);
    window.scrollTo({ top: 300, behavior: "smooth" });
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

  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.childs?.length != 0) {
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

  const getproductByCat = (obj) => {
    async function myApppost() {
      const res = await fetch(
        `${apiUrl}/api/CyProducts/GetProductByProductCat`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              if (result.itemList?.length != 0) {
                setProductByCat(result.itemList);
                setAllCount(result.allCount);
                setProByCatFlag(false);
                setIsLoading(false)
              } else {
                setProductByCat([]);
                setAllCount(result.allCount);
                setProByCatFlag(false);
                setIsLoading(false)
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }
    myApppost();
  };

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
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      ).then((res) =>
        res.json().then((result) => {
          if (result.root.rootId == null) {
            setParentId(result.root.id);
          } else {
            setParentId(result.root.rootId);
          }
        })
      );
    }
    myApp();
  };

  useEffect(() => {
    getChild();
  }, []);

  useEffect(() => {
    if (param !== null) {
      getCategoryById();
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      toast: "true",
      width: "100px",
      showConfirmButton: false,
      timer: 500,
    }).then((res) => setFlag((prev) => !prev));
  }, []);

  useEffect(() => {
    if (mainCatChilds.length == 0 && mainCategory.length != 0) {
      let code = mainCategory.item?.code;
      let obj = {
        cat: code,
        pageNumber: page - 1,
        pageSize: pageCount,
      };
      getproductByCat(obj);
    }
    setNameCategory(mainCategory.item?.name);
  }, [page, mainCategory]);

  useEffect(() => {
    if (
      mainCatChilds.length !== 0 &&
      mainCatChilds[0].code &&
      mainCategory.length != 0
    ) {
      let obj = {
        cat: mainCatChilds[0]?.code,
        pageNumber: page - 1,
        pageSize: pageCount,
      };
      getproductByCat(obj);
    }
    setCodePro(mainCatChilds[0]?.code);
  }, [flag, mainCategory]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, []);

  // محاسبات
  const totalProducts = allCount || productByCat?.length || 0;
  const categoryName = mainCategory.item?.name || "";
  const hasChildCategories = mainCatChilds?.length > 0;

  return (
    <div className={`container ${Styles.page}`}>

      {isLoading && <LoadingA isShow={true} />}

      {/* ===== HERO HEADER ===== */}
      <div className={Styles.hero}>
        <div className={Styles.heroContent}>
          <nav className={Styles.heroBreadcrumb}>
            <Link href="/">
              <HouseLine size={16} weight="fill" />
              خانه
            </Link>
            <span className={Styles.heroBreadcrumbSeparator}>/</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>
              {categoryName || "دسته‌بندی"}
            </span>
          </nav>
          <h1 className={Styles.heroTitle}>
            <ShoppingBag
              size={32}
              weight="fill"
              style={{ marginLeft: "0.8rem", opacity: 0.8 }}
            />
            {categoryName || "محصولات"}
          </h1>
          {totalProducts > 0 && (
            <div className={Styles.heroCount}>
              {totalProducts.toLocaleString()} محصول
            </div>
          )}
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className={Styles.grid}>
        {/* ===== SIDEBAR ===== */}
        <aside className={Styles.sidebar}>
          <h3 className={Styles.sidebarTitle}>
            <SlidersHorizontal size={18} weight="duotone" />
            دسته‌بندی‌ها
          </h3>

          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0" className={Styles.accItem}>
              <Accordion.Header className={Styles.accHeader}>
                لوازم جانبی
              </Accordion.Header>
              <Accordion.Body className={Styles.accBody}>
                <div className={Styles.sidebarLinks}>
                  {mainCatA?.childs?.length != 0 &&
                    mainCatA?.childs?.map((item) => (
                      <Link
                        key={item.id}
                        href={`/category/${item.id}`}
                        className={`${Styles.sidebarLink} ${String(item.id) === param
                          ? Styles.sidebarLinkActive
                          : ""
                          }`}
                      >
                        <span className={Styles.sidebarLinkDot} />
                        {item.name}
                      </Link>
                    ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className={Styles.accItem}>
              <Accordion.Header className={Styles.accHeader}>
                سخت افزار
              </Accordion.Header>
              <Accordion.Body className={Styles.accBody}>
                <div className={Styles.sidebarLinks}>
                  {mainCatB?.childs?.length != 0 &&
                    mainCatB?.childs?.map((item) => (
                      <Link
                        key={item.id}
                        href={`/category/${item.id}`}
                        className={`${Styles.sidebarLink} ${String(item.id) === param
                          ? Styles.sidebarLinkActive
                          : ""
                          }`}
                      >
                        <span className={Styles.sidebarLinkDot} />
                        {item.name}
                      </Link>
                    ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </aside>

        {/* ===== CONTENT ===== */}
        <div className={Styles.content}>
          {/* ===== چیپ‌های زیردسته ===== */}
          {hasChildCategories && (
            <div className={Styles.chipRow}>
              {mainCatChilds.map((item, index) => (
                <button
                  key={item.id}
                  className={`${Styles.chip} ${codePro === item.code ? Styles.chipActive : ""
                    }`}
                  onClick={() => {
                    setIsLoading(true)
                    changeId(item.code)
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className={Styles.chipImg}
                    />
                  )}
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {/* ===== انتخاب همکاری + نمای جدولی ===== */}
          <div className={Styles.controls}>
            <div className={Styles.controlsLeft}>
              {verifyHamkar && (
                <select
                  className={Styles.paymentSelect}
                  value={hamkarPaymentState}
                  onChange={(e) => setHamkarPaymentState(e.target.value)}
                >
                  <option value="1">نقدی</option>
                  <option value="2">یک ماهه</option>
                  <option value="3">دو ماهه</option>
                  <option value="4">سه ماهه</option>
                </select>
              )}
              <button
                className={`${Styles.toggleBtn} ${tableShow ? Styles.toggleBtnActive : ""
                  }`}
                onClick={() => setTableShow(!tableShow)}
              >
                {tableShow ? (
                  <>
                    <Layout size={16} weight="duotone" /> نمایش Grid
                  </>
                ) : (
                  <>
                    <Rows size={16} weight="duotone" /> نمایش جدول
                  </>
                )}
              </button>
            </div>

            <span className={Styles.controlLabel}>
              {totalProducts > 0 && `${totalProducts.toLocaleString()} محصول`}
            </span>
          </div>

          {/* ===== محصولات ===== */}
          {proByCatFlag ? (
            <div className={Styles.skeletonGrid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={Styles.skeletonCard} />
              ))}
            </div>
          ) : !tableShow ? (
            /* ------ نمای کارتی ------ */
            <div className={Styles.productGrid}>
              <AnimatePresence mode="popLayout">
                {productByCat
                  ?.filter((item) => item.isShow)
                  .map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        delay: index * 0.03,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={Styles.productCardWrapper}
                    >
                      <CardC
                        parentId={parentId}
                        id={item.id}
                        imgSrc={item.smallImage}
                        title={item.name}
                        price={Number(item.resultPrice) / 10}
                        noOffPrice={Number(item.noOffPrice) / 10}
                        offPrice={
                          Math.ceil((item.price / 10) * offer / 1000) * 1000
                        }
                        supply={item.supply}
                        isToSale={item.isToSale}
                        verifyHam={verifyHamkar}
                        offerState={offer}
                        isFavor={item.isFavorite}
                        isShowHeart={true}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          ) : (
            /* ------ نمای جدولی ------ */
            <div className={Styles.tableWrap}>
              <table className={Styles.table}>
                <thead>
                  <tr>
                    <th>تصویر</th>
                    <th>نام محصول</th>
                    <th>قیمت</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {productByCat
                    ?.filter((item) => item.isShow)
                    .map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setXtFlagSpinnerShow(true);
                          rout.push("/product/" + item.id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td>
                          <img
                            src={item.smallImage}
                            alt=""
                            className={Styles.tableImg}
                          />
                        </td>
                        <td className={Styles.tableTitle}>{item.name}</td>
                        <td>
                          {item.supply != 0 && !item.isToSale ? (
                            <span className={Styles.tableEstlam}>
                              استعلام قیمت
                            </span>
                          ) : item.supply != 0 && item.isToSale ? (

                            <>
                              {(offer.offerType == NOOffer && (item.noOffPrice == item.price)) ?
                                <span className={Styles.tablePrice}>
                                  {Number(item.resultPrice / 10).toLocaleString()}{" "}
                                  <small>تومان</small>
                                </span>

                                : <div className={Styles.tablePriceCol}>
                                  <span className={Styles.tablePrice}>
                                    {Number(item.resultPrice / 10).toLocaleString()}{" "}
                                    <small>تومان</small>
                                  </span>

                                  <span className={Styles.tableOldPrice}>
                                    {Number(item.noOffPrice / 10).toLocaleString()}{" "}
                                    تومان
                                  </span>
                                </div>}

                              {/* <div className={Styles.tablePriceWrap}>
                                {Number(item.noOffPrice) > Number(item.resultPrice) && (
                                  <span className={Styles.tableDiscountBadge}>
                                    %{Math.round((1 - Number(item.resultPrice) / Number(item.noOffPrice)) * 100)}- تخفیف
                                  </span>
                                )}
                                <div className={Styles.tablePriceCol}>
                                  <span className={Styles.tablePrice}>
                                    {Number(item.resultPrice / 10).toLocaleString()}{" "}
                                    <small>تومان</small>
                                  </span>
                                  {(offer != 1 || Number(item.noOffPrice) > Number(item.resultPrice)) && (
                                    <span className={Styles.tableOldPrice}>
                                      {Number(item.noOffPrice / 10).toLocaleString()}{" "}
                                      تومان
                                    </span>
                                  )}
                                </div>
                              </div> */}
                            </>


                          ) : item.supply == 0 && parentId == 2 ? (
                            <span className={Styles.tableEstlam}>
                              استعلام قیمت
                            </span>
                          ) : item.supply == 0 ? (
                            <span className={Styles.tableOutOfStock}>
                              ناموجود
                            </span>
                          ) : null}
                        </td>



                        <td>
                          {item.supply > 0 ? (
                            <span
                              className="sane-badge-success"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                padding: "0.2rem 0.8rem",
                                borderRadius: "99px",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                              }}
                            >
                              ● موجود
                            </span>
                          ) : (
                            <span
                              className="sane-badge-danger"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.3rem",
                                padding: "0.2rem 0.8rem",
                                borderRadius: "99px",
                                fontSize: "1.1rem",
                                fontWeight: 700,
                              }}
                            >
                              ● ناموجود
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ===== صفحه‌بندی ===== */}
          {paginationArray.length > 1 && (
            <div className={Styles.paginationWrap}>
              <Pagination
                count={paginationArray.length}
                page={page}
                onChange={handleChange}
                color="primary"
                shape="rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}