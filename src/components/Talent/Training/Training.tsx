import React, { useEffect } from 'react';
import './Training.scss';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listCourseOwner } from 'redux/actions/course';
import { RootState } from 'redux/store';
import { TalentLayout, NoItemFound, SideLoading } from 'components/Reusable';

export const Training = () => {
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
      <div className="user-dashboard-container training">
        <div className="trainingContent">
          {apiError && apiError.message && (
            <div className="inputError">{apiError.message}</div>
          )}
          {apiError && apiError.error && (
            <div className="inputError">{apiError.error}</div>
          )}
          {courseOwner.data && courseOwner.data.length <= 0 && <NoItemFound />}
          {courseOwner.data && courseOwner.data.length > 0 && (
            <ul>
              {courseOwner.data.map((item, index) => (
                <li key={index}>
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
