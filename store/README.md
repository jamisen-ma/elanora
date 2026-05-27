# Elanora — Jewelry E-Commerce Store

A premium, responsive jewelry storefront built with Next.js 16, React, Tailwind CSS, and Stripe Checkout.

## Quick Start

```bash
cd store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
store/
├── public/
│   └── images/
│       ├── logo/                          # Brand logo
│       └── products/                      # Product images
│           ├── cross-border-jewelry/      # Product 1 images
│           ├── diamond-ring/              # Product 2 images
│           ├── gold-coin-necklace/        # Product 3 images
│           └── palm-tree-necklace/        # Product 4 images
├── src/
│   ├── app/
│   │   ├── api/checkout/route.ts          # Stripe Checkout API
│   │   ├── checkout/page.tsx              # Checkout page
│   │   ├── product/[slug]/page.tsx        # Product detail pages
│   │   ├── shop/page.tsx                  # Shop listing page
│   │   ├── layout.tsx                     # Root layout
│   │   ├── page.tsx                       # Homepage
│   │   └── globals.css                    # Global styles
│   ├── components/
│   │   ├── AddToCartButton.tsx            # Add to cart with quantity
│   │   ├── CartDrawer.tsx                 # Slide-out cart
│   │   ├── Footer.tsx                     # Site footer
│   │   ├── Header.tsx                     # Navigation header
│   │   ├── ImageGallery.tsx               # Product image gallery
│   │   ├── NewsletterForm.tsx             # Email signup form
│   │   └── ProductCard.tsx                # Product grid card
│   ├── context/
│   │   └── CartContext.tsx                # Cart state management
│   └── data/
│       └── products.ts                    # Product catalog data
└── .env.local.example                     # Environment template
```

## Adding New Products

1. **Add product images:**
   Create a folder in `public/images/products/<your-product-slug>/` and add numbered images (`1.jpg`, `2.jpg`, etc.)

2. **Update product data:**
   Open `src/data/products.ts` and add a new entry to the `products` array:
   ```ts
   {
     id: "5",
     slug: "your-product-slug",
     name: "Your Product Name",
     price: 5999,                    // Price in cents ($59.99)
     description: "Product description here.",
     details: ["Detail 1", "Detail 2"],
     category: "Necklaces",
     imageFolder: "your-product-slug",
     images: [
       "/images/products/your-product-slug/1.jpg",
       "/images/products/your-product-slug/2.jpg",
     ],
     featured: true,                 // Show on homepage
     stripePriceId: "price_xxx",     // Your Stripe Price ID
   }
   ```

3. That's it — the shop, product pages, and cart will automatically pick up the new product.

## Stripe Checkout Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Create products and prices in the [Stripe Dashboard](https://dashboard.stripe.com/products)
3. Copy your API keys from [Stripe API Keys](https://dashboard.stripe.com/apikeys)
4. Create `.env.local` from the example:
   ```bash
   cp .env.local.example .env.local
   ```
5. Fill in your keys:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
6. Update each product's `stripePriceId` in `src/data/products.ts` with the Price IDs from your Stripe Dashboard

## Features

- Responsive design (mobile, tablet, desktop)
- Product image gallery with thumbnails and navigation
- Slide-out cart drawer with quantity management
- Persistent cart (localStorage)
- Stripe Checkout integration
- SEO metadata per page
- Elegant typography and hover transitions
- Trust badges and shipping info
- Mobile hamburger navigation
- "You may also like" related products

## Customization

- **Brand info:** Update footer text in `src/components/Footer.tsx`
- **Social links:** Replace `#` hrefs in `src/components/Footer.tsx`
- **Colors:** Edit CSS variables in `src/app/globals.css`
- **Logo:** Replace `public/images/logo/elanora-logo.png`
- **Shipping countries:** Edit `allowed_countries` in `src/app/api/checkout/route.ts`

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling
- [Stripe](https://stripe.com/) — Payment processing
- TypeScript — Type safety
