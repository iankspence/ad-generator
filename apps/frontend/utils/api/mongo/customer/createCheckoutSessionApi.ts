import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { API_URL } from '../../apiUrl';
import { CreateCheckoutSessionDto } from '@monorepo/type';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const createCheckoutSession = async (createCheckoutSessionDto: CreateCheckoutSessionDto) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_URL}/customer/create-checkout-session`,
            data: createCheckoutSessionDto,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { id } = response.data;

        const stripe = await stripePromise;

        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
            sessionId: id,
        });

        if (result.error) {
            // If redirectToCheckout fails due to a browser or network
            // error, display the localized error message to your customer.
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};

export default createCheckoutSession;
