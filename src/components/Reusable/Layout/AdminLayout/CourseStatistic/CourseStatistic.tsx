import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import { listCourseByStatus } from 'redux/actions/course';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { Routes } from 'utils/routes';
import './CourseStatistic.scss';

const CourseStatistic = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const {
      numberOfAcceptedCourse,
      numberOfDeclinedCourse,
      numberOfPendingCourse
    } = state.courses;

    return {
      numberOfAcceptedCourse,
      numberOfDeclinedCourse,
      numberOfPendingCourse
    };
  });

  const {
    numberOfAcceptedCourse,
    numberOfDeclinedCourse,
    numberOfPendingCourse
  } = reducer;

  useEffect(() => {
    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.NumberOfAcceptedCourse,
      status: CourseStatus.Accepted
    })(dispatch);

    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.NumberOfPendingCourse,
      status: CourseStatus.Pending
    })(dispatch);

    listCourseByStatus({
      data: { offset: 0, limit: 1 },
      types: CourseTypes.NumberOfDeclinedCourse,
      status: CourseStatus.Declined
    })(dispatch);
  }, [dispatch]);

  return (
    <div className="courseStatistic w-full flex items-center">
      <div className="export">
        <button type="button" className="flex items-center">
          <Publish />
          <h5>Export</h5>
        </button>
      </div>
      <div className="statistic">
        <ul>
          <li>
            <Link to={Routes.AcceptedCourse}>
              <small
                style={{
                  color:
                    location.pathname === Routes.AcceptedCourse
                      ? 'black'
                      : '#a1a1a1'
                }}
              >
                Accepted Courses:
              </small>
              <small style={{ color: '#4d9b62' }} className="font-bold mx-1">
                {numberOfAcceptedCourse && numberOfAcceptedCourse > 99
                  ? '99+'
                  : numberOfAcceptedCourse}
              </small>
            </Link>
          </li>
          <li>
            <Link to={Routes.PendingCourse}>
              <small
                style={{
                  color:
                    location.pathname === Routes.PendingCourse
                      ? 'black'
                      : '#a1a1a1'
                }}
              >
                Pending Courses:
              </small>
              <small style={{ color: '#1437b1' }} className="font-bold mx-1">
                {numberOfPendingCourse && numberOfPendingCourse > 99
                  ? '99+'
                  : numberOfPendingCourse}
              </small>
            </Link>
          </li>

          <li>
            <Link to={Routes.DeclinedCourse}>
              <small
                style={{
                  color:
                    location.pathname === Routes.DeclinedCourse
                      ? 'black'
                      : '#a1a1a1'
                }}
              >
                Declined Courses:
              </small>
              <small style={{ color: '#8f2517' }} className="font-bold mx-1">
                {numberOfDeclinedCourse && numberOfDeclinedCourse > 99
                  ? '99+'
                  : numberOfDeclinedCourse}
              </small>
            </Link>
          </li>

          <li>
            <button type="button">Create Affiliate</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseStatistic;
