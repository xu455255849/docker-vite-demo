import HttpServer from '@yunxi/request';
import { message } from 'ant-design-vue';
import { AxiosRequestConfig } from 'axios';

const toLogin = async () => {
  if (location.href.includes('/login')) return false;
  location.reload();
};

const axiosOpts = {
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 10,
};

const handleRequest = (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.authorization = 'aa';
  }
  return config;
};

export const http = new HttpServer(axiosOpts, {
  // debugger: true,
  handleRequest,
  errorHandle: async response => {
    switch (response.code) {
      case 401:
        message.error('您未登录，或者登录已经超时，请先登录！');
        await toLogin();
        break;
      case 500:
        message.error('服务器内部错误！');
        break;
      default:
        message.error(<string>response.msg || '请求出错，请检查');
        break;
    }
  },
});
