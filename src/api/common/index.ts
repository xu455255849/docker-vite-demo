import { http } from '../http-server';

export function getPolicyTokenCos(payload: any) {
  return http.get<any>('/cos/get-policy-sign', payload);
}