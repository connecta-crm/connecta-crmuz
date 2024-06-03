import { AxiosError } from 'axios';
import { UsersParamsType } from '../../features/users/useUsers';
import apiClient from '../axios';
import { DistributionDataType } from '../../features/dstribution/DistributionDataType';

type ApiErrorResponse = {
  message: string;
};

class Distribution {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getDistributions({ url }: UsersParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/providers/distribution/' : '/providers/distribution?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getDistributionDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/providers/distribution/detail/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async updateDistribution(item: DistributionDataType) {
    try {
      const { data } = await this.$api.put(`/providers/distribution/update/${item.id}`, item);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createDistribution(item: DistributionDataType) {
    try {
      const { data } = await this.$api.post('/providers/distribution/create/', item);
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

export default new Distribution();
