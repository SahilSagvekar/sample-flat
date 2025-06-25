// // components/landing/Footer.tsx
// export function Footer() {
//   return (
//     <footer className="py-6 border-t mt-10 text-center text-sm text-gray-500">
//       © {new Date().getFullYear()} SampleFlat. All rights reserved.
//     </footer>
//   );
// }


import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">SampleFlat</h3>
          <p className="mt-2 text-gray-500">
            Discover, rent, and list properties seamlessly with a few clicks. Built for modern living.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Explore</h4>
          <ul className="space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard/buyer">Buy/Rent</Link></li>
            <li><Link href="/dashboard/seller">Sell Property</Link></li>
            <li><Link href="/dashboard/seller/payments">My Payments</Link></li>
          </ul>
        </div>

        {/* Legal & Help */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
          <ul className="space-y-1">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Use</Link></li>
            <li><Link href="#">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social or CTA */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Join Us</h4>
          <p className="text-gray-500 mb-2">Sign in to list your property or find your next home.</p>
          <Link
            href="/sign-in"
            className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} SampleFlat. All rights reserved.
      </div>
    </footer>
  );
}
