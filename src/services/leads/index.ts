/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultOptionType } from 'antd/es/select';
import { AxiosError } from 'axios';
import { LeadConvertParams } from '../../features/leads/useLeadConvert';
import { LeadEditParamsType } from '../../features/leads/useLeadEdit';
import { LogsParamsType } from '../../features/leads/useLeadLogs';
import { LeadCreateVehicleParams } from '../../features/leads/useLeadVehicleCreate';
import { LeadEditVehicleParamsType } from '../../features/leads/useLeadVehicleEdit';
import { LeadsParamsType } from '../../features/leads/useLeads';
import { ReassignUserParams } from '../../features/orders/useOrderReassignUser';
import { LeadDataType } from '../../models';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Leads {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getLeads({ limit, offset, source, q, status, user }: LeadsParamsType) {
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

      const { data } = await this.$api.get('/leads/', {
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
  async leadConvert({
    guid,
    price,
    reservationPrice,
    quote,
  }: LeadConvertParams) {
    try {
      const { data } = await this.$api.post(`/leads/convert/${guid}/`, {
        price,
        reservationPrice,
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
  async getLeadAttachments(id: number) {
    try {
      const { data } = await this.$api.get(`/leads/attachments/${id}`);
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
  async getLeadLogs({ limit, offset, id }: LogsParamsType) {
    try {
      // const params: Record<string, unknown> = {
      //   // limit,
      //   // offset,
      //   // order,
      // };

      const { data } = await this.$api.get(`/leads/logs/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  /* ==================================================================================================================*/
  // POST: /leads/reason/reassign/{guid}/
  async leadReassignUser({ guid, model }: ReassignUserParams) {
    try {
      const { data } = await this.$api.post(`/leads/reason/reassign/${guid}/`, {
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

  // POST: /leads/reason/archive/{order}/
  async leadArchive(guid: string, reason: string) {
    try {
      const { data } = await this.$api.post(`/leads/reason/archive/${guid}/`, {
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

  // GET: /leads/providers/
  async getLeadProviders(status: string) {
    try {
      const { data } = await this.$api.get('/leads/providers/', {
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

  async getCDPrice(feature: 'leads' | 'quote' | 'order', guid: string | null) {
    try {
      const { data } = await this.$api.get(
        `/fields/cd-price/${feature}/${guid}/`,
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

export default new Leads();
