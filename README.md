# 🐉 Dragon Market — Premium Chinese E-Commerce

A visually stunning Next.js 14 Chinese e-commerce platform with 3D animations, full shop functionality, and admin dashboard.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — all design tokens in `globals.css`
- **GSAP + Three.js** — 3D dragon hero animation
- **AOS** — scroll animations
- **Framer Motion** — UI transitions
- **Zustand** — cart, wishlist, filter state
- **react-hot-toast** — notifications

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Theming
All design tokens are in `app/globals.css` under `:root {}`.
Change colors, fonts, shadows, gradients from one place to retheme the entire site instantly.

Key tokens:
```css
--color-primary: #C8102E;    /* Brand red */
--color-gold: #D4AF37;       /* Imperial gold */
--font-display: 'Playfair Display';
```

## Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with 3D hero, categories, products |
| `/store` | Shop with filters, sorting, search |
| `/product/[id]` | Product detail with image gallery |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/wishlist` | Saved products |
| `/dashboard` | Admin dashboard |

## Project Structure
```
app/
  globals.css        ← ALL design tokens here
  layout.tsx
  page.tsx
  store/page.tsx
  product/[id]/page.tsx
  cart/page.tsx
  checkout/page.tsx
  wishlist/page.tsx
  dashboard/page.tsx
components/
  layout/            ← Navbar, Footer
  home/              ← Hero, Categories, Featured, Banners, Testimonials
  product/           ← ProductCard
  cart/              ← CartDrawer
  three/             ← DragonScene (Three.js)
lib/
  data.ts            ← Products, categories, mock data
  utils.ts           ← Helper functions
store/
  cartStore.ts       ← Cart state (Zustand)
  wishlistStore.ts   ← Wishlist state
  filterStore.ts     ← Filter state
types/
  index.ts           ← TypeScript interfaces
```
