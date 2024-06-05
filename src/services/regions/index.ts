import { AxiosError } from 'axios';
import apiClient from '../axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { RegionsTableDataType } from '../../features/regions/RegionsTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Regions {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getRegions({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/contracts/hawaii/' : '/contracts/hawaii?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getRegionDetails(id:number|null) {
    try {
      const { data } = await this.$api.get(`/contracts/hawaii/${id}/` );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async createRegion(ground:RegionsTableDataType) {
    try {
      const { data } = await this.$api.post('/contracts/hawaii/', ground);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateRegion(ground:RegionsTableDataType) {
    try {
      const { data } = await this.$api.put(`/contracts/hawaii/${ground.id}`, ground);
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

export default new Regions();
