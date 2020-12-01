import React, { FC, useEffect } from 'react';
import './Affiliate.scss';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AdminLayout, SideLoading } from 'components/Reusable';
import { listCourseByStatus } from 'redux/actions/course';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { RootState } from 'redux/store';
import { setActivePath } from 'redux/actions/user';

const Affiliate: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const {
      acceptedCourse,
      declinedCourse,
      pendingCourse,
      loading
    } = state.courses;

    return { acceptedCourse, declinedCourse, pendingCourse, loading };
  });

  const { acceptedCourse, pendingCourse, declinedCourse } = reducer;

  useEffect(() => {
    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.ListAcceptedCourse,
      status: CourseStatus.Accepted
    })(dispatch);

    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.ListPendingCourse,
      status: CourseStatus.Pending
    })(dispatch);

    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.ListDeclinedCourse,
      status: CourseStatus.Declined
    })(dispatch);

    setActivePath(location.pathname)(dispatch);
  }, [dispatch, location.pathname]);

  if (reducer.loading) {
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
      <ul className="userItems affiliates">
        {acceptedCourse && (
          <li>
            <div className="details">
              <h1>Accepted</h1>
              {acceptedCourse.lastUpdatedItem && (
                <h6>
                  Updated on{' '}
                  {new Date(
                    acceptedCourse.lastUpdatedItem.updatedAt
                  ).toDateString()}
                </h6>
              )}
              <button
                type="button"
                onClick={() => history.push('/accepted-course')}
              >
                View
              </button>
            </div>
            <div className="action">
              <h5 className="accepted">
                {acceptedCourse.totalItems > 99
                  ? '99+'
                  : acceptedCourse.totalItems}
              </h5>
            </div>
          </li>
        )}
        {pendingCourse && (
          <li>
            <div className="details">
              <h1>Pending</h1>
              {pendingCourse.lastUpdatedItem && (
                <h6>
                  Updated on{' '}
                  {new Date(
                    pendingCourse.lastUpdatedItem.updatedAt
                  ).toDateString()}
                </h6>
              )}
              <button
                type="button"
                onClick={() => history.push('/pending-course')}
              >
                View
              </button>
            </div>
            <div className="action">
              <h5 className="pending">
                {pendingCourse.totalItems > 99
                  ? '99+'
                  : pendingCourse.totalItems}
              </h5>
            </div>
          </li>
        )}
        {declinedCourse && (
          <li>
            <div className="details">
              <h1>Declined</h1>
              {declinedCourse.lastUpdatedItem && (
                <h6>
                  Updated on{' '}
                  {new Date(
                    declinedCourse.lastUpdatedItem.updatedAt
                  ).toDateString()}
                </h6>
              )}
              <button
                type="button"
                onClick={() => history.push('/declined-course')}
              >
                View
              </button>
            </div>
            <div className="action">
              <h5 className="declined">
                {declinedCourse.totalItems > 99
                  ? '99+'
                  : declinedCourse.totalItems}
              </h5>
            </div>
          </li>
        )}
      </ul>
    </AdminLayout>
  );
};

export default withRouter(Affiliate);
