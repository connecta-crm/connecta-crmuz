import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Filter {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getFilter(param: { type: string; q: string }) {
    console.log(param);
    
    try {
      const { data } = await this.$api.get(
        '/fields/global-search' + `/${param.type}/${param.q}/`,
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

export default new Filter();
