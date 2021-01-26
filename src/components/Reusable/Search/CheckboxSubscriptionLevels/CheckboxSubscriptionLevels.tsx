import React, { FC } from 'react';
import { Checkbox } from 'components/Reusable';

const subLevels = ['basic', 'standard', 'premium'];

type tValue = {
  label: string;
  checked: boolean;
};

type props = {
  checkboxChangeHandler: (value: tValue) => void;
};

const CheckboxSubscriptionLevels: FC<props> = ({ checkboxChangeHandler }) => {
  return (
    <>
      {subLevels.map(level => (
        <Checkbox
          key={level}
          label={level}
          checkboxChangeHandler={checkboxChangeHandler}
        />
      ))}
    </>
  );
};

export default CheckboxSubscriptionLevels;
