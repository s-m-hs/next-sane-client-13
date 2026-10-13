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
  X,
  Funnel,
} from "@phosphor-icons/react";
import { NOOffer, PercentOffer, RialOffer } from "@/utils/DataStore";
import LoadingA from "@/utils/Loading/LoadingA";

/* ============================================================
   فیلتر لپ‌تاپ — فقط وقتی CategoryTitle برابر «laptop» باشد
   ============================================================ */

const LAPTOP_USAGE_OPTIONS = [
  { key: "content", label: "تولید محتوا", prop: "IsContentCreation" },
  { key: "design", label: "طراحی", prop: "IsDesign" },
  { key: "gaming", label: "گیمینگ", prop: "IsGaming" },
  { key: "programming", label: "برنامه‌نویسی", prop: "IsProgramming" },
  { key: "student", label: "دانشجویی", prop: "IsStudent" },
  { key: "office", label: "اداری", prop: "IsOffice" },
  { key: "home", label: "خانه", prop: "IsHome" },
];

const LAPTOP_BRANDS = [
  "ASUS",
  "HP",
  "LENOVO",
  "MICROSOFT",
  "DELL",
  "SONY",
  "ACER",
];

const LAPTOP_CPUS = [
  "Core i3",
  "Core i5",
  "Core i7",
  "Core i9",
  "Core Ultra 5",
  "Core Ultra 7",
  "Core Ultra 9",
  "Intel Processor",
  "Pentium",
  "Celeron",
  "Ryzen 3",
  "Ryzen 5",
  "Ryzen 7",
  "Ryzen 9",
  "Ryzen AI",
];

const LAPTOP_RAMS = [
  "4GB",
  "6GB",
  "8GB",
  "12Gb",
  "16GB",
  "20Gb",
  "32GB",
  "48GB",
  "64GB",
  "128GB",
];

const LAPTOP_SSDS = [
  "64G",
  "120G",
  "128G",
  "240G",
  "256G",
  "480G",
  "500G",
  "512G",
  "960G",
  "1T",
  "2T",
  "4T",
];

const LAPTOP_SIZES = [
  "11.6 اینچ",
  "12 اینچ",
  "12.5 اینچ",
  "13.3 اینچ",
  "13.4 اینچ",
  "13.5 اینچ",
  "14 اینچ",
  "14.5 اینچ",
  "15 اینچ",
  "15.6 اینچ",
  "16 اینچ",
  "16.1 اینچ",
  "17 اینچ",
  "17.3 اینچ",
  "18اینچ",
];

const EMPTY_LAPTOP_FILTER = {
  usage: "",
  brand: "",
  cpu: "",
  ram: "",
  ssd: "",
  size: "",
  grafic: false,
  hdd: false,
};

const hasActiveLaptopFilter = (f) =>
  Boolean(
    f.usage ||
      f.brand ||
      f.cpu ||
      f.ram ||
      f.ssd ||
      f.size ||
      f.grafic ||
      f.hdd
  );

// معادل سمت کلاینت از ProductPriceService.CalculateResultPrice
function calcResultPrice(price, noOffPrice, offer) {
  if (price == null) return null;
  if (price !== noOffPrice) return price;
  if (!offer) return price;
  if (offer.offerType === NOOffer) return price;
  if (offer.offerType === PercentOffer && offer.percentOffer) {
    return Math.ceil((price * offer.percentOffer) / 10000) * 10000;
  }
  if (offer.offerType === RialOffer) {
    if (price < 2500000) return price;
    if (price < 10000000) return price - 500000;
    if (price < 20000000) return price - 1000000;
    if (price <= 30000000) return price - 1500000;
    return price - 2000000;
  }
  return price;
}

// تبدیل CyProduct خروجی فیلتر به شکل ProductDTO استفاده‌شده در صفحه
const mapFilterProduct = (item, offer) => {
  const price = item?.price ?? null;
  const noOffPrice = item?.noOffPrice ?? null;
  return {
    id: item?.id,
    name: item?.name || "",
    smallImage: item?.smallImage || item?.mainImage || "",
    price,
    noOffPrice,
    resultPrice: calcResultPrice(price, noOffPrice, offer),
    supply: item?.supply ?? 0,
    isToSale: item?.isToSale ?? false,
    isShow: true,
    isFavorite: item?.isFavorite ?? false,
  };
};

