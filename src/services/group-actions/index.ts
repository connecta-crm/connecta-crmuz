import { AxiosError } from 'axios';
import { GroupReassignParams } from '../../features/group-actions/useGroupReassign';
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

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new GroupActions();
