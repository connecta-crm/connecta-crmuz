import { AxiosError } from 'axios';
import { RolsTableDataType } from '../../features/rols/rolsTableDataType';
import { RolsParamsType } from '../../features/rols/useRols';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Rols {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getRols({ url }: RolsParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/users/role/' : '/users/role?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getRoleDetails(id:number|null) {
    try {
      const { data } = await this.$api.get(`users/role/detail/${id}/` );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async updateRole(role:RolsTableDataType) {
    try {
      const { data } = await this.$api.put(`users/role/update/${role.id}`, role);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async getFeature() {
    try {
      const { data } = await this.$api.get("/users/feature/");
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createRols(role: RolsTableDataType) {
    try {
      const { data } = await this.$api.post('/users/role/create/', role);
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

export default new Rols();
