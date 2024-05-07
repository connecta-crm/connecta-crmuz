import { AxiosError } from 'axios';
import { EditLeadProps } from '../../features/drawer/useEditLead';
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

  async getLeads({ limit, offset, source, q, status }: LeadsParamsType) {
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
      const { data } = await this.$api.get('/leads/', { params });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /leads/:guid/detail/
  async getLead(guid: string | null) {
    try {
      const { data } = await this.$api.get(`/leads/detail/${guid}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PATCH: /leads/:guid/update/
  async editLead({ guid, updateLeadData }: EditLeadProps) {
    try {
      const { data } = await this.$api.patch(`/leads/${guid}/update/`, {
        ...updateLeadData,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

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

  async getModel(text: undefined | { mark: string; q: string }) {
    const url = new URLSearchParams(text);
    try {
      const { data } = await this.$api.get(
        `cars/models-list/${text ? '?' + url.toString() : ''}`,
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

  async getPerson(text: string | undefined) {
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

  async createPerson(item: { name: string; email: string; phone: string }) {
    try {
      const { data } = await this.$api.post(`/customers/create/`, item);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
  async createNumber(item: { customer: string; phone: string }) {
    try {
      const { data } = await this.$api.post(`/customers/create-contact/`, item);
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
