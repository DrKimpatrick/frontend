import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HrAdminLayout as Layout,
  HrListItem,
  SideLoading,
  NoItemFound
} from 'components/Reusable';
import './HrAdmin.scss';
import { listUsedCode } from 'redux/actions/hrAdmin';
import { RootState } from 'redux/store';

const HrAdminDashboard = () => {
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
      <Layout>
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
    <Layout>
      <div className="hrAdminDashboard">
        {usedCode && usedCode.length > 0 && (
          <ul className="ulList w-full flex flex-column bg-card-preview">
            {usedCode.map((item, index) => (
              <HrListItem name={item.coupon} link="#" key={index} />
            ))}
          </ul>
        )}
        {usedCode.length <= 0 && <NoItemFound />}
      </div>
    </Layout>
  );
};

export default HrAdminDashboard;
