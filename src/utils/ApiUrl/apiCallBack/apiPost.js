import apiUrl from "../apiUrl";

const postApi=(url,obj,setFunc)=>{
    async function myAppGet() {
    const res = await fetch(
      `${apiUrl}${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    )
      .then((res) => {
        // console.log(res)
        return res.json();
      })
      .then((result) => {
        setFunc(result);
      }).catch(err=>console.log(err))
  }
  myAppGet();
}

export default postApi