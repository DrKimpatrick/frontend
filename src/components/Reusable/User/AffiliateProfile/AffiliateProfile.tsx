import React from 'react';
import './AffiliateProfile.scss';
import { User } from 'redux/action-types/user';
import { CourseLevel } from 'redux/action-types/course';
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
import { filter } from 'lodash';
import { NoItemFound } from 'components/Reusable';
import { AffiliateStatistic } from './AffiliateStatistic';
import { ListCourse } from './ListCourse';

interface Props {
  user: User;
  allowEditDelete?: boolean;
}

const AffiliateProfile = (props: Props) => {
  const { user, allowEditDelete } = props;

  const beginnerCourse = () => {
    if (user.courses && user.courses.length > 0) {
      const beginner = filter(
        user.courses,
        item => item.level === CourseLevel.Beginner
      );

      if (beginner && beginner.length > 0) {
        return (
          <Grid item xs={4}>
            <div className="my-1">
              <div className="level w-full">
                <span>Beginner</span>
              </div>
              <ul className="bg-card-preview">
                {beginner.map((item, index) => (
                  <ListCourse
                    item={item}
                    key={index}
                    allowEditDelete={allowEditDelete}
                  />
                ))}
              </ul>
            </div>
          </Grid>
        );
      }
    }

    return undefined;
  };

  const intermediateCourse = () => {
    if (user.courses && user.courses.length > 0) {
      const intermediate = filter(
        user.courses,
        item => item.level === CourseLevel.Intermediate
      );

      if (intermediate && intermediate.length > 0) {
        return (
          <Grid item xs={4}>
            <div className="my-1">
              <div className="level w-full">
                <span>Intermediate</span>
              </div>
              <ul className="bg-card-preview">
                {intermediate.map((item, index) => (
                  <ListCourse
                    item={item}
                    key={index}
                    allowEditDelete={allowEditDelete}
                  />
                ))}
              </ul>
            </div>
          </Grid>
        );
      }
    }

    return undefined;
  };

  const advancedCourse = () => {
    if (user.courses && user.courses.length > 0) {
      const advanced = filter(
        user.courses,
        item => item.level === CourseLevel.Advanced
      );

      if (advanced && advanced.length > 0) {
        return (
          <Grid item xs={4}>
            <div className="my-1">
              <div className="level w-full">
                <span>Advanced</span>
              </div>
              <ul className="bg-card-preview">
                {advanced.map((item, index) => (
                  <ListCourse
                    item={item}
                    key={index}
                    allowEditDelete={allowEditDelete}
                  />
                ))}
              </ul>
            </div>
          </Grid>
        );
      }
    }

    return undefined;
  };

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
        {user.courses && user.courses.length > 0 && (
          <Grid container spacing={3}>
            {beginnerCourse()}
            {intermediateCourse()}
            {advancedCourse()}
          </Grid>
        )}
        {user.courses && user.courses.length <= 0 && <NoItemFound />}
      </div>
    </div>
  );
};

export default AffiliateProfile;
