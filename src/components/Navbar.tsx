'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { useSignUp, SignInButton } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About Us', href: '/about' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'Buy Property in Pune', href: '/pune-properties' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Disclaimer', href: '/disclaimer' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="SampleFlat" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav & Auth */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-700 transition"
            >
              {link.name}
            </Link>
          ))}

          <SignedOut>
            <SignInButton mode="modal">
            <button
              // href="/sign-in"
              className="text-sm text-blue-700 hover:underline"
            >
              Sign In
            </button>
            </SignInButton>

            <Link
              href="/sign-up"
              className="text-sm text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-md bg-gray-100 border border-gray-300"
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
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
            <span className="text-xl font-bold text-blue-900">Menu</span>
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <SignedOut>
              {/* <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="text-blue-700 hover:underline"
              >
                Sign In
              </Link> */}
              {/* <Link
                href="https://your-clerk-subdomain.clerk.accounts.dev/sign-in"
                onClick={() => setMenuOpen(false)}
                className="text-blue-700 hover:underline"
              >
                Sign In
              </Link> */}
             <SignInButton mode="modal">
                <button className="text-blue-700 hover:underline">Sign In</button>
              </SignInButton>
              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="text-blue-700 hover:underline"
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
