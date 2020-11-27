import React, { FC, useState } from 'react';
import { Modal, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import './Warning.scss';

interface Props {
  message: string;
  cancel: () => void;
  accept: () => void;
}

const useStyles = makeStyles(() => ({
  deleteIcon: {
    fontSize: 37,
    color: '#8c8b8b'
  }
}));

const Warning: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { message, cancel, accept } = props;

  // @jest-ignore
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        cancel();
      }}
      className="warningModal"
      tabIndex={0}
    >
      <div className="warning">
        <div className="flex flex-row align-center">
          <div>
            <Delete className={classes.deleteIcon} />
          </div>
          <div className="message">{message}</div>
        </div>
        <div className="buttons">
          <Button type="button" onClick={() => cancel()} className="no">
            No
          </Button>
          <Button type="button" onClick={() => accept()} className="yes">
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Warning;
