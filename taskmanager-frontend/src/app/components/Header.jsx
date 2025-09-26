'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    router.push('/'); // back to homepage
  };

  return (
    <header className="bg-blue-900 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">TaskManager Web</h1>

        <div>
          {!isLoggedIn ? (
            <div className="space-x-4">
              <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
                Login
              </Link>
              <Link href="/signup" className="bg-green-500 px-4 py-2 rounded">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative inline-block">
              {/* Profile Icon */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600"
              >
                <User className="w-6 h-6 text-white" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
