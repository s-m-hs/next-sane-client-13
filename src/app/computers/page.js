"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Style from './computer.module.css'
import { categories, products } from "@/data/products";
import CategoryFilter from "@/components/templatess/AsemblySystem/CategoryFilter";
import ProductCard from "@/components/templatess/AsemblySystem/ProductCard";
import AssembleAnimation from "@/components//templatess/AsemblySystem/AssembleAnimation";
import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { MainContext } from "@/context/MainContext";
import SearchHardware from "@/components/templatess/AsemblySystem/SearchHardware";
import { ParentHardWare } from "@/utils/DataStore";
import SubjecArea from "@/components/madules/SubjecArea/SubjecArea";

export default function ComputersPage() {
  let { setXtFlagSpinnerShow, xtflagSpinnerShow } = useContext(MainContext);
  const [activeSlug, setActiveSlug] = useState("all");
  const [allSystem, setAllSystem] = useState([])
  const [counts, setCounts] = useState(0)


  const getAllSystem = () => {
    ApiGetX2(`/api/SysPC2`, setAllSystem)
  }
  const getLevelLength = () => {
    ApiGetX2(`/api/SysPC2/level-count`, setCounts)
  }
  // const counts = useMemo(() => {
  //   const c = { all: products.length };
  //   categories.forEach((cat) => {
  //     c[cat.slug] = products.filter((p) => p.category === cat.slug).length;
  //   });
  //   return c;
  // }, []);

  const visibleProducts = useMemo(() => {
    if (activeSlug === "all") return products;
    return products.filter((p) => p.category === activeSlug);
  }, [activeSlug]);

  const activeCategory = categories.find((c) => c.slug === activeSlug);



  useEffect(() => {
    getAllSystem()
    getLevelLength()
  }, [])
  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, [xtflagSpinnerShow]);
  return (
    <main className="container py-4 py-lg-5">
      <header className={`${Style.header} mb-4`} >
        <p className="small sane-text-sub mb-1">خانه / کامپیوترصانع</p>
        <h1 className="fw-bold sane-text-ink" style={{ fontSize: "1.75rem" }}>
          کامپیوترهای آماده
        </h1>
        <p className="small sane-text-sub mt-2" style={{ maxWidth: "640px" }}>
          {activeCategory ? activeCategory.description : "دسته مورد نظر خود را انتخاب کنید تا کامپیوترهای همان دسته را ببینید."}
        </p>
      </header>

      {/* باکس معرفی + انیمیشن اسمبل */}
      <div className="sane-card mb-4 overflow-hidden">
        <div className="row align-items-center g-4 p-4 p-lg-5 sane-gradient-soft-bg m-0">
          <div className="col-12 col-lg-6">
            <span className="badge rounded-pill bg-white sane-text-violet-deep mb-2" style={{ fontWeight: 700 }}>
              اسمبل تخصصی در کامپیوترصانع
            </span>
            <h2 className="fw-bold sane-text-ink" style={{ fontSize: "1.4rem", lineHeight: 1.9 }}>
              هر سیستم، قطعه به قطعه، اسمبل و تست می‌شود
            </h2>
            <p className={`small sane-text-sub ${Style.box_text}`} style={{ lineHeight: 1.9, maxWidth: "460px" }}>
              مادربرد، پردازنده، رم، خنک‌کننده، حافظه و پاور توسط کارشناسان ما با دقت انتخاب و سوار می‌شوند و پیش از تحویل، تست پایداری کامل انجام می‌شود.
            </p>
            <ul className="list-unstyled d-flex flex-wrap gap-2 mt-3 mb-0">
              {["تست پایداری", "سیم‌کشی مرتب", "گارانتی اسمبل"].map((tag) => (
                <li key={tag} className="badge rounded-pill bg-white border sane-text-violet-deep" style={{ fontWeight: 700 }}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-lg-6">
            <AssembleAnimation />
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-lg-row gap-4">
        <div className="centerc" style={{ justifyContent: "flex-start" }}>
          <SearchHardware
            items={ParentHardWare}
          />
          <CategoryFilter categories={categories} activeSlug={activeSlug} onSelect={setActiveSlug} counts={counts} systems={setAllSystem} />


        </div>


        <section className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="small sane-text-sub">{visibleProducts.length} محصول یافت شد</span>
          </div>

          {allSystem.length === 0 ? (
            <div className="sane-card p-5 text-center sane-text-sub">محصولی در این دسته موجود نیست.</div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
              {
                allSystem.map((item) => (
                  <div className="col" key={item.id}>
                    <ProductCard product={item} />
                  </div>
                ))}
              <div style={{ width: '100%', marginTop: "50px" }}><SubjecArea page="system" /></div>

            </div>
          )}
        </section>



      </div>    </main>
  );
}
