import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { products } from './_products.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface IncomingItem {
  id: string;
  quantity: number;
}

type SupportedCurrency = 'eur' | 'chf';
const ALLOWED_CURRENCIES: SupportedCurrency[] = ['eur', 'chf'];

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
    const { items, origin, currency: rawCurrency } = req.body as {
      items: IncomingItem[];
      origin?: string;
      currency?: string;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Panier vide.' });
    }

    const currency: SupportedCurrency = ALLOWED_CURRENCIES.includes(
      (rawCurrency || '').toLowerCase() as SupportedCurrency,
    )
      ? ((rawCurrency || '').toLowerCase() as SupportedCurrency)
      : 'eur';

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
          currency,
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: `${product.name} — Précommande`,
            description: `${product.shortDesc} Livraison prévue le 10 juin 2026.`,
            images: imageUrl ? [imageUrl] : undefined,
            metadata: { product_id: product.id, preorder: 'true' },
          },
        },
      };
    });

    const base = origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      locale: 'fr',
      shipping_address_collection: {
        allowed_countries: SHIPPING_ALLOWED_COUNTRIES,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Précommande — Suisse — Expédition le 10 juin 2026 (Offerte)',
            fixed_amount: { amount: 0, currency },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Précommande — Union européenne — Expédition le 10 juin 2026 (Offerte)',
            fixed_amount: { amount: 0, currency },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Précommande — International — Expédition le 10 juin 2026',
            fixed_amount: { amount: 2500, currency },
          },
        },
      ],
      success_url: `${base}/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/?status=cancel`,
      metadata: { type: 'preorder', shipping_date: '2026-06-10' },
      payment_intent_data: {
        description: 'Précommande Swap Geneva — Livraison le 10 juin 2026',
        metadata: { shipping_date: '2026-06-10' },
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[checkout] error', message);
    return res.status(500).json({ error: message });
  }
}
