'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import React from "react"


export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  password: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  orderDate: string;
  status: string;
  address: string;
  phone: string;
  upiId: string;
}

interface AppContextType {
  userdata: User | null;
  isAuth: boolean;
  cartItems: CartItem[];
  wishlist: Product[];
  orders: Order[];
  allProducts: Product[];
  categories: string[];
  loginFunc: (email: string, password: string) => boolean;
  registerFunc: (email: string, password: string) => boolean;
  logoutFunc: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  checkWishlist: (productId: number) => boolean;
  placeOrder: (address: string, phone: string, upiId: string) => void;
  getProducts: () => void;
  getCategories: () => void;
  getByCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [userdata, setUserdata] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) { setUserdata(JSON.parse(u)); setIsAuth(true); console.log('[app] user loaded'); }
    if (localStorage.getItem('cart')) setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'));
    if (localStorage.getItem('wishlist')) setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    if (localStorage.getItem('orders')) { const o = JSON.parse(localStorage.getItem('orders') || '[]'); setOrders(o); console.log('[app] orders loaded:', o.length); }
    getProducts();
    getCategories();
  }, []);

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  const hashPass = (p: string) => {
    let h = 0;
    for (let i = 0; i < p.length; i++) { h = (h << 5) - h + p.charCodeAt(i); }
    return Math.abs(h).toString(16);
  };

  const loginFunc = (email: string, password: string) => {
    const u = JSON.parse(localStorage.getItem('users') || '[]').find((x: User) => x.email === email && x.password === hashPass(password));
    if (u) { setUserdata(u); setIsAuth(true); localStorage.setItem('user', JSON.stringify(u)); console.log('[app] login:', email); return true; }
    console.log('[app] login failed:', email);
    return false;
  };

  const registerFunc = (email: string, password: string) => {
    const users: any = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((x: User) => x.email === email)) { console.log('[app] email exists:', email); return false; }
    const nu = { email, password: hashPass(password) };
    users.push(nu);
    localStorage.setItem('users', JSON.stringify(users));
    setUserdata(nu);
    setIsAuth(true);
    localStorage.setItem('user', JSON.stringify(nu));
    console.log('[app] registered:', email);
    return true;
  };

  const logoutFunc = () => {
    setUserdata(null); setIsAuth(false); setCartItems([]); setWishlist([]); setOrders([]);
    localStorage.removeItem('user');
  };

  const addToCart = (p: Product) => setCartItems(prev => {
    const ex = prev.find(i => i.id === p.id);
    console.log('[app] add to cart:', p.id);
    return ex ? prev.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...p, quantity: 1}];
  });

  const removeFromCart = (id: number) => { console.log('[app] remove from cart:', id); setCartItems(p => p.filter(i => i.id !== id)); };

  const updateQty = (id: number, qty: number) => qty <= 0 ? removeFromCart(id) : setCartItems(p => p.map(i => i.id === id ? {...i, quantity: qty} : i));

  const addToWishlist = (p: Product) => { if (!wishlist.find(i => i.id === p.id)) setWishlist(w => [...w, p]); };

  const removeFromWishlist = (id: number) => setWishlist(w => w.filter(i => i.id !== id));

  const checkWishlist = (id: number) => wishlist.some(i => i.id === id);

  const getProducts = () => fetch('https://fakestoreapi.com/products?limit=20').then(r => r.json()).then(setAllProducts).catch(e => console.log(e));

  const getCategories = () => fetch('https://fakestoreapi.com/products/categories').then(r => r.json()).then(setCategories).catch(e => console.log(e));

  const getByCategory = (cat: string) => fetch(`https://fakestoreapi.com/products/category/${cat}`).then(r => r.json()).then(setAllProducts).catch(e => console.log(e));

  const placeOrder = (addr: string, phone: string, upi: string) => {
    const t = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const o = { id: Date.now().toString(), items: cartItems.map(i => ({ ...i })), totalPrice: t, orderDate: new Date().toISOString(), status: 'Confirmed', address: addr, phone, upiId: upi };
    setOrders(p => [...p, o]);
    setCartItems([]);
    console.log('[app] order placed:', o.id, t);
  };

  return (
    <AppContext.Provider
      value={{
        userdata,
        isAuth,
        cartItems,
        wishlist,
        orders,
        allProducts,
        categories,
        loginFunc,
        registerFunc,
        logoutFunc,
        addToCart,
        removeFromCart,
        updateQty,
        addToWishlist,
        removeFromWishlist,
        checkWishlist,
        placeOrder,
        getProducts,
        getCategories,
        getByCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
