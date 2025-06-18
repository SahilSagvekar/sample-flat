"use client";

import { useState } from "react";

export default function SearchBar({  }) {
  const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (onSearch) onSearch(query);
//   };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
      <form
        // onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for city, locality or property..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
