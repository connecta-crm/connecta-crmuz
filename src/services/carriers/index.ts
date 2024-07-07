import { AxiosError } from 'axios';
import { CarriersParamsType } from '../../features/carriers/useCarriers';
import { CreateCarrierParams } from '../../features/carriers/useCreateCarrier';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Carriers {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getCarriers({ name, limit, offset, status, q }: CarriersParamsType) {
    try {
      const { data } = await this.$api.get('/carriers/', {
        params: { name, limit, offset, status, q },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /carriers/create/
  async createCarrier({
    name,
    address,
    mcNumber,
    contactName,
    phone,
    phone2,
    email,
    fax,
    status,
    location,
  }: CreateCarrierParams) {
    try {
      const { data } = await this.$api.post('/carriers/create/', {
        name,
        address,
        mcNumber,
        contactName,
        phone,
        phone2,
        email,
        fax,
        status,
        location,
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

export default new Carriers();
