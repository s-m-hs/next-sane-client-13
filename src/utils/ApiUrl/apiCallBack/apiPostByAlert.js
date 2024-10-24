'use client'
import apiUrl from "../apiUrl";

const postApiByAlert=(url,obj,alert,alertB)=>{
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
        if(res.ok && res.status!=400){
     return res.json();
        } else if (res.status==400) {
          // return res.json()
            alertB()
        }
      }).then(result=>{
        // console.log(result.msg)
        if(result){
            localStorage.setItem('loginToken',result.token)
        localStorage.setItem('user',obj.name)
        alert();
        }
      }).catch(err=>{
        console.log(err.code)
        // console.log(err.status.code)
      } )
  }
  myAppGet();
}

export default postApiByAlert