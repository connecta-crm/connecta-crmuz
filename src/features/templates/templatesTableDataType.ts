import { LogType } from '../dstribution/DistributionDataType';

export interface TemplatesTableDataType {
  id: number | null;
  updatedFromEmail: string;
  logs: LogType[];
  name: string;
  body: string;
  status?: string;
  templateType?: string;
  createdAt?: string;
}
