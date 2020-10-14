import axios, { AxiosInstance } from 'axios'

interface myInstance extends AxiosInstance {
  [key: string]: any
}

const instance: myInstance = axios.create({
  baseURL: '127.0.0.1',
  timeout: 1000,
});

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return error;
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return error;
});

function __body__(type: string) {
  return function(url: string, params: object) {
    return instance[type](url, params);
  }
}

export const get: Function = __body__('get');
export const post: Function = __body__('post');
export const put: Function = __body__('put');
export const dele: Function = __body__('delete');
export const patch: Function = __body__('patch');
