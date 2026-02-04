'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from './ui/button';

export const Navbar = () => {
  const r = useRouter();
  const { isAuth, logoutFunc, cartItems, wishlist } = useApp();

  const Badge = ({ n }: { n: number }) => n > 0 ? <span className="absolute -top-2 -right-3 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{n}</span> : null;

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">ShopHub</Link>
          <div className="hidden md:flex space-x-6 items-center">
            {isAuth ? (
              <>
                <Link href="/cart" className="hover:text-accent relative">Cart<Badge n={cartItems.length} /></Link>
                <Link href="/wishlist" className="hover:text-accent relative">Wishlist<Badge n={wishlist.length} /></Link>
                <Link href="/orders" className="hover:text-accent">Orders</Link>
                <Button onClick={() => { logoutFunc(); r.push('/auth'); }} variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent">Logout</Button>
              </>
            ) : null}
          </div>
          {!isAuth && <Button onClick={() => r.push('/auth')} className="bg-accent hover:bg-accent/90 text-accent-foreground">Login</Button>}
        </div>
      </div>
    </nav>
  );
};
