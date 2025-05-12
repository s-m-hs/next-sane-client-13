import apiUrl from "../ApiUrl/apiUrl";

const ApiPostX3 = (url, func) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json().then((result) => {
            // console.log(result);
            if (result) {
              func(result);
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPostX3;
