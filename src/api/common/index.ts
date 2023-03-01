import { http } from '../http-server';
const prefix = '/cats'

export function getCatsAll(payload: any) {
  return http.get<{ list: [], total: number }>(prefix, payload);
}

export function getCatsOne(payload: any) {
  return http.post<any>(prefix, payload);
}

export function createCat(payload: any) {
  return http.post<any>(prefix, payload);
}

export function deleteCat(payload: any) {
  return http.post<any>(prefix, payload);
}