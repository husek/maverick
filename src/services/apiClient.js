import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export const formatUrl = path => {
  const api = process.env.REACT_APP_API
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return api + adjustedPath;
};

export default class ApiClient {
  constructor() {
    methods.forEach(method => {
      this[method] = (path, { query, body, headers = {} } = {}) =>
        new Promise((resolve, reject) => {
          const url = formatUrl(path);
          const request = superagent[method](url);
          const requestHeaders = { ...headers };
          const token = localStorage.getItem('JWT_TOKEN')

          if (token) requestHeaders.Authorization = `Bearer ${token}`;

          request.set(requestHeaders);
          request.set('content-type', 'application/json');

          if (query) request.query(query);
          if (body) request.send(body);

          request
            .then((res = {}) => resolve(res.body))
            .catch(({  status, response }) => reject({ message: response.body?.message, status }));
        });
    });
  };
};
