import axios from 'axios';

interface HttpOptions {
  token: string;
  baseURL: string;
  headers: object;
}

const { REACT_APP_BACKEND_API } = process.env;

export default (httpOptions?: HttpOptions) => {
  const { token, baseURL } = httpOptions || {};
  const userToken = token || localStorage.token;

  return axios.create({
    baseURL: baseURL || REACT_APP_BACKEND_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`
    }
  });
};
