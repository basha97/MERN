import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
    console.log('in create order function ', orderData)
    return fetch(`${API}/order/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
    }).then(res => {
        console.log('the response is ', res)
        return res.json();
    }).catch(
        err => console.log(err)
    )
}