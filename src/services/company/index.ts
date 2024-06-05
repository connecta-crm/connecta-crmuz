import { AxiosError } from 'axios';
import apiClient from '../axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { CompanyTableDataType } from '../../features/company/companyTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Company {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getCompany({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/company-management/info/1/' : '/contracts/grounds?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCompanyDetails(id:number|null) {
    try {
      const { data } = await this.$api.get(`/company-management/info/${id}/` );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async updateCompany(ground:CompanyTableDataType) {
    try {
      const { data } = await this.$api.put(`/company-management/info/${ground.id}`, ground);
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

export default new Company();
