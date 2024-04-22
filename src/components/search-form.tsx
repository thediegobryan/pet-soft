"use client";

import { useSearchContext } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleChangeSearchQuery } = useSearchContext();
  return (
    <form className="w-full h-full">
      <input
        placeholder="Search Pets"
        className="placeholder:text-white/50 w-full h-full bg-white/20 rounded-md px-5 outline-none transisition focus:bg-white/50 hover:bg-white/50"
        type="search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
