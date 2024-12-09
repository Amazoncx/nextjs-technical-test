"use client";

import { SearchSVG, XSVG } from "./svg.index";
import useSearchbar from "@/hooks/useSearchbar";

export default function Searchbar() {
  const { search, setSearch, handleSearch, handleRemove } = useSearchbar();

  return (
    <section className="w-full flex justify-center items-center">
      <form onSubmit={handleSearch}>
        <div className="relative flex justify-center items-center gap-x-2 py-2 pr-4 pl-2 input input-bordered">
          <label htmlFor="search" className="text-gray-500">
            {SearchSVG}
          </label>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none dark:text-gray-400 dark:placeholder-gray-400"
          />
          {search && (
            <button
              type="reset"
              onClick={handleRemove}
              className="absolute right-3 text-red-500 hover:text-red-400 dark:text-red-400 border-none focus:outline-none dark:hover:text-red-300"
            >
              {XSVG}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
