'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react'; // nice profile icon

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskManager Web</h1>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
                Login
              </Link>
              <Link href="/signup" className="bg-green-500 px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          ) : (
            <Link href="/profile" className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
