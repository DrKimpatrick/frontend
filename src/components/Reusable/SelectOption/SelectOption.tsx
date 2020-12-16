import React, { FC } from 'react';
import Select from 'react-select';
import { selectStyles, multiSelectStyles } from './SelectOption.style';

type props = {
  isMulti?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChangeValue: any;
};
const SelectOption: FC<props> = ({
  isMulti,
  placeholder,
  options,
  onChangeValue
}: any) => {
  return (
    <Select
      placeholder={placeholder}
      options={options}
      styles={isMulti ? multiSelectStyles : selectStyles}
      isMulti={isMulti}
      className="outline-none placeholder-gray-texts placeholder-opacity-50"
      onChange={onChangeValue}
    />
  );
};

export default SelectOption;
