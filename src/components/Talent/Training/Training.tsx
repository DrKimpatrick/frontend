import React, { useEffect, useState } from 'react';
import './Training.scss';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { listCourseOwner } from 'redux/actions/course';
import { RootState } from 'redux/store';
import {
  TalentLayout,
  NoItemFound,
  SideLoading,
  UserCourse
} from 'components/Reusable';

export const Training = () => {
  const [openCourse = false, setOpenCourse] = useState<boolean>();

  const [userId, setUserId] = useState<string>();

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { courseOwner, courseOwnerLoading, errors } = state.courses;

    return { courseOwner, loading: courseOwnerLoading, apiError: errors };
  });

  const { courseOwner, loading, apiError } = selector;

  useEffect(() => {
    listCourseOwner()(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <TalentLayout>
        <div className="my-10">
          <SideLoading />
        </div>
      </TalentLayout>
    );
  }

  if (!courseOwner) {
    return null;
  }

  return (
    <TalentLayout>
      {openCourse && userId && (
        <UserCourse
          closeModal={() => {
            setUserId(undefined);
            setOpenCourse(false);

            return undefined;
          }}
          userId={userId}
        />
      )}
      <div className="user-dashboard-container training">
        <div className="trainingContent">
          {apiError && apiError.message && (
            <Alert severity="error">{apiError.message}</Alert>
          )}
          {apiError && apiError.error && (
            <Alert severity="error">{apiError.error}</Alert>
          )}
          {courseOwner.data && courseOwner.data.length <= 0 && <NoItemFound />}
          {courseOwner.data && courseOwner.data.length > 0 && (
            <ul>
              {courseOwner.data.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setOpenCourse(true);
                    setUserId(item._id);
                  }}
                >
                  <div className="heading">{item.users[0].username}</div>
                  <div className="numberOfCourse">
                    {item.count}&nbsp;courses
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </TalentLayout>
  );
};

export default withRouter(Training);
