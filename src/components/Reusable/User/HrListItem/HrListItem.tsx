import React from 'react';
import { Link } from '@material-ui/icons';
import './HrListItem.scss';

interface Props {
  name: string;
  link?: string;
}

const AdminList = (props: Props) => {
  const { name, link } = props;

  return (
    <li className="adList py-2 py-2 rounded-sm">
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
