import { AxiosError } from 'axios';
// import { QuoteEditParamsType } from '../../features/quotes/useQuoteEdit';
// import { QuoteEditVehicleParams } from '../../features/quotes/useQuoteVehicleEdit';
import {
  OrderDispatchEditParamsType,
  OrderEditParamsType,
} from '../../features/orders/useOrderEdit';
import { OrderCreateVehicleParams } from '../../features/orders/useOrderVehicleCreate';
import { OrderEditVehicleParamsType } from '../../features/orders/useOrderVehicleEdit';
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

  // POST: /orders/:guid/create/
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

  // PUT: /orders/:guid/update/
  async editOrder({ guid, updateOrderModel }: OrderEditParamsType) {
    console.log('updateOrderModel', updateOrderModel);
    try {
      const { data } = await this.$api.put(`/orders/update/${guid}/`, {
        ...updateOrderModel,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: /orders/dispatch/:guid/
  async editOrderDispatch({
    guid,
    updateOrderDispatchModel,
  }: OrderDispatchEditParamsType) {
    try {
      const { data } = await this.$api.put(`/orders/dispatch/${guid}/`, {
        ...updateOrderDispatchModel,
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

  // PUT: /orders/vehicle/:id/
  async editOrderVehicle({
    id,
    vehicleYear,
    vehicle,
    order,
    lot,
    vin,
    color,
    plate,
  }: OrderEditVehicleParamsType) {
    try {
      const { data } = await this.$api.put(`/orders/vehicle/${id}/`, {
        vehicleYear,
        vehicle,
        order,
        lot,
        vin,
        color,
        plate,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /quote/vehicle/:id/
  async deleteOrderVehicle(id: number | undefined) {
    try {
      const { data } = await this.$api.delete(`/orders/vehicle/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/vehicle/add/
  async addOrderVehicle({
    order,
    vehicle,
    vehicleYear,
    lot,
    vin,
    color,
    plate,
  }: OrderCreateVehicleParams) {
    try {
      const { data } = await this.$api.post(`/orders/vehicle/add/`, {
        order,
        vehicle,
        vehicleYear,
        lot,
        vin,
        color,
        plate,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /order/attachments/:orderId/
  async getOrderAttachments(id: number) {
    try {
      const { data } = await this.$api.get(`/orders/attachments/${id}`);
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

export default new Orders();
