import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res) {

  if (req.method === 'POST') {
      console.log(req.body.cartItems)
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection:'auto',
            shipping_options: [
                { shipping_rate: 'shr_1LOVURLOcM5GSSjK2QtQ29S9'},
                { shipping_rate: 'shr_1LO177LOcM5GSSjKjggVbA8e'},
            ],
            line_items: req.body.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
                const newPrice = Math.round(item.price * 100) 
      
                return {
                  price_data: { 
                    currency: 'usd',
                    product_data: { 
                      name: item.name,
                      images: [newImage],
                    },
                    unit_amount: newPrice,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  },
                  quantity: item.qty
                }
              }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
      //res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

