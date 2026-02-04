# Shopping Web App (Next.js)

This project is a learning-based e-commerce web application built using **React and Next.js**.  
The focus was on understanding real-world project structure, state management, and proper Git/GitHub workflow.

← [Back to README](./README.md)

---

## How This Project Was Built

### 1. Project Setup
The app was created using **Next.js with TypeScript** for scalability and type safety.

```
bash
pnpm install
pnpm dev
```

### 2. Folder Structure
The project follows a clean, industry-style structure:
```
app/        → Routes & pages
components/ → Reusable UI components
context/    → Global state (auth, cart, wishlist)
hooks/      → Custom hooks
lib/        → Utility functions
public/     → Static assets
styles/     → Global styles
```
### 3. Pages & Routing
Pages were created using Next.js App Router:

/ – Home

/auth – Login/Register

/cart

/wishlist

/orders

Each route is defined using page.tsx inside the app/ directory.

### 4. Components & UI
Reusable components like Navbar and ProductCard were built to keep the UI modular.

```
export const Navbar = () => {
  return <nav className="bg-primary text-white">ShopHub</nav>;
};
```
Styling is done using Tailwind CSS for speed and consistency.

### 5. State Management
Global state (authentication, cart, wishlist) is handled using React Context API, avoiding prop drilling and keeping state accessible across pages.

## Git & GitHub Workflow

### 6. Initializing Git
```
git init
git config --global user.name "Vignesh"
git config --global user.email "your-email@example.com"
```

### 7. Ignoring Generated Files
.gitignore is used to exclude files like:

node_modules/
.next/
.env*

### 8. First Commit & Push
```
git add .
git commit -m "Initial commit: Next.js shopping web app"
git remote add origin https://github.com/Vignesh-P-C/shopping-web-app.git
git branch -M main
git push -u origin main
```

### Tech Stack
```
Next.js

React

TypeScript

Tailwind CSS

pnpm

Git & GitHub
```
### What I Learned
```
Real-world Next.js project structure

React Context for global state

Component-based UI development

Proper Git & GitHub workflow

Debugging environment & setup issues
```
## This project helped me understand how modern frontend apps are built, structured, and version-controlled in real-world workflows.