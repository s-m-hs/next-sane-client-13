import apiUrl from "../ApiUrl/apiUrl";

const ApiPostX2 = (url, headerAuth, obj, func, navigation) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      headers: {
        Authorization: headerAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        // console.log(res)
        if (res.ok) {
          return res.json().then((result) => {
            // console.log(result);
            if (result) {
              func(result);
            }
          });
        }
      })
      .catch((err) => navigation("/errorpage"));
  }
  myAppPost();
};
export default ApiPostX2;
