import axios, { AxiosError } from 'axios';
import { LoginParams } from '../../models';
import apiClient from '../axios';

type LoginResponse = {
  access: string;
  refresh: string;
};

type RefreshResponse = {
  access: string;
};

type ApiErrorResponse = {
  message: string;
  error: string;
  detail: string;
};

class Profile {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async login({ email, password }: LoginParams): Promise<LoginResponse> {
    try {
      const { data } = await this.$api.post<LoginResponse>('/users/token/', {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log('error', error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async refreshToken(refresh: string): Promise<RefreshResponse> {
    try {
      const { data } = await this.$api.post<RefreshResponse>(
        '/users/token/refresh/',
        {
          refresh,
        },
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCurrentUser() {
    try {
      const { data } = await this.$api.get('/users/me/');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getConfirmCode(email: string) {
    const baseURL = import.meta.env.VITE_APP_BASE_URL;
    try {
      const { data } = await axios.post(
        baseURL + '/users/reset-password-request/',
        {
          email,
        },
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.error ||
          'An unknown error occurred while getting confirm code',
      );
    }
  }

  async confirmOtp({ email, code }: { email: string | null; code: string }) {
    const baseURL = import.meta.env.VITE_APP_BASE_URL;
    try {
      const { data } = await axios.post(baseURL + '/users/confirm-otp/', {
        email,
        code,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.error ||
          'An unknown error occurred while getting confirm otp',
      );
    }
  }

  async confirmPassword(password: string | null) {
    try {
      const { data } = await this.$api.post('/users/change-password/', {
        password,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.detail ||
          'An unknown error occurred while getting confirm otp',
      );
    }
  }

  async logout() {}

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Profile();
