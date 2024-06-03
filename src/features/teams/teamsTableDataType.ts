export type TeamUsersType = {
  id: string;
  picture: string;
  firstName: string;
  lastName: string;
};
export interface TeamsTableDataType {
  logs?:{ title: string; message: string }[]
  id:number|null
  name: string;
  status?: string;
  createdAt?: string;
  users?: TeamUsersType[];
}
