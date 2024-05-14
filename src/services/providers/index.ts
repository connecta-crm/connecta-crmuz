import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Providers {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getProviders() {
    try {
      const { data } = await this.$api.get('/providers/');

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}
export default new Providers();
