import { AxiosError } from 'axios';
import { InternationalParamsType } from '../../features/international/useInternational';
import apiClient from '../axios';
import { InternationalTableDataType } from '../../features/international/internationalTableDataType';

type ApiErrorResponse = {
  message: string;
};

class International {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getInternational({ url }: InternationalParamsType) {
    try {
      const { data } = await this.$api.get(
        !url
          ? '/contracts/internationals/'
          : '/contracts/internationals?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getinternationalDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`contracts/internationals/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createInternatioanl(internatioanl: InternationalTableDataType) {
    try {
      const { data } = await this.$api.post('/contracts/internationals/', internatioanl);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateInternational(ground: InternationalTableDataType) {
    try {
      const { data } = await this.$api.put(
        `contracts/internationals/${ground.id}`,
        ground,
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

export default new International();
