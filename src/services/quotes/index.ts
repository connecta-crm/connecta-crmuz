import { AxiosError } from 'axios';
import { LogsParamsType } from '../../features/leads/useLeadLogs';
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

  async getQuotes({ limit, offset, source, q, status }: QuotesParamsType) {
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
      const { data } = await this.$api.get('/quote/', { params });
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
  async convertToOrder(id: number) {
    try {
      const { data } = await this.$api.post(
        `/orders/convert/from-quote/${id}/`,
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

export default new Quotes();
