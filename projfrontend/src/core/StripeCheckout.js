import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';


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
        return products.reduce((cur,nxt) => cur + nxt.count * nxt,0);
        
    }

    return (
        <div>
            <h3 className="text-white">Srtipe Checkout Loaded {getFinalPrice()}</h3>
        </div>
    );
}

export default StripeCheckout;