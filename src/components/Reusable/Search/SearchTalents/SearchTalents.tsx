import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SearchBar, CheckboxSubscriptionLevels } from 'components/Reusable';
import {
  getSearchedTalents,
  clearSearchedResults
} from 'redux/actions/hrAdmin';
import './SearchTalents.scss';

type tValue = {
  label: string;
  checked: boolean;
};

const SearchTalents = () => {
  const [searchTerm = '', setSearchTerm] = useState<string>();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const query = `?searchSkillKey=${searchTerm}&subscription=${selectedCheckboxes.join()}`;
    const timeOutId = setTimeout(() => {
      if (searchTerm || selectedCheckboxes.length) {
        getSearchedTalents(query, token)(dispatch);
      } else {
        clearSearchedResults()(dispatch);
      }
    }, 500);
    return () => {
      cancel();
      clearTimeout(timeOutId);
    };
  }, [selectedCheckboxes, searchTerm, dispatch]);

  const onSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const onSearchFocus = () => {
    setSearchFocused(true);
  };

  const onClickSearchIcon = () => {
    setSearchFocused(!searchFocused);
  };

  const checkboxChangeHandler = (value: tValue) => {
    if (selectedCheckboxes.includes(value.label)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(l => l !== value.label));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value.label]);
    }
  };

  return (
    <div className="w-full search-talents">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onFocus={onSearchFocus}
        onClickSearchIcon={onClickSearchIcon}
      />
      {searchFocused && (
        <div className="flex flex-wrap justify-between search-talents-filters">
          <CheckboxSubscriptionLevels
            checkboxChangeHandler={checkboxChangeHandler}
          />
        </div>
      )}
    </div>
  );
};

export default SearchTalents;
