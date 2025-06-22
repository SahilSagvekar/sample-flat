// import { prisma } from "@/lib/prisma";
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { UserButton } from "@clerk/nextjs";
// import { FaBed, FaMoneyBillWave, FaMapMarkerAlt, FaCalendarAlt, FaVideo, FaMapMarkedAlt,  FaSwimmingPool, FaDumbbell, FaParking, FaWifi, FaUtensils, FaPhoneAlt } from "react-icons/fa";
// import { FaListUl } from "react-icons/fa";
// import { Link } from "lucide-react";


// type Props = {
//   params: {
//     id: string;
//   };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const property = await prisma.property.findUnique({
//     where: { id: params.id },
//   });

//   if (!property) return {};

//   return {
//     title: property.title,
//     description: `${property.bhk} | ${property.locality}, ${property.city}, ${property.state}`,
//   };
// }

// export default async function ListingPage({ params }: Props) {
//   const property = await prisma.property.findUnique({
//     where: { id: params.id },
//   });

//   if (!property) return notFound();

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-blue-700">TheSampleFlat</h1>
//         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//           <UserButton afterSignOutUrl="/" />
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-10">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
//           {/* Title & Info */}
//           <div className="mb-6">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h2>
//             <div className="flex items-center text-lg text-gray-800 mb-2">
//               <FaBed className="text-blue-500 mr-2" />
//               <span>{property.bhk} BHK</span>
//               <span className="mx-3 text-gray-300">|</span>
//               <FaMoneyBillWave className="text-blue-500 mr-2" />
//               <span>₹{property.price.toLocaleString()}</span>
//             </div>
//             <div className="flex items-center text-gray-600 mb-2">
//               <FaMapMarkerAlt className="text-blue-500 mr-2" />
//               <span>{property.locality}, {property.city}, {property.state}</span>
//             </div>
//             <div className="text-sm text-gray-500">
//               <FaCalendarAlt className="text-blue-500 mr-2" />
//               <span>Possession Date: {property.possessionDate}</span>
//             </div>
//           </div>

//           {/* Images */}
//           {property.images?.length > 0 && (
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4">Property Images</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {property.images.map((url) => (
//                   <div key={url} className="overflow-hidden rounded-lg">
//                     <img
//                       src={url}
//                       alt="Property"
//                       className="w-full h-48 object-cover hover:scale-105 transition duration-300"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Videos */}
//           {(property.sampleFlatVideo || property.localityVideo) && (
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4">Virtual Tours</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.sampleFlatVideo && (
//                   <div>
//                     <h4 className="text-lg font-medium mb-2 flex items-center">
//                       <FaVideo className="text-blue-500 mr-2" />
//                       Sample Flat Video
//                     </h4>
//                     <iframe
//                       className="w-full h-64 rounded-lg shadow"
//                       src={property.sampleFlatVideo.replace("watch?v=", "embed/")}
//                       allowFullScreen
//                     />
//                   </div>
//                 )}
//                 {property.localityVideo && (
//                   <div>
//                     <h4 className="text-lg font-medium mb-2 flex items-center">
//                       <FaMapMarkedAlt className="text-blue-500 mr-2" />
//                       Locality Video
//                     </h4>
//                     <iframe
//                       className="w-full h-64 rounded-lg shadow"
//                       src={property.localityVideo.replace("watch?v=", "embed/")}
//                       allowFullScreen
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Amenities */}
//           {property.amenities?.length > 0 && (
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4 flex items-center">
//               <FaListUl className="text-blue-500 mr-2" />

//                 Amenities
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {property.amenities.map((item, i) => (
//                   <span
//                     key={i}
//                     className="px-3 py-1 bg-gray-200 rounded-full text-sm flex items-center amenity-tag"
//                   >
//                     {item === "Swimming Pool" && <FaSwimmingPool className="text-blue-500 mr-2" />}
//                     {item === "Gym" && <FaDumbbell className="text-blue-500 mr-2" />}
//                     {item === "Parking" && <FaParking className="text-blue-500 mr-2" />}
//                     {item === "WiFi" && <FaWifi className="text-blue-500 mr-2" />}
//                     {item === "Restaurant" && <FaUtensils className="text-blue-500 mr-2" />}
//                     {!(["Swimming Pool", "Gym", "Parking", "WiFi", "Restaurant"].includes(item)) && (
//                       <FaListUl className="text-blue-500 mr-2" />

//                     )}
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Contact Agent Button */}
//           <div className="text-center mt-8">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
//               <FaPhoneAlt className="mr-2 inline-block" />
//               Contact Agent
//             </button>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold mb-4">TheSampleFlat</h3>
//               <p className="text-gray-400">
//                 Find your dream home with our curated selection of premium properties across India.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
//                 <li><Link href="/properties" className="text-gray-400 hover:text-white transition">Properties</Link></li>
//                 <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
//                 <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li className="flex items-center"><FaPhoneAlt className="mr-2" /> +91 9876543210</li>
//                 <li className="flex items-center"><i className="fas fa-envelope mr-2"></i> info@thesampleflat.com</li>
//                 <li className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Mumbai, India</li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
//             <p>© 2025 TheSampleFlat. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



// app/listing/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import MapClientWrapper from "@/components/map/MapClientWrapper";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    return <div className="p-6">Property not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <div className="text-gray-600">₹{property.price.toLocaleString()}</div>
      <div className="flex gap-4 text-gray-700">
        <div>{property.bhk} BHK</div>
        <div>
          {property.city}, {property.state}
        </div>
        {property.possessionDate && (
          <div>Possession: {property.possessionDate}</div>
        )}
      </div>

      {/* 🖼️ Image Gallery */}
      {property.images.length > 0 && (
        <div className="flex overflow-x-auto gap-2">
          {property.images.map((src, i) => (
            <div key={i} className="relative w-80 h-56 flex-shrink-0">
              <Image src={src} alt={`img-${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* 🎥 Videos */}
      {property.sampleFlatVideo && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Sample Flat</h2>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={property.sampleFlatVideo}
              allowFullScreen
            />
          </div>
        </div>
      )}
      {property.buildingVideo && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Building & Locality</h2>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={property.buildingVideo}
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 🗺️ Mini Map */}
      {property.latitude && property.longitude && (
        <div className="h-64">
          <MapClientWrapper properties={[property]} />
        </div>
      )}

      {/* 📞 Call & Appointment Buttons */}
      <div className="flex gap-4 mt-4">
        <a
          href="tel:+911234567890"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          📞 Call Seller
        </a>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Schedule Visit / Video Call
        </button>
        <a
          href={`/listing/${property.id}/edit`}
          className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded"
        >
          ✏️ Edit Listing
        </a>
        
      </div>

      {/* 📄 Description */}
      <div className="mt-6 prose">{property.description}</div>
    </div>
  );
}
