import * as apiActionTypes from 'constants/apiActions';

export default ({
  url = '',
  method = 'GET',
  data = {},
  queries = {},
  httpOptions = {},
  onStart = () => (dispatch: any) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_START,
      payload: { loading: true }
    }),
  onSuccess = (_data: any) => (dispatch: any) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_SUCCESS,
      payload: { loading: false, data: _data }
    }),
  onFailure = (error: any) => (dispatch: any) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_FAILURE,
      payload: { loading: false, error }
    }),
  onEnd = () => (dispatch: any) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_END,
      payload: { loading: false }
    })
}) => {
  const urlQueries: { [Key: string]: string } = queries;
  if (queries) {
    Object.keys(queries).forEach(key => {
      urlQueries[key] =
        typeof urlQueries[key] === 'string'
          ? urlQueries[key].trim()
          : urlQueries[key];
      return urlQueries[key] || delete urlQueries[key];
    });
  }

  return {
    type: apiActionTypes.API_REQUEST,
    payload: {
      url,
      method,
      httpOptions,
      data,
      queries: urlQueries,
      onStart,
      onSuccess,
      onFailure,
      onEnd
    }
  };
};
