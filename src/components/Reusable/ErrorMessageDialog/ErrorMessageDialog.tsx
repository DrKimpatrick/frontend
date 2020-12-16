import React, { FC } from 'react';
import InfoIcon from '@material-ui/icons/Info';

interface MessageDialogProps {
  title: string;
  message: string;
}

const ErrorMessageDialog: FC<MessageDialogProps> = ({ title, message }) => {
  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <div className="mb-4">
        <span className="text-red-600">
          <InfoIcon color="inherit" style={{ fontSize: 60 }} />
        </span>
      </div>
      <div className="mb-4 flex">
        <span className="text-2xl text-center text-red-600">{title}</span>
      </div>
      <div className="mb-4 flex">
        <span className="text-sm text-center">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessageDialog;
