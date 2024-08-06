import apiUrl from "./apiUrl"

const updateBasket=(header,obj,setFun,alert)=>{
    async function myAppput(){
      const res=fetch(`${apiUrl}/api/CyOrders/UpdateBasket`,{
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${header}`
    },
    body:JSON.stringify(obj)
      }).then(res=>{
        console.log(res)
        if(res.ok){
           setFun(prev=>!prev)
        alert()
        }
      }).catch(err=>console.log(err))
    }
    myAppput()
  
  }
  export default updateBasket