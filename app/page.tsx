'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const r = useRouter();
  const { isAuth, allProducts, categories, getByCategory } = useApp();
  const [cat, setCat] = useState<string | null>(null);

  useEffect(() => { if (!isAuth) r.push('/auth'); }, [isAuth, r]);

  if (!isAuth) return null;

  const filter = (c: string | null) => { setCat(c); c ? getByCategory(c) : window.location.reload(); };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => filter(null)} variant={cat === null ? 'default' : 'outline'} className={cat === null ? 'bg-primary text-primary-foreground' : 'border-border text-foreground'}>all</Button>
            {categories.map(c => <Button key={c} onClick={() => filter(c)} variant={cat === c ? 'default' : 'outline'} className={cat === c ? 'bg-primary text-primary-foreground' : 'border-border text-foreground'}>{c}</Button>)}
          </div>
        </div>
        {!cat && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold text-foreground">special offers</h2>
              <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">20% off</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} showDiscount discountPercent={20} />)}
            </div>
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{cat ? `${cat} products` : 'all products'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
