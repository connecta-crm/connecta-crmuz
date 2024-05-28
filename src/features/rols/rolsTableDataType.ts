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
  firstName?:string
  // includedFeatures?:RolsUsersType[]
  includedFeatures:number[]
}
