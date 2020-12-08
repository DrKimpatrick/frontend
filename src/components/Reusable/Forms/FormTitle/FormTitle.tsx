import React, { FC } from 'react';
import { ArrowBackTwoTone } from '@material-ui/icons';
import './FormTitle.scss';

type props = {
  showBackArrow?: boolean;
  title: string;
};

const FormTitle: FC<props> = ({ showBackArrow = false, title }) => {
  return (
    <div className="form-title flex h-auto my-8">
      {showBackArrow && (
        <div className="form-title-back-arrow flex items-center justify-center cursor-pointer mr-8">
          <ArrowBackTwoTone />
        </div>
      )}
      <h1 className="font-bold text-xl form-title-text">{title}</h1>
    </div>
  );
};

export default FormTitle;
