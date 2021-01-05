import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HrAdminLayout as Layout,
  HrListItem,
  SideLoading,
  NoItemFound
} from 'components/Reusable';
import { listUsedCode } from 'redux/actions/hrAdmin';
import { RootState } from 'redux/store';
import { UserRole } from 'redux/action-types/user';

const HrAdminCode = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, usedCode } = state.hrAdmin;

    return { loading, usedCode };
  });

  const { usedCode, loading } = reducer;

  useEffect(() => {
    listUsedCode()(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <Layout role={UserRole.RecruitmentAdmin}>
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
    <Layout role={UserRole.RecruitmentAdmin}>
      <div className="hrAdminDashboard">
        {usedCode && usedCode.length > 0 && (
          <ul className="ulList w-full flex flex-column bg-card-preview">
            {usedCode.map((item, index) => (
              <HrListItem name={item.coupon} key={index} />
            ))}
          </ul>
        )}
        {usedCode.length <= 0 && <NoItemFound />}
      </div>
    </Layout>
  );
};

export default HrAdminCode;
