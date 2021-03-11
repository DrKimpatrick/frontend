import { Dispatch } from 'redux';
import ApiAction from 'helpers/apiAction';
import { ApiEndPoint } from 'utils/ApiEndpoints';
import { setMessage } from 'redux/actions/message/message';
import { QuestionTypes } from 'redux/action-types/question';
import { VideoQuestionParamType } from './interface';

export const uploadVideoAction = (data: any) => (dispatchAction: Dispatch) => {
  const form = new FormData();

  form.append('videos', data);

  return dispatchAction(
    ApiAction({
      url: ApiEndPoint.UploadVideo,
      method: 'POST',
      data: form,
      httpOptions: {
        'Content-Type': 'multipart/form-data'
      },
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.UploadingVideoLoading,
          payload: { loading: true }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.UploadVideo,
          payload: { data: res.data }
        });

        dispatch({
          type: QuestionTypes.UploadingVideoLoading,
          payload: { loading: false }
        });

        setMessage(res.message)(dispatch);
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.UploadingVideoError,
          payload: { errors: error.response.data }
        });

        dispatch({
          type: QuestionTypes.UploadingVideoLoading,
          payload: { loading: false }
        });
      }
    })
  );
};

export const addVideoQuestionAction = (data: VideoQuestionParamType) => (
  dispatchAction: Dispatch
) => {
  return dispatchAction(
    ApiAction({
      url: ApiEndPoint.addVideoQuestion,
      method: 'POST',
      data,
      onStart: () => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddVideoQuestionLoading,
          payload: { loading: true }
        });
      },
      onSuccess: res => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddVideoQuestion,
          payload: { data: res }
        });

        dispatch({
          type: QuestionTypes.AddVideoQuestionLoading,
          payload: { loading: false }
        });

        setMessage(res.message)(dispatch);
      },
      onFailure: error => (dispatch: Dispatch) => {
        dispatch({
          type: QuestionTypes.AddVideoQuestionError,
          payload: { errors: error.response.data }
        });

        dispatch({
          type: QuestionTypes.AddVideoQuestionLoading,
          payload: { loading: false }
        });
      }
    })
  );
};
