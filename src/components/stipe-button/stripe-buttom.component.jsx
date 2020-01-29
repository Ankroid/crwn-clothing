import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price *100;
    const publishableKey = 'pk_test_v37XUbMyHZYDRLyB6yMdYN6500ONhaJPkZ';

    const onToken = token=>{
        console.log(token);
        alert('Payment Successfull')
    }
    
    return(
       <StripeCheckout 
       label="Pay Now"
       billingAddress
       shippingAddress
       name="CRWN Clothing LTD"
       image='https://svgshare.com/i/CUz.svg'
       description={`Your Total is ${price}`}
       amount={priceForStripe}
       stripeKey = {publishableKey}
       panelLabel="Pay Now"
       token={onToken}
       //token={onToken}
       />
    )
}

export default StripeCheckoutButton;

