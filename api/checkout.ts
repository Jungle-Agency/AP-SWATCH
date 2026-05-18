import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { products } from '../src/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

interface IncomingItem {
  id: string;
  quantity: number;
}

const SHIPPING_ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  'CH', 'FR', 'BE', 'LU', 'DE', 'IT', 'ES', 'PT', 'NL', 'AT', 'GB',
  'DK', 'SE', 'NO', 'FI', 'IE', 'PL', 'CZ', 'GR', 'US', 'CA',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, origin } = req.body as { items: IncomingItem[]; origin?: string };

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Panier vide.' });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) throw new Error(`Produit inconnu: ${cartItem.id}`);
      const qty = Math.max(1, Math.min(10, Math.floor(cartItem.quantity)));

      const imageUrl = origin && product.image.startsWith('/')
        ? `${origin}${product.image}`
        : undefined;

      return {
        quantity: qty,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.shortDesc,
            images: imageUrl ? [imageUrl] : undefined,
            metadata: { product_id: product.id },
          },
        },
      };
    });

    const base = origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      payment_method_types: ['card'],
      locale: 'fr',
      shipping_address_collection: {
        allowed_countries: SHIPPING_ALLOWED_COUNTRIES,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Suisse — La Poste 48h',
            fixed_amount: { amount: 900, currency: 'eur' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Union européenne',
            fixed_amount: { amount: 1500, currency: 'eur' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'International',
            fixed_amount: { amount: 2500, currency: 'eur' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 14 },
            },
          },
        },
      ],
      success_url: `${base}/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?status=cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[checkout] error', message);
    return res.status(500).json({ error: message });
  }
}
