// app/dashboard/page.js
import React from 'react';
import Head from 'next/head';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Head>
        <title>Dashboard - My Crypto Exchange</title>
      </Head>
      <Sidebar />
      <main className="flex-1 p-6 bg-wake-forest-black text-wake-forest-gold">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AssetCard />
          <WalletCard />
          <TransactionList />
        </div>
      </main>
    </div>
  );
};

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-md">
    <div className="p-6">
      <h2 className="text-xl font-bold text-wake-forest-gold">My Crypto Exchange</h2>
      <nav className="mt-6">
        <ul>
          <li className="mt-4">
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li className="mt-4">
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Wallets
            </a>
          </li>
          <li className="mt-4">
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Transactions
            </a>
          </li>
          <li className="mt-4">
            <a href="#" className="block text-gray-600 hover:text-gray-900">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

const Header = () => (
  <header className="flex items-center justify-between mb-8">
    <h1 className="text-2xl font-bold text-wake-forest-gold">Dashboard</h1>
    <div className="flex items-center">
      <span className="mr-4 text-wake-forest-gold">Hello, User</span>
      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
    </div>
  </header>
);

const AssetCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-wake-forest-gold">Assets</h2>
    <div className="flex items-center justify-between">
      <span>Bitcoin</span>
      <span>0.5 BTC</span>
    </div>
  </div>
);

const WalletCard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-wake-forest-gold">Wallets</h2>
    <div className="flex items-center justify-between">
      <span>My Wallet</span>
      <span>1.0 BTC</span>
    </div>
  </div>
);

const TransactionList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-wake-forest-gold">Recent Transactions</h2>
    <ul>
      <li className="flex items-center justify-between">
        <span>Sent BTC</span>
        <span>-0.1 BTC</span>
      </li>
      <li className="flex items-center justify-between">
        <span>Received ETH</span>
        <span>+2.0 ETH</span>
      </li>
    </ul>
  </div>
);

export default Dashboard;
