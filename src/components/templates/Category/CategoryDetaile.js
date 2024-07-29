'use client'
import React, { useState, useEffect, useRef } from "react";
import Styles from "./CategoryDetaile.module.css";
import apiUrl from "@/utils/ApiUrl/apiUrl";
import CardAButton from "@/components/madules/Cards/CardAButton/CardAButton";
import CategoryProducts from "./CategoryProducts/CategoryProducts";
import CardC from "@/components/madules/Cards/CardC/CardC";
import SpinnerA from "@/utils/SpinnerA/SpinnerA";


export default function CategoryDetaile({param}) {
//   const route = useRouter();
// console.log(route.query.id)
  const [mainCategory, setMainCategory] = useState({});
  const [mainCatChilds, setMainCatChilds] = useState([]);
  const [flagPro, setFlagPro] = useState(false);
  const[productByCat,setProductByCat]=useState([])

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
          if(result.childs?.length!=0){
            setMainCatChilds(result.childs);
            setMainCategory(result);

          }else{
             setMainCatChilds([]);
             setMainCategory(result);
          }
          // console.log(result)
          // console.log(mainCategory.childs);
          console.log(mainCatChilds);
        });
    }
    myAppGet();
  };
  ////////////////////////////
  const getproductByCat=(obj)=>{
    async function myApppost(){
      const res=await fetch(`${apiUrl}/api/CyProducts/GetProductByCat`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(obj)

      }).then(res=>{
        console.log(res)
        return res.json()
      }).then(result=>{
        if(result.itemList?.length!=0){
          setProductByCat(result.itemList)
        }else{
          setProductByCat([])

        }
        // console.log(result)
      }
        ).catch(err=>console.log(err))
    }
    myApppost()
  }
  
  const changeId = (code) => {
    // console.log(code)
    let obj={
        cat: code,
        pageNumber: 0,
        pageSize: 10
    }
    getproductByCat(obj)
    setFlagPro(true); 
  };

  //////////////////////////////
  useEffect(() => {
    if (param!== null) {
      getCategoryById();
    }
  }, []);
useEffect(()=>{
if(mainCatChilds.length==0 && mainCategory.item?.code){
console.log(mainCategory) 
let code=mainCategory.item.code
console.log(mainCategory.item?.code)
let obj={
  cat:code ,
  pageNumber: 0,
  pageSize: 10
}
getproductByCat(obj)
}
},[mainCatChilds])
  return (
    <div className={`container  centerc ${Styles.category}`} >
      <div className={`row row-cols-6  centerr ${Styles.category_row}`}>
        {mainCatChilds != null &&
          mainCatChilds.map((item, index) => (
            <>
              <div key={index} className={`centerc ${Styles.category__cart_div}`}>
                <CardAButton imgSrc={item.imageUrl}  changeIdProp={()=>changeId(item.code)} code={item.code}/>
                <span>{item.text} </span>
              </div>
            </>
          ))}
      </div>

<div className={`row row-cols-4 centerr ${Styles.products_card}`}>

   {productByCat?.length==0 ? <SpinnerA size={200} /> : productByCat?.map((item,index)=>
    <div key={index} className={`centerc ${Styles.products_col}`} >
      <CardC
    imgSrc={item.smallImage
    } title={item.name} price={item.price}
    
    /></div>

  )}


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
