# ShopHub — E-Commerce Web App

A full-featured shopping web app built with **Next.js 14, TypeScript, and Tailwind CSS**, featuring authentication, cart management, wishlists, and order tracking — all powered by the React Context API.

> Built as a portfolio project to learn real-world frontend architecture and modern development workflows.

---

## Features

- **Auth flow** — Login and registration pages with protected routes
- **Product catalog** — Browsable product listings via reusable `ProductCard` components
- **Cart & Wishlist** — Add, remove, and manage items with persisted global state
- **Order tracking** — View past and current orders
- **Responsive UI** — Mobile-first design with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React Context API |
| Package manager | pnpm |
| Version control | Git & GitHub |

---

## Project Structure

```
shopping-web-app/
├── app/               # Routes & pages (App Router)
│   ├── page.tsx       # Home
│   ├── auth/          # Login / Register
│   ├── cart/
│   ├── wishlist/
│   └── orders/
├── components/        # Reusable UI components
├── context/           # Global state (auth, cart, wishlist)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/            # Global styles
```

---

## Getting Started

```bash
git clone https://github.com/Vignesh-P-C/shopping-web-app
cd shopping-web-app
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture Decisions

**Why React Context instead of Redux or Zustand?**
This project intentionally uses the Context API to understand the fundamentals of global state management before reaching for a third-party library. Auth state, cart items, and wishlist data are each managed in separate context providers to avoid re-render overhead from a single monolithic store.

**Why Next.js App Router?**
The App Router introduced in Next.js 13 is now the standard. Using it here meant learning file-based routing, layouts, and server/client component boundaries — patterns that are directly relevant in production codebases.

---

## What I Built & Learned

- Architected a multi-page app using Next.js App Router conventions
- Designed a component hierarchy that separates UI, logic, and data concerns
- Implemented global state across multiple contexts without prop drilling
- Set up a professional Git workflow (branching, commits, remote push)
- Debugged real environment and build issues end-to-end

---

## Development Journal

Want to see how this was built from scratch — including setup decisions, folder structure, and mistakes I fixed along the way?

👉 [How I Built This Project](./HOW_I_created_the_project.md)

---

## Author

**Vignesh P C**
GitHub: [@Vignesh-P-C](https://github.com/Vignesh-P-C)
