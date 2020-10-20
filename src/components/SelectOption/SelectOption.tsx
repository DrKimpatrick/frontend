import React, { FC } from 'react';
import Select from 'react-select';
import { selectStyles, multiSelectStyles } from './SelectOption.style';

type props = {
  isMulti?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
};
const SelectOption: FC<props> = ({ isMulti, placeholder, options }: any) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      styles={isMulti ? multiSelectStyles : selectStyles}
      isMulti={isMulti}
      className="outline-none placeholder-textGray placeholder-opacity-50"
    />
  );
};

export default SelectOption;
