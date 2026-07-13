const { default: apiUrl } = require("../ApiUrl/apiUrl")

const ApiPostX0 = (url, obj, funcA, funcB) => {
    async function myApp() {
        const res = await fetch(`${apiUrl}${url}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then(res => {
            if (res.ok) {
                return res.json().then(result => {
                    funcA(result.msg)
                })
            } else {
                return res.json().then(result => {
                    funcB(result.msg)
                })
            }
        }).catch(er => console.log(er))
    }

    myApp()
}



export default ApiPostX0