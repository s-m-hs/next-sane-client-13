import React from "react";
import styles from "./BrandArea.module.css";

export default function BrandArea({ brandArray, fileRoot }) {
  const list = [...brandArray, ...brandArray];
  return (
    <div className={`container ${styles.container} sd-fade-up`}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {list.map((item, index) => (
            <a
              key={index}
              href={item.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <img
                src={`../../../../../images/brand/${fileRoot}/${item.brand}`}
                alt={`${item.brand}`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
