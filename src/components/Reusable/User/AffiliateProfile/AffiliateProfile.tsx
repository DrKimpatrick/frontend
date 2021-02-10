import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AffiliateProfile.scss';
import { CourseLevel } from 'redux/action-types/course';
import {
  Course,
  getCoursesStats,
  getQuarterlyCommission
} from 'redux/actions/course';
import {
  Adb,
  ViewComfy,
  // Grain,
  // Link,
  AllInclusive,
  Apps,
  // PeopleOutline,
  AttachMoney
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { NoItemFound, ListCourseByLevel } from 'components/Reusable';
import { RootState } from 'redux/store';
import { AffiliateStatistic } from './AffiliateStatistic';

interface Props {
  courses?: Course[];
  allowEditDelete?: boolean;
  affiliateId: string;
}

const AffiliateProfile = (props: Props) => {
  const { courses, allowEditDelete, affiliateId } = props;

  const reducer = useSelector((state: RootState) => {
    const {
      coursesStats,
      quarterlyCommission,
      coursesStatsLoading,
      quarterlyCommissionLoading
    } = state.courses;

    return {
      coursesStats,
      quarterlyCommission,
      coursesStatsLoading,
      quarterlyCommissionLoading
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getCoursesStats(affiliateId)(dispatch);
    getQuarterlyCommission(affiliateId)(dispatch);
  }, [dispatch, affiliateId]);

  return (
    <div className="affiliateProfile">
      <div className="affiliateStatistic">
        {reducer.coursesStats &&
          reducer.quarterlyCommission &&
          reducer.coursesStatsLoading === false &&
          reducer.quarterlyCommissionLoading === false && (
            <AffiliateStatistic
              item={[
                {
                  name: 'Total clicks',
                  rate: `${reducer.coursesStats.views}`,
                  icon: <Adb />
                },
                {
                  name: 'Conversion Rate',
                  rate: `${reducer.coursesStats.conversionRate}%`,
                  icon: <ViewComfy />
                },
                // { name: 'Conversation', rate: '20%', icon: <Grain /> },
                {
                  name: 'Quarterly Commission',
                  rate: `${reducer.quarterlyCommission}$`,
                  icon: <Apps />
                },
                {
                  name: 'Total Links',
                  rate: `${reducer.coursesStats.totalCoursesLinks}`,
                  icon: <AllInclusive />
                },
                // { name: 'New Links', rate: '20%', icon: <Link /> },
                {
                  name: 'Amount',
                  rate: `${reducer.coursesStats.totalCoursesPrice}`,
                  icon: <AttachMoney />
                }
              ]}
            />
          )}
        {/* <AffiliateStatistic
          item={[
            { name: 'Converted', rate: '20%', icon: <PeopleOutline /> },
            { name: 'Amount', rate: '20%', icon: <AttachMoney /> },
            { name: 'Amount Paid', rate: '20%', icon: <AttachMoney /> },
            { name: 'Balance', rate: '20%', icon: <AttachMoney /> }
          ]}
        /> */}
      </div>
      <div className="affiliateCourse">
        <span className="title">Courses</span>
        {courses && courses.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs>
              <div className="my-1">
                <ListCourseByLevel
                  courses={courses}
                  level={CourseLevel.Beginner}
                  allowEditDelete={allowEditDelete}
                />
              </div>
            </Grid>
            <Grid item xs>
              <div className="my-1">
                <ListCourseByLevel
                  courses={courses}
                  level={CourseLevel.Intermediate}
                  allowEditDelete={allowEditDelete}
                />
              </div>
            </Grid>
            <Grid item xs>
              <div className="my-1">
                <ListCourseByLevel
                  courses={courses}
                  level={CourseLevel.Advanced}
                  allowEditDelete={allowEditDelete}
                />
              </div>
            </Grid>
          </Grid>
        )}
        {courses && courses.length <= 0 && <NoItemFound />}
      </div>
    </div>
  );
};

export default AffiliateProfile;
