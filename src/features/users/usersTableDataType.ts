export interface UsersTableDataType {
  id: number | null;
  isActive?: boolean;
  username?: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  ext: string;
  email: string;
  picture: string;
  team: string;
  access: string;
  position: string | null;
  status?: string;
  accessRole?: string;
  newpassword?: string | null;
  teamName?:string|null
}
