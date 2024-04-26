import { AxiosError } from 'axios';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Leads {
  // @ts-expect-error: Unreachable code error
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
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

  throwError(error: unknown) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'An unknown error occurred',
    );
  }
}

export default new Leads();
