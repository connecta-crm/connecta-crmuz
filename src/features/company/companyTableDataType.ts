import { LogType } from "../dstribution/DistributionDataType";

export interface CompanyTableDataType {
  logs:LogType[];
  id: number;
  name: string;
  department: string;
  mainline: string;
  fax: string;
  email: string;
  supportEmail: string;
  accountingEmail: string;
  address: string;
  monFri: string;
  saturday: string;
  sunday: string;
  updatedFrom: string | null;
}
