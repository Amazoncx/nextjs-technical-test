import React from 'react';

/**
 * SearchBar component that allows users to input a search query.
 * It updates the parent component via the `onSearch` callback whenever the query changes.
 * 
 * @param {string} searchQuery - The current search query.
 * @param {(query: string) => void} onSearch - The function to handle search query updates.
 * @returns {JSX.Element} - A JSX element representing the search bar.
 */
interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="input input-bordered w-full"
        placeholder="Search products..."
        aria-label="Search products by name"
      />
    </div>
  );
};

export default SearchBar;
