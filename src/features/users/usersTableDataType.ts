export interface UsersTableDataType {
  id?:string
  isActive?:boolean;
  username?:string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  ext: string;
  email: string;
  picture: string;
  team: string;
  access: string;
  position: string|null;
  status?:string
}
