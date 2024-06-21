import { LogType } from '../dstribution/DistributionDataType';

export interface StatusTableDataType {
  id: number | null;
  updatedFromEmail: string;
  logs: LogType[];
  name: string;
  status: string;
  paymentType: string;
  accountName: string;
  accountUsername: string;
  link: string;
  qrCode: string;
  body: string;
  createdOn?: string;
  updatedFrom: string;
}
