import React, { FC, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  SideLoading,
  AffiliateLayout as Layout,
  ProfilePreview,
  AffiliateProfile
} from 'components/Reusable';
import { RootState } from 'redux/store';
import { listCourse } from 'redux/actions/course';
import './AffiliateAdmin.scss';

const AffiliateAdmin: FC = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((state: RootState) => {
    const { user } = state.users;

    const { courses, courseLoading } = state.courses;

    return { user, courses, courseLoading };
  });

  const { user, courses, courseLoading } = reducer;

  useEffect(() => {
    listCourse()(dispatch);
  }, [dispatch]);

  if (courseLoading) {
    return (
      <Layout>
        <SideLoading />
      </Layout>
    );
  }

  if (!user || !courses) {
    return null;
  }

  return (
    <Layout>
      <div className="affiliateAdmin">
        <ProfilePreview user={user} />
        <div className="listAllCourse">
          <AffiliateProfile courses={courses.data} allowEditDelete />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(AffiliateAdmin);
