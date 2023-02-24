import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) onSearch(value);
    else onSearch('')
  };

  return (
    <div className="relative text-gray-600">
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-72"
      />
    </div>
  );
};

export default SearchBar;
