import React from 'react';
import { Link } from 'react-router-dom';
import './AdminTab.scss';

interface MenuList {
  name: string;
  icon: any;
  onClick: (value: string) => void;
  url: string;
}
interface Props {
  menu: MenuList[];
  currentTab: string;
}

const AdminTab = (props: Props) => {
  const { menu, currentTab } = props;

  return (
    <ul className="adminTab">
      {menu.map((item, index) => (
        <li
          key={index}
          onClick={() => item.onClick(item.url)}
          className={currentTab === item.url ? 'activeTab' : ''}
        >
          <Link to={item.url}>
            {item.icon}
            <h5>{item.name}</h5>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AdminTab;
