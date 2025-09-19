'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskManager Web</h1>
        <div className="space-x-4">
          <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
            Login
          </Link>
          <Link href="/signup" className="bg-green-500 px-4 py-2 rounded">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}