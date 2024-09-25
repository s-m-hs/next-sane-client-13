import React from 'react'
import Styles from './ProducyDetailRight.module.css'

export default function ProducyDetailRight({spec}) {
  return (
    <div>
      <table className={`table mt-5 table-striped ${Styles.table}`} >
<tbody>
{spec?.length != 0 && spec?.map(item =>
                      <tr key={item.id}>
                        <td style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
                          <div style={{fontWeight:'bolder',marginLeft:'10px'}} >{item.name} :</div>
                          <div>{item.value}</div>
                        </td>
                        {/* <th></th>
                        <td></td> */}
                      </tr>
                    )}
</tbody>
     
        
      </table>
    </div>
  )
}
