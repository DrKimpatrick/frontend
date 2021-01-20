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
  Close
} from '@material-ui/icons';
import { RootState } from 'redux/store';
import { listCourseDetail } from 'redux/actions/course';
import avatar from 'assets/images/avatar.jpg';
import { get } from 'lodash';

interface Props {
  courseId: string;
  closeModal: () => void;
}

const paidUser = ['John doe', 'Jane doe', 'Steve Job', 'Elon Tesla'];

const CoursePreview = (props: Props) => {
  const [open = true, setOpen] = useState<boolean>();

  const { courseId, closeModal } = props;

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => {
    const { courseDetail, courseDetailLoading, errors } = state.courses;

    return { courseDetail, courseDetailLoading, errors };
  });

  const { courseDetail, courseDetailLoading, errors } = selector;

  useEffect(() => {
    listCourseDetail(courseId)(dispatch);
  }, [courseId, dispatch]);

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
                <span className="description">{courseDetail.description}</span>
                <div className="w-full flex align-items-center owner">
                  <span>{courseDetail.duration}</span>
                  <span className="ml-2">
                    by&nbsp;<b>{get(courseDetail.userId, 'username', 'N/A')}</b>
                  </span>
                </div>
              </div>
            </div>
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
                  { name: 'Total users', rate: '20', icon: <PeopleOutline /> }
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
      </div>
    </Modal>
  );
};

export default CoursePreview;
