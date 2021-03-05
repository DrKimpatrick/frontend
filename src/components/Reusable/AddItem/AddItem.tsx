import React, { useState, FC, useEffect } from 'react';
import './AddItem.scss';
import { Modal } from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';

interface Props {
  closeModal: () => void;
  title: string;
  isLarge?: boolean;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const AddItem: FC<Props> = props => {
  const [open = true, setOpen] = useState<boolean>();

  const { closeModal, children, title, isLarge, isOpen, setIsOpen } = props;

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen || open}
      onClose={() => {
        setOpen(false);
        closeModal();

        if (setIsOpen) {
          setIsOpen(false);
        }

        return undefined;
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

              if (setIsOpen) {
                setIsOpen(false);
              }

              return undefined;
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
