import apiUrl from "./apiUrl"

const addToBasket=(header,obj,setFun,alert)=>{
    async function myAppput(){
      const res=fetch(`${apiUrl}/api/CyOrders/addToBasket`,{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${header}`
    },
    body:JSON.stringify(obj)
      }).then(res=>{
        console.log(res)
        if(res.status==200){
           setFun(prev=>!prev)
        alert()
        }
      }).catch(err=>console.log(err))
    }
    myAppput()
  
  }
  export default addToBasket