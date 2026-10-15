import React from 'react'
import Styles from './ProducyDetailRight.module.css'
import { laptopItems } from '@/utils/DataStore'
import { SlidersHorizontal } from '@phosphor-icons/react'

export default function ProducyDetailRight({ spec, laptopReview }) {
  return (
    <div className={Styles.card}>
      <div className={Styles.header}>
        <SlidersHorizontal size={18} weight="duotone" />
        مشخصات فنی
      </div>

      <div className={Styles.rows}>
        {laptopReview == null ? (
          spec?.length != 0 &&
          spec?.map((item) => (
            <div className={Styles.row} key={item.id}>
              <span className={Styles.label}>{item.name}</span>
              <span className={Styles.value}>{item.value}</span>
            </div>
          ))
        ) : (
          laptopItems.map((item) => (
            <div className={Styles.row} key={item.id}>
              <span className={Styles.label}>
                {item.id.toLocaleUpperCase()}
              </span>
              <span className={Styles.value}>{laptopReview[item.id]}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}