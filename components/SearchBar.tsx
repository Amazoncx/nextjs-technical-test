import { CleanIcon } from '@/assets/icons/clean';
import { SearchIcon } from '@/assets/icons/search';
import { SearchBarProps } from '@/types/searchbar';
import React from 'react';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder, value}) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const clearSearch = () => {
    onSearch('');
  };
  return (
    <label className="input input-bordered flex items-center gap-2 w-full">
        <input
            type="text"
            className="grow"
            placeholder={placeholder}
            value={value}
            onChange={handleSearch}
        />
        {value ? (
            <button onClick={clearSearch} className="ml-2">
                <CleanIcon/>
            </button>
        ):
        <SearchIcon/>
        }   
    </label>
  );
};

export default SearchBar;