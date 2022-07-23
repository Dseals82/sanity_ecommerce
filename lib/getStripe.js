import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = async () => {
    if(!stripePromise){
        return stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return await stripePromise
}

export default getStripe;