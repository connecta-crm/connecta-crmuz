import { AxiosError } from 'axios';
import { CreateNoteParams } from '../../features/attachments/useCreateNote';
import { LeadsParamsType } from '../../features/leads/useLeads';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Attachments {
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

  // POST: /attachments/create-note/
  async createNote({ rel, text, endpointType, user }: CreateNoteParams) {
    try {
      const { data } = await this.$api.post(`/attachments/create-note/`, {
        rel,
        text,
        endpointType,
        user,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }
}

export default new Attachments();
