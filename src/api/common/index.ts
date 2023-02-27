import { http } from '../http-server';

export function getBaseApi(payload: any) {
  return http.get<any>('/base', payload);
}