import { AxiosError } from 'axios';
import apiClient from '../axios';
import { TeamsParamsType } from '../../features/teams/useTeam';
import { TeamsTableDataType } from '../../features/teams/teamsTableDataType';

type ApiErrorResponse = {
  message: string;
};

class Team {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getTeam({ url }: TeamsParamsType) {
    try {
      const { data } = await this.$api.get(
        !url ? '/users/team/' : '/users/team?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }


  async createTeam(team:TeamsTableDataType) {
    try {
      const { data } = await this.$api.post('users/team/create/', team);
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

export default new Team();
