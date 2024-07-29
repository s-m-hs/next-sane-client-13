import React from 'react'
import Styles from './ProducyDetailRight.module.css'

export default function ProducyDetailRight({spec}) {
  return (
    <div>
      <table className={`table mt-5 table-striped ${Styles.table}`} >
<tbody>
{spec?.length != 0 && spec.map(item =>
                      <tr key={item.id}>
                        <th>{item.name}</th>
                        <td>{item.value}</td>
                      </tr>
                    )}
</tbody>
     
        
      </table>
    </div>
  )
}
