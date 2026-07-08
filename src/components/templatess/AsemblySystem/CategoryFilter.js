"use client";

import ApiGetX2 from "@/utils/ApiServicesX/ApiGetX2";
import { CategoryIcon } from "./Icons";

export default function CategoryFilter({ categories, activeSlug, onSelect, counts, systems }) {
  const items = [
    { slug: "all", title: "همه محصولات", description: "مشاهده تمام کامپیوترهای آماده", icon: "all" },
    ...categories,
  ];

  const getSystemBylevel = (level) => {
    ApiGetX2(`/api/SysPC2/SysPcLevel?level=${level}`, systems)
  }

  return (
    <>
      {/* موبایل: چیپ‌های افقی قابل اسکرول */}
      <div className="d-lg-none mb-4" style={{ overflowX: "auto" }}>
        <div className="d-flex gap-2" style={{ width: "max-content" }}>
          {items.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                getSystemBylevel(c.slug)
                onSelect(c.slug)
              }}
              className={`sane-chip ${activeSlug === c.slug ? "active" : ""}`}
            >
              {c.title}
              {c.slug !== "all" && (
                <span className="ms-1" style={{ opacity: 0.8 }}>
                  ({counts[c.slug] || 0})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* دسکتاپ: ستون کناری */}
      <aside className="d-none d-lg-block flex-shrink-0" style={{ width: "280px" }}>
        <div className="sane-card p-3" style={{ position: "sticky", top: "1.5rem" }}>
          <h2 className="px-2 pt-1 pb-2 fw-bold sane-text-sub" style={{ fontSize: "0.85rem" }}>
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
                    <span className="flex-grow-1" style={{ fontSize: "0.9rem" }}>
                      {c.title}
                    </span>
                    <span className="small">{c.slug === "all" ? counts.all : counts[c.slug] || 0}</span>
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
