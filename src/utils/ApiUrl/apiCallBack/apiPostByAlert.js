"use client";
import apiUrl from "../apiUrl";

const postApiByAlert = (url, obj, alert, alertB) => {
  async function myAppGet() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok && res.status != 400) {
          return res.json().then((result) => {
            //     localStorage.setItem('loginToken',result.token)
            // localStorage.setItem('user',obj.name)
            alert();
          });
        } else if (res.status == 400) {
          return res.json().then((result) => {
            alertB(result.response);
          });
        }
      })
      .catch((err) => {
        console.log(err.code);
        // console.log(err.status.code)
      });
  }
  myAppGet();
};

export default postApiByAlert;
