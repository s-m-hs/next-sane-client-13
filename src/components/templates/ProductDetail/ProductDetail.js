'use client'
import React, { useEffect, useState } from 'react'
import Styles from './ProductDetail.module.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProducyDetailRight from './ProducyDetailRight/ProducyDetailRight';
import ProductDetailLeft from './ProductDetailLeft/ProductDetailLeft';
import apiUrl from '@/utils/ApiUrl/apiUrl';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HouseLine,Dresser} from "@phosphor-icons/react";


// import ProductDetailL from '../../Components/ProductDetail/ProductDetailL'

export default function ProductDetail({ param }) {
  const [productDetail, setProductDetail] = useState([])
  const [productDetailB, setProductDetailB] = useState({})
  const [idCategory,setIdCategory]=useState('')
  const [nameCategory,setNameCategory]=useState('')
  console.log(param);

  const getProductById = (id) => {
    async function myAppPost() {
      const res = await fetch(`${apiUrl}/api/CyProducts/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res => {
        // console.log(res)
        return res.json()
      }).then(result => {
        if (result) {
          setProductDetail(result.spec)
          setIdCategory(result.cyCategoryId)
          setProductDetailB(result)
        }

      }).catch(err => console.log(err))
    }
    myAppPost()
  }
const getCategory=(id)=>{
  async function myAppGet(){
    const res=await fetch(`${apiUrl}/api/CyCategories/${id}`,{
      method:'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res=>{
      console.log(res)
      return res.json()
    }).then(result=>{
      setNameCategory(result.text)
    })
  }
  myAppGet()
}
useEffect(()=>{
  if(idCategory){
    getCategory(idCategory)
  }
},[idCategory])


  useEffect(() => {
    getProductById(param)
  }, [param])
  console.log(productDetail)
  console.log(idCategory);
  return (
    <div className={`container ${Styles.product_container}`} >

<div className={`row ${Styles.breadcrumb_row}`} >
  <div className={`${Styles.breadcrumb} col` } >
    <Breadcrumb>
      <Breadcrumb.Item href="/"><HouseLine size={18}/>خانه/</Breadcrumb.Item>
      {nameCategory && idCategory && <Breadcrumb.Item href={`/category/${idCategory}`}><Dresser size={18} />{nameCategory}/</Breadcrumb.Item>}  
      <Breadcrumb.Item active href="/">
      {productDetailB?.name}
        {/* {mainCategory.item?.text} */}
      </Breadcrumb.Item>
    </Breadcrumb>
  </div>
</div>

      <div className={`row ${Styles.product_row}`}  >
        <div className={`col-md-3  ${Styles.product_right_col}`} ><ProducyDetailRight spec={productDetail} /></div>
        <div className="col-md-9 product-left-col"><ProductDetailLeft  detail={productDetailB} /></div>

      </div>
      <div className='row'>
        <div className={`col ${Styles.product_tab_div}`}>

          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-2"
          // fill
          // onSelect={ffc}
          // onClick={()=>ffc(id)}
          >
            <Tab eventKey="home" title="مشخصات" style={{ background: 'inherit' }}>
              <div className={Styles.table_div}>
                <table className='table mt-5 table-striped' >
                  <tbody>

                    {productDetail?.length != 0 && productDetail.map(item =>
                      <tr key={item.id}>
                        <th>{item.name}</th>
                        <td>{item.value}</td>
                      </tr>
                    )}

                  </tbody>


                </table>
              </div>

            </Tab>




            <Tab eventKey="longer-tab" title="نظرات کاربران" style={{ background: 'inherit' }}>
            </Tab>

          </Tabs>


        </div>
      </div>

    </div>
  )
}
