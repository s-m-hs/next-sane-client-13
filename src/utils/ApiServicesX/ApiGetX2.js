import apiUrl from "../ApiUrl/apiUrl";

const ApiGetX2 = (url, func) => {
  async function myAppGet() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: headerAuth,
      },
    })
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json().then((result) => func(result));
        }
      })
      .catch((error) => console.log(error));
  }
  myAppGet();
};

export default ApiGetX2;