// ساخت بدنه DTO برای /api/CyLaptop/filter
const buildLaptopFilterDto = (f) => {
  const usage = LAPTOP_USAGE_OPTIONS.find((u) => u.key === f.usage);
  return {
    Brand: f.brand || null,
    CPU: f.cpu || null,
    RAM: f.ram || null,
    Grafic: f.grafic ? "1" : null,
    SSD: f.ssd || null,
    HDD: f.hdd ? "1" : null,
    Size: f.size || null,
    IsHome: usage?.prop === "IsHome" ? true : null,
    IsOffice: usage?.prop === "IsOffice" ? true : null,
    IsStudent: usage?.prop === "IsStudent" ? true : null,
    IsProgramming: usage?.prop === "IsProgramming" ? true : null,
    IsGaming: usage?.prop === "IsGaming" ? true : null,
    IsDesign: usage?.prop === "IsDesign" ? true : null,
    IsContentCreation: usage?.prop === "IsContentCreation" ? true : null,
  };
};

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
  const [CategoryTitle, setCategoryTitle] = useState(null)
  // فیلتر لپ‌تاپ
  const [laptopFilter, setLaptopFilter] = useState(EMPTY_LAPTOP_FILTER);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const filterReqRef = useRef(0);
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

  /* ---------- فیلتر لپ‌تاپ ---------- */
  const restoreCategoryProducts = () => {
    setIsLoading(true);
    const code = CategoryTitle;
    if (code) {
      let obj = { cat: code, pageNumber: page - 1, pageSize: pageCount };
      getproductByCat(obj);
    } else {
      setIsLoading(false);
    }
  };

  const applyLaptopFilter = (next) => {
    setLaptopFilter(next);

    // اگر هیچ فیلتری فعال نباشد، لیست عادی دسته‌بندی برگردانده می‌شود
    if (!hasActiveLaptopFilter(next)) {
      setFilteredProducts([]);
      setFilterActive(false);
      restoreCategoryProducts();
      return;
    }

    const reqId = ++filterReqRef.current;
    setIsLoading(true);
    fetch(`${apiUrl}/api/CyLaptop/filter`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildLaptopFilterDto(next)),
    })
      .then((res) => res.json())
      .then((result) => {
        if (reqId !== filterReqRef.current) return;
        setIsLoading(false);
        if (result?.success) {
          const items = (result.items || []).map((item) =>
            mapFilterProduct(item, offer)
          );
          setFilteredProducts(items);
          setFilterActive(true);
          setProByCatFlag(false);
          setAllCount(result.count ?? items.length);
          setPaginationArray([]);
        }
      })
      .catch((err) => {
        if (reqId !== filterReqRef.current) return;
        setIsLoading(false);
        console.log(err);
      });
  };

  const resetLaptopFilter = () => {
    filterReqRef.current++;
    applyLaptopFilter({ ...EMPTY_LAPTOP_FILTER });
  };

  const onUsageClick = (key) => {
    applyLaptopFilter({
      ...laptopFilter,
      usage: laptopFilter.usage === key ? "" : key,
    });
  };

  const onSelectChange = (field, value) => {
    applyLaptopFilter({ ...laptopFilter, [field]: value });
  };

  const onCheckChange = (field, checked) => {
    applyLaptopFilter({ ...laptopFilter, [field]: checked });
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
      setCategoryTitle(mainCategory.item?.code)
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
      setCategoryTitle(mainCatChilds[0]?.code)
      getproductByCat(obj);
    }
    setCodePro(mainCatChilds[0]?.code);
  }, [flag, mainCategory]);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, []);

  // محاسبات
  const isLaptopCat = CategoryTitle?.toLowerCase() === "laptop";
  const displayProducts = filterActive
    ? [...filteredProducts].sort((a, b) => b.supply - a.supply)
    : productByCat;
  const totalProducts = allCount || displayProducts?.length || 0;
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
          {/* ===== فیلتر لپ‌تاپ ===== */}
          {isLaptopCat && (
            <div className={Styles.filterPanel}>
              <div className={Styles.filterHeader}>
                <span className={Styles.filterTitle}>
                  <SlidersHorizontal size={18} weight="duotone" />
                  فیلتر لپ‌تاپ
                </span>
                {filterActive && (
                  <button
                    className={Styles.filterClear}
                    onClick={resetLaptopFilter}
                  >
                    <X size={16} weight="bold" />
                    پاک کردن فیلترها
                  </button>
                )}
              </div>

              {/* ردیف اول — کاربرد (فقط یکی قابل انتخاب) */}
              <div className={Styles.filterRow}>
                <span className={Styles.filterRowLabel}>کاربرد</span>
                <div className={Styles.usageChips}>
                  {LAPTOP_USAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      className={`${Styles.usageChip} ${
                        laptopFilter.usage === opt.key
                          ? Styles.usageChipActive
                          : ""
                      }`}
                      onClick={() => onUsageClick(opt.key)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ردیف دوم — مشخصات */}
              <div className={Styles.filterRow}>
                <span className={Styles.filterRowLabel}>مشخصات</span>
                <div className={Styles.filterFields}>
                  <label className={Styles.filterField}>
                    <span className={Styles.fieldLabel}>برند</span>
                    <select
                      className={Styles.fieldSelect}
                      value={laptopFilter.brand}
                      onChange={(e) => onSelectChange("brand", e.target.value)}
                    >
                      <option value="">همه</option>
                      {LAPTOP_BRANDS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={Styles.filterField}>
                    <span className={Styles.fieldLabel}>پردازنده (CPU)</span>
                    <select
                      className={Styles.fieldSelect}
                      value={laptopFilter.cpu}
                      onChange={(e) => onSelectChange("cpu", e.target.value)}
                    >
                      <option value="">همه</option>
                      {LAPTOP_CPUS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={Styles.filterField}>
                    <span className={Styles.fieldLabel}>رم (RAM)</span>
                    <select
                      className={Styles.fieldSelect}
                      value={laptopFilter.ram}
                      onChange={(e) => onSelectChange("ram", e.target.value)}
                    >
                      <option value="">همه</option>
                      {LAPTOP_RAMS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={Styles.filterCheck}>
                    <input
                      type="checkbox"
                      checked={laptopFilter.grafic}
                      onChange={(e) => onCheckChange("grafic", e.target.checked)}
                    />
                    <span>کارت گرافیک مجزا</span>
                  </label>

                  <label className={Styles.filterField}>
                    <span className={Styles.fieldLabel}>حافظه SSD</span>
                    <select
                      className={Styles.fieldSelect}
                      value={laptopFilter.ssd}
                      onChange={(e) => onSelectChange("ssd", e.target.value)}
                    >
                      <option value="">همه</option>
                      {LAPTOP_SSDS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={Styles.filterCheck}>
                    <input
                      type="checkbox"
                      checked={laptopFilter.hdd}
                      onChange={(e) => onCheckChange("hdd", e.target.checked)}
                    />
                    <span>هارد HDD</span>
                  </label>

                  <label className={Styles.filterField}>
                    <span className={Styles.fieldLabel}>اندازه صفحه</span>
                    <select
                      className={Styles.fieldSelect}
                      value={laptopFilter.size}
                      onChange={(e) => onSelectChange("size", e.target.value)}
                    >
                      <option value="">همه</option>
                      {LAPTOP_SIZES.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            </div>
          )}

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
          ) : filterActive && filteredProducts.length === 0 ? (
            /* ------ نتیجه‌ای برای فیلتر پیدا نشد ------ */
            <div className={Styles.filterEmpty}>
              <Funnel size={44} weight="duotone" />
              <p>محصولی با این مشخصات پیدا نشد</p>
              <button
                className={Styles.filterEmptyReset}
                onClick={resetLaptopFilter}
              >
                پاک کردن فیلترها
              </button>
            </div>
          ) : !tableShow ? (
            /* ------ نمای کارتی ------ */
            <div className={Styles.productGrid}>
              <AnimatePresence mode="popLayout">
                {displayProducts
                  ?.filter((item) => (filterActive ? true : item.isShow))
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
                  {displayProducts
                    ?.filter((item) => (filterActive ? true : item.isShow))
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
          {!filterActive && paginationArray.length > 1 && (
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