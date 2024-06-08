import { AxiosError } from 'axios';
import { GroundParamsType } from '../../features/ground/useGround';
import apiClient from '../axios';
import { TemplatesTableDataType } from '../../features/templates/templatesTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Templates {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getTemplates({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(!url ? '/template/' : '/template?' + url);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getTemplatesDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/template/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createTemplate(template: TemplatesTableDataType) {
    try {
      const { data } = await this.$api.post('/template/', template);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateTemplate(template: TemplatesTableDataType) {
    try {
      const { data } = await this.$api.put(`/template/${template.id}`, template);
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

export default new Templates();
