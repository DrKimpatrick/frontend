import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HrAdminLayout as Layout,
  HrListItem,
  SideLoading,
  NoItemFound
} from 'components/Reusable';
import { UserRole } from 'redux/action-types/user';
import { listUsedCode } from 'redux/actions/hrAdmin';
import { RootState } from 'redux/store';
import { map } from 'lodash';
import '../../HrAdmin/HrAdmin.scss';

const SubsidyStudent = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, usedCode } = state.hrAdmin;

    return { loading, usedCode };
  });

  const { usedCode, loading } = reducer;

  useEffect(() => {
    listUsedCode()(dispatch);
  }, [dispatch]);

  const displayUsedCode = useMemo(() => {
    if (usedCode && usedCode.length > 0) {
      const used: { name: string; link: string }[] = [];

      map(usedCode, item => {
        if (item.usedBy && item.usedBy.length > 0) {
          map(item.usedBy, user => {
            used.push({ name: user.username, link: '#' });
          });
        }
        return undefined;
      });

      if (used.length > 0) {
        return (
          <ul className="ulList w-full flex flex-column bg-card-preview">
            {used.map((item, index) => (
              <HrListItem name={item.name} key={index} />
            ))}
          </ul>
        );
      }
      return <NoItemFound />;
    }
    return null;
  }, [usedCode]);

  if (loading) {
    return (
      <Layout role={UserRole.EducationUser}>
        <div style={{ marginTop: '30px' }}>
          <SideLoading />
        </div>
      </Layout>
    );
  }

  if (!usedCode) {
    return null;
  }

  return (
    <Layout role={UserRole.EducationUser}>
      <div className="hrAdminDashboard">
        {displayUsedCode}
        {usedCode.length <= 0 && <NoItemFound />}
      </div>
    </Layout>
  );
};

export default SubsidyStudent;
