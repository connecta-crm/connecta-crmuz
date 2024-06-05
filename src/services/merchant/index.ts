import { AxiosError } from 'axios';
import apiClient from '../axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { MerchantTableDataType } from '../../features/merchant/merchantTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Merchant {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getMerchant({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/merchant/' : '/merchant?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getMerchantDetails(id:number|null) {
    try {
      const { data } = await this.$api.get(`/merchant/${id}/` );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async createMerchant(merchant:MerchantTableDataType) {
    try {
      const { data } = await this.$api.post('/merchant/', merchant);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateMerchant(merchant:MerchantTableDataType) {
    try {
      const { data } = await this.$api.put(`/merchant/${merchant.id}`, merchant);
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

export default new Merchant();
