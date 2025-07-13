import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Apple,
  Play,
} from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className=" text-white py-8 mt-0.5">
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6"> */}
      <div className="px-8">
        <div className="bg-black border border-white/10 rounded-2xl px-16 py-16 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand + Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-[#2BBBC1]">
                BuyerBuilder
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Join our newsletter for property market trends, expert insights,
                and curated listings — delivered to your inbox weekly.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2BBBC1]"
                />
                <button className="px-5 py-2 bg-[#2BBBC1] hover:bg-orange-600 text-sm font-medium rounded-r-lg transition">
                  Send →
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/buyer" className="hover:text-white">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/seller" className="hover:text-white">
                    List Property
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>hello@sampleflat.com</p>
                <p>+91 98765 43210</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Head Office
              </h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>123 Property Street</p>
                <p>Mumbai, MH 400001</p>
                <p>India</p>
              </div>
            </div>

            {/* App Store Buttons */}
            <div>
              {/* <h4 className="text-lg font-semibold mb-4 text-white">
                Get the App
              </h4>
              <div className="space-y-3">
                <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition w-full">
                  <Apple size={20} />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-sm font-medium text-white">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition w-full">
                  <Play size={20} />
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Get it on</p>
                    <p className="text-sm font-medium text-white">Google Play</p>
                  </div>
                </button>
              </div> */}
            </div>
          </div>

          {/* Explore Cities + Socials + Auth Buttons */}
          <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h4 className="text-md font-semibold mb-2 text-white">
                Explore Cities
              </h4>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <Link href="#">Mumbai</Link>
                <Link href="#">Pune</Link>
                <Link href="#">Bangalore</Link>
                <Link href="#">Delhi</Link>
                <Link href="#">Hyderabad</Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex gap-4 text-gray-400">
                <Link href="#" className="hover:text-white">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="hover:text-white">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="hover:text-white">
                  <Linkedin size={20} />
                </Link>
                <Link href="#" className="hover:text-white">
                  <Instagram size={20} />
                </Link>
              </div>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-[#2BBBC1] hover:bg-orange-600 text-white rounded-lg text-sm transition">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} SampleFlat. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


// import Link from "next/link";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { SignInButton } from "@clerk/nextjs";
// import {
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Apple,
//   Play,
// } from "lucide-react";

// export default function LandingFooter() {
//   return (
//     // <footer className="bg-neutral-950 text-white py-16 mt-32">
//     <footer className="bg-white-950 text-white py-16 mt-32">
//       <div className="max-w-6xl mx-auto bg-black rounded-2xl px-6 py-16 shadow-xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
//           {/* Brand + Newsletter */}
//           <div className="lg:col-span-2">
//             <h3 className="text-2xl font-bold mb-4 text-[#2BBBC1]">
//               BuyerBuilder
//             </h3>
//             <p className="text-gray-400 mb-6 text-sm leading-relaxed">
//               Join our newsletter for property market trends, expert insights,
//               and curated listings — delivered to your inbox weekly.
//             </p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2BBBC1]"
//               />
//               <button className="px-5 py-2 bg-[#2BBBC1] hover:bg-orange-600 text-sm font-medium rounded-r-lg transition">
//                 Send →
//               </button>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">
//               Quick Links
//             </h4>
//             <ul className="space-y-2 text-sm text-gray-400">
//               <li>
//                 <Link href="/" className="hover:text-white">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="hover:text-white">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/dashboard/buyer" className="hover:text-white">
//                   Properties
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/dashboard/seller" className="hover:text-white">
//                   List Property
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="hover:text-white">
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
//             <div className="space-y-2 text-sm text-gray-400">
//               <p>hello@sampleflat.com</p>
//               <p>+91 98765 43210</p>
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">
//               Head Office
//             </h4>
//             <div className="text-sm text-gray-400 space-y-1">
//               <p>123 Property Street</p>
//               <p>Mumbai, MH 400001</p>
//               <p>India</p>
//             </div>
//           </div>

//           {/* App Store Buttons */}
//           <div>
//             <h4 className="text-lg font-semibold mb-4 text-white">
//               Get the App
//             </h4>
//             <div className="space-y-3">
//               <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition w-full">
//                 <Apple size={20} />
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400">Download on the</p>
//                   <p className="text-sm font-medium text-white">App Store</p>
//                 </div>
//               </button>
//               <button className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition w-full">
//                 <Play size={20} />
//                 <div className="text-left">
//                   <p className="text-xs text-gray-400">Get it on</p>
//                   <p className="text-sm font-medium text-white">Google Play</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Discover + Socials */}
//         <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between gap-6">
//           <div>
//             <h4 className="text-md font-semibold mb-2 text-white">
//               Explore Cities
//             </h4>
//             <div className="flex flex-wrap gap-4 text-sm text-gray-400">
//               <Link href="#">Mumbai</Link>
//               <Link href="#">Pune</Link>
//               <Link href="#">Bangalore</Link>
//               <Link href="#">Delhi</Link>
//               <Link href="#">Hyderabad</Link>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
//             <div className="flex gap-4 text-gray-400">
//               <Link href="#" className="hover:text-white">
//                 <Facebook size={20} />
//               </Link>
//               <Link href="#" className="hover:text-white">
//                 <Twitter size={20} />
//               </Link>
//               <Link href="#" className="hover:text-white">
//                 <Linkedin size={20} />
//               </Link>
//               <Link href="#" className="hover:text-white">
//                 <Instagram size={20} />
//               </Link>
//             </div>
//             <SignedOut>
//               <SignInButton mode="modal">
//                 <button className="px-4 py-2 bg-[#2BBBC1] hover:bg-orange-600 text-white rounded-lg text-sm transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
//           &copy; {new Date().getFullYear()} SampleFlat. All rights reserved.
//         </div>
//       </div>

//       {/* <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
//         &copy; {new Date().getFullYear()} SampleFlat. All rights reserved.
//       </div> */}
//     </footer>
//   );
// }
