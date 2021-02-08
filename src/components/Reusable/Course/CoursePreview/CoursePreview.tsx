import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './CoursePreview.scss';
import { Modal } from '@material-ui/core';
import {
  AffiliateStatistic,
  HorizontalPagination,
  SideLoading
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
import { listCourseDetail } from 'redux/actions/course';
import avatar from 'assets/images/avatar.jpg';
import { get } from 'lodash';
import { UserRole } from 'redux/action-types/user';
import { useHistory } from 'react-router-dom';

interface Props {
  courseId: string;
  closeModal: () => void;
}

const paidUser = ['John doe', 'Jane doe', 'Steve Job', 'Elon Tesla'];

const CoursePreview = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();
  const [showStatistic, setShowStatistic] = useState<boolean>();
  const { courseId, closeModal } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => {
    const { courseDetail, courseDetailLoading, errors } = state.courses;
    const { user } = state.users;

    return { courseDetail, courseDetailLoading, errors, user };
  });
  const { courseDetail, courseDetailLoading, errors, user } = selector;
  const history = useHistory();

  useEffect(() => {
    if (courseId) {
      listCourseDetail(courseId)(dispatch);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (user && courseDetail && courseDetail.userId) {
      if (user._id === courseDetail.userId._id) {
        setShowStatistic(true);
      }
      if (user.roles && user.roles.includes(UserRole.SuperAdmin)) {
        setShowStatistic(true);
      }
    }
  }, [user, courseDetail]);

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
                <button
                  type="button"
                  className="payButton flex justify-between items-center"
                  onClick={() =>
                    history.push({
                      pathname: '/payment',
                      state: {
                        plan: {},
                        course: courseDetail._id
                      }
                    })}
                >
                  <span>Pay for this course</span>
                  <span>
                    <Cached />
                  </span>
                </button>
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
                  <ul className="bg-card-preview listWhoPaidCourse">
                    {paidUser.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="coursePagination">
                    <HorizontalPagination
                      page={1}
                      pageCount={3}
                      onPageChange={() => ''}
                    />
                  </div>
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
