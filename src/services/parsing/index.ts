import { AxiosError } from 'axios';
import { GroundParamsType } from '../../features/ground/useGround';
import { ParsingType } from '../../features/parsing/Parsing';
import { ParsingTableDataType } from '../../features/parsing/parsingTableDataType';
import apiClient from '../axios';

type ApiErrorResponse = {
  message: string;
};

class Parsing {
  private $api: typeof apiClient;

  constructor() {
    this.$api = apiClient;
  }

  async getParsing({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url
          ? '/company-management/parsing-group-all/list/'
          : '/company-management/parsing-group-all/list?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getGroupParsing({ url }: GroundParamsType) {
    try {
      const { data } = await this.$api.get(
        !url
          ? '/company-management/parsing-group/list/'
          : '/company-management/parsing-group/list?' + url,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getGroupItemsParsing({ id }: { id: string }) {
    try {
      const { data } = await this.$api.get(
        !id
          ? '/company-management/parsing-item/list/'
          : '/company-management/parsing-item/list/?group=' + id,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async getParsingDetails(id: number | null) {
    try {
      const { data } = await this.$api.get(
        `/ompany-management/parsing-item/list/${id}/`,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async createParsing(parsing: ParsingTableDataType) {
    try {
      const { data } = await this.$api.post(
        '/company-management/parsing-value/create/',
        parsing,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async updateParsing(parssing: ParsingType) {
    try {
      const { data } = await this.$api.put(
        `company-management/parsing-value/update/${parssing.id}/`,
        parssing,
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(
        axiosError.response?.data?.message || 'An unknown error occurred',
      );
    }
  }

  async deleteParsing(id: string|undefined) {
    try {
      const { data } = await this.$api.delete(
        `/company-management/parsing-value/delete/${id}/`,
      );
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

export default new Parsing();
