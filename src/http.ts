import axios, { AxiosInstance } from 'axios';

interface myInstance extends AxiosInstance {
  [key: string]: any
}

const instance: myInstance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

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

function byUrl(type: string) {
  return function(url: string, params: Record<string, unknown>) {
    return instance[type](url, params);
  };
}

function byBody(type: string) {
  return function(url: string, params: Record<string, unknown>) {
    return instance[type](url, params);
  };
}

export const get = byUrl('get');
export const post = byBody('post');
export const put = byBody('put');
export const dele = byUrl('delete');
export const patch = byBody('patch');
