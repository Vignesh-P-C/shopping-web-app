'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AuthPage() {
  const r = useRouter();
  const { loginFunc, registerFunc, isAuth } = useApp();
  const [isLog, setIsLog] = useState(true);
  const [e, setE] = useState('');
  const [p, setP] = useState('');
  const [cp, setCP] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => { if (isAuth) r.push('/'); }, [isAuth, r]);

  if (isAuth) return null;

  const submit = (ev: any) => {
    ev.preventDefault();
    setErr('');
    if (!e || !p) { setErr('all fields required'); return; }
    if (isLog) {
      if (!loginFunc(e, p)) setErr('invalid'); else r.push('/');
    } else {
      if (p !== cp) { setErr('passwords dont match'); return; }
      if (!registerFunc(e, p)) setErr('email exists'); else r.push('/');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-center">ShopHub</h1>
          <p className="text-muted-foreground text-center mb-6">{isLog ? 'welcome back!' : 'create account'}</p>
          <form onSubmit={submit} className="space-y-4">
            <Input type="email" placeholder="email@example.com" value={e} onChange={e => setE(e.target.value)} />
            <Input type="password" placeholder="password" value={p} onChange={e => setP(e.target.value)} />
            {!isLog && <Input type="password" placeholder="confirm" value={cp} onChange={e => setCP(e.target.value)} />}
            {err && <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-2 rounded text-sm">{err}</div>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">{isLog ? 'login' : 'register'}</Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">{isLog ? "don't have account? " : 'have account? '}<button onClick={() => { setIsLog(!isLog); setErr(''); }} className="text-accent font-semibold hover:underline">{isLog ? 'register' : 'login'}</button></p>
          </div>
        </div>
      </div>
    </main>
  );
}
