import { AxiosError } from 'axios';
import { UsersParamsType } from '../../features/users/useUsers';
import { UsersTableDataType } from '../../features/users/usersTableDataType';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Users {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getUsers({ url }: UsersParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/users/list/' : '/users/list?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getUserDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`users/detail/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async updateUser(user: UsersTableDataType) {
    try {
      const { data } = await this.$api.put(`users/update/${user.id}`, user);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createUser(user: UsersTableDataType) {
    try {
      const { data } = await this.$api.post('/users/create/', user);
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

export default new Users();
