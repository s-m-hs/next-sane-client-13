import { NOOffer } from '@/utils/DataStore'
import styles from './PriceBox.module.css'
import React from 'react'

export default function PriceBox(props) {
    return (
        <>
            {(props.offer.offerType == NOOffer && (props.noOffPrice == props.price)) ?

                <div className={`${styles.priceDiv} centerc`}>
                    <span className={styles.price}>
                        {props.price?.toLocaleString()}تومان{" "}
                    </span>
                </div>

                :

                <div className={`${styles.priceDiv} centerc`}>
                    <span className={styles.price}>
                        {(props.price).toLocaleString()}تومان{" "}

                    </span>
                    <span className={`${styles.noOffPrice} ${styles.underline}`}>
                        {props.noOffPrice?.toLocaleString()}تومان{" "}
                    </span>
                </div>

            }
        </>
    )
}
