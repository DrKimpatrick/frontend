import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AuthToken, { getAccessToken } from './AuthToken';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(async config => {
  const token = getAccessToken();

  // eslint-disable-next-line dot-notation
  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem('ttlnt.refresh') || null;

  return axios
    .get('/auth/refresh', {
      baseURL: process.env.REACT_APP_BACKEND_API,
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    .then(resp => {
      const { token: newToken } = resp.data;
      const decoded = new AuthToken(newToken);

      // eslint-disable-next-line dot-notation
      failedRequest.response.config.headers['Authorization'] =
        decoded.bearerString;

      localStorage.setItem('token', newToken);
    })
    .catch(() => {
      // User is logged out when refresh token expires
      localStorage.removeItem('token');
      localStorage.removeItem('ttlnt.refresh');
      // window.location.href = Routes.Login;
    });
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true
});

const fetcher = async (url: string) => {
  const res = await axiosInstance.get(url);
  return res.data;
};

export { fetcher };
export default axiosInstance;
