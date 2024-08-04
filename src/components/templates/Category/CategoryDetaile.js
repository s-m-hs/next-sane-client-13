'use client'
import React, { useState, useEffect, useRef } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import CardC from "@/components/madules/Cards/CardC/CardC";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import Swal from 'sweetalert2'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HouseLine} from "@phosphor-icons/react";
import DotLoader from "react-spinners/DotLoader";



export default function CategoryDetaile({ param }) {
  const [mainCategory, setMainCategory] = useState({});
  const [mainCatChilds, setMainCatChilds] = useState([]);
  const [flagPro, setFlagPro] = useState(false);
  const [productByCat, setProductByCat] = useState([])
  const [flag, setFlag] = useState(false)
  const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);

  const styleRef = useRef();
  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyCategories/GetItemWChildAndRoot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          console.log(result)
          if (result.childs?.length != 0) {
            setMainCatChilds(result.childs);
            setMainCategory(result);
          } else {
            setMainCatChilds([]);
            setMainCategory(result);
          }
   
        });
    }
    myAppGet();
  };
  ////////////////////////////
  const getproductByCat = (obj) => {
    async function myApppost() {
      const res = await fetch(`${apiUrl}/api/CyProducts/GetProductByCat`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)

      }).then(res => {
        console.log(res)
        return res.json()
      }).then(result => {
        if (result.itemList?.length != 0) {
          setProductByCat(result.itemList)
        } else {
          setProductByCat([])

        }
      }
      ).catch(err => console.log(err))
    }
    myApppost()
  }

  const changeId = (code) => {
    let obj = {
      cat: code,
      pageNumber: 0,
      pageSize: 10
    }
    getproductByCat(obj)
    setFlagPro(true);
  };


  //////////////////////////////
  useEffect(() => {
    if (param !== null) {
      getCategoryById();
    }
    Swal.fire({
      // iconColor:'purple',
      position: "top-end",
      icon: "success",
      toast:'true',
      width:'100px',
      // title: "Your work has been saved",
      showConfirmButton: false,
      timer: 500
    }).then(res=>setFlag(prev=>!prev))
  }, []);
  ///////////////////////////
  useEffect(()=>{
  if(mainCatChilds.length==0 && mainCategory.item?.code){
  let code=mainCategory.item.code
  let obj={
    cat:code ,
    pageNumber: 0,
    pageSize: 10
  }
  getproductByCat(obj)
  }
  },[mainCatChilds])

  useEffect(() => {
    if(mainCatChilds.length!==0){
      let obj = {
      cat: mainCatChilds[0]?.code,
      pageNumber: 0,
      pageSize: 10
    }
    getproductByCat(obj)
    }
    

  }, [flag])


  return (
    <div className={`container  centerc ${Styles.category}`} >

      {flagSpinnerShow && <div className={`row ${Styles.spinner_row}`}>

<div className="col">
<DotLoader
color="rgba(25, 167, 175)"
size={250}
/>
</div>
</div>}


<div className={`row ${Styles.breadcrumb_row}`} >
  <div className={`${Styles.breadcrumb} col` } >
    <Breadcrumb>
      <Breadcrumb.Item href="/">خانه<HouseLine size={24}/>/</Breadcrumb.Item>
      <Breadcrumb.Item active href="/">
        {mainCategory.item?.text}
      </Breadcrumb.Item>
    </Breadcrumb>
  </div>
</div>


      <div className={`row row-cols-6  centerr ${Styles.category_row}`}>
        {mainCatChilds != null &&
          mainCatChilds.map((item, index) => (
            <>
              <div key={item.id} className={`centerc ${Styles.category__cart_div}`}>
                <CardAButton imgSrc={item.imageUrl} changeIdProp={() => changeId(item.code)} code={item.code} />
                <span>{item.text} </span>
              </div>
            </>
          ))}
      </div>

      <div className={`row row-cols-4 centerr ${Styles.products_card}`}>

        {productByCat?.length == 0 ? <SpinnerA size={200} /> : productByCat?.map((item, index) =>
          <div key={index}
            className={`centerc ${Styles.products_col}`}
            // onClick={ ()=>setFlagSpinnerShow(true) } 
            >
            <CardC
            clickSpinner={()=>setFlagSpinnerShow(true)}
              id={item.id}
              imgSrc={item.smallImage
              } title={item.name} price={item.price}
            /></div>

        )}
        {/* <button onClick={clickHan}></button> */}
      </div>


      {/* {mainCategory.childs !== 0 && (
        <div className="row">
          <div className="col-12">
            <CategoryProducts />
          </div>
        </div>
      )}

      {flagPro && (
        <div className="row">
          <div className="col-12">
            <CategoryProducts />
          </div>
        </div>
      )} */}
 
    </div>
  );
}
