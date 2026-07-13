"use client";


import Image from "next/image";
import Link from "next/link";
import Style from '../computer.module.css'
import { notFound } from "next/navigation";
import { getProductBySlug, getCategoryBySlug, getProductsByCategory, formatPrice } from "@/data/products";
import { SpecIcon, StarIcon, CheckBadgeIcon, ChevronIcon } from "@/components/templatess/AsemblySystem/Icons";
import SpecsTable from "@/components/templatess/AsemblySystem/SpecsTable";
import Accordion from "@/components/templatess/AsemblySystem/Accordion";
import ProductCard from "@/components/templatess/AsemblySystem/ProductCard";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context/MainContext";
import { SystemLevel } from "@/utils/DataStore";

// export function generateMetadata({ params }) {

//   // const product = getProductBySlug(params.slug);
//   if (!product) return { title: "محصول یافت نشد | کامپیوترصانع" };
//   return {
//     title: `${product.name} | کامپیوترصانع`,
//     description: product.description,
//   };
// }

export default function ProductDetailPage({ params }) {
  let { setXtFlagSpinnerShow, xtflagSpinnerShow } = useContext(MainContext);

  const { id } = params;
  const [product, setProduct] = useState([])
  const [hardWareList, setHardWareList] = useState([])
  const getProduct = () => {
    ApiGetX2(`/api/SysPC2/${id}`, setProduct)
  }

  const getHardListByProduct = () => {
    ApiGetX2(`/api/SysPC2/hardListByProduct?id=${id}`, setHardWareList)
  }

  useEffect(() => {
    if (id) {
      getHardListByProduct()
    }
  }, [id])

  useEffect(() => {
    getProduct()
  }, [])



  // const product = getProductBySlug(params.slug);
  if (!product) return console.log(params);

  const category = getCategoryBySlug(product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const quickSpecs = [
    {
      icon: "cpu", label: "پردازنده", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 2
      ))[0]?.name
    },
    {
      icon: "gpu", label: "مادربرد", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 1
      ))[0]?.name
    },
    {
      icon: "ram", label: "حافظه رم", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 3
      ))[0]?.name
    },
    {
      icon: "storage", label: "حافظه ذخیره‌سازی", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 5
      ))[0]?.name
    },
  ];

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  return (

    <main className="container py-4 py-lg-5">
      <nav className={`${Style.header} small sane-text-sub mb-4 d-flex align-items-center gap-2 flex-wrap`}>
        <Link href="/computers" className="sane-text-sub text-decoration-none">
          کامپیوترهای آماده
        </Link>
        <ChevronIcon size={14} />
        <span href={`/computers?cat=${category?.slug}`} className="sane-text-sub text-decoration-none">
          {SystemLevel.filter(item => item.level == product.level)[0]?.name}
        </span>
        <ChevronIcon size={14} />
        <span className="sane-text-ink fw-medium text-truncate">{product.name}</span>
      </nav>

      <div className="row g-4">
        {/* گالری تصاویر */}
        <div className="col-12 col-lg-7">
          <div className="ratio ratio-4x3 rounded-4 overflow-hidden sane-gradient-soft-White position-relative border" >
            <img src={product.cySubject
              ?.bigImg
            } alt={product.name} fill sizes="(max-width: 1024px) 100vw, 55vw" style={{ objectFit: "contain" }} priority />
            {/* {!product.available && (
              <span className="badge rounded-pill sane-badge-danger position-absolute top-0 end-0 m-3">ناموجود</span>
            )} */}
          </div>
          {/* {product.gallery.length > 1 && (
            <div className="row row-cols-4 g-2 mt-1">
              {product.gallery.map((src, i) => (
                <div className="col" key={i}>
                  <div className="ratio ratio-1x1 rounded-3 overflow-hidden border position-relative">
                    <Image src={src} alt={`${product.name} ${i + 1}`} fill sizes="120px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>

        {/* اطلاعات خرید */}
        <div className="col-12 col-lg-5">
          <h1 className="fw-bold sane-text-ink" style={{ fontSize: "1.4rem", lineHeight: 2 }}>
            {product.name}
          </h1>

          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
            <div className="d-flex align-items-center gap-1" style={{ color: "#f59e0b" }}>
              <StarIcon size={16} />
              <StarIcon size={16} />
              <StarIcon size={16} />
              <StarIcon size={16} />
              <StarIcon size={16} />
              <span className="fw-bold sane-text-ink small">{product.rating}</span>
            </div>
            {/* <span className="small sane-text-sub">({product.reviews} نظر ثبت‌شده)</span>
            <span className={`badge rounded-pill ${product.available ? "sane-badge-success" : "sane-badge-danger"}`}>
              {product.available ? "موجود در انبار" : "ناموجود"}
            </span> */}
          </div>

          {/* مشخصات کلیدی */}
          <div className={`${Style.mainParamiter} row g-2 mb-3`}>
            {quickSpecs.map((s) => (
              <div className="col-12 col-md-6" key={s.icon}>
                <div className="d-flex align-items-center gap-2 border rounded-3 p-2 bg-white h-100">
                  <span className="sane-category-icon">
                    <SpecIcon name={s.icon} size={16} />
                  </span>
                  <div className="text-truncate">
                    <div className="small sane-text-sub">{s.label}</div>
                    <div className="fw-bold small text-truncate" >{s.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* قیمت و اقدام */}
          <div className="sane-card p-3">
            <div className="d-flex align-items-end justify-content-between flex-wrap gap-2">
              {/* <div>
                {product.oldPrice && (
                  <div className="small sane-text-sub text-decoration-line-through">{formatPrice(product.oldPrice)} تومان</div>
                )}
                <div className="fw-bold sane-text-violet-deep" style={{ fontSize: "1.4rem" }}>
                  {formatPrice(product.price)} <span className="small fw-normal sane-text-sub">تومان</span>
                </div>
              </div> */}
              <div className="d-flex align-items-center gap-1 small" style={{ color: "var(--sane-success)", width: "stretch" }}>
                <CheckBadgeIcon size={16} />
                گارانتی و مشاوره رایگان
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
              {/* <button type="button" disabled={!product.available} className="sane-btn-gradient btn flex-fill py-2">
                {product.available ? "افزودن به سبد خرید" : "اطلاع از موجود شدن"}
              </button> */}
              <button type="button" className="sane-btn-outline-violet btn flex-fill py-2">
                مشاوره تلفنی رایگان
              </button>
            </div>
          </div>

          <div className="sane-card p-4 " style={{ textAlign: "justify" }} >
            {product?.cySubject?.describtion}


          </div>

        </div>
      </div>

      {/* آکاردیون‌های اطلاعات تکمیلی محصول */}
      <section className="mt-5">
        <Accordion
          defaultOpenIndex={0}
          items={[
            { title: "مشخصات کامل سیستم", content: <SpecsTable specs={hardWareList} /> },
            { title: "معرفی اجمالی سیستم", content: <p className={` ${Style.listhardware_p} mb-0`} style={{ justifyContent: "center !important" }} >{product.cySubject?.describtion}</p> },
            { title: "بررسی کامل سیستم", content: <p className={`${Style.listhardware_p}mb-0 `} dangerouslySetInnerHTML={{ __html: product.cySubject?.body }}></p> },
          ]}
        />
      </section>

      {/* محصولات مشابه */}
      {related.length > 0 && (
        <section className="mt-5">
          <h2 className="fw-bold sane-text-ink mb-3" style={{ fontSize: "1.1rem" }}>
            محصولات مشابه در {category?.title}
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
            {related.map((p) => (
              <div className="col" key={p.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
