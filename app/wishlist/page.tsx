'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const r = useRouter();
  const { isAuth, wishlist, removeFromWishlist } = useApp();

  useEffect(() => { if (!isAuth) r.push('/auth'); }, [isAuth, r]);
  if (!isAuth) return null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">empty</p>
            <Button onClick={() => r.push('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">shop</Button>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground mb-6">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(p => (
                <div key={p.id} className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
                  <div className="relative h-64 bg-muted">
                    <Image src={p.image || '/placeholder.svg'} alt={p.title} fill className="object-contain p-4" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{p.title}</h3>
                    <p className="text-lg font-bold text-foreground mb-3">${p.price.toFixed(2)}</p>
                    <Button onClick={() => removeFromWishlist(p.id)} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                      <Trash2 size={16} className="mr-2" />remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
