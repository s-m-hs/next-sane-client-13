import apiUrl from "../ApiUrl/apiUrl";

const LogOut = (url, func) => {
  async function myAppGet() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: headerAuth,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json().then((result) => func());
        }
      })
      .catch((error) => console.log(error));
  }
  myAppGet();
};

export default LogOut;
