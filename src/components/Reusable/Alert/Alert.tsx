import React, { FC } from 'react';
import MatAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export enum AlertLevel {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success'
}

interface AlertPropTypes {
  message: string | undefined;
  show: boolean;
  severity: AlertLevel | undefined;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

const Alert: FC<AlertPropTypes> = ({ message, show, severity, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={show}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <MatAlert onClose={onClose} severity={severity}>
        {message}
      </MatAlert>
    </Snackbar>
  );
};

export default Alert;
