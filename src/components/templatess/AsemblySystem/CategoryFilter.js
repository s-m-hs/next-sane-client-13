"use client";

import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { CategoryIcon } from "./Icons";
import { SystemLevel } from "@/utils/DataStore";

export default function CategoryFilter({ categories, activeSlug, onSelect, counts, systems }) {
  const items = [
    { slug: "all", title: "همه محصولات", description: "مشاهده تمام کامپیوترهای آماده", icon: "all" },
    ...categories,
  ];

  const getSystemBylevel = (level) => {
    ApiGetX2(`/api/SysPC2/SysPcLevel?level=${level}`, systems)
  }
  const goToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: 'smooth'
    })
  }
  return (
    <>
      {/* موبایل: چیپ‌های افقی قابل اسکرول */}
      <div className="d-lg-none " style={{
        overflowX: "auto",
        position: "fixed",
        top: '50px',
        zIndex: 10000,
        backgroundColor: '#ffff',
        height: '90px',
        width: '100%'
      }}>
        <div
          style={{
            display: 'flex',
            flexWrap: "wrap",
            justifyContent: "space-evenly"
          }}
        >
          {items.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                getSystemBylevel(c.slug)
                onSelect(c.slug)
                goToTop()
              }}
              className={`sane-chip ${activeSlug === c.slug ? "active" : ""}`}
              style={{ fontSize: "12px" }}
            >
              {c.title}*
              {counts &&
                counts?.filter(filt => filt.level == (SystemLevel.filter(filter => (
                  filter.title == c.slug
                ))[0]?.level))[0]?.count}
            </button>
          ))}
        </div>
      </div>

      {/* دسکتاپ: ستون کناری */}
      <aside className="d-none d-lg-block flex-shrink-0" style={{ width: "280px", height: '100%', }}>
        <div className="sane-card p-3" style={{ position: "sticky", top: "12.5rem" }}>
          <h2 className="px-2 pt-1 pb-2 fw-bold sane-text-sub" style={{ fontSize: "16px" }}>
            دسته‌بندی کامپیوترها
          </h2>
          <ul className="list-unstyled d-flex flex-column gap-1 mb-0">
            {items.map((c) => {
              const active = activeSlug === c.slug;
              return (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      getSystemBylevel(c.slug)
                      onSelect(c.slug)
                      goToTop()

                    }}
                    className={`sane-category-item ${active ? "active" : ""}`}
                  >
                    <span className={`sane-category-icon ${active ? "active" : ""}`}>
                      {c.icon === "all" ? (
                        <strong>∗</strong>
                      ) : (
                        <CategoryIcon name={c.icon} size={18} />
                      )}
                    </span>
                    <span className="flex-grow-1" style={{ fontSize: "15px" }}>
                      {c.title}
                    </span>
                    <span className="small">
                      {counts &&
                        counts?.filter(filt => filt.level == (SystemLevel.filter(filter => (
                          filter.title == c.slug
                        ))[0]?.level))[0]?.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>



      </aside>
    </>
  );
}
