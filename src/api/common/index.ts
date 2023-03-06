import { http } from '../http-server';
const prefix = '/cats'

export interface ICats {
  id: string,
  name: string;
  age: number;
}

export function getCatsAll(payload: { page: number; pageSize: number }) {
  return http.get<{ list: ICats[], total: number }>(prefix, payload);
}

export function getCatsOne(payload: { id: string }) {
  return http.get<ICats>(prefix + '/info', payload);
}

export function updateCat(payload: ICats) {
  return http.put<{ id: string }>(prefix, payload);
}

export function createCat(payload: any) {
  return http.post<{ id: string }>(prefix, payload);
}

export function deleteCat(payload: { id: string }) {
  return http.delete<{ id: string }>(prefix, payload);
}
