# Swap Geneva

Boutique en ligne — bracelets premium FKM pour AP × Swatch Royal Pop.

Stack : Vite + React + TypeScript + Tailwind v4. Paiement Stripe Checkout via fonction serverless Vercel.

## Développement local

```bash
npm install
cp .env.example .env.local
# Coller votre clé Stripe test (sk_test_...) dans .env.local
```

Pour faire fonctionner l'API de paiement en local, utilisez `vercel dev` (et non `npm run dev`), qui sert à la fois Vite et les fonctions `/api/*` :

```bash
npx vercel dev
```

> `npm run dev` lance uniquement le front Vite ; les appels à `/api/checkout` échoueront sans Vercel CLI.

## Variables d'environnement

| Variable | Où | Valeur |
|---|---|---|
| `STRIPE_SECRET_KEY` | `.env.local` (dev) **et** dashboard Vercel (prod) | Clé secrète Stripe — `sk_test_...` en test, `sk_live_...` en prod |

## Déploiement Vercel

1. Pousser le repo sur GitHub puis l'importer dans Vercel
2. Ajouter `STRIPE_SECRET_KEY` dans **Settings → Environment Variables**
3. Vercel détecte Vite automatiquement (build = `npm run build`, output = `dist`)
4. La fonction `/api/checkout.ts` est déployée comme serverless function

## Flux Stripe

- L'utilisateur clique « Procéder au paiement » → `POST /api/checkout`
- L'endpoint crée une `Stripe Checkout Session` avec les lignes du panier et trois zones de livraison (CH / UE / International)
- Le client est redirigé vers la page Stripe hébergée (CB, Apple/Google Pay)
- Au retour : `?status=success` ou `?status=cancel` — bannière affichée, panier vidé en cas de succès
- Les commandes apparaissent dans le **Dashboard Stripe** (Payments) avec adresse de livraison et e-mail client

## Mise en production

1. Passer Stripe en mode live, copier `sk_live_...` dans Vercel
2. Activer les notifications e-mail Stripe (Dashboard → Settings → Emails) pour recevoir un mail à chaque vente
3. Vérifier les méthodes de paiement actives (Dashboard → Settings → Payment methods)
