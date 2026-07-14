import Link from "next/link";
import Image from "next/image";
import { SpecIcon, StarIcon, ChevronIcon } from "./Icons";
import { formatPrice } from "@/data/products";

export default function ProductCard({ product }) {
  const specRows = [
    {
      icon: "cpu", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 2
      ))[0]?.name
    },
    {
      icon: "gpu", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 1
      ))[0]?.name
    },
    {
      icon: "ram", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 3
      ))[0]?.name
    },
    {
      icon: "storage", value: product.hardwareList?.filter(item => (
        item.parentHardWare == 5
      ))[0]?.name
    },
  ];
  return (
    <div className="sane-card sane-card-hover h-100 d-flex flex-column overflow-hidden">
      <Link href={`/computers/${product.id}`} style={{ height: "100%" }}>
        <img src={product?.cySubject?.smallImg} alt={product.name} fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: "cover" }} />

      </Link>

      <div className="d-flex flex-column flex-grow-1 p-3">
        <Link href={`/computers/${product.id}`} className="text-decoration-none">
          <h3 className="fw-bold sane-text-ink sane-line-clamp-2" style={{ fontSize: "18px", lineHeight: 1.5 }}>
            {product.name}
          </h3>
        </Link>
        {/* 
        <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f59e0b" }}>
          <StarIcon size={14} />
          <span className="small sane-text-sub">
            {product.rating} ({product.reviews} نظر)
          </span>
        </div> */}

        <ul className="list-unstyled row row-cols-2 g-1 mb-2 centercc">
          {specRows.map((row) => (
            <li key={row.icon} className="col d-flex align-items-center gap-1 small sane-text-sub text-truncate" style={{ width: "100%" }}>
              <span className="sane-text-violet flex-shrink-0 d-inline-flex">
                <SpecIcon name={row.icon} size={14} />
              </span>
              <span className="text-truncate">{row.value}</span>
            </li>
          ))}
        </ul>

        {/* <div className="mt-auto pt-2">
          {product.oldPrice && (
            <div className="small sane-text-sub text-decoration-line-through">{formatPrice(product.oldPrice)} تومان</div>
          )}
          <div className="fw-bold sane-text-violet-deep">
            {formatPrice(product.price)} <span className="small fw-normal sane-text-sub">تومان</span>
          </div>
        </div> */}

        <Link
          href={`/computers/${product.id}`}
          className="sane-btn-gradient btn d-flex align-items-center justify-content-center gap-2 mt-3"
          style={{ height: "50px", fontSize: "16px" }}
        >
          نمایش بیشتر
          <span className="d-inline-flex" style={{ transform: "rotate(180deg)" }}>
            <ChevronIcon size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
