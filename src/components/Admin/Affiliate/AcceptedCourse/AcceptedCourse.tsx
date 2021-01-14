import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  AdminLayout as Layout,
  AffiliateItem,
  SideLoading,
  OnPageChangeCallback
} from 'components/Reusable';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { listCourseByStatus } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { Routes } from 'utils/routes';
import { setActivePath } from 'redux/actions/user';

const AcceptedCourse: FC = () => {
  const itemPerPage = 5;

  const [loading = false, setLoading] = useState<boolean>();

  const [offset = 0, setOffset] = useState<number>();

  const [page = 0, setPage] = useState<number>();

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const { acceptedCourse, loading: loadingData } = state.courses;

    return { acceptedCourse, loadingData };
  });

  const { acceptedCourse } = reducer;

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

    setLoading(true);
  }, [loadItems, offset]);

  useEffect(() => {
    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (acceptedCourse) {
      setLoading(false);
    }
  }, [acceptedCourse]);

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
        { name: 'Accepted courses', url: Routes.AcceptedCourse }
      ]}
      showCourse
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
