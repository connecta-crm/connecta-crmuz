import { AxiosError } from 'axios';
import { LeadsParamsType } from '../../features/leads/useLeads';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Leads {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getLeads({ limit, offset }: LeadsParamsType) {
    try {
      const { data } = await this.$api.get('/leads/', {
        params: {
          limit,
          offset,
        },
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // get make

  async getMake(text: string | undefined) {
    try {
      const { data } = await this.$api.get(
        !text ? '/cars/marks-list/' : '/cars/marks-list/?q=' + text,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getModel(id: number | null, text: string | undefined) {
    try {
      const { data } = await this.$api.get(
        `cars/models-list/${id ? '?mark=' + id : ''}${text ? '&q=' + text : ''}`,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getCity(text: string | null) {
    try {
      const { data } = await this.$api.get(
        `/address/cities-list/${text ? '?q=' + text : ''}`,
      );
      console.log(data);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getSource() {
    try {
      const { data } = await this.$api.get(`/providers/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getPerson(text: string) {
    try {
      const { data } = await this.$api.get(`/customers/?` + text);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createLead(lead) {
    try {
      const { data } = await this.$api.post('/leads/create/', lead);
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

export default new Leads();
