// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";

// export default function BuyerProfilePage() {
//   const { user, isLoaded } = useUser();
//   const [profile, setProfile] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<any>({});
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       const res = await axios.get("/api/buyer/profile");
//       setProfile(res.data);
//       setFormData(res.data);
//       if (res.data?.role === "admin") setIsAdmin(true);
//     };

//     fetchProfile();
//   }, [user]);

//   const isOwner = user?.id === profile?.clerkId;

//   const canEdit = isOwner || isAdmin;

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prev: any) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post("/api/buyer/profile", formData);
//       alert("Profile updated!");
//       setIsEditing(false);
//       setProfile(formData);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile");
//     }
//   };

//   if (!isLoaded || !profile) return <p>Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto py-10 space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Your Buyer Profile</h2>
//         {canEdit && !isEditing && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-[#2BBBC1] text-white px-4 py-2 rounded-md"
//           >
//             Edit
//           </button>
//         )}
//       </div>

//       <div className="space-y-4">
//         {renderInput("Name", "name", formData.name, handleChange, isEditing)}
//         {renderInput("Email", "email", formData.email, handleChange, false, true)}
//         {renderInput("Phone", "phone", formData.phone, handleChange, isEditing)}
//         {renderInput("City", "city", formData.city, handleChange, isEditing)}
//         {renderInput("Address", "location", formData.location, handleChange, isEditing)}
//       </div>

//       {isEditing && (
//         <div className="flex gap-3">
//           <button
//             onClick={handleSave}
//             className="bg-[#2BBBC1] text-white px-6 py-2 rounded"
//           >
//             Save
//           </button>
//           <button
//             onClick={() => {
//               setFormData(profile);
//               setIsEditing(false);
//             }}
//             className="border border-gray-300 px-6 py-2 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// function renderInput(
//   label: string,
//   name: string,
//   value: string,
//   onChange: any,
//   editable = false,
//   readOnly = false
// ) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <input
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         readOnly={!editable || readOnly}
//         className={`w-full px-3 py-2 border rounded-md ${
//           editable ? "bg-white" : "bg-gray-100"
//         }`}
//       />
//     </div>
//   );
// }
