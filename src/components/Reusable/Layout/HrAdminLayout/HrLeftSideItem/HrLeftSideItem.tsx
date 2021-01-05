import React from 'react';
import './HrLeftSideItem.scss';

export interface HrLeftSideType {
  header: {
    name: string;
    icon: any;
  };
  list: {
    name: string;
    rightItem?: string;
  }[];
}
interface Props {
  item: HrLeftSideType;
}

const HrLeftSideItem = (props: Props) => {
  const { item } = props;

  const { header, list } = item;

  return (
    <div className="item">
      <div className="flex items-center w-full">
        {header.icon}
        <h5 className="mx-2 h5">{header.name}</h5>
      </div>
      <ul className="w-full flex flex-column bg-card-preview">
        {list.map((li, index) => (
          <li
            className="flex p-1 px-3 pr-2 rounded-sm items-center justify-between w-full"
            key={index}
          >
            <h5 data-testid="h5Name">{li.name}</h5>
            {li.rightItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HrLeftSideItem;
