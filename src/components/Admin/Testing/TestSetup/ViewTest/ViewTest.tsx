import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import {
  AdminLayout,
  SideLoading,
  Card,
  TestHeadline
} from 'components/Reusable';
import { setActivePath } from 'redux/actions/user';
import { getAllTests } from 'redux/actions/testsetup';

const ViewTests: FC = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { getAllTestLoading, tests } = state.tests;

    return { loading: getAllTestLoading, tests };
  });

  useEffect(() => {
    getAllTests()(dispatch);
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location]);

  const { loading, tests } = reducer;

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="">
        <div className="reviewPage">
          <TestHeadline />
          <Card data={tests} inviteCandidates verificationStatus />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewTests;
