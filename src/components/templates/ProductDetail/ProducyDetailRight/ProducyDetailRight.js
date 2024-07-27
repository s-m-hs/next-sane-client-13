import React from 'react'
import Styles from './ProducyDetailRight.module.css'

export default function ProducyDetailRight() {
  return (
    <div>
      <table className={`table mt-5 table-striped ${Styles.table}`} >
<tbody>
     <tr key="">
          <th>ارگونومی</th>
          <td>متقارن</td>
          {/* <button className='btn btn-danger'></button> */}
        </tr>

        <tr key="">
          <th>عمر مفید سوئیچ‌ها
          </th>
          <td>20 میلیون کلیک
          </td>
        </tr>
        
        <tr key="">
          <th>سازنده سوئیچ‌ها
          </th>
          <td>LK</td>
        </tr>

        <tr key="">
          <th>تعداد کلیدها
          </th>
          <td>8
          </td>
        </tr>

        <tr key="">
          <th>نوع سنسور
          </th>
          <td>اپتیکال</td>
        </tr>

        <tr key="">
          <th>حداکثر میزان دقت (حساسیت)
          </th>
          <td>6200DPI</td>
        </tr>

        <tr key="">
          <th>حداکثر سرعت
          </th>
          <td>160IPS</td>
        </tr>

        <tr key="">
          <th>نوع نورپردازی

          </th>
          <td>RGB</td>
        </tr>

        <tr key="">
          <th>نوع اتصال

          </th>
          <td>با سیم
          </td>
        </tr>

        <tr key="">
          <th>طول کابل 
          </th>
          <td>1.8 متر
          </td>
        </tr>
</tbody>
     
        
      </table>
    </div>
  )
}
