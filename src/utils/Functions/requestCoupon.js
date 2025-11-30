import apiUrl from "../ApiUrl/apiUrl";

const requestCoupon = (couItemId, state, func1, func2) => {
  async function myApp() {
    const res = await fetch(
      `${apiUrl}/api/CyCoupon/requestCoupon?CoupItemId=${couItemId}&state=${state}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      if (res.ok) {
        func1();
      } else {
        func2();
      }
    });
  }
  myApp();
};

export default requestCoupon;
