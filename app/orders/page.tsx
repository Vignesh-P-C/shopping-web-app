'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Phone } from 'lucide-react';

export default function OrdersPage() {
  const r = useRouter();
  const { isAuth, orders } = useApp();

  useEffect(() => { if (!isAuth) r.push('/auth'); }, [isAuth, r]);
  if (!isAuth) return null;

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">no orders</p>
            <Button onClick={() => r.push('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">shop</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o, idx) => (
              <div key={o.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="bg-muted p-4 border-b border-border">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">order #{orders.length - idx}</p>
                      <p className="font-semibold text-foreground">{o.id}</p>
                    </div>
                    <div className="flex items-center gap-1 text-foreground font-semibold"><Calendar size={16} />{fmt(o.orderDate)}</div>
                    <div><span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">{o.status}</span></div>
                    <div><p className="font-bold text-lg text-accent">${o.totalPrice.toFixed(2)}</p></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-3">items</h3>
                  <div className="space-y-3">
                    {o.items.map(i => (
                      <div key={i.id} className="flex gap-4 pb-3 border-b border-border last:border-b-0">
                        <div className="w-16 h-16 bg-muted rounded flex-shrink-0 relative">
                          <Image src={i.image || '/placeholder.svg'} alt={i.title} fill className="object-contain p-2" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-foreground line-clamp-1">{i.title}</h4>
                          <p className="text-sm text-muted-foreground">qty: {i.quantity} × ${i.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold text-foreground">${(i.price * i.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted p-4 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex gap-2"><MapPin size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" /><div><p className="text-xs text-muted-foreground">address</p><p className="text-foreground">{o.address}</p></div></div>
                    <div className="flex gap-2"><Phone size={18} className="text-muted-foreground flex-shrink-0 mt-0.5" /><div><p className="text-xs text-muted-foreground">phone</p><p className="text-foreground">{o.phone}</p></div></div>
                    <div><p className="text-xs text-muted-foreground">payment</p><p className="text-foreground font-mono text-sm">{o.upiId}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {orders.length > 0 && <div className="mt-8 text-center"><Button onClick={() => r.push('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">shop more</Button></div>}
      </div>
    </main>
  );
}
