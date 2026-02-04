'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const r = useRouter();
  const { isAuth, cartItems, removeFromCart, updateQty, placeOrder } = useApp();
  const [checkout, setCheckout] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [form, setForm] = useState({ address: '', phone: '', upiId: '' });

  useEffect(() => { if (!isAuth) r.push('/auth'); }, [isAuth, r]);
  if (!isAuth) return null;

  const sub = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = sub * 0.1;
  const tot = sub + tax;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">shopping cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">cart is empty</p>
            <Button onClick={() => r.push('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">continue shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(i => (
                <div key={i.id} className="bg-card rounded-lg border border-border p-4 flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded flex-shrink-0 relative">
                    <Image src={i.image || '/placeholder.svg'} alt={i.title} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground mb-1">{i.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">${i.price.toFixed(2)} each</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => updateQty(i.id, i.quantity - 1)} className="h-8 w-8 p-0"><Minus size={16} /></Button>
                      <span className="w-8 text-center font-semibold">{i.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQty(i.id, i.quantity + 1)} className="h-8 w-8 p-0"><Plus size={16} /></Button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between">
                    <p className="font-bold text-foreground">${(i.price * i.quantity).toFixed(2)}</p>
                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(i.id)} className="text-destructive hover:bg-destructive/10"><Trash2 size={18} /></Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-lg border border-border p-6 sticky top-4 h-fit">
              <h2 className="text-xl font-bold text-foreground mb-4">summary</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between"><span>subtotal</span><span>${sub.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>tax (10%)</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between mb-6"><span className="font-bold text-lg">total</span><span className="font-bold text-lg text-accent">${tot.toFixed(2)}</span></div>
              <Button onClick={() => setCheckout(true)} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">buy now</Button>
            </div>
          </div>
        )}
      </div>
      {checkout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-8 max-w-md w-full border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">checkout</h2>
            {!confirm ? (
              <form onSubmit={e => { e.preventDefault(); if (!form.address || !form.phone || !form.upiId) { alert('fill all'); return; } setConfirm(true); }} className="space-y-4">
                <Input type="text" placeholder="address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                <Input type="tel" placeholder="phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <Input type="text" placeholder="upi id" value={form.upiId} onChange={e => setForm({...form, upiId: e.target.value})} />
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setCheckout(false)} className="flex-1">cancel</Button>
                  <Button type="submit" className="flex-1 bg-primary">review</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded">
                  <p className="text-foreground font-semibold">order total: <span className="text-accent">${tot.toFixed(2)}</span></p>
                </div>
                <Button onClick={() => { placeOrder(form.address, form.phone, form.upiId); setConfirm(false); setCheckout(false); alert('order placed!'); setTimeout(() => r.push('/orders'), 1500); }} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">confirm</Button>
                <Button type="button" variant="outline" onClick={() => setConfirm(false)} className="w-full">back</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
