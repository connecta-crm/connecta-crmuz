import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Vehicles {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getCarMarks(q: string | null) {
    try {
      const { data } = await this.$api.get('/cars/marks-list/', {
        params: { q },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCarModels({
    q,
    vehicleMarkId,
  }: {
    q: string | null;
    vehicleMarkId: number | null;
  }) {
    try {
      const { data } = await this.$api.get('/cars/models-list/', {
        params: { q, mark: vehicleMarkId },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Vehicles();
