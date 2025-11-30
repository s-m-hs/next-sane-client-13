import apiUrl from "../ApiUrl/apiUrl"

const requstedCouponSetToFalse = () => {
    async function myApp() {
        const res = await fetch(`${apiUrl}/api/CyCoupon/requsetCuoponSetToFalse`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${getLocalStorage}`,
            },
        })
    }
    myApp()
}

export default requstedCouponSetToFalse