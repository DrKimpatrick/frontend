import axios from 'axios';

interface HttpOptions {
  token: string;
  baseURL: string;
  headers: object;
}

const { REACT_APP_API_URL } = process.env;

export default (httpOptions?: HttpOptions) => {
  const { token, baseURL, headers } = httpOptions || {};
  const userToken = token || localStorage.token;

  return axios.create({
    baseURL: baseURL || REACT_APP_API_URL,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      From: userToken || undefined
    }
  });
};