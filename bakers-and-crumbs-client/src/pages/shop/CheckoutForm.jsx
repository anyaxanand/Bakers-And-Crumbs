import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { FaPaypal } from "react-icons/fa";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';  

const CheckoutForm = ({price, cart}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() =>{
      if(typeof price !== "number" || price < 1) {
        console.log("Price is not a number or less than 1");
        return;
      }
      axiosSecure.post('/create-payment-intent', {price})
      .then( res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        //create card element
        const card = elements.getElement(CardElement);

        if (card == null) {
        return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('[error]', error);
            setCardError(error.message)
          } else {
            setCardError("success!")
            //console.log('[PaymentMethod]', paymentMethod);
          }

          const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.displayName || 'anonymous',
                  email: user?.email || 'unknown' 
                },
              },
            },
          );
          if(confirmError){
            console.log(confirmError)
          }
          console.log(paymentIntent)
          if(paymentIntent.status === "succeeded"){
            console.log(paymentIntent.id)
            setCardError(`Your transaction is ${paymentIntent.id}`)
            // payment info data
            const paymentInfo = {
              email: user.email,
              transitionId:  paymentIntent.id,
              price,
              quantity: cart.length,
              status: "order pending",
              itemName: cart.map(item => item.name),
              cartItems: cart.map(item => item.id),
              menuItems: cart.map(item => item.menuItemId)
            }
            console.log(menuItemId)
            //send information to backend
            
          }
    };
  return (
    <div className='flex flex-col sm:flex-row justify-start items-start gap-8'>
      {/* left side */}
      <div className='md:w-1/2 w-full space-y-3'>
        <h4 className='text-lg font-semibold'>Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of items: {cart.length}</p>
      </div>
      {/* right side */}
      <div className='md:w-1/3 w-full space-y-5 card bg-base-100 max-w-sm shrink-0 shadow-2xl px-4 py-8 bg-white'>
      <h4 className='text-lg font-semibold'>Process your Payment!</h4>
      <h5 className='font-medium'>Credit/Debit Card</h5>
      {/* stripe form */}
      <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 btn-primary w-full bg-pink border-pink text-white'>
        Pay
      </button>
    </form>
    {
        cardError ? <p className='text-red italic text-xs'>{cardError}</p> : ""
    }
    {/* paypal */}
    <div className='mt-5 text-center'>
        <hr/>
        <button type="submit" className='btn btn-sm mt-5 bg-pink border-pink text-white'>
        <FaPaypal />Pay with PayPal
        </button>
    </div>
      </div>
    </div>
  );
};

export default CheckoutForm
