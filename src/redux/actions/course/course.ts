import { Dispatch } from 'redux';
import {
  CourseTypes,
  CoursePagination,
  Course
} from 'redux/action-types/course';
import ApiAction from 'helpers/apiAction';

export const listCourseByStatus = ({
  data,
  types,
  status
}: {
  data: CoursePagination;
  types: string;
  status: string;
}) => (dispatchAction: Dispatch) => {
  const { offset, limit } = data;
  return dispatchAction(
    ApiAction({
      url: `/courses/status/${status}?offset=${offset}&limit=${limit}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) =>
        dispatch({ type: CourseTypes.Loading, payload: { loading: true } }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: types,
          payload: { data: res }
        });
      }
    })
  );
};

export const changeCourseStatus = ({
  course,
  status,
  limit,
  offset,
  type
}: {
  course: Course;
  status: string;
  limit: number;
  offset: number;
  type: string;
}) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      url: `/courses/${course._id}`,
      method: 'PUT',
      data: { ...course, verificationStatus: status },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        listCourseByStatus({
          data: { offset, limit },
          types: type,
          status: course.verificationStatus
        })(dispatch);
      }
    })
  );
};
