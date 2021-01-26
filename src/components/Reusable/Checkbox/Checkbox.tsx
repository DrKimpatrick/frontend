import React, { FC, useState } from 'react';
import './Checkbox.scss';

type props = {
  label: string;
  checkboxChangeHandler: (event: any) => void;
};

const Checkbox: FC<props> = ({ label, checkboxChangeHandler }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onCheckboxChange = () => {
    setIsChecked(!isChecked);
    checkboxChangeHandler({ label, checked: !isChecked });
  };

  return (
    <div className="checkbox">
      <label htmlFor={`level-${label}`}>
        <input
          type="checkbox"
          checked={isChecked}
          id={`level-${label}`}
          value={label}
          onChange={onCheckboxChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
