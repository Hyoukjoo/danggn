import axios from 'axios';
import { ApiResponse } from '~services/types';
import AuthStore from '~stores/auth/AuthStore';
import { config } from 'dotenv';
import { getCategoryName } from '~pages/utils';

config();

export type ProductRegistrationDto = {
  userId?: string;
  image: File;
  category: number;
  title: string;
  description: string;
  price: number;
  option?: T_Option;
};

export type ProductDto = {
  id: number;
  userId: string;
  title: string;
  image: string;
  category: number;
  description: string;
  price: number;
  option?: T_Option;
  createdAt: string;
  updatedAt: string;
};

export type T_Option = null | Car | RealEstate;

interface Car {
  old: number;
  mileage: number;
  isSmoker: boolean;
}

interface RealEstate {
  address: string;
  floor: number;
  size: number;
}

const API_HOST = process.env.API_HOST || 'http://localhost:5000/api';

class ProductService {
  constructor(private authStore: AuthStore) {}

  async registration(
    body: ProductRegistrationDto,
  ): Promise<ApiResponse<ProductDto>> {
    if (this.authStore.auth == null) {
      throw new Error('need to login!');
    }
    const formData = new FormData();
    formData.append('image', body.image);
    formData.append('userId', String(this.authStore.auth.id));
    formData.append('category', String(body.category));
    formData.append('title', body.title);
    formData.append('description', body.description);
    formData.append('price', String(body.price));
    if (body.option) {
      const { option } = body;
      formData.append('option', getCategoryName(body.category));
      for (let key in option) {
        formData.append(key, String(option[key]));
      }
    }

    return axios.post<ProductRegistrationDto, ApiResponse<ProductDto>>(
      `${API_HOST}/products`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  }

  async getAll(): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products`);
  }

  async getById(id: string): Promise<ApiResponse<ProductDto>> {
    return axios.get(`${API_HOST}/products/${id}`);
  }
}

export default ProductService;
