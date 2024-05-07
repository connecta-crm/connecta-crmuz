import { AxiosError } from 'axios';
import { CustomersParamsType } from '../../features/customers/useCostumers';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Customers {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getCustomers({
    name,
    email,
    limit,
    offset,
    phone,
  }: CustomersParamsType) {
    try {
      const { data } = await this.$api.get('/customers/', {
        params: { name, email, limit, offset, phone },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Customers();
