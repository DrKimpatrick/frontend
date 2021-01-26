import React from 'react';
import './styles.scss';
import { ArrowDropDown } from '@material-ui/icons';
import { VerificationStatus } from 'redux/action-types/user';

export interface ListItemProps {
  id: string;
  name: string;
  status?: string;
}

interface Props {
  listItem: ListItemProps;
  hasModifyAccess?: boolean;
  changeStatus?: (value: string) => void;
}

const options = Object.values(VerificationStatus);

const ListItem = (props: Props) => {
  const { listItem: item, changeStatus, hasModifyAccess = true } = props;

  return (
    <li className="py-2 py-2 rounded-sm">
      <h5>{item.name}</h5>
      <div className="selectItems">
        {hasModifyAccess ? (
          <>
            <select
              value={item.status ? item.status : ''}
              onChange={e => {
                if (changeStatus) {
                  changeStatus(e.target.value);
                }
              }}
            >
              {options.map((opt, i) => (
                <option value={opt} key={i}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="customArrow">
              <ArrowDropDown />
            </span>
          </>
        ) : (
          <p className="status">{item.status}</p>
        )}
      </div>
    </li>
  );
};

export default ListItem;
