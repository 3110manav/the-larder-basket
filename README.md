# Larder – basket & offers

A small grocery storefront that builds a bill as you shop: a subtotal, every special offer that
applies with its saving, and the final total.

Built with **React 19**, **Redux Toolkit**, **TypeScript** and **Tailwind CSS v4**. No UI or
component libraries are used. Orders can be saved to **Firestore**.

## Products & offers

| Product | Price |
| ------- | ----- |
| Bread   | £1.10 |
| Milk    | £0.50 |
| Cheese  | £0.90 |
| Soup    | £0.60 |
| Butter  | £1.20 |

- **Cheese** – buy one, get a second free
- **Soup** – each soup gets you one half-price bread
- **Butter** – a third off

## Getting started

```bash
npm install
npm run dev
```

| Script               | What it does                     |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start the Vite dev server        |
| `npm run build`      | Type-check and build to `dist/`  |
| `npm test`           | Run the unit and component tests |
| `npm run test:watch` | Tests in watch mode              |
| `npm run lint`       | Lint with oxlint                 |
| `npm run format`     | Format with Prettier             |

## Project structure

```
src/
├── app/                     # Store setup and typed hooks
├── components/
│   ├── layout/              # Header, hero
│   └── ui/                  # Reusable primitives: Button, QuantityStepper, Modal, Price…
├── features/
│   ├── products/            # Catalog data, product grid & cards
│   ├── offers/              # Offer definitions and the pricing rules engine
│   ├── basket/              # Basket slice, bill calculation, selectors, basket UI
│   └── orders/              # Checkout thunk, order repositories (Firestore / local), confirmation
├── hooks/                   # Generic hooks (escape key, scroll lock, in-view)
├── lib/                     # Money helpers, storage, Firebase client
└── test/                    # Test setup and helpers
```

Code is grouped by feature, with tests living next to the code they cover.

## How pricing works

- All money is stored as **integer pence**, so there are no floating point surprises.
- Offers are plain data (`features/offers/offers.ts`) described by a small discriminated union:
  `multiBuy`, `linkedDiscount` and `percentageOff`. Adding a new "buy 3 for 2" or "20% off milk"
  is a one-line config change – no new code.
- `applyOffers` works out the saving for each offer and credits it to the product it discounts.
- `calculateBill` turns the basket into lines (subtotal, savings, item cost) plus overall totals.
  It's a pure function, exposed to components through a memoised `selectBill` selector.

## State

| Slice    | Holds                                                      |
| -------- | ---------------------------------------------------------- |
| `basket` | The items and quantities in the basket, in the order added |
| `orders` | Checkout status, the last placed order and any error       |

The bill is always **derived** from the basket and never stored. The basket is persisted to
`localStorage` with listener middleware, so a refresh doesn't lose your shopping.

Checkout is a `createAsyncThunk` that receives its `OrderRepository` through the thunk's
`extraArgument`. That keeps Firebase out of the Redux code and lets tests swap in a fake.

## Firestore (optional)

Without configuration the app runs in demo mode and keeps orders in `localStorage`.
To save orders to Firestore:

1. Create a Firebase project and enable **Cloud Firestore**.
2. Copy `.env.example` to `.env.local` and fill in your web app config.
3. Deploy the security rules: `npx firebase-tools deploy --only firestore:rules`

The rules in `firestore.rules` let anyone **create** a well-formed order but never read, change or
delete one. The Firebase SDK is code-split and only loaded at checkout.

## Deployment

**Firebase Hosting**

```bash
npx firebase-tools login
npx firebase-tools use --add          # pick your project
npm run build
npx firebase-tools deploy --only hosting
```

**Netlify** – `netlify.toml` is included. Connect the repo in Netlify (or run
`npx netlify-cli deploy --prod`) and add the `VITE_FIREBASE_*` variables in the site settings
if you want Firestore enabled.

## Testing

Vitest with React Testing Library covers:

- the offer rules and bill calculation, including the sample basket from the brief
  (soup, 3 × bread, butter → £5.10 − £0.95 = **£4.15**)
- basket reducers, persistence and the checkout thunk
- the product card, the basket panel and a full add-to-basket → checkout flow
