export type RolsUsersType = {
  firstName?: string;
  id: string;
  name: string;
  // endpoint?: string;
  // method?: string;
};
export interface RolsTableDataType {
  logs?:{ title: string; message: string }[]
  id: string;
  name?: string;
  accessName?: string;
  accessStatus?: string;
  includedUsers?: RolsUsersType[];
  firstName?: string;
  availableFeatures: RolsUsersType[] | string[];
  includedFeatures: RolsUsersType[] | string[];
  accessUsers:RolsUsersType[]
}
