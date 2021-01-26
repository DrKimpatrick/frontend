import React from 'react';
import { Link } from '@material-ui/icons';
import './HrListItem.scss';

interface Props {
  name: string;
  link?: string;
  onclickHandler?: () => void;
}

const AdminList = (props: Props) => {
  const { name, link, onclickHandler } = props;

  return (
    <li className="adList py-2 py-2 rounded-sm" onClick={onclickHandler}>
      <h5>{name}</h5>
      {link && (
        <div className="link">
          <Link />
        </div>
      )}
    </li>
  );
};

export default AdminList;
