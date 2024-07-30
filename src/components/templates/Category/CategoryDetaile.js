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
  const [flag,setFlag]=useState(false)

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
console.log(mainCatChilds[0]); 
          }else{
             setMainCatChilds([]);
             setMainCategory(result);
          }
          // console.log(result)
          // console.log(mainCategory.childs);
          // console.log(mainCatChilds);
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
  // console.log(mainCatChilds[0].id); 

  //////////////////////////////
  useEffect(() => {
    if (param!== null) {
      getCategoryById();
    }
    setTimeout(() => {
      setFlag(prev=>!prev)
    }, 500);
    
  }, []);


useEffect(()=>{
if(mainCatChilds.length==0 && mainCategory.item?.code){
// console.log(mainCategory) 
let code=mainCategory.item.code
let obj={
  cat:code ,
  pageNumber: 0,
  pageSize: 10
}
getproductByCat(obj)
}
},[mainCatChilds])

useEffect(()=>{
  let obj={
    cat:mainCatChilds[0]?.id ,
    pageNumber: 0,
    pageSize: 10
  }
    console.log(obj); 

  getproductByCat(obj)

},[flag])
  return (
    <div className={`container  centerc ${Styles.category}`} >
      <div className={`row row-cols-6  centerr ${Styles.category_row}`}>
        {mainCatChilds != null &&
          mainCatChilds.map((item, index) => (
            <>
              <div key={item.id} className={`centerc ${Styles.category__cart_div}`}>
                <CardAButton imgSrc={item.imageUrl}  changeIdProp={()=>changeId(item.code)} code={item.code}/>
                <span>{item.text} </span>
              </div>
            </>
          ))}
      </div>

<div className={`row row-cols-4 centerr ${Styles.products_card}`}>

   {productByCat?.length==0 ? <SpinnerA size={200} /> : productByCat?.map((item,index)=>
    <div  key={index}
    className={`centerc ${Styles.products_col}`} >
      <CardC
      id={item.id}
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
