import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Publish } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'redux/store';
import { listCourseByStatus } from 'redux/actions/course';
import { CourseTypes, CourseStatus } from 'redux/action-types/course';
import { Routes } from 'utils/routes';
import './CourseStatistic.scss';
import { AddAffiliateUser, Loader } from 'components/Reusable';
import { AdminReports } from 'components/Reports/AdminReports';
import { PDFDownloadLink } from '@react-pdf/renderer';

const CourseStatistic = () => {
  const [add = false, setAdd] = useState<boolean>();
  const [down, setDown] = useState<boolean>(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const reducer = useSelector((state: RootState) => {
    const {
      numberOfAcceptedCourse,
      numberOfDeclinedCourse,
      numberOfPendingCourse
    } = state.courses;

    const { viewList, specificUser, usersByRole } = state.users;

    return {
      numberOfAcceptedCourse,
      numberOfDeclinedCourse,
      numberOfPendingCourse,
      viewList,
      specificUser,
      usersByRole
    };
  });

  const {
    numberOfAcceptedCourse,
    numberOfDeclinedCourse,
    numberOfPendingCourse,
    viewList,
    specificUser,
    usersByRole
  } = reducer;

  const downLoad = () => {
    setDown(true);
  };

  const headersList = ['courses', 'approved', 'Amount Paid', 'CR'];

  const headers = [
    'Price',
    'Duration',
    'Level',
    'Views',
    'Instructor'
  ];

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
    <>
      {add && <AddAffiliateUser closeModal={() => setAdd(false)} />}
      <div className="courseStatistic w-full flex items-center">
        <div className="export">
          {down && (
            <PDFDownloadLink
              document={
                <AdminReports
                  title="Admin Report"
                  name={viewList ? 'Affiliates' : specificUser?.username}
                  description={
                    viewList
                      ? 'This is the list of all affiliates'
                      : specificUser?.bio
                  }
                  headers={viewList ? headersList : headers}
                  items={viewList ? usersByRole?.users : specificUser?.courses}
                  mainHeader={viewList ? 'Name' : 'Course'}
                  type={viewList ? 'users' : 'course'}
                />
              }
              fileName="ttlc-report.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button
                    data-testid="next-button"
                    className="next-btn text-white font-semibold py-1 px-3 w-32 rounded-sm flex justify-around"
                    type="submit"
                  >
                    <Loader loading={true} command={<></>} />
                  </button>
                ) : (
                  <button type="button" className="flex items-center">
                    <Publish />
                    <h5>Export</h5>
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
          {!down && (
            <button
              type="button"
              className="flex items-center"
              onClick={downLoad}
            >
              <Publish />
              <h5>Generate Report</h5>
            </button>
          )}
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
              <button type="button" onClick={() => setAdd(true)}>
                Create Affiliate
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseStatistic;
