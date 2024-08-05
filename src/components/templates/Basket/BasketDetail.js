import { MainContext } from '@/context/MainContext'
import apiCallProdDetails from '@/utils/ApiUrl/apiCallProDetails';
import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem/CartItem';
import { ToastContainer, Zoom, toast } from "react-toastify";


export default function BasketDetail() {
  let { setXtFlagSpinnerShow, xtFlagLogin, localUpdateBasket, setLocalUpdateBasket } = useContext(MainContext);
  const [toBuy, setToBuy] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [basket, setBasket] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [basket2, setBasket2] = useState([]);
  const [cartItem, setCartItem] = useState([]);

  const notify = () => toast("به روزرسانی انجام شد");

  const addItem = (item) => {
    setToBuy((prevToBuy) => {
      const itemExists = prevToBuy.some((existingItem) => existingItem.id === item.id);
      if (!itemExists) {
        return [...prevToBuy, item];
      }
      return prevToBuy;
    });
  };

  const removeItem = (id) => {
    setToBuy((prevToBuy) => prevToBuy.filter((item) => item.id !== id));
  };

  const updateBasketHandler = () => {
    if (xtFlagLogin) {
      // updateBasket(getLocalStorage, basket, setBasketFlag);
      // setFlagUpdate(false);
    } else {
      let uniqueItemsMap = new Map();

      basket.forEach((item) => {
        let newKey = `cartObj${item.cyProductID}`;
        let newValue = {
          value: item.cyProductID,
          quan: item.quantity.toString(),
        };
      
        uniqueItemsMap.set(item.cyProductID, {
          key: newKey,
          value: newValue,
        });
      });
      
      let uniqueItemsArray = Array.from(uniqueItemsMap.values());
      
      setBasket2(uniqueItemsArray);
      setLocalUpdateBasket(uniqueItemsArray);
      
      uniqueItemsArray.forEach((item) => {
        localStorage.setItem(item.key, JSON.stringify(item.value));
      });
      setFlagUpdate(false);
    }
    // notify();
  };
  console.log(localUpdateBasket)
  const updateQuantity = (id, newQuantity) => {
    let basketArray = [];
    let filterBasket = basket.filter((item) => {
      item.cyProductID !== id && basketArray.push(item);
    });
    basketArray.push({ cyProductID: id, quantity: newQuantity });
    setBasket(basketArray);
    setFlagUpdate(true);
  };

  /////////////////////////
  const loadCartItem = () => {
    const item = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cartObj")) {
        item.push({ key, value: JSON.parse(localStorage.getItem(key)) });
      }
    }
    setCartItem(item);
  };

  useEffect(() => {
    loadCartItem();
  }, []);
////////////////////////////
  useEffect(() => {
    const processedKeys = new Set();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key.startsWith("cartObj") && !processedKeys.has(key)) {
        processedKeys.add(key);
        const value = localStorage.getItem(key);
        const parsedValue = JSON.parse(value);
        apiCallProdDetails(parsedValue.value, addItem, setIsApiCalled);
      }
    }
  }, []);

  useEffect(() => {
    setXtFlagSpinnerShow(false);
  }, []);

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
                {!xtFlagLogin && toBuy.length !== 0 && toBuy.map((item) => (
                  <CartItem
                    key={item.id} // Added a key prop to avoid React warnings
                    name={item["name"]}
                    smallImage={item["smallImage"]}
                    price={item["price"]}
                    noOffPrice={item["noOffPrice"]}
                    id={item["id"]}
                    cyProductID={item.id}
                    quantity={
                      localUpdateBasket?.length === 0
                        ? 1
                        : localUpdateBasket.filter(
                          (filter) => filter.value.value === item.id
                        )[0]?.value.quan || 1
                    }
                    updateQuantity={updateQuantity}
                    // handleRemove={removeFromCart}
                  />
                ))}
              </tbody>
            </table>

            <button
              type="button"
              className={flagUpdate ? "btn btn-info" : "tp-cart-update-btn-hide"}
              onClick={updateBasketHandler}
            >
              به روز رسانی سبد خرید
            </button>
          </div>
        </div>
        <div className='col-4'></div>
      </div>
    </div>
  )
}
