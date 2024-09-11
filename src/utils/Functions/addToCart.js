'use client'
import Swal from 'sweetalert2'

const addToCart = (val, quantity, setFun) => {
  const cartItemKey = `cartObj${val}`;
  let cartItem = JSON.parse(localStorage.getItem(cartItemKey)) ;

  if (cartItem) {
    // If item already exists, update the quantity
    // cartItem = JSON.parse(cartItem);
    // cartItem.quan += quantity;
    Swal.fire({
            position: "center",
            icon: "info",
            title: " این کالا در سبد شما موجود است",
            showConfirmButton: false,
            timer: 700,
          })
  } else {
    // If item does not exist, create a new item
    cartItem = { value: val, quan: quantity };
    setFun(prev => prev + 1);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "به سبد خرید اضافه شد",
      showConfirmButton: false,
      timer: 700,
    });
  }

  localStorage.setItem(cartItemKey, JSON.stringify(cartItem));

 
};

export default addToCart; 