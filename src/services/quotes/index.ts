import { AxiosError } from 'axios';
import { QuotesParamsType } from '../../features/quotes/useQuotes';
import apiClient from '../axios';
import { QuoteDataType } from '../../models/QuoteDataType';

type ApiErrorResponse = {
  message: string;
};

class Quotes {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getQuotes({ limit, offset, source, q }: QuotesParamsType) {
    try {
      const params: Record<string, unknown> = {
        limit,
        offset,
        q,
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


  async createQuote(quote:QuoteDataType) {
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
  

  // @ts-expect-error: Unreachable code error
  async vehicleEditFake(formData) {
    return await new Promise((res) => {
      setTimeout(() => {
        // @ts-expect-error: Unreachable code error
        res('success', formData);
      }, 1500);
    });
  }

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Quotes();
