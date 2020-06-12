import React, {useState, useEffect} from 'react'
import { loadCart, cartEmpty } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import { getMeToken, processPayment } from './helper/paymentbHelper';
import { createOrder } from './helper/OrderHelpler';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const Paymentb = ({products, setReload = f => f, reload = undefined}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken  = (userId, token) => {
        getMeToken(userId, token).then(info => {
            console.log("information ",info);
            if(info.error){
                setInfo({...info, error: info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        }).catch(err => console.log(err))
    }

    const onPurchase = () => {
        setInfo({loading:true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data =>{
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            }
            processPayment(userId, token, paymentData)
            .then(res => {
                setInfo({...info, success: res.success, loading: false})
                console.log('payment sucess');
                console.log(res);                                                                                                                                   

                const orderData = {
                    products: products,
                    trasanction_id: res.transaction.id,
                    amount: res.transaction.amount
                };

                console.log(orderData);

                

                cartEmpty(() => {
                    console.log('cart empty')
                });

                createOrder(userId, token, orderData);

                setReload(!reload);
            })
            .catch(err => {
                setInfo({loading: false, success:false})
            })
        })
    }

    const getAmount = () => {
        let amount = 0;
        products.map(p=>{
            amount = amount + p.price;
        })
        return amount
    }

    const showdroIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                    </div>
                ) : (
                    <h3>Please Login or add something to cart</h3>
                )} 
            </div>
        )
    }

    useEffect(() => {
       getToken(userId, token)
    }, [])

    return (
        <div>
            <h3>Your Bill is {getAmount()}</h3>
            {showdroIn()}
        </div>
    )
}

export default Paymentb; 
