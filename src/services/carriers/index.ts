import { AxiosError } from 'axios';
import { CarriersParamsType } from '../../features/carriers/useCarriers';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Carriers {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getCarriers({ name, limit, offset, status, q }: CarriersParamsType) {
    try {
      const { data } = await this.$api.get('/carriers/', {
        params: { name, limit, offset, status, q },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Carriers();
