import { AxiosError } from 'axios';
import { CreateNoteParams } from '../../features/attachments/useCreateNote';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Attachments {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
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

  // DELETE: /attachments/create-note/
  async deleteLeadAttachments(id: number) {
    try {
      const { data } = await this.$api.delete(
        `/leads/attachments/delete/${id}`,
      );
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
