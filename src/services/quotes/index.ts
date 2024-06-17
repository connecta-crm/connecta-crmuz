import { AxiosError } from 'axios';
import { LogsParamsType } from '../../features/leads/useLeadLogs';
import { ReassignUserParams } from '../../features/orders/useOrderReassignUser';
import { QuoteEditParamsType } from '../../features/quotes/useQuoteEdit';
import { QuoteCreateVehicleParams } from '../../features/quotes/useQuoteVehicleCreate';
import { QuoteEditVehicleParams } from '../../features/quotes/useQuoteVehicleEdit';
import { QuotesParamsType } from '../../features/quotes/useQuotes';
import { QuoteDataType } from '../../models/QuoteDataType';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Quotes {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getQuotes({
    limit,
    offset,
    source,
    q,
    status,
    user,
  }: QuotesParamsType) {
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

      const { data } = await this.$api.get('/quote/', {
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

  // GET: /quote/:guid/detail/
  async getQuote(guid: string | null) {
    try {
      const { data } = await this.$api.get(`/quote/detail/${guid}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/:guid/create/
  async createQuote(quote: QuoteDataType) {
    try {
      const { data } = await this.$api.post('/quote/create/', quote);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: /quote/:guid/update/
  async editQuote({ guid, updateQuoteModel }: QuoteEditParamsType) {
    try {
      const { data } = await this.$api.put(`/quote/update/${guid}/`, {
        ...updateQuoteModel,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: /quote/vehicle/:id/
  async editQuoteVehicle({
    id,
    vehicleYear,
    vehicle,
    quote,
  }: QuoteEditVehicleParams) {
    try {
      const { data } = await this.$api.put(`/quote/vehicle/${id}/`, {
        vehicleYear,
        vehicle,
        quote,
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
  async deleteQuoteVehicle(id: number | undefined) {
    try {
      const { data } = await this.$api.delete(`/quote/vehicle/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/vehicle/add/
  async addQuoteVehicle({
    vehicleYear,
    vehicle,
    quote,
  }: QuoteCreateVehicleParams) {
    try {
      const { data } = await this.$api.post(`/quote/vehicle/add/`, {
        vehicleYear,
        vehicle,
        quote,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /leads/attachments/:leadId/
  async getQuoteAttachments(id: number) {
    try {
      const { data } = await this.$api.get(`/quote/attachments/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getQuoteLogs({ id }: LogsParamsType) {
    try {
      // const params: Record<string, unknown> = {
      //   // limit,
      //   // offset,
      //   // order,
      // };

      const { data } = await this.$api.get(`/quote/logs/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /orders/convert/from-quote/:guid/
  async convertToOrder({ id, model }: { id: number; model: unknown }) {
    try {
      const { data } = await this.$api.post(
        `/orders/convert/from-quote/${id}/`,
        {
          ...model,
        },
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/reason/reassign/{guid}/
  async quoteReassignUser({ guid, model }: ReassignUserParams) {
    try {
      const { data } = await this.$api.post(`/quote/reason/reassign/${guid}/`, {
        ...model,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /quote/reason/archive/{order}/
  async quoteArchive(guid: string, reason: string) {
    try {
      const { data } = await this.$api.post(`/quote/reason/archive/${guid}/`, {
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

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Quotes();
