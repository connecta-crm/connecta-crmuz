import { AxiosError } from 'axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { VoipTableDataType } from '../../features/voip/voipTableDataType';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Voip {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getVoips({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(!url ? '/voip/' : '/voip?' + url);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getVoipDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(`/voip/${id}/`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createVoip(ground: VoipTableDataType) {
    try {
      const { data } = await this.$api.post('/voip/', ground);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateVoip(voip: VoipTableDataType) {
    try {
      const { data } = await this.$api.put(`/voip/${voip.id}`, voip);
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

export default new Voip();
