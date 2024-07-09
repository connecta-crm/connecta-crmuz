import { AxiosError } from 'axios';
import { GroundParamsType } from '../../features/ground/useGround';
import apiClient from '../axios';
import { PaymentType } from '../../ui/modal/PaymentModal';

type ApiErrorResponse = {
  message: string;
};

class Payment {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getPayment({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(!url ? '/payment-app/' : '/payment-app?' + url);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getPaymentDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/payment-app/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createPayment(ground: FormData) {
    console.log(ground);
    
    try {
      const { data } = await this.$api.post('/payment-app/', ground);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updatePayment(payment:PaymentType) {
    try {
      const { data } = await this.$api.patch(`/payment-app/${payment.id}`, payment.data);
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

export default new Payment();
