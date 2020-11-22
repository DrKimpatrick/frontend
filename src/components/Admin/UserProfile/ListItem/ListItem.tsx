import React from 'react';
import './styles.scss';
import { ArrowDropDown } from '@material-ui/icons';

export interface ListItemProps {
  id: string;
  name: string;
  status?: string;
}

interface Props {
  listItem: ListItemProps[];
}

const options = [
  { label: 'Verified', value: 'Verified' },
  { label: 'Not Verified', value: 'Not Verified' }
];

const ListItem = (props: Props) => {
  const { listItem } = props;

  return (
    <div className="listItems">
      <ul className="p-0 m-2 bg-card-preview">
        {listItem.length > 0 &&
          listItem.map((item, index) => (
            <li className="py-2 py-2 rounded-sm" key={index}>
              <h5>{item.name}</h5>
              <div className="selectItems">
                <select
                  value={item.status ? item.status : ''}
                  onChange={e => e.target.value}
                >
                  {options.map((opt, i) => (
                    <option value={opt.value} key={i}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="customArrow">
                  <ArrowDropDown />
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListItem;
