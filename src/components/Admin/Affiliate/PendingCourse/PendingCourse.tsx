import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  AdminLayout as Layout,
  SplashScreen,
  AffiliateItem,
  OnPageChangeCallback
} from 'components/Reusable';
import { useSelector, useDispatch } from 'react-redux';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { listCourseByStatus } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { withRouter } from 'react-router-dom';
import { RouteUrl } from 'utils/routes';

const PendingCourse: FC = () => {
  const itemPerPage = 5;

  const [offset = 0, setOffset] = useState<number>();

  const [page = 0, setPage] = useState<number>();

  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { loading, pendingCourse } = state.courses;

    return { loading, pendingCourse };
  });

  const { pendingCourse, loading } = reducer;

  const loadItems = useCallback(() => {
    listCourseByStatus({
      data: { offset, limit: itemPerPage },
      types: CourseTypes.ListPendingCourse,
      status: CourseStatus.Pending
    })(dispatch);
  }, [dispatch, offset]);

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
    return <SplashScreen />;
  }

  return (
    <Layout
      topMenu={[
        { name: 'Affiliates', url: RouteUrl.Affiliate },
        { name: 'Pending courses', url: RouteUrl.PendingCourse }
      ]}
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
          />
        )}
      </div>
    </Layout>
  );
};

export default withRouter(PendingCourse);
