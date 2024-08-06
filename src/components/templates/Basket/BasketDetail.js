import style from './BasketDetail.module.css'
import { MainContext } from '@/context/MainContext';
import apiCallProdDetails from '@/utils/ApiUrl/apiCallProDetails';
import React, { useContext, useEffect, useState } from 'react';
import CartItem from './CartItem/CartItem';
import { ToastContainer, Zoom, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import { DotLoader } from 'react-spinners';
import RemoveApi from '@/utils/ApiUrl/apiCallBack/apiRemove';
import { getLocalStorage } from '@/utils/localStorag/localStorage';
import alertN from '@/utils/Alert/AlertA';


export default function BasketDetail() {
  let { setXtFlagSpinnerShow, xtFlagLogin, localUpdateBasket, setLocalUpdateBasket,setCartCounter,getBasket,setBasketFlag } = useContext(MainContext);
  const [toBuy, setToBuy] = useState([]);
  const [isApiCalled, setIsApiCalled] = useState(false);
  const [basket, setBasket] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [basket2, setBasket2] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const rout=useRouter()

  const AlertA=()=>alertN('center','info',"حذف با موفقیت انجام شد...",1000).then((res) => setBasketFlag((prev) => !prev));
  const removeHan = (id) => {
    RemoveApi(
      "api/CyOrders/deleteItem",
      id,
      getLocalStorage,
      AlertA
    );

  }; 

  const removeFromCart = (id) => {
    setCartCounter((prevCounter) => prevCounter - 1);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      console.log(id)
      const toRemoveId = JSON.parse(localStorage.getItem(key)) 
      console.log(toRemoveId)
      if (key.startsWith("cartObj") && toRemoveId.value == id) {
        removeItem(id);
        localStorage.removeItem(key);
      }
    }
  };

const paymentHandler=()=>{
  if(!xtFlagLogin){

const alertN = (position,icon,title,timer) =>
    Swal.fire({
      position:'center' ,
      icon:'info' ,
      title:'لطفا ابتدا ثبت نام کنید...' ,
      showConfirmButton: true,
      confirmButtonText:'تایید'    }).then(res=>{
      rout.push('/register')
    })
    alertN()
  }
}


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

      // افزودن آیتم‌های قبلی
      localUpdateBasket.forEach((item) => {
        uniqueItemsMap.set(item.value.value, item);
      });

      // افزودن آیتم‌های جدید
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
      notify();
    }
  };

  const updateQuantity = (id, newQuantity) => {
    let basketArray = [];
    basket.forEach((item) => {
      if (item.cyProductID !== id) {
        basketArray.push(item);
      }
    });
    basketArray.push({ cyProductID: id, quantity: newQuantity });
    setBasket(basketArray);
    setFlagUpdate(true);
  };

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
    const cyProductIDs = basket.map((item) => item.cyProductID);
    const uniqueArray = cartItem.filter(
      (item) => !cyProductIDs.includes(item.value.value)
    );
    setBasket2(uniqueArray);
  }, [basket]);

  useEffect(() => {
    loadCartItem();
  }, []);

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
  console.log(getBasket); 

  return (
    <div className='container'>



      <div className='row'>
        <div className='col-8'>
          <div>
            <button onClick={() => {
              setCartCounter(0)
              localStorage.clear(); setToBuy([]); setBasket([]);setLocalUpdateBasket([]) }}>clear</button>
            <table className='table table-hover'>
              <thead>
                <tr key="">
                  <th>تصویر کالا</th>
                  <th>عنوان کالا</th>
                  <th>قیمت</th>
                  <th>تعداد</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {!xtFlagLogin &&
                
                toBuy.length == 0 ? <div className={`row ${style.spinner_row}`}>

                <div className="col">
                <DotLoader
                color="rgba(25, 167, 175)"
                size={250}
                />
                </div>
                </div> :
                
                toBuy.length !== 0 ? toBuy.map((item) => (
                  <CartItem
                    key={item.id}
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
                    handleRemove={removeFromCart}

                  />
                ))   :
                getBasket != null &&
                // flagB &&
               getBasket.map((item) => (
                  <>
                    <CartItem
                    products={getBasket}
                    name={item.cyProductID}
                    // name={item.cyProductName}
                    smallImage={item.cyProductImgUrl}
                    totalPrice={item.totalPrice}
                    noOffPrice={item.unitPrice}
                    id={item.id}
                    cyProductID={item.cyProductID}
                    quantity={item.cyQuantity}
                    updateQuantity={updateQuantity}
                    remove={removeHan}
                    // handleRemove={removeFromCart}
                  />
          
                  </>
                
                ))
              
              
              
              }
              </tbody>
            </table>
        
          </div>
        </div>
        <div className= {`col-4 centerc ${style.col_4}`} >

          <div>
            <div className='centerc' style={{alignItems:'center'}}>  
                <button
              type="button"
              className={flagUpdate ?   `${style.btn} btn btn-info` :  `${style.btn_hide}` }
              onClick={updateBasketHandler}
            >
              به روز رسانی سبد خرید
            </button>
            </div>
            <div>
            <div  className='centerc' style={{alignItems:'center'}}>  
                <button
              type="button"
              className={flagUpdate ?  `${style.btn_hide}`  :  `${style.btn} btn btn-info` }
              onClick={paymentHandler}
            >
                رفتن به پرداخت 
            </button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
