import axios from 'axios';
import { ApiResponse } from '~services/types';
import { config } from 'dotenv'

config();

export type LoginResponseDto = {
  token: string;
  id: number;
}

export type LoginSignupRequestDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  id: string;
  email: string;
  password: string;
}

const API_HOST = process.env.NODE_ENV ? 'http://45.119.146.245:5000' : 'http://localhost:5000/api';

class AuthService {
  async login(body: LoginSignupRequestDto): Promise<ApiResponse<LoginResponseDto>> {
    return axios.post(`${API_HOST}/auth/login`, body);
  }

  async signUp(body: LoginSignupRequestDto): Promise<ApiResponse<AuthResponseDto>> {
    return axios.post(`${API_HOST}/auth/signup`, body);
  }
}

export default AuthService;
