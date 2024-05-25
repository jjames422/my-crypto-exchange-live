"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthGuard from '../../components/AuthGuard';

export default function Wallets() {
  const { data: session } = useSession();
  const [wallets, setWallets] = useState([]);
  const [currency, setCurrency] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (session) {
      fetch('/api/wallets')
        .then((res) => res.json())
        .then((data) => setWallets(data));
    }
  }, [session]);

  const handleCreateWallet = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/wallets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency }),
    });
    const data = await res.json();
    if (res.ok) {
      setWallets((prev) => [...prev, data]);
      setCurrency('');
    } else {
      alert(data.error);
    }
  };

  const handleUpdateBalance = async (id) => {
    const res = await fetch('/api/wallets', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, balance }),
    });
    const data = await res.json();
    if (res.ok) {
      setWallets((prev) => prev.map(wallet => wallet.id === id ? data : wallet));
      setBalance('');
    } else {
      alert(data.error);
    }
  };

  const handleDeleteWallet = async (id) => {
    const res = await fetch('/api/wallets', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setWallets((prev) => prev.filter(wallet => wallet.id !== id));
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  useEffect(() => {
    if (session) {
      const fetchWallets = () => {
        fetch('/api/wallets')
          .then((res) => res.json())
          .then((data) => setWallets(data));
      };

      fetchWallets();
      const interval = setInterval(fetchWallets, 30000); // Poll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <AuthGuard>
      <div>
        <form onSubmit={handleCreateWallet} className="mb-4">
          <label className="block mb-2">
            Currency:
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="ml-2 p-1" />
          </label>
          <button type="submit" className="text-wakeforest-500 hover:text-wakeforest-300 transition">Create Wallet</button>
        </form>
        <h2 className="text-2xl mb-4">Your Wallets</h2>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id} className="mb-4">
              {wallet.currency}: {wallet.balance}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="New Balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="p-1"
                />
                <button onClick={() => handleUpdateBalance(wallet.id)} className="ml-2 text-wakeforest-500 hover:text-wakeforest-300 transition">Update Balance</button>
                <button onClick={() => handleDeleteWallet(wallet.id)} className="ml-2 text-red-500 hover:text-red-300 transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
}
