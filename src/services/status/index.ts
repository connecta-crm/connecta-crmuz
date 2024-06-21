import { AxiosError } from 'axios';
import { GroundParamsType } from '../../features/ground/useGround';
import apiClient from '../axios';
import { StatusTableDataType } from '../../features/status-automation/StatusTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Status {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getStatus({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(!url ? '/payment-app/' : '/payment-app?' + url);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getStatusDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/payment-app/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createStatus(ground: StatusTableDataType) {
    try {
      const { data } = await this.$api.post('/payment-app/', ground);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateStatus(status:StatusTableDataType) {
    try {
      const { data } = await this.$api.patch(`/payment-app/${status.id}`, status);
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

export default new Status();
