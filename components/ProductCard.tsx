'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useApp, Product } from '@/context/AppContext';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

export const ProductCard = ({ product, showDiscount, discountPercent = 0 }: { product: Product; showDiscount?: boolean; discountPercent?: number }) => {
  const { addToCart, addToWishlist, removeFromWishlist, checkWishlist } = useApp();
  const [added, setAdded] = useState(false);
  const inWish = checkWishlist(product.id);
  const price = showDiscount ? product.price * (1 - discountPercent / 100) : product.price;

  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-lg overflow-hidden border border-border">
      <div className="relative h-64 bg-muted overflow-hidden group">
        <Image src={product.image || '/placeholder.svg'} alt={product.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform" />
        {showDiscount && <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">-{discountPercent}%</div>}
        <button onClick={() => inWish ? removeFromWishlist(product.id) : addToWishlist(product)} className="absolute top-3 left-3 bg-background/90 rounded-full p-2 hover:bg-background">
          <Heart size={20} className={inWish ? 'fill-destructive text-destructive' : 'text-foreground'} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{product.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{product.category}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
          {showDiscount && <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>}
        </div>
        {product.rating && <div className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded mb-3">★ {product.rating.rate} ({product.rating.count})</div>}
        <Button onClick={() => { addToCart(product); setAdded(true); setTimeout(() => setAdded(false), 2000); }} className={added ? 'w-full bg-accent text-accent-foreground' : 'w-full bg-primary text-primary-foreground hover:bg-primary/90'}>
          {added ? '✓' : 'add'}
        </Button>
      </div>
    </div>
  );
};
