import React from 'react';
import './CustomSelect.scss';
import { ExpandMore } from '@material-ui/icons';

export interface CustomSelectOption {
  name: string;
  value: string;
}
interface Props {
  option: CustomSelectOption[];
  onChange: (value: string) => void;
  name: string;
  value: string;
  placeholder?: string;
}

const CustomSelect = (props: Props) => {
  const { onChange, option, name, value, placeholder } = props;
  return (
    <div className="customSelect">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        name={name}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {option &&
          option.length > 0 &&
          option.map((item, index) => (
            <option value={item.value} key={index}>
              {item.name}
            </option>
          ))}
      </select>
      <div className="customSelectArrow">
        <div className="div">
          <ExpandMore />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
