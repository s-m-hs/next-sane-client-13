import { MainContext } from '@/context/MainContext'
import apiCallProdDetails from '@/utils/ApiUrl/apiCallProDetails';
import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem/CartItem';
import { ToastContainer, Zoom, toast } from "react-toastify";


export default function BasketDetail() {
  let { setXtFlagSpinnerShow,xtFlagLogin,localUpdateBasket,
    setLocalUpdateBasket}=useContext(MainContext)
  const [toBuy, setToBuy] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [basket, setBasket] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [basket2, setBasket2] = useState([]);
  const notify = () => toast("به روزرسانی انجام شد");






  const addItem = (item) => {
    setToBuy((prevToBuy) => [...prevToBuy, item]);
  };

  const removeItem = (id) => {
    setToBuy((prevToBuy) => prevToBuy.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    let basketArray = [];
    let filterBasket = basket.filter((item) => {
      item.cyProductID !== id && basketArray.push(item);
    });
    basketArray.push({ cyProductID: id, quantity: newQuantity });
    setBasket(basketArray);
    setFlagUpdate(true);
  };

  const updateBasketHandler = () => {
    if (xtFlagLogin) {
      // updateBasket(getLocalStorage, basket, setBasketFlag);
      // setFlagUpdate(false);
     
    } else {
      let array1 = basket2;
      basket.forEach((item) => {
        let newKey = `cartObj${item.cyProductID}`;
        let newValue = {
          value: item.cyProductID,
          quan: item.quantity.toString(),
        };

        array1.push({
          key: newKey,
          value: newValue,
        });
      });
      setBasket2(array1);
      setLocalUpdateBasket(basket2);
      basket2.forEach((item) => {
        localStorage.setItem(item.key, JSON.stringify(item.value));
      });
      setFlagUpdate(false);

    }
    notify();
  };
  //////////////////////
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cartObj")) {
        const value = localStorage.getItem(key);
        const keyy = JSON.parse(localStorage.getItem(key));
        apiCallProdDetails(keyy.value, addItem, setIsApiCalled);
      }
    }
  }, []);

  useEffect(()=>{
    setXtFlagSpinnerShow(false)
  },[])
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-8'>
                <div>
                    <table className='table table-hove'>

    <thead>
        <tr key="">
            <th>محصول</th>
            <th>قیمت</th>
            <th>تعداد</th>
        </tr>
    </thead>
    <tbody>
    {!xtFlagLogin
                      && toBuy.length != 0 &&
                        toBuy.map((item) => (
                        //  {} 
                          <CartItem
                            name={item["name"]}
                            smallImage={item["smallImage"]}
                            price={item["price"]}
                            noOffPrice={item["noOffPrice"]}
                            id={item["id"]}
                            cyProductID={item.id}
                            quantity={
                              localUpdateBasket?.length == 0
                                ? 1
                                : 
                                  localUpdateBasket.filter(
                                    (filter) =>
                                    (console.log(filter))
                                      // (filter.value.value == item.id)[0].value.quan
                                  )
                                      
                                      
                            }

                            updateQuantity={updateQuantity}
                            // handleRemove={removeFromCart}
                          ></CartItem>
                        ))
                      // : counterContext.getBasket != null &&
                      //   counterContext.getBasket.map((item) => (
                      //     <>
                      //       <CartItem
                      //       products={counterContext.getBasket}
                      //       name={item.cyProductName}
                      //       smallImage={item.cyProductImgUrl}
                      //       totalPrice={item.totalPrice}
                      //       noOffPrice={item.unitPrice}
                      //       id={item.id}
                      //       cyProductID={item.cyProductID}
                      //       quantity={item.cyQuantity}
                      //       updateQuantity={updateQuantity}
                      //       remove={removeHan}
                      //     ></CartItem>        
                      //     </>
                      //   ))
                        }
    </tbody>
                    </table>

                    <button
                        type="button"
                        className={
                          flagUpdate
                            ? "btn btn-info"
                            : "tp-cart-update-btn-hide "
                        }
                        onClick={updateBasketHandler}
                      >
                        به روز رسانی سبد خرید
                      </button>
                </div>
            </div>
            <div className='col-4'></div>
        </div>
    </div>  )
}
