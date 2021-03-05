import React, { useState, FC } from 'react';
import './AddItem.scss';
import { Modal } from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

interface Props {
  closeModal: () => void;
  title: string;
  isLarge?: boolean;
}

const AddItem: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { closeModal, children, title, isLarge } = props;

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        closeModal();
      }}
      style={{ zIndex: 100 }}
    >
      <div className={isLarge ? 'addItem largeSize' : 'addItem'}>
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
