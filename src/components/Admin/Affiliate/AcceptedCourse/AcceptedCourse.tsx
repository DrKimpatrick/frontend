import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  AdminLayout as Layout,
  AffiliateItem,
  SplashScreen,
  OnPageChangeCallback
} from 'components/Reusable';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { listCourseByStatus } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { RouteUrl } from 'utils/routes';
import { setActivePath } from 'redux/actions/user';

const AcceptedCourse: FC = () => {
  const itemPerPage = 5;

  const [offset = 0, setOffset] = useState<number>();

  const [page = 0, setPage] = useState<number>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { acceptedCourse, loading } = state.courses;

    return { acceptedCourse, loading };
  });

  const { acceptedCourse, loading } = reducer;

  const loadItems = useCallback(() => {
    listCourseByStatus({
      data: { offset, limit: itemPerPage },
      types: CourseTypes.ListAcceptedCourse,
      status: CourseStatus.Accepted
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

  useEffect(() => {
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Layout
      topMenu={[
        { name: 'Affiliates', url: RouteUrl.Affiliate },
        { name: 'Accepted courses', url: RouteUrl.AcceptedCourse }
      ]}
    >
      <div className="acceptedCourse">
        {acceptedCourse && acceptedCourse.courses && (
          <AffiliateItem
            items={acceptedCourse.courses}
            totalItems={acceptedCourse.totalItems}
            currentPage={page}
            itemPerPage={itemPerPage}
            pageChange={pageChange}
            setPage={setPage}
            setOffset={setOffset}
            offset={offset}
            type={CourseTypes.ListAcceptedCourse}
          />
        )}
      </div>
    </Layout>
  );
};

export default AcceptedCourse;
