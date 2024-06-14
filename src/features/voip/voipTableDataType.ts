import { LogType } from '../dstribution/DistributionDataType';

export interface VoipTableDataType {
  id: number | null;
  logs: LogType[];
  name: string;
  status?: string;
  createdAt?: string;
  voipType?: string;
  updatedAt?: string;
  api?: string;
  body: string;
  createdOn?: string;
}
