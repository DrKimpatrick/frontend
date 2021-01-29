import React from 'react';
import './AffiliateProfile.scss';
import { CourseLevel } from 'redux/action-types/course';
import { Course } from 'redux/actions/course';
import {
  Adb,
  ViewComfy,
  Grain,
  Link,
  AllInclusive,
  Apps,
  PeopleOutline,
  AttachMoney
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { NoItemFound, ListCourseByLevel } from 'components/Reusable';
import { AffiliateStatistic } from './AffiliateStatistic';

interface Props {
  courses?: Course[];
  allowEditDelete?: boolean;
}

const AffiliateProfile = (props: Props) => {
  const { courses, allowEditDelete } = props;

  return (
    <div className="affiliateProfile">
      <div className="affiliateStatistic">
        <AffiliateStatistic
          item={[
            { name: 'Total clicks', rate: '20%', icon: <Adb /> },
            { name: 'Conversation Rate', rate: '20%', icon: <ViewComfy /> },
            { name: 'Conversation', rate: '20%', icon: <Grain /> },
            { name: 'Quarterly Commission', rate: '20%', icon: <Apps /> },
            { name: 'Total Links', rate: '20%', icon: <AllInclusive /> },
            { name: 'New Links', rate: '20%', icon: <Link /> }
          ]}
        />
        <AffiliateStatistic
          item={[
            { name: 'Converted', rate: '20%', icon: <PeopleOutline /> },
            { name: 'Amount', rate: '20%', icon: <AttachMoney /> },
            { name: 'Amount Paid', rate: '20%', icon: <AttachMoney /> },
            { name: 'Balance', rate: '20%', icon: <AttachMoney /> }
          ]}
        />
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
