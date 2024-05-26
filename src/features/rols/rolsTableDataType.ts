export type RolsUsersType = {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
};
export interface RolsTableDataType {
  accessName?: string;
  accessStatus?: string;
  includedUsers?:RolsUsersType[]
  includedFeatures?:RolsUsersType[]
}
