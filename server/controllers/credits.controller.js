
import Stripe from 'stripe';
import UserModel from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 300
}

export async function creditCreditsOrder(req, res) {
    try {
        const userId = req.userid;
        const { amount } = req.body;

        if (!CREDIT_MAP[amount]) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits Pack`
                        },
                        unit_amount: amount * 100
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId,
                credits: CREDIT_MAP[amount]
            }
        })

        return res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Failed to create payment session' });
    }

}

export async function stripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const creditsToAdd = parseInt(session.metadata.credits, 10);

        if (!userId || !creditsToAdd) {
            console.error('Missing userId or credits in session metadata');
            return res.status(400).send('Invalid session metadata');
        }

        const user = await UserModel.findByIdAndUpdate(userId, {
            $inc: { credits: creditsToAdd },
            $set: { isCreditAvailable: true }
        }, { new: true });

        if (!user) {
            console.error('User not found for ID:', userId);
            return res.status(404).send('User not found');
        }

        console.log(`Added ${creditsToAdd} credits to user ${userId}. New balance: ${user.credits}`);
        return res.status(200).json({ received: true });
    }
}
