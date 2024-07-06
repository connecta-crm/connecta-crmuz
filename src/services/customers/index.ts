import { AxiosError } from 'axios';
import { CustomersParamsType } from '../../features/customers/useCostumers';
import { CreateCustomerParams } from '../../features/customers/useCreateCustomer';
import { CustomerEditParamsType } from '../../features/customers/useCustomerEdit';
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
    status,
    q,
  }: CustomersParamsType) {
    try {
      const { data } = await this.$api.get('/customers/', {
        params: { name, email, limit, offset, phone, status, q },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /customers/detail/:id/
  async getCustomer(id: number | string | null) {
    try {
      const { data } = await this.$api.get(`/customers/detail/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createCustomer({ name, email, phone, lastName }: CreateCustomerParams) {
    try {
      const { data } = await this.$api.post('/customers/create/', {
        name,
        email,
        phone,
        lastName,
      });
      console.log(data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: //customers/update/{id}/
  async editCustomer({ id, updateCustomerModel }: CustomerEditParamsType) {
    try {
      const { data } = await this.$api.put(`/customers/update/${id}/`, {
        ...updateCustomerModel,
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
