import apiUrl from "./apiUrl";


const apiCallProdDetails = (prodId,saveRes, isCalled)=>{
    async function myAppGet(){
        const res = await fetch(`${apiUrl}/api/CyProducts/${prodId}`,{
            method:'GET',
            headers: {
                accept: "text/plain",
              },
        }).then(res=>{
            return res.json()
        }).then(result=>{
            // console.log(result);
            saveRes(result)
            isCalled(true)
        }).catch(err=>console.log(err))
    }
    myAppGet()
}


export default apiCallProdDetails














// const apiCallProdDetails = (prodId,saveRes, isCalled)=>{
//     axios
//     .get(`${apiRootAddress}/api/CyProducts/${prodId}`, {
//       headers: {
//         accept: "text/plain",
//       },
//     })
//     .then((response) => {
//       saveRes(response.data)
//       isCalled(true)
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }


