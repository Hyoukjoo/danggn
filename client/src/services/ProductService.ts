import axios from 'axios';
import { ApiResponse, ProductRegistrationDto, ProductDto } from '~services/types';
import AuthStore from '~stores/auth/AuthStore';
import { config } from 'dotenv';
import { getCategoryName } from '~pages/utils';

config();

const API_HOST = process.env.NODE_ENV === 'production' ? 'http://45.119.146.245:5000/api' : 'http://localhost:5000/api';

class ProductService {
  constructor(private authStore: AuthStore) {}

  async registration(body: ProductRegistrationDto): Promise<ApiResponse<ProductDto>> {
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
      formData.append('optionType', getCategoryName(body.category));
      for (let key in option) {
        formData.append(key, String(option[key]));
      }
    }

    return axios.post<ProductRegistrationDto, ApiResponse<ProductDto>>(`${API_HOST}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async getAll(): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products`);
  }

  async getById(id: string): Promise<ApiResponse<ProductDto>> {
    return axios.get(`${API_HOST}/products/${id}`);
  }

  async getByCategory(category: number): Promise<ApiResponse<ProductDto[]>> {
    return axios.get(`${API_HOST}/products/category/${category}`);
  }
}

export default ProductService;
