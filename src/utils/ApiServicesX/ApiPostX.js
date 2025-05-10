import apiUrl from "../ApiUrl/apiUrl";
import Swal from "sweetalert2";

const ApiPostX = (url, obj, func) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        // console.log(res)
        if (res.ok) {
          return res.json().then((result) => {
            func();
          });
        } else {
          return res.json().then((result) => {
            if (result.response) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: result.response,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPostX;
