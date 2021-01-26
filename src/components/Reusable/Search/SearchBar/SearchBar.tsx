import React, { FC } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.scss';

type props = {
  searchTerm: string;
  onSearchChange: (event: any) => void;
  placeholder?: string;
  onFocus?: () => void;
  onClickSearchIcon?: () => void;
};

const SearchBar: FC<props> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search',
  onFocus,
  onClickSearchIcon
}) => {
  return (
    <div className="flex search">
      <SearchIcon className="search-icon" onClick={onClickSearchIcon} />
      <input
        type="search"
        className="border-2 outline-none bg-transparent rounded-sm w-full pl-10 pr-3 text-gray-texts input-height search-input"
        value={searchTerm}
        onChange={onSearchChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
