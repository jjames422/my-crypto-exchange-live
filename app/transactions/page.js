"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthGuard from '../../components/AuthGuard';

export default function Transactions() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    if (session) {
      fetch('https://<TransactionServerURL>/api/transactions')  // Replace with your Transaction Server URL
        .then((res) => res.json())
        .then((data) => setTransactions(data));
    }
  }, [session]);

  const handleSendTransaction = async (e) => {
    e.preventDefault();
    const res = await fetch('https://<TransactionServerURL>/api/transactions', {  // Replace with your Transaction Server URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, amount, currency }),
    });
    const data = await res.json();
    if (res.ok) {
      setTransactions((prev) => [...prev, data]);
      setRecipient('');
      setAmount('');
      setCurrency('');
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    if (session) {
      const fetchTransactions = () => {
        fetch('https://<TransactionServerURL>/api/transactions')  // Replace with your Transaction Server URL
          .then((res) => res.json())
          .then((data) => setTransactions(data));
      };

      fetchTransactions();
      const interval = setInterval(fetchTransactions, 30000); // Poll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <AuthGuard>
      <div>
        <form onSubmit={handleSendTransaction} className="mb-4">
          <label className="block mb-2">
            Recipient:
            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="ml-2 p-1" />
          </label>
          <label className="block mb-2">
            Amount:
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="ml-2 p-1" />
          </label>
          <label className="block mb-2">
            Currency:
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="ml-2 p-1" />
          </label>
          <button type="submit" className="text-wakeforest-500 hover:text-wakeforest-300 transition">Send Transaction</button>
        </form>
        <h2 className="text-2xl mb-4">Your Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="mb-4">
              To: {transaction.recipient} | Amount: {transaction.amount} {transaction.currency}
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
}
