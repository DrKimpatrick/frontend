import React, { useState } from 'react';
import './ListCourse.scss';
import { Course, CourseStatus } from 'redux/action-types/course';
import {
  Edit,
  Visibility,
  Announcement,
  DataUsage,
  VerifiedUser
} from '@material-ui/icons';
import { CoursePreview, AddCourse } from 'components/Reusable';

interface Props {
  item: Course;
  allowEditDelete?: boolean;
}

export const ListCourse = (props: Props) => {
  const [showAction = false, setShowAction] = useState<boolean>();

  const [editCourse = false, setEditCourse] = useState<boolean>();

  const [courseId, setCourseId] = useState<string>();

  const [course, setCourse] = useState<Course>();

  const { item, allowEditDelete } = props;

  return (
    <>
      {courseId && (
        <CoursePreview
          courseId={courseId}
          closeModal={() => setCourseId(undefined)}
        />
      )}

      {editCourse && course && (
        <AddCourse
          title="Edit Course"
          add={false}
          courseId={course._id}
          initialValue={{
            ...course,
            currentLangSpecsUpdated: false
          }}
          isCoverImageUploaded
          closeModal={() => {
            setCourseId(undefined);
            setCourse(undefined);
            setEditCourse(false);

            return undefined;
          }}
        />
      )}
      <li
        className="listCourse"
        onMouseOver={() => setShowAction(true)}
        onMouseLeave={() => setShowAction(false)}
      >
        <span className="name">{item.name}</span>
        <ul className="action">
          {showAction && (
            <>
              <li>
                <button type="button" onClick={() => setCourseId(item._id)}>
                  <Visibility />
                </button>
              </li>
              {allowEditDelete && (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setCourse(item);
                        setEditCourse(true);

                        return undefined;
                      }}
                    >
                      <Edit />
                    </button>
                  </li>
                  {/* <li>
                    <button type="button">
                      <Delete />
                    </button>
                  </li> */}
                </>
              )}
            </>
          )}
          <li>
            <button type="button">
              {item.verificationStatus === CourseStatus.Pending && (
                <DataUsage />
              )}
              {item.verificationStatus === CourseStatus.Accepted && (
                <VerifiedUser className="verified-color" />
              )}
              {item.verificationStatus === CourseStatus.Declined && (
                <Announcement className="not-verified-color" />
              )}
            </button>
          </li>
        </ul>
      </li>
    </>
  );
};

export default ListCourse;
