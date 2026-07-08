import { ParentHardWare } from "@/utils/DataStore";
import Style from "./AssemblySystem.module.css"
import Link from "next/link";

export default function SpecsTable({ specs }) {
  return (
    <table className="spec-table">
      <tbody>
        {specs?.map((row) => (
          <tr key={row.label} className={`${Style.hardwarList_tr}`}>
            <Link href={`/product/${row.productId}`}>
              <th scope="row">{(ParentHardWare.filter(item => item.enum == row.parentHardWare)[0].title).toUpperCase()}</th>
              <td>{row.name}</td>
              <td><img className={`${Style.hardwarList_img}`} src={`${row.proImg}`} alt="" /></td>
            </Link>
          </tr>

        ))}
      </tbody>
    </table>
  );
}
