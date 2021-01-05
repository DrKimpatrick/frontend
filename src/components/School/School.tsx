import React, { useState } from 'react';
import {
  HrAdminLayout as Layout,
  HrListItem,
  HorizontalPagination as Pagination
} from 'components/Reusable';
import { UserRole } from 'redux/action-types/user';
import '../HrAdmin/HrAdmin.scss';

const dummyList = [
  {
    name: 'gratien',
    link: 'http://o.com'
  },
  {
    name: 'gratien',
    link: 'http://o.com'
  },
  {
    name: 'gratien',
    link: 'http://o.com'
  }
];
const SchoolDashboard = () => {
  const [page = 0, setPage] = useState<number>();

  const itemPerPage = 4;

  return (
    <Layout role={UserRole.EducationUser}>
      <div className="hrAdminDashboard">
        <ul className="ulList w-full flex flex-column bg-card-preview">
          {dummyList.map((item, index) => (
            <HrListItem name={item.name} link={item.link} key={index} />
          ))}
        </ul>
        <div className="my-10 w-full flex items-center justify-center">
          <Pagination
            pageCount={itemPerPage}
            onPageChange={setPage}
            page={page}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SchoolDashboard;
