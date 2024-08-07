/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from 'axios';
import { CreateFileParams } from '../../features/attachments/useCreateFile';
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

  // GET: /attachments/file/:id
  async getFile(id: number) {
    try {
      const { data } = await this.$api.get(`/attachments/file/${id}`);
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

  // POST: /attachments/create-file/
  async createFile(formData: CreateFileParams) {
    try {
      const { data } = await this.$api.post(
        `/attachments/create-file/`,
        formData,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /attachments/create-phone/
  async createPhone({
    rel,
    text,
    endpointType,
    user,
    fromPhone,
    toPhone,
  }: CreatePhoneParams) {
    try {
      const { data } = await this.$api.post(`/attachments/create-phone/`, {
        rel,
        text,
        endpointType,
        user,
        fromPhone,
        toPhone,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /attachments/create-email/
  async createEmail({
    rel,
    text,
    endpointType,
    subject,
    fromEmail,
    toEmail,
  }: CreateEmailParams) {
    try {
      const { data } = await this.$api.post(`/attachments/create-email/`, {
        rel,
        text,
        endpointType,
        subject,
        fromEmail,
        toEmail,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /attachments/create-task/
  async createTask({
    rel,
    text,
    endpointType,
    type,
    endTime,
    startTime,
    user,
    customer,
    priority,
    busy,
  }: CreateTaskParams) {
    try {
      const { data } = await this.$api.post(`/attachments/create-task/`, {
        rel,
        text,
        endpointType,
        type,
        endTime,
        startTime,
        user,
        customer,
        priority,
        busy,
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

  // DELETE: /leads/attachments/delete/:id
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

  // DELETE: /quote/attachments/delete/:id
  async deleteQuoteAttachments(id: number) {
    try {
      const { data } = await this.$api.delete(
        `/quote/attachments/delete/${id}`,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // DELETE: /orders/attachments/delete/:id
  async deleteOrderAttachments(id: number) {
    try {
      const { data } = await this.$api.delete(
        `/orders/attachments/delete/${id}`,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // GET: /attachments/task-list/
  async getTasks({
    limit,
    offset,
    user,
    q,
    due,
    nextWeek,
    thisWeek,
    toDo,
    today,
    type,
  }: TasksParamsType) {
    try {
      const params: Record<string, unknown> = {
        limit,
        offset,
        q,
        user,
        due,
        nextWeek,
        thisWeek,
        toDo,
        today,
        type,
      };

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

      const { data } = await this.$api.get('/attachments/task-list/', {
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
}

export default new Attachments();
