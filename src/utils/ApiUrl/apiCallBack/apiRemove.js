import apiUrl from "../apiUrl"

const RemoveApi=(url,id,header,setFun)=>{
    async function myAppRem(){
        const res=await fetch(`${apiUrl}/${url}/${id}`,{
          method:'DELETE',
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${header}`
          },
        }).then(res=>{
          if(res.ok){
        setFun(prev=>!prev)
        }
        }).catch(err=>console.log(err))
          }
          myAppRem()
}


export default RemoveApi