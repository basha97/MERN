import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/OrderHelpler';
// createOrder

const StripeCheckout = (
    { 
        products, 
        setReload = f => f, 
        reload = undefined 
    }
) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
       let amount = 0;
       products.map(p=>{
           amount = amount + p.price;
       })    
       return amount;
    }

    const makePayment = (token) => {
        console.log(API);
        console.log('make payments console => ', products)
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }).then(res => {
            const {status} = res
            console.log("STATUS ",status)
            // cartEmpty();
        }).catch(err => console.log(err))
    }

    const showStripebutton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_51GssGoIu1LJnFN2NLpdkIiQHsY0j34pI8YSvQ6HUxOvt23wke95yanuxjp3LWPFA7JonjXcI65UoPvb6whCDjMLn0070f4MDsm"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy Tshirts"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    

    return (
        <div>
            <h3 className="text-white">Srtipe Checkout Loaded {getFinalPrice()}</h3>
            {showStripebutton()}
        </div>
    );
}

export default StripeCheckout;