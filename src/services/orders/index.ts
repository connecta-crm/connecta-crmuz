import { AxiosError } from 'axios';
// import { QuoteEditParamsType } from '../../features/quotes/useQuoteEdit';
// import { QuoteEditVehicleParams } from '../../features/quotes/useQuoteVehicleEdit';
import { OrdersParamsType } from '../../features/orders/useOrders';
import { OrdersDataType } from '../../models/OrderDataType';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Orders {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getOrders({ limit, offset, source, q, status }: OrdersParamsType) {
    try {
      const params: Record<string, unknown> = {
        limit,
        offset,
        q,
        status,
      };

      if (source) {
        if (Array.isArray(source)) {
          source.forEach((s) => (params['source'] = s));
        } else {
          params['source'] = source;
        }
      }
      const { data } = await this.$api.get('/orders/', { params });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /orders/:guid/detail/
  async getOrder(guid: string | null) {
    try {
      const { data } = await this.$api.get(`/orders/detail/${guid}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createOrder(quote: OrdersDataType) {
    try {
      const { data } = await this.$api.post('/orders/create/', quote);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: /quote/:guid/update/
  // async editQuote({ guid, updateQuoteModel }: QuoteEditParamsType) {
  //   try {
  //     const { data } = await this.$api.put(`/quote/update/${guid}/`, {
  //       ...updateQuoteModel,
  //     });
  //     return data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }

  // PUT: /quote/vehicle/:id/
  // async editQuoteVehicle({
  //   id,
  //   vehicleYear,
  //   vehicle,
  //   quote,
  // }: QuoteEditVehicleParams) {
  //   try {
  //     const { data } = await this.$api.put(`/quote/vehicle/${id}/`, {
  //       vehicleYear,
  //       vehicle,
  //       quote,
  //     });
  //     return data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<ApiErrorResponse>;
  //     throw new Error(
  //       axiosError.response?.data?.message || 'An unknown error occurred',
  //     );
  //   }
  // }

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Orders();
