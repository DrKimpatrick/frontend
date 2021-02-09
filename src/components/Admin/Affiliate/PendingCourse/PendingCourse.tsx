import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  AdminLayout as Layout,
  SideLoading,
  AffiliateItem,
  OnPageChangeCallback
} from 'components/Reusable';
import { useSelector, useDispatch } from 'react-redux';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { listCourseByStatus } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { withRouter, useLocation } from 'react-router-dom';
import { Routes } from 'utils/routes';
import { setActivePath } from 'redux/actions/user';

const PendingCourse: FC = () => {
  const itemPerPage = 5;

  const [loading = false, setLoading] = useState<boolean>();

  const [offset = 0, setOffset] = useState<number>();

  const [page = 0, setPage] = useState<number>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { pendingCourse } = state.courses;

    return { pendingCourse };
  });

  const { pendingCourse } = reducer;

  const loadItems = useCallback(() => {
    listCourseByStatus({
      data: { offset, limit: itemPerPage },
      types: CourseTypes.ListPendingCourse,
      status: CourseStatus.Pending
    })(dispatch);

    setLoading(true);
  }, [dispatch, offset]);

  useEffect(() => {
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (pendingCourse) {
      setLoading(false);
    }
  }, [pendingCourse]);

  const pageChange: OnPageChangeCallback = value => {
    const selectedPage = value.selected;

    const startIndex = Math.ceil(selectedPage * itemPerPage);

    setOffset(startIndex);
    setPage(selectedPage);
  };

  useEffect(() => {
    loadItems();
  }, [loadItems, offset]);

  if (loading) {
    return (
      <Layout>
        <div style={{ marginTop: 200 }}>
          <SideLoading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      topMenu={[
        { name: 'Affiliates', url: Routes.Affiliate },
        { name: 'Pending courses', url: Routes.PendingCourse }
      ]}
      showCourse
    >
      <div className="acceptedCourse">
        {pendingCourse && pendingCourse.courses && (
          <AffiliateItem
            items={pendingCourse.courses}
            totalItems={pendingCourse.totalItems}
            currentPage={page}
            itemPerPage={itemPerPage}
            pageChange={pageChange}
            setPage={setPage}
            setOffset={setOffset}
            offset={offset}
            type={CourseTypes.ListPendingCourse}
            showFilter
          />
        )}
      </div>
    </Layout>
  );
};

export default withRouter(PendingCourse);
