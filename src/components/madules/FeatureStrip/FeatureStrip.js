"use client";
import React from "react";
import styles from "./FeatureStrip.module.css";
import { Truck, ShieldCheck, ArrowsCounterClockwise, Headset, ShoppingCart } from "@phosphor-icons/react";

const features = [
  { icon: <Truck size={34} weight="duotone" />, title: "ارسال سریع", desc: "به سراسر کشور", cls: styles.icon_0 },
  { icon: <ShieldCheck size={34} weight="duotone" />, title: "ضمانت اصالت", desc: "کالاهای اورجینال", cls: styles.icon_1 },
  { icon: <ShoppingCart size={34} weight="duotone" />, title: "خرید آسان", desc: "حضوری _ اینترنتی", cls: styles.icon_2 },
  // { icon: <ArrowsCounterClockwise size={34} weight="duotone" />, title: "بازگشت کالا", desc: "تا ۷ روز", cls: styles.icon_2 },
  { icon: <Headset size={34} weight="duotone" />, title: "پشتیبانی", desc: "پاسخگوی شما هستیم", cls: styles.icon_3 },
];

export default function FeatureStrip() {
  return (
    <div className={`container ${styles.wrap} sd-fade-up`}>
      <div className={`row ${styles.row}`}>
        {features.map((f, i) => (
          <div className="col-6 col-md-3" key={i}>
            <div className={`${styles.item} sd-fade-up`} style={{ animationDelay: `${i * 90}ms` }}>
              <span className={`${styles.icon} ${f.cls}`}>{f.icon}</span>
              <span className={styles.texts}>
                <span className={styles.title}>{f.title}</span>
                <span className={styles.desc}>{f.desc}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
