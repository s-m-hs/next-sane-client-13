import style from './CartItem.module.css'
import { MainContext } from "@/context/MainContext";
import { useContext, useState,useEffect } from "react";
// import { CounterContext } from "../../Context/CounterContext";
// import { MenuContext } from "../../Context/MenuContext";
// import RemoveApi from "../../jsUtils/ApiCallBack/ApiRemove";
// import updateBasket from "../../jsUtils/apiPutBasket";

const CartItem = (props) => {
  const[quantity,setQuantity]=useState( props.quantity)
  const getLocalStorage=localStorage.getItem('loginToken')
  let {  xtFlagLogin } = useContext(MainContext);

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
  setQuantity(e.target.value)
  props.updateQuantity(props.cyProductID, e.target.value);
};
const handleRemove=(e,id)=>{
  xtFlagLogin ?
  props.remove(id) : props.handleRemove(id)

}
  /////////////////////////////////////////////////

// const getBasket=()=>{
//   async function myAppGet(){
//     const res=await fetch('http://wapi.chipyab.ir/api/CyOrders/GetBasketForUser',{
//       method:'GET', 
//        headers: {
//         "Content-Type": "application/json",
//         Authorization:`Bearer ${getLocalStorage}`
//       },
//     }).then(res=>{
//       // console.log(res)
//       return res.json()
//     }).then(result=>{
//       setGetBasket(result.cyOrderItems)  
//     }).catch(err=>console.log(err))
//   }
//   myAppGet()
// }
// useEffect(()=>{ 
//   getBasket()
// },[basketFlag])
  return (
    <>
      <tr className= {`${style.tr}`}>
        {/* <!-- img --> */}
        <td className="tp-cart-img">
          
            {" "}
            <img src={props.smallImage} alt="" style={{width:'50px'}} />
         
        </td>
        {/* <!-- title --> */}
        <td className="tp-cart-title">
          <a href={`/product/${props.id}`} >{props.name}</a>
        </td>
        {/* <!-- price --> */}
        <td className="tp-cart-price">
          {
          props.noOffPrice === null ? (
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
              {props.noOffPrice}
            </span>
          ) : (
            <div>
              <span className="tp-product-details-price old-price">
                {props.noOffPrice}
              </span>
              <br/>
              <span className="tp-product-details-price new-price">
                {props.totalPrice}
              </span>
            </div>
          )
          }
        </td>
        <td className="tp-cart-quantity">
          <div className="tp-product-quantity mt-10 mb-10">
            {/* {xtFlagLogin &&  <span className="tp-cart-minus" 
            onClick={()=>minesClick()}
            >
              <svg
                width="10"
                height="2"
                viewBox="0 0 10 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round" 
                />
              </svg>
            </span>} */}
           
            <input 
            type='number'
            class={style.quantity} 
            value={quantity}
            onChange={(e)=>changeHandler(e)}
            ></input>

{/* {xtFlagLogin &&  <span className="tp-cart-plus" onClick={()=>addClick()}>
            
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 5H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>} */}
           
          </div>
        </td>
        {/* <!-- action --> */}
        <td className="tp-cart-action">
          <button className="btn btn-danger"
          onClick={(e)=>{ handleRemove(e,props.id) }}>
           
            <span>حذف</span>

          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
