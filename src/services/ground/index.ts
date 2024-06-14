import { AxiosError } from 'axios';
import apiClient from '../axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { GroundTableDataType } from '../../features/ground/groundTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Ground {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getGround({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/contracts/grounds/' : '/contracts/grounds?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getGroundDetails(id:number|null) {
    try {
      const { data } = await this.$api.get(`contracts/grounds/${id}/` );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async createGround(ground:GroundTableDataType) {
    try {
      const { data } = await this.$api.post('/contracts/grounds/', ground);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateGround(ground:GroundTableDataType) {
    try {
      const { data } = await this.$api.put(`contracts/grounds/${ground.id}`, ground);
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

export default new Ground();
