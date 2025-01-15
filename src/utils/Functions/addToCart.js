'use client'
import Swal from 'sweetalert2'

const addToCart = (val, quantity, setFun) => {
  const cartKey = 'cartObj';
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // بررسی اینکه آیا محصول از قبل در سبد خرید موجود است
  const existingItemIndex = cart.findIndex(item => item.value === val);

  if (existingItemIndex !== -1) {
    // اگر محصول موجود بود، تعداد آن را افزایش دهید
    cart[existingItemIndex].quan += quantity;
    Swal.fire({
      position: "center",
      icon: "info",
      title: "تعداد کالا به‌روز شد",
      showConfirmButton: false,
      timer: 700,
    });
  } else {
    // اگر محصول موجود نبود، آن را اضافه کنید
    const newItem = { value: val, quan: quantity };
    cart.push(newItem);
    setFun(prev => prev + 1);
    Swal.fire({
      position: "center",
      icon: "success",
       title: " این کالا در سبد شما موجود است",
      // title: "به سبد خرید اضافه شد",
      showConfirmButton: false,
      timer: 700,
    });
  }

  // ذخیره‌ی سبد خرید به‌روزرسانی شده در localStorage
  localStorage.setItem(cartKey, JSON.stringify(cart));
};

export default addToCart;















// 'use client'
// import Swal from 'sweetalert2'

// const addToCart = (val, quantity, setFun) => {
//   const cartItemKey = `cartObj${val}`;
//   let cartItem = JSON.parse(localStorage.getItem(cartItemKey)) ;

//   if (cartItem) {
//     // If item already exists, update the quantity
//     // cartItem = JSON.parse(cartItem);
//     // cartItem.quan += quantity;
//     Swal.fire({
//             position: "center",
//             icon: "info",
//             title: " این کالا در سبد شما موجود است",
//             showConfirmButton: false,
//             timer: 700,
//           })
//   } else {
//     // If item does not exist, create a new item
//     cartItem = { value: val, quan: quantity };
//     setFun(prev => prev + 1);
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "به سبد خرید اضافه شد",
//       showConfirmButton: false,
//       timer: 700,
//     });
//   }

//   localStorage.setItem(cartItemKey, JSON.stringify(cartItem));

 
// };

// export default addToCart; 