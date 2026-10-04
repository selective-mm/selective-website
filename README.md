# Selective V1

A lightweight, static product-information website for Selective.

## Files

- `index.html` — website structure
- `styles.css` — complete responsive design
- `script.js` — product data + product modal + navigation

## Run locally

No installation is required.

1. Keep all three files in the same folder.
2. Double-click `index.html`.
3. The website will open in your browser.

## Change product information

Open `script.js`.

Find:

const PRODUCTS = [...]

Change:

- `name`
- `price`
- `stock`
- `description`
- `symbol`
- `features`
- `orderUrl`

### Stock values

Use exactly one of:

- `available`
- `limited`
- `out_of_stock`

### Example

{
  id: "capcut-pro-1-month",
  name: "CapCut Pro — 1 Month",
  price: 25000,
  stock: "available",
  description: "Professional video editing tools for creators and editors.",
  symbol: "C",
  features: [
    "Premium editing tools",
    "Advanced effects"
  ],
  orderUrl: "https://your-order-platform.com"
}

## Important

This V1 intentionally has:

- No database
- No backend
- No customer login
- No checkout
- No payment gateway
- No shopping cart
- No order database

The "Order Now" button sends customers to the external ordering platform.

## Next upgrade

When Selective is ready, this same design can be upgraded to:

- Supabase database
- Admin login
- Admin product management
- Price management
- Stock management
- Image uploads
- CMS/settings
