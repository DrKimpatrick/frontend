import React from 'react';
import './CustomInput.scss';

interface Props {
  onChange: (value: string) => void;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  icon: any;
}

const CustomInput = (props: Props) => {
  const { onChange, name, value, placeholder, type, icon } = props;
  return (
    <div className="customInput">
      <input
        type={type || 'text'}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {icon && (
        <div className="customSelectArrow">
          <div className="div">{icon}</div>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
