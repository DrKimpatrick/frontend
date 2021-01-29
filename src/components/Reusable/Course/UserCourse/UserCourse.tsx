import React, { useEffect, useState } from 'react';
import { Modal, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, Work } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { listUserCourse } from 'redux/actions/course';
import { CourseLevel } from 'redux/action-types/course';
import {
  SideLoading,
  ListCourseByLevel,
  NoItemFound
} from 'components/Reusable';
import './UserCourse.scss';
import Avatar from 'assets/images/avatar.jpg';

interface Props {
  userId: string;
  closeModal: () => void;
}

export const UserCourse = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();

  const { userId, closeModal } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { userCourse, userCourseLoading, errors } = state.courses;

    return { userCourse, loading: userCourseLoading, apiError: errors };
  });

  const { userCourse, loading, apiError } = selector;

  useEffect(() => {
    listUserCourse(userId)(dispatch);
  }, [dispatch, userId]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        closeModal();
      }}
      className="userCourseModal"
    >
      <div className="userCourse">
        {apiError && apiError.error && (
          <Alert severity="error">{apiError.error}</Alert>
        )}
        {apiError && apiError.message && (
          <Alert severity="error">{apiError.message}</Alert>
        )}
        <div
          className="closeModal"
          onClick={() => {
            setOpen(false);
            closeModal();
            return undefined;
          }}
        >
          <Close />
        </div>
        {loading && (
          <div>
            <SideLoading />
          </div>
        )}
        {userCourse && (
          <>
            {userCourse.data && userCourse.data.length > 0 && (
              <div className="profile">
                <div className="img">
                  <img
                    src={
                      userCourse.data[0].userId &&
                      userCourse.data[0].userId.profilePicture
                        ? userCourse.data[0].userId.profilePicture
                        : Avatar
                    }
                    alt=""
                  />
                </div>
                <div className="username">
                  {userCourse.data[0].userId
                    ? userCourse.data[0].userId.username
                    : ''}
                </div>
              </div>
            )}
            <div className="trainingCourse w-full">
              <div className="flex items-center w-full my-3 heading">
                <span>
                  <Work />
                </span>
                <span>Training Courses</span>
              </div>
              <div className="courses my-5">
                <>
                  {userCourse.data && userCourse.data.length > 0 && (
                    <Grid spacing={2} container>
                      {userCourse.data.find(
                        item => item.level === CourseLevel.Beginner
                      ) && (
                        <Grid item xs>
                          <ListCourseByLevel
                            allowEditDelete={false}
                            courses={userCourse.data}
                            level={CourseLevel.Beginner}
                          />
                        </Grid>
                      )}
                      {userCourse.data.find(
                        item => item.level === CourseLevel.Intermediate
                      ) && (
                        <Grid item xs>
                          <ListCourseByLevel
                            allowEditDelete={false}
                            courses={userCourse.data}
                            level={CourseLevel.Intermediate}
                          />
                        </Grid>
                      )}
                      {userCourse.data.find(
                        item => item.level === CourseLevel.Advanced
                      ) && (
                        <Grid item xs>
                          <ListCourseByLevel
                            allowEditDelete={false}
                            courses={userCourse.data}
                            level={CourseLevel.Advanced}
                          />
                        </Grid>
                      )}
                    </Grid>
                  )}
                  {userCourse.data && userCourse.data.length <= 0 && (
                    <NoItemFound />
                  )}
                </>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UserCourse;
