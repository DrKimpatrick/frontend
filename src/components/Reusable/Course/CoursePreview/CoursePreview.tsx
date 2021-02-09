import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CoursePreview.scss';
import { Modal } from '@material-ui/core';
import {
  AffiliateStatistic,
  SideLoading,
  NoItemFound
} from 'components/Reusable';
import {
  Adb,
  ViewComfy,
  Grain,
  Apps,
  PeopleOutline,
  AttachMoney,
  Close,
  Cached
} from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listCourseDetail, listUserWhoPaidCourse } from 'redux/actions/course';
import avatar from 'assets/images/avatar.jpg';
import { get } from 'lodash';
import { UserRole } from 'redux/action-types/user';
import { useHistory } from 'react-router-dom';

interface Props {
  courseId: string;
  closeModal: () => void;
}

const CoursePreview = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();

  const [showStatistic, setShowStatistic] = useState<boolean>();

  const [showPayButton, setShowPayButton] = useState<boolean>();

  const { courseId, closeModal } = props;

  const dispatch = useDispatch();

  const history = useHistory();

  const selector = useSelector((state: RootState) => {
    const {
      courseDetail,
      courseDetailLoading,
      errors,
      userWhoPaidCourse,
      userWhoPaidCourseLoading
    } = state.courses;

    const { user } = state.users;

    return {
      courseDetail,
      courseDetailLoading,
      errors,
      user,
      userWhoPaidCourse,
      userWhoPaidCourseLoading
    };
  });

  const {
    courseDetail,
    courseDetailLoading,
    errors,
    user,
    userWhoPaidCourse,
    userWhoPaidCourseLoading
  } = selector;

  useEffect(() => {
    if (courseId) {
      listCourseDetail(courseId)(dispatch);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (user && courseDetail && courseDetail.userId) {
      if (user._id === courseDetail.userId._id) {
        setShowStatistic(true);

        listUserWhoPaidCourse(courseId)(dispatch);
      }
      if (user.roles && user.roles.includes(UserRole.SuperAdmin)) {
        setShowStatistic(true);

        listUserWhoPaidCourse(courseId)(dispatch);
      }
    }
  }, [user, courseDetail, dispatch, courseId]);

  useEffect(() => {
    if (
      user &&
      user.paidCourses &&
      user.paidCourses.length > 0 &&
      user.paidCourses.includes(courseId)
    ) {
      setShowPayButton(false);
    } else {
      setShowPayButton(true);
    }
  }, [user, courseId]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        closeModal();
      }}
      className="coursePreviewModal"
    >
      <div className="coursePreview">
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
        {courseDetailLoading && <SideLoading />}
        {errors && errors.message && (
          <div className="inputError text-center text-base">
            {errors.message}
          </div>
        )}
        {errors && errors.error && (
          <div className="inputError text-center text-base">{errors.error}</div>
        )}
        {!courseDetailLoading && courseDetail && (
          <>
            <div className="courseDetail">
              <div className="courseImage">
                <img
                  src={
                    courseDetail.coverImageLink
                      ? courseDetail.coverImageLink
                      : avatar
                  }
                  alt=""
                />
              </div>
              <div className="detail">
                <span className="title">{courseDetail.name}</span>
                <span
                  className={`description ${
                    courseDetail.description.length <= 48
                      ? 'textCenterDescription'
                      : ''
                  }`}
                >
                  {courseDetail.description}
                </span>
                <div className="w-full flex align-items-center owner">
                  <span>{`${courseDetail.duration} ${
                    courseDetail.format ? courseDetail.format : ''
                  }`}</span>
                  <span className="ml-2">
                    by&nbsp;<b>{get(courseDetail.userId, 'username', 'N/A')}</b>
                  </span>
                </div>
              </div>
            </div>
            {!showStatistic && (
              <div className="flex justify-center items-center">
                {typeof showPayButton !== 'undefined' && (
                  <button
                    type="button"
                    className={`flex justify-between items-center ${
                      showPayButton ? 'payButton' : 'viewCourseButton'
                    }`}
                    onClick={() => {
                      if (showPayButton) {
                        history.push({
                          pathname: '/payment',
                          state: {
                            plan: {},
                            course: courseDetail._id
                          }
                        });
                      } else {
                        window.open(courseDetail.existingCourseLink, '_blank');
                      }
                      return undefined;
                    }}
                  >
                    <span>
                      {showPayButton ? 'Pay for this course' : 'View course'}
                    </span>
                    <span>
                      <Cached />
                    </span>
                  </button>
                )}
              </div>
            )}
            {showStatistic && (
              <>
                <div className="courseStatistic">
                  <AffiliateStatistic
                    item={[
                      { name: 'Views', rate: '10', icon: <Adb /> },
                      {
                        name: 'Conversation Rate',
                        rate: '20%',
                        icon: <ViewComfy />
                      },
                      { name: 'Conversation', rate: '20%', icon: <Grain /> },
                      { name: 'Active Users', rate: '2', icon: <Apps /> },
                      { name: 'Costs', rate: '$20', icon: <AttachMoney /> },
                      {
                        name: 'Total users',
                        rate: '20',
                        icon: <PeopleOutline />
                      }
                    ]}
                  />
                </div>
                <div className="whoPaidCourse">
                  <h5 className="title">Users who signed up and paid</h5>
                  {userWhoPaidCourseLoading && (
                    <div className="mt-3 w-full">
                      <SideLoading />
                    </div>
                  )}
                  {userWhoPaidCourse && !userWhoPaidCourseLoading && (
                    <>
                      {userWhoPaidCourse.length > 0 && (
                        <ul className="bg-card-preview listWhoPaidCourse">
                          {userWhoPaidCourse.map((item, index) => (
                            <li key={index}>{item.username}</li>
                          ))}
                        </ul>
                      )}
                      {userWhoPaidCourse.length <= 0 && <NoItemFound />}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default CoursePreview;
