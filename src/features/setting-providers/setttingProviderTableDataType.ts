export interface SettingProvidersTableDataType {
  logs?:{ title: string; message: string }[]
  id: number;
  name: string;
  status: string;
  type: "standard"|"exclusive";
  effective: "yes"|"no";
  effectiveUsersCount: number;
  email: string;
  subject: string;
  isExternal: boolean;
  updatedFrom: number;
  // exclusiveUsers: string[];
  value:string,
  defaultDeposit:string;
  leadsInQueue:string
  availableExclusiveUsers:{id:string,firstName:string,lastName:string}[]
  exclusiveUsers:{id:string,firstName:string,lastName:string}[] | string[]
}
