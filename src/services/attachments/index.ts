import { AxiosError } from 'axios';
import { CreateNoteParams } from '../../features/attachments/useCreateNote';
import { UpdateNoteParams } from '../../features/attachments/useUpdateNote';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Attachments {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // GET: /attachments/note/:id
  async getNote(id: number) {
    try {
      const { data } = await this.$api.get(`/attachments/note/${id}`);
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

  // PUT: /attachments/note/:id
  async updateNote({ id, text, endpointType, user }: UpdateNoteParams) {
    try {
      const { data } = await this.$api.put(`/attachments/note/${id}`, {
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

  // DELETE: /attachments/delete/:id
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
