"use client"

import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="What do you want to learn today?"
        className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-lg"
      />
      <button className="absolute inset-y-0 right-0 pr-2 flex items-center">
        <span className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
          Search
        </span>
      </button>
    </div>
  );
};

export default SearchSection;
