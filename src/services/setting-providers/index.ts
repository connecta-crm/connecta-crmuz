import { AxiosError } from 'axios';
import { UsersParamsType } from '../../features/users/useUsers';
import apiClient from '../axios';
import { SettingProvidersTableDataType } from '../../features/setting-providers/setttingProviderTableDataType';

type ApiErrorResponse = {
  message: string;
};

class SettingProviders {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getProviders({ url }: UsersParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/providers/' : '/providers?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getProviderDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/providers/detail/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async updateProvider(item: SettingProvidersTableDataType) {
    try {
      const { data } = await this.$api.put(`/providers/update/${item.id}`, item);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createProvider(item: SettingProvidersTableDataType) {
    try {
      const { data } = await this.$api.post('/providers/create/', item);
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

export default new SettingProviders();
