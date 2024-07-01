import { AxiosError } from 'axios';
// import { QuoteEditParamsType } from '../../features/quotes/useQuoteEdit';
// import { QuoteEditVehicleParams } from '../../features/quotes/useQuoteVehicleEdit';
import { LogsParamsType } from '../../features/leads/useLeadLogs';
import { CreateContractParams } from '../../features/orders/useCreateContract';
import { OrderDirectDispatchEditParamsType } from '../../features/orders/useOrderDirectDispatchEdit';
import { OrderDispatchEditParamsType } from '../../features/orders/useOrderDispatchEdit';
import { OrderEditParamsType } from '../../features/orders/useOrderEdit';
import { PostCDParamsType } from '../../features/orders/useOrderPostCD';
import { ReassignUserParams } from '../../features/orders/useOrderReassignUser';
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

  async getOrders({
    limit,
    offset,
    source,
    q,
    status,
    user,
  }: OrdersParamsType) {
    try {
      const params: Record<string, unknown> = {
        limit,
        offset,
        q,
        status,
      };

      if (source) {
        params['source'] = source;
      }
      if (user) {
        params['user'] = user;
      }

      const paramsSerializer = (params: Record<string, unknown>) => {
        const searchParams = new URLSearchParams();
        Object.keys(params).forEach((key) => {
          const value = params[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, item);
            });
          } else {
            searchParams.append(key, String(value));
          }
        });
        return searchParams.toString();
      };

      const { data } = await this.$api.get('/orders/', {
        params,
        paramsSerializer,
      });
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

  // PUT: /orders/dispatch/:guid/
  async editOrderDirectDispatch({
    guid,
    updateOrderDirectDispatchModel,
  }: OrderDirectDispatchEditParamsType) {
    try {
      const { data } = await this.$api.put(`/orders/direct-dispatch/${guid}/`, {
        ...updateOrderDirectDispatchModel,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getOrderLogs({ limit, offset, id }: LogsParamsType) {
    try {
      // const params: Record<string, unknown> = {
      //   // limit,
      //   // offset,
      //   // order,
      // };

      const { data } = await this.$api.get(`/orders/logs/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/post-cd/:guid/
  async orderPostCD({ guid, action }: PostCDParamsType) {
    try {
      const { data } = await this.$api.post(`/orders/post-cd/${guid}/`, {
        action,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/reason/reassign/{guid}/
  async orderReassignUser({ guid, model }: ReassignUserParams) {
    try {
      const { data } = await this.$api.post(
        `/orders/reason/reassign/${guid}/`,
        { ...model },
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/reason/archive/{guid}/
  async orderArchive(guid: string, reason: string) {
    try {
      const { data } = await this.$api.post(`/orders/reason/archive/${guid}/`, {
        reason,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /orders/providers/
  async getOrderProviders(status: string) {
    try {
      const { data } = await this.$api.get('/orders/providers/', {
        params: { status },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/contracts/add/
  async createContract({ signed, contractType, order }: CreateContractParams) {
    try {
      const { data } = await this.$api.post('/orders/contracts/add/', {
        signed,
        contractType,
        order,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/contracts/sms/:contract
  async contractSendSMS(contract: number) {
    try {
      const { data } = await this.$api.post(
        `/orders/contracts/sms/${contract}/`,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /orders/contracts/list/:order
  async getContractList(order: string) {
    try {
      const { data } = await this.$api.get(`/orders/contracts/list/${order}/`);
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
