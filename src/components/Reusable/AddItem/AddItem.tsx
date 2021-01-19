import React, { useState, FC } from 'react';
import './AddItem.scss';
import { Modal } from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

interface Props {
  closeModal: () => void;
  title: string;
}

const AddItem: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { closeModal, children, title } = props;

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        closeModal();
      }}
      tabIndex={0}
      style={{ zIndex: 100 }}
    >
      <div className="addItem">
        <div className="flex relative h-auto heading">
          <button
            className="back-arrow cursor-pointer"
            onClick={() => {
              closeModal();
              setOpen(false);
            }}
            type="button"
          >
            <ArrowBackTwoTone />
          </button>
          <h1 className="font-bold text-base title">{title}</h1>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default AddItem;
