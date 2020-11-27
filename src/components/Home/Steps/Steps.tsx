import React, { FC } from 'react';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

type stepsProps = {
  step: number;
  details: string;
};

const Steps: FC<stepsProps> = ({ step, details }) => {
  return (
    <div data-testid="step" className="">
      <div className="flex justify-center">
        <PeopleOutlineIcon className="w-5/12 h-full overide" />
      </div>
      <p className="flex justify-center text-gray-600 text-base font-semibold">
        Step {step}
      </p>
      <div className="text-gray-800 font-normal text-sm flex justify-center pr-2 pl-2 mt-2">
        {details}
      </div>
    </div>
  );
};

export default Steps;
