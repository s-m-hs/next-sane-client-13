const { default: apiUrl } = require("../ApiUrl/apiUrl")

const ApiPostX1 = (url, obj, func) => {
    async function myApp() {
        const res = await fetch(`${apiUrl}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        }).then(res => {
            if (res.ok) {
                return res.json().then(result => {
                    func(result)
                })
            }
        }).catch(er => console.log(er))
    }

    myApp()
}



export default ApiPostX1