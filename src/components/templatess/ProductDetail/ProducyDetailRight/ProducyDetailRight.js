import React from 'react'
import Styles from './ProducyDetailRight.module.css'
import { laptopItems } from '@/utils/DataStore'

export default function ProducyDetailRight({ spec, laptopReview }) {


  return (
    <div >
      <table className={`table mt-5 table-striped ${Styles.table} `} >
        <tbody>
          {laptopReview == null ? spec?.length != 0 && spec?.map(item =>
            <tr key={item.id}>
              <td style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 'bolder', marginLeft: '10px' }} >{item.name} :</div>
                <div>{item.value}</div>
              </td>
            </tr>
          ) :
            laptopItems.map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                    {(item.id).toLocaleUpperCase()} :
                  </div>

                  <div>{laptopReview[item.id]}</div>
                </td>
              </tr>
            ))


          }
        </tbody>


      </table>
    </div>
  )
}
