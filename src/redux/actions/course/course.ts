import { Dispatch } from 'redux';
import {
  CourseTypes,
  CoursePagination,
  Course,
  CourseStatus
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
        // update number of course by status
        listCourseByStatus({
          data: { offset, limit },
          types: CourseTypes.NumberOfPendingCourse,
          status: CourseStatus.Pending
        })(dispatch);

        listCourseByStatus({
          data: { offset, limit },
          types: CourseTypes.NumberOfAcceptedCourse,
          status: CourseStatus.Accepted
        })(dispatch);

        listCourseByStatus({
          data: { offset, limit },
          types: CourseTypes.NumberOfDeclinedCourse,
          status: CourseStatus.Declined
        })(dispatch);
      }
    })
  );
};

export const listCourseDetail = (courseId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/courses/${courseId}`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.CourseDetailLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });

        dispatch({
          type: CourseTypes.CourseDetailLoading,
          payload: { loading: false }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.ListCourseDetail,
          payload: { data: res.data }
        });

        dispatch({
          type: CourseTypes.CourseDetailLoading,
          payload: { loading: false }
        });
      }
    })
  );
};

export const listCourse = (data?: CoursePagination) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: data
        ? `/courses?offset=${data.offset}&limit=${data.limit}`
        : `/courses`,
      method: 'GET',
      onStart: () => (dispatch: Dispatch) =>
        dispatch({
          type: CourseTypes.ListCourseLoading,
          payload: { loading: true }
        }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.ListCourseLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.ListCourseLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.ListCourse,
          payload: { data: res }
        });
      }
    })
  );
};
