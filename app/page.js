"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Greeting from '../components/Greeting';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black text-wakeforest-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to MotExchange</h1>
      {!session ? (
        <div>
          <Link href="/register" className="text-wakeforest-500 hover:text-wakeforest-300 transition">
            Register
          </Link>
          <span className="mx-4">|</span>
          <Link href="/login" className="text-wakeforest-500 hover:text-wakeforest-300 transition">
            Login
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-4">Welcome back, {session.user.name}!</p>
          <button
            onClick={() => signOut()}
            className="text-wakeforest-500 hover:text-wakeforest-300 transition"
          >
            Logout
          </button>
          <div className="mt-6">
            <Link href="/wallets" className="text-wakeforest-500 hover:text-wakeforest-300 transition">
              Manage Wallets
            </Link>
            <span className="mx-4">|</span>
            <Link href="/transactions" className="text-wakeforest-500 hover:text-wakeforest-300 transition">
              View Transactions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
