import apiUrl from "../ApiUrl/apiUrl";

const ApiPutX = (url, putId, obj, func) => {
  async function myAppPut() {
    const res = await fetch(`${apiUrl}${url}/${putId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          func();
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPut();
};
export default ApiPutX;
