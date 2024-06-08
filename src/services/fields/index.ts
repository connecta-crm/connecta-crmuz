import { AxiosError } from 'axios';
import apiClient from '../axios';
import { GroundParamsType } from '../../features/ground/useGround';

type ApiErrorResponse = {
  message: string;
};

class Fields {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getFields({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/fields/list/' : '/fields/list?' + url,
      );
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

export default new Fields();
