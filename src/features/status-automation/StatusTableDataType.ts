import { LogType } from '../dstribution/DistributionDataType';

export interface StatusTableDataType {
  id: number;
  emailTemplateName: string;
  smsTemplateName: string;
  name: string;
  steps: string;
  delaysMinutes: string;
  status: string;
  emailTemplate: string;
  smsTemplate: string;
  updatedFrom: string;
  includedUsers: string[];
  availableUsers:string[]
  logs: LogType[];
  
}
