import axios from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    };
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken((res, e) => {
        if (res) {
          axios.defaults.headers.common.Authorization = res;
        }
        if (e) {
          return Promise.reject(e);
        }
        return undefined;
      });
    }
    return Promise.reject(error);
  }
);

export const refreshToken = async (
  cb: (response: string | null, error: string | null) => void
) => {
  try {
    const getRefreshToken = localStorage.getItem('refreshToken');
    const res = await axios.get('/auth/refresh', {
      headers: { Authorization: `Bearer ${getRefreshToken}` }
    });

    cb(res.data.token, null);
  } catch (error) {
    cb(null, 'something wrong try again');
  }
};

export { axiosApiInstance };
