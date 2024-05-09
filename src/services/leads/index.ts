import { DefaultOptionType } from 'antd/es/select';
import { AxiosError } from 'axios';
import { LeadConvertParams } from '../../features/leads/useLeadConvert';
import { LeadEditParamsType } from '../../features/leads/useLeadEdit';
import { LeadCreateVehicleParams } from '../../features/leads/useLeadVehicleCreate';
import { LeadEditVehicleParamsType } from '../../features/leads/useLeadVehicleEdit';
import { LeadsParamsType } from '../../features/leads/useLeads';
import { LeadDataType } from '../../models/LeadDataType';
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

  // PUT: /leads/:guid/update/
  async editLead({ guid, updateLeadModel }: LeadEditParamsType) {
    try {
      const { data } = await this.$api.put(`/leads/update/${guid}/`, {
        ...updateLeadModel,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // PUT: /leads/vehicle/:id/
  async editLeadVehicle({
    id,
    vehicleYear,
    vehicle,
    lead,
  }: LeadEditVehicleParamsType) {
    try {
      const { data } = await this.$api.put(`/leads/vehicle/${id}/`, {
        vehicleYear,
        vehicle,
        lead,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /leads/vehicle/:id/
  async deleteLeadVehicle(id: number | undefined) {
    try {
      const { data } = await this.$api.delete(`/leads/vehicle/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /leads/vehicle/add/
  async addLeadVehicle({
    vehicleYear,
    vehicle,
    lead,
  }: LeadCreateVehicleParams) {
    try {
      const { data } = await this.$api.post(`/leads/vehicle/add/`, {
        vehicleYear,
        vehicle,
        lead,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /leads/convert/:guid/
  async leadConvert({ guid, price, reservationPrice }: LeadConvertParams) {
    try {
      const { data } = await this.$api.post(`/leads/convert/${guid}/`, {
        price,
        reservationPrice,
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

  async getModel(
    text: DefaultOptionType | undefined | { mark: string; q: string },
  ) {
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

  async createLead(lead: LeadDataType) {
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
