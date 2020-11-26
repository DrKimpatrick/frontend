import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  AdminLayout as Layout,
  SplashScreen,
  OnPageChangeCallback,
  AffiliateItem
} from 'components/Reusable';
import { useSelector, useDispatch } from 'react-redux';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { listCourseByStatus } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { withRouter, useLocation } from 'react-router-dom';
import { RouteUrl } from 'utils/routes';
import { setActivePath } from 'redux/actions/user';

const DeclinedCourse: FC = () => {
  const itemPerPage = 5;

  const [offset = 0, setOffset] = useState<number>();

  const [page = 0, setPage] = useState<number>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { loading, declinedCourse } = state.courses;

    return { loading, declinedCourse };
  });

  const { declinedCourse, loading } = reducer;

  const loadItems = useCallback(() => {
    listCourseByStatus({
      data: { offset, limit: itemPerPage },
      types: CourseTypes.ListDeclinedCourse,
      status: CourseStatus.Declined
    })(dispatch);
  }, [dispatch, offset]);

  useEffect(() => {
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

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
        { name: 'Declined courses', url: RouteUrl.DeclinedCourse }
      ]}
    >
      <div className="acceptedCourse">
        {declinedCourse && declinedCourse.courses && (
          <AffiliateItem
            pageChange={pageChange}
            currentPage={page}
            items={declinedCourse.courses}
            itemPerPage={itemPerPage}
            totalItems={declinedCourse.totalItems}
            setPage={setPage}
            setOffset={setOffset}
            offset={offset}
            type={CourseTypes.ListDeclinedCourse}
          />
        )}
      </div>
    </Layout>
  );
};

export default withRouter(DeclinedCourse);
