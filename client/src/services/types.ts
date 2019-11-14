import { AxiosResponse } from 'axios';

export interface Response<T> {
  data: T,
  msg?: string
}

export interface Detail {
  detail: Car
}

interface Car {
  old: number;
  mileage: number;
  isSmoker: boolean;
}

export type ApiResponse<T> = AxiosResponse<Response<T>>
