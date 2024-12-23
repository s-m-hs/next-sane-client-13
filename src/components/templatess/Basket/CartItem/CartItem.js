'use client'
import style from './CartItem.module.css'
import { MainContext } from "@/context/MainContext";
import Link from 'next/link';
import { useContext, useState,useEffect, useRef } from "react";
import { X,DotsThreeVertical   } from "@phosphor-icons/react";

// import { CounterContext } from "../../Context/CounterContext";
// import { MenuContext } from "../../Context/MenuContext";
// import RemoveApi from "../../jsUtils/ApiCallBack/ApiRemove";
// import updateBasket from "../../jsUtils/apiPutBasket";

const CartItem = (props) => {
  const[quantity,setQuantity]=useState( props.quantity)
  const getLocalStorage=localStorage.getItem('loginToken')
  let {  xtFlagLogin,setXtFlagSpinnerShow } = useContext(MainContext);

//   let { basketFlag,setGetBasket } = useContext(CounterContext)
// let{flagLogin}=useContext(MenuContext)
const addClick = () => {

  setQuantity(prev=>Number(prev)+1)
  props.updateQuantity(props.cyProductID, quantity+1);

};

const minesClick = () => {
  if(quantity>1){
    setQuantity(prev=>Number(prev)-1)
    props.updateQuantity(props.cyProductID, quantity-1);
  }
};

const changeHandler = (e) => {
  if(e.target.value>=0){
    setQuantity(e.target.value)

  }
  props.updateQuantity(props.cyProductID, e.target.value);
};
const handleRemove=(e,id)=>{
  xtFlagLogin ?
  props.remove(id) : props.handleRemove(id)

}
  /////////////////////////////////////////////////
  return (
    <>
      <tr className= {`${style.tr}`}>
        {/* <!-- img --> */}
        <td className="tp-cart-img">
          
            {" "}
            <img src={props.smallImage} alt={props.name} style={{width:'50px'}} />
         
        </td>


        {/* <!-- title --> */}
        <td className= {` tp-cart-title ${style.title}`}
        onClick={()=>setXtFlagSpinnerShow(true)}
>
          
          <a href={xtFlagLogin ? `product/${props.cyProductID}` : `product/${props.id}`} >{props.name}</a>
        </td>
        {/* <!-- price --> */}
    
        <td className="tp-cart-quantity">
          <div className="tp-product-quantity mt-10 mb-10">
      
           
            <input 
            type='number'
            class={style.quantity} 
            value={quantity}
            onChange={(e)=>changeHandler(e)}
            ></input>

           
          </div>
        </td>


        <td className="tp-cart-price">
          {
          props.unitPrice === null ? (
            props.totalPrice === null ? (
              <div className="tp-product-badge" style={{ position: "static" }}>
                <span className="product-hot">نا موجود</span>
              </div>
            ) : (
              <span className="tp-product-details-price new-price">
                {props.totalPrice}
              </span>
            )
          ) : props.totalprice === null ? (
            <span className="tp-product-details-price new-price">
              {props.unitPrice}
            </span>
          ) : (
            <div>
              <span className="tp-product-details-price old-price">
                {props.unitPrice}
              </span>
              {/* <br/>
              <span className="tp-product-details-price new-price">
                {props.offerPrice}
              </span> */}
            </div>
          )
          }
        </td>
<td className={style.td_totalPrice}>
<span className= "tp-product-details-price new-price">
                {props.totalPrice}
              </span>
</td>

        {/* <!-- action --> */}
        <td className="tp-cart-action">
          <Link href={xtFlagLogin ? `product/${props.cyProductID}` : `product/${props.id}`}>
           <button  className={`btn btn-primary m-1 ${style.btn_product}`}
           onClick={()=>setXtFlagSpinnerShow(true)}

         >

          جزییات محصول...

          </button>

          <button  className={`btn btn-primary m-1 ${style.btn_product_hide}`}
           onClick={()=>setXtFlagSpinnerShow(true)}

         >
                               <DotsThreeVertical size={10} color="#fff" />

          </button>
          </Link>
       
          <button className={`btn btn-danger m-1 ${style.btn_product}`}
          onClick={(e)=>{ handleRemove(e,props.id) }}>
           
حذف
          </button>

          <button className={`btn btn-danger m-1 ${style.btn_product_hide}`}
          onClick={(e)=>{ handleRemove(e,props.id) }}>
                               <X size={10} color="#fff" />


          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
