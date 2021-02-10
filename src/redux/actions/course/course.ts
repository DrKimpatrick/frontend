import { Dispatch } from 'redux';
import {
  CourseTypes,
  CoursePagination,
  CourseStatus
} from 'redux/action-types/course';
import ApiAction from 'helpers/apiAction';
import { setMessage } from 'redux/actions/message';
import { CourseInitialValue, Course } from './interface';

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

export const createCourse = (data: CourseInitialValue) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: '/courses',
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: true }
        }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.AddCourse,
          payload: { data: true }
        });

        setMessage('Course added successfully')(dispatch);

        listCourse()(dispatch);
      }
    })
  );
};

export const updateCourse = (data: CourseInitialValue, courseId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: `/courses/${courseId}`,
      method: 'PUT',
      data,
      onStart: () => (dispatch: Dispatch) =>
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: true }
        }),
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.Errors,
          payload: {
            errors: error.response.data
          }
        });
      },
      onSuccess: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.SubmitLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.UpdateCourse,
          payload: { data: true }
        });

        setMessage('Course updated successfully')(dispatch);

        listCourse()(dispatch);
      }
    })
  );
};

export const listCourseOwner = (values?: { page: number; limit: number }) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: values
        ? `/courses/group/owner/?limit=${values.limit}&page=${values.page}`
        : '/courses/group/owner',
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.CourseOwnerLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.CourseOwnerLoading,
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
          type: CourseTypes.CourseOwnerLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.ListCourseOwner,
          payload: { data: res }
        });
      }
    })
  );
};

export const listUserCourse = (
  id: string,
  values?: { limit: number; page: number }
) => (dispatchAction: Dispatch) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: values
        ? `/courses/affiliate/${id}/?limit=${values.limit}&page=${values.page}`
        : `/courses/affiliate/${id}`,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.UserCourseLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.UserCourseLoading,
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
          type: CourseTypes.UserCourseLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.UserCourse,
          payload: { data: res }
        });
      }
    })
  );
};

export const listUserWhoPaidCourse = (courseId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: `/courses/${courseId}/customers`,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.UserWhoPaidCourseLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.UserWhoPaidCourseLoading,
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
          type: CourseTypes.UserWhoPaidCourseLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.UserWhoPaidCourse,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const saveView = (courseId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'PUT',
      url: `/courses/${courseId}/views`,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.AddingViewsLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        console.log('gaggagaga1212', error)
        dispatch({
          type: CourseTypes.AddingViewsLoading,
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
        console.log('gaggagaga', res)
        dispatch({
          type: CourseTypes.AddingViewsLoading,
          payload: { loading: false }
        });

        dispatch({
          type: CourseTypes.AddingViews,
          payload: { data: res.data }
        });
      }
    })
  );
};

export const getCoursesStats = (affiliateId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: `/courses/affiliate/${affiliateId}/stats`,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.CoursesStatsLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.CoursesStatsLoading,
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
          type: CourseTypes.CoursesStats,
          payload: res
        });
      }
    })
  );
};

export const getQuarterlyCommission = (affiliateId: string) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      method: 'GET',
      url: `/courses/affiliate/${affiliateId}/quarterly-commission`,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.QuarterlyCommissionLoading,
          payload: { loading: true }
        });
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: CourseTypes.QuarterlyCommissionLoading,
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
          type: CourseTypes.QuarterlyCommission,
          payload: res
        });
      }
    })
  );
};
