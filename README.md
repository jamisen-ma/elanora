# Elanora — Fine Jewelry Store

A premium, responsive online jewelry storefront built with Next.js, React, Tailwind CSS, and Stripe Checkout.

## Quick Start

```bash
cd elanora-store
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
elanora-store/
  public/products/          # Product images organized by slug
    luxury-heart-diamond-adjustable-ring/
    18k-gold-plated-coconut-tree-necklace/
  src/
    app/
      page.tsx               # Homepage (hero, featured products, brand story)
      layout.tsx             # Root layout with header/footer
      products/
        page.tsx             # Product listing page
        [slug]/
          page.tsx           # Product detail (server component)
          ProductDetailClient.tsx  # Gallery, add to cart (client component)
      cart/
        page.tsx             # Shopping cart with order summary
      api/checkout/
        route.ts             # Stripe Checkout session API
    components/
      Header.tsx             # Sticky nav with cart badge
      Footer.tsx             # Brand info, links, trust badges
      ProductCard.tsx        # Reusable product card
    lib/
      products.ts            # Product catalog data + helpers
      cart-context.tsx       # Cart state (React Context + localStorage)
```

## Adding New Products

1. **Add images**: Create a folder in `public/products/<your-slug>/` and add product images (jpg/png).

2. **Add product data**: Open `src/lib/products.ts` and add a new entry to the `products` array:

```ts
{
  slug: "your-product-slug",           // Must match the folder name
  name: "Your Product Name",
  price: 9900,                         // Price in cents ($99.00)
  description: "Product description",
  details: ["Detail 1", "Detail 2"],
  images: [
    "/products/your-product-slug/image-1.jpg",
    "/products/your-product-slug/image-2.jpg",
  ],
  stripePriceId: "price_YOUR_STRIPE_PRICE_ID",
  category: "Category Name",
  inStock: true,
}
```

3. **Create a Stripe Price** (for checkout): See Stripe setup below.

That's it. The homepage, shop page, and product detail page will pick up the new product automatically.

## Stripe Checkout Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you don't have one.

2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

3. Add your Stripe Secret Key (from [Stripe Dashboard > API Keys](https://dashboard.stripe.com/apikeys)):
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Create **Price** objects in Stripe for each product:
   - Go to [Products](https://dashboard.stripe.com/products) in Stripe Dashboard
   - Create a product for each item with a one-time price
   - Copy each Price ID (starts with `price_`)

5. Paste each Price ID into `src/lib/products.ts` in the `stripePriceId` field.

6. Restart the dev server. The "Proceed to Checkout" button in the cart will now redirect to Stripe's hosted checkout page.

## Customization Checklist

Look for `// UPDATE` comments throughout the code for things to customize:

- **Product data**: `src/lib/products.ts` (names, prices, descriptions, images, Stripe IDs)
- **Brand story**: `src/app/page.tsx` (hero text, "Our Story" section)
- **Contact info**: `src/components/Footer.tsx` (email, social links)
- **Policy links**: `src/components/Footer.tsx` (shipping, returns, privacy, terms)
- **Newsletter**: `src/app/page.tsx` (wire up to Mailchimp, ConvertKit, etc.)
- **Shipping countries**: `src/app/api/checkout/route.ts` (allowed_countries array)
- **SEO metadata**: `src/app/layout.tsx`

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Stripe Checkout** (server-side session creation)
- **TypeScript**

## Deployment

Deploy to Vercel:
```bash
npx vercel
```

Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_BASE_URL` as environment variables in your Vercel project settings.
