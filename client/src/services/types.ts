import { AxiosResponse } from 'axios';

export interface Response<T> {
  data: T;
  msg?: string;
}

export type ProductRegistrationDto = {
  userId?: string;
  image: File;
  category: number;
  title: string;
  description: string;
  price: number;
  option?: T_Option;
};

export interface ProductDto {
  id: number;
  userId: string;
  title: string;
  image: string;
  category: number;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithOptionDto extends ProductDto {
  carOptions?: I_Car_Option;
  realEstateOptions?: I_RealEstate_Option;
}

export type T_Option = undefined | I_Car_Option | I_RealEstate_Option;

export interface I_Car_Option {
  old: number;
  mileage: number;
  isSmoker: boolean;
}

export interface I_RealEstate_Option {
  address: string | undefined;
  floor: number | undefined;
  size: number | undefined;
}

export type ApiResponse<T> = AxiosResponse<Response<T>>;
