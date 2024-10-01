'use client'
import React, { useState, useEffect, useRef, useContext } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import CardC from "@/components/madules/Cards/CardC/CardC";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";
import Swal from 'sweetalert2'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { HouseLine} from "@phosphor-icons/react";
import Link from "next/link";
import { MainContext } from "@/context/MainContext";
import Pagination from '@mui/material/Pagination';




export default function CategoryDetaile({ param }) {
  const [mainCategory, setMainCategory] = useState({});
  const [mainCatChilds, setMainCatChilds] = useState([]);
  const [flagPro, setFlagPro] = useState(false);
  const [productByCat, setProductByCat] = useState([])
  const [flag, setFlag] = useState(false)
  const [page, setPage] = React.useState(1);
  const [paginationArray, setPaginationArray] = useState([]);
  const pageCount=10
  const [allCount, setAllCount] = useState([]);



  // const [flagSpinnerShow, setFlagSpinnerShow] = useState(false);
let{setNameCategory,setXtFlagSpinnerShow}=useContext(MainContext)
  const styleRef = useRef();
  const goToTop=()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  const handleChange = (event, value) => {
    goToTop()
    setPage(value);
    let code=mainCategory?.item.code
    let obj = {
      cat: code,
      pageNumber: value-1,
      pageSize: pageCount
    
  }
    getproductByCat(obj);
};
useEffect(() => {
  if (productByCat?.length != 0 ) {
    let x = allCount;
    let countInPage = pageCount; 
    let z = Math.ceil(x / countInPage);
    z
      ? setPaginationArray(Array.from({ length: z }))
      : setPaginationArray([]);
  }
}, [productByCat]);


  const getCategoryById = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: param,
      str: "string",
    };
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`,
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
      const res = await fetch(`${apiUrl}/api/CyProducts/GetProductByProductCat`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)

      }).then(res => {
        console.log(res)
        return res.json()
      }).then(result => {
        console.log(result)
        if (result.itemList?.length != 0) {
          setProductByCat(result.itemList)
          setAllCount(result.allCount)

        } else {
          setProductByCat([])
          setAllCount(result.allCount)


        }
      }
      ).catch(err => console.log(err))
    }
    myApppost()
  }

  const changeId = (code) => {
    let obj = {
      cat: code,
      pageNumber:page-1,
      pageSize: pageCount
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

    let obj = {
      cat: code,
      pageNumber: page-1,
      pageSize: pageCount
    
  }
  getproductByCat(obj)
  }
  setNameCategory(mainCategory.item?.name)
  },[mainCatChilds])

  useEffect(() => {
    if(mainCatChilds.length!==0){
      let obj = {
      cat: mainCatChilds[0]?.code,
     pageNumber: page-1,
      pageSize: pageCount
    }
    
    getproductByCat(obj)
    }
    

  }, [flag])
useEffect(()=>{
  setXtFlagSpinnerShow(false)
},[])
console.log(paginationArray)
console.log(page)
console.log(mainCatChilds)
  return (
    <div className={`container  centerc ${Styles.category}`} >
<div className={`row ${Styles.breadcrumb_row}`} >
  <div className={`${Styles.breadcrumb} col` } >
    <Breadcrumb>
    <Breadcrumb.Item ><Link onClick={()=>setXtFlagSpinnerShow(true)}
 href="/"><HouseLine size={24}/>خانه/</Link></Breadcrumb.Item>
      <Breadcrumb.Item active href="/">
        {mainCategory.item?.name}
      </Breadcrumb.Item>
    </Breadcrumb>
  </div>

</div>

{
   paginationArray.length > 1 &&
             
   <div className='pagination-div' >
   <Pagination count={ paginationArray.length}  page={page}
    //  ref={classRefB}
    onChange={handleChange}
    color="primary"
     shape="rounded"
    style={{direction:'ltr'}}
     />
   </div>}


      <div className={`row row-cols-auto  centerr ${Styles.category_row}`}>
        {mainCatChilds != null &&
          mainCatChilds.map((item, index) => (
            <>
              <div key={item.id} className={`centerc ${Styles.category__cart_div}`}>
                <CardAButton imgSrc={item.imageUrl} changeIdProp={() => changeId(item.code)} code={item.code} />
                <span>{item.name} </span>
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
            // clickSpinner={()=>setFlagSpinnerShow(true)}
              id={item.id}
              imgSrc={item.smallImage
              } title={item.name} price={item.price}
            /></div>

        )}
        {/* <button onClick={clickHan}></button> */}
      </div>
      {
   paginationArray.length > 1 &&
             
   <div className='pagination-div' >
   <Pagination count={ paginationArray.length}  page={page}
    //  ref={classRefB}
    onChange={handleChange}
    color="primary"
     shape="rounded"
    style={{direction:'ltr'}}
     />
   </div>}

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
