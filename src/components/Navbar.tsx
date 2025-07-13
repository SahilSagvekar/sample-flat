'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { SignInButton } from '@clerk/nextjs';

import { useCurrentUser } from '@/hooks/useUserRoleFromDB';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Properties', href: '/listing' },
  { name: 'Favourites', href: '/dashboard/favorites' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useCurrentUser();

  const profileHref =
    user?.role === 'seller'
      ? '/dashboard/seller'
      : user?.role === 'buyer'
      ? '/dashboard/buyer'
      : user?.role === 'admin'
      ? '/dashboard/admin'
      : '/profile';

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                <span className="text-[#2BBBC1]">Buyer</span>
                <span className="text-gray-900">Builder-Prod</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-orange-600 transition font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <Link
                  href={profileHref}
                  className="text-gray-700 hover:text-orange-600 transition font-medium"
                >
                  Profile
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-gray-800 hover:text-orange-600 text-sm font-medium">
                    Log In
                  </button>
                </SignInButton>
                <Link
                  href="/sign-up"
                  className="bg-[#2BBBC1] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 border rounded-md text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className="relative z-50 md:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed right-0 top-0 w-64 h-full bg-white shadow-lg p-6 z-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-gray-900">Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-orange-600"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <Link
                href={profileHref}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-orange-600"
              >
                Profile
              </Link>
            )}

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-800 hover:text-orange-600 text-sm font-medium">
                  Log In
                </button>
              </SignInButton>
              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="bg-[#2BBBC1] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold text-center"
              >
                Sign Up
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </Dialog>
    </>
  );
}
