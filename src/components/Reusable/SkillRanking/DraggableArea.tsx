import React, { FC } from 'react';
import { useDrop } from 'react-dnd';

type props = {
  types: string;
  onDrop: Function;
  canDrop?: (item: any) => boolean;
  children: any;
  title?: string;
  titleClass?: string;
};
const DraggableAreaComponent: FC<props> = ({
  types,
  onDrop,
  canDrop,
  children,
  title,
  titleClass
}: any) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: types,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drop: (item, _monitor) => {
      onDrop(item);
    },
    canDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  return (
    <>
      {title && <span className={titleClass}>{title}</span>}
      <div
        ref={dropRef}
        className="mt-2 text-gray-texts w-full p-2 rounded-sm border border-solid border-gray-400 draggle-area"
        style={{
          background: isOver ? '#E6E8EC' : '#fff',
          minHeight: '139px',
          gridAutoRows: 'minmax(min-content, max-content)'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default DraggableAreaComponent;
