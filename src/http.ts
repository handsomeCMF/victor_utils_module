import axios, { AxiosInstance } from 'axios';
import { getSession } from './storage';
import commonValues from './common';

const statusCode: Record<string, string> = {
  "100": '客户必须继续发出请求',
  "101": '客户要求服务器根据请求转换HTTP协议版本',
  "200": '成功',
  "201": '提示知道新文件的URL',
  "202": '接受和处理、但处理未完成',
  "203": '返回信息不确定或不完整',
  "204": '请求收到，但返回信息为空',
  "205": '服务器完成了请求，用户代理必须复位当前已经浏览过的文件',
  "206": '服务器已经完成了部分用户的GET请求',
  "300": '请求的资源可在多处得到',
  "301": '删除请求数据',
  "302": '在其他地址发现了请求数据',
  "303": '建议客户访问其他URL或访问方式',
  "304": '客户端已经执行了GET，但文件未变化',
  "305": '请求的资源必须从服务器指定的地址得到',
  "306": '前一版本HTTP中使用的代码，现行版本中不再使用',
  "307": '申明请求的资源临时性删除',
  "400": '错误请求，如语法错误',
  "401": '请求授权失败',
  "402": '保留有效ChargeTo头响应',
  "403": '请求不允许(由于服务器上文件或目录的权限设置导致资源不可用)',
  "404": '没有发现文件、查询或URl(没有找到指定的资源)',
  "500": '服务器产生内部错误',
  "501": '服务器不支持请求的函数',
  "502": '服务器暂时不可用，有时是为了防止发生系统过载',
};

interface myInstance extends AxiosInstance {
  [key: string]: any
}

const instance: myInstance = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(function (config) {
  const token = getSession(commonValues.TOKEN);
  config.headers.Authorization = token.token;
  return config;
}, function (error) {
  return error;
});

instance.interceptors.response.use(function (response) {
  if (response.status < 200 && response.status >= 300) {
    return statusCode[response.status];
  }
  return response.data;
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
