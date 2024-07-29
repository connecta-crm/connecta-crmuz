import { AxiosError } from 'axios';
import { GroupEmailParams } from '../../features/group-actions/useGroupEmail';
import { GroupReassignParams } from '../../features/group-actions/useGroupReassign';
import { GroupSmsParams } from '../../features/group-actions/useGroupSms';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class GroupActions {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  // POST: /group-actions/reassign/
  async groupReassign({ ...payload }: GroupReassignParams) {
    try {
      const { data } = await this.$api.post('/group-actions/reassign/', {
        ...payload,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /group-actions/sms/
  async groupSms({ ...payload }: GroupSmsParams) {
    try {
      const { data } = await this.$api.post('/group-actions/sms/', {
        ...payload,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  // POST: /group-actions/email/
  async groupEmail({ ...payload }: GroupEmailParams) {
    try {
      const { data } = await this.$api.post('/group-actions/email/', {
        ...payload,
      });
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

export default new GroupActions();
