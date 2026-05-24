# How I Built This Project

← [Back to README](./README.md)

This is a first-person account of how I built this shopping app from scratch — including the reasoning behind decisions, problems I ran into, and what I learned from fixing them.

---

## 1. Choosing the Stack

Before writing any code, I decided on the stack:

- **Next.js 14** with App Router — because it's the current industry standard for React apps, and I wanted to learn file-based routing properly
- **TypeScript** — to build the habit of typed code early, even if it slowed me down initially
- **Tailwind CSS** — for fast, consistent styling without managing a separate CSS file per component
- **pnpm** — faster and more disk-efficient than npm; increasingly common in professional projects

Bootstrapping:
```bash
pnpm create next-app@latest shopping-web-app --typescript --tailwind --app
cd shopping-web-app
pnpm dev
```

---

## 2. Designing the Folder Structure

I didn't start coding immediately — I planned the folder structure first. Getting this right early avoids a painful reorganization later.

```
app/               # Each subfolder = a route
├── page.tsx       # /
├── auth/page.tsx  # /auth
├── cart/page.tsx  # /cart
├── wishlist/page.tsx
└── orders/page.tsx

components/        # UI pieces used across multiple pages
context/           # Global state providers
hooks/             # Logic extracted from components
lib/               # Pure utility functions (no React)
```

**Why separate `hooks/` and `lib/`?**
`hooks/` holds React-specific logic (using `useState`, `useEffect`, `useContext`). `lib/` holds pure functions with no React dependency — things like formatters, validators, or API helpers. Keeping them separate makes both easier to test and reuse.

---

## 3. Building Pages with App Router

Next.js App Router uses a `page.tsx` file inside a folder to define a route. So `/app/cart/page.tsx` becomes the `/cart` route automatically.

Each page is a React Server Component by default. I added `"use client"` at the top only when the page needed interactivity (event handlers, state, context).

Example — the cart page needs client-side state, so:

```tsx
"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem } = useCart();

  return (
    <main>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </main>
  );
}
```

---

## 4. Building Reusable Components

Instead of writing the same UI twice, I built components that accept props and render differently based on input.

The `ProductCard` component renders one product. The home page maps over a list and renders many:

```tsx
export const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <h3 className="font-semibold mt-2">{name}</h3>
      <p className="text-gray-500">${price}</p>
    </div>
  );
};
```

**Rule I followed:** if I pasted the same JSX in more than one place, it became a component.

---

## 5. State Management with React Context

The app has three pieces of global state: auth (who is logged in), cart (items added), and wishlist (items saved). I chose React Context over Redux because I wanted to understand the primitive first.

Each context follows the same pattern:

```tsx
// context/CartContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (item) => setItems((prev) => [...prev, item]);
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
```

All three providers wrap the app in `app/layout.tsx`, so every page has access.

**What I learned the hard way:** I initially put all state in one giant context. Re-renders were expensive — changing the cart triggered re-renders in auth-consuming components. Splitting into separate contexts fixed this.

---

## 6. Git & GitHub Workflow

I treated Git seriously from day one — not just as a backup tool, but as a record of decisions.

**Initial setup:**
```bash
git init
git config --global user.name "Vignesh"
git config --global user.email "your-email@example.com"
```

**`.gitignore` — what I excluded and why:**
```
node_modules/    # Installed dependencies — not source code
.next/           # Build output — regenerated on every build
.env*            # Environment secrets — never committed
```

**First push:**
```bash
git add .
git commit -m "Initial commit: Next.js shopping app scaffold"
git remote add origin https://github.com/Vignesh-P-C/shopping-web-app.git
git branch -M main
git push -u origin main
```

**Commit message rule I used:** write the message as if completing the sentence *"This commit will..."* — so "Add cart context and useCart hook" rather than "cart stuff".

---

## 7. Problems I Solved

**Problem:** Context value was `null` on the first render, crashing components that destructured from it.
**Fix:** Added a default value to `createContext` and added a null check inside the custom hook.

**Problem:** Tailwind classes weren't applying in a new component file.
**Fix:** The file path wasn't covered by `content` in `tailwind.config.ts`. Added the correct glob pattern.

**Problem:** `pnpm dev` failed after cloning on a different machine.
**Fix:** `node_modules` wasn't committed (correctly). Just needed `pnpm install` first — updated the README to make this clear.

---

## What I'd Do Differently Next Time

- **Add a proper data layer early.** Using hardcoded mock data made sense for learning, but I'd connect to an API or use a tool like `json-server` from the start.
- **Write commits more frequently.** Some of my early commits bundled too many changes. Small, focused commits make debugging much easier.
- **Add error boundaries.** Components can crash silently. React error boundaries contain failures and give users a fallback UI.

---

## Summary

| What I built | What I learned |
|---|---|
| Multi-page Next.js app | App Router, layouts, server vs client components |
| Reusable components | Props, composition, component design |
| Global state | React Context, provider pattern, re-render optimization |
| Professional repo | Git workflow, `.gitignore`, commit hygiene |
| Real debugging | Fixing real build, config, and runtime errors |
