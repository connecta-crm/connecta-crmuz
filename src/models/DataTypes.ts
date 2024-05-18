import { LeadState } from './LeadDataType';

export type Mark = {
  id: number | null;
  name: string | null;
};

export type Vehicle = {
  id: number | null;
  mark: Mark;
  name: string | null;
  vehicleType: string | null;
};

export type LeadVehicle = {
  id: number | null;
  vehicle: Vehicle;
  vehicleYear: string | null;
  lead: number | null;
};

export type User = {
  id: number;
  picture: string;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CustomerData = {
  customer: Customer;
};

export type State = {
  id: number;
  name: string;
  code: string;
};

export type Location = {
  id: number;
  state: State;
  name: string;
  zip: string;
  text: string | null;
  long: number;
  lat: number;
};

export type Source = {
  id: number;
  name: string;
};

export type SourceState = {
  data: Source;
};

export type LeadData = {
  id: number;
  customerName: string;
  customerPhone: string;
  originName: string;
  destinationName: string;
  leadVehicles: LeadVehicle[];
  user: User;
  extraUser: null;
  customer: Customer;
  origin: Location;
  destination: Location;
  source: Source;
  guid: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  price: number;
  condition: string;
  trailerType: string;
  notes: string;
  reservationPrice: number;
  dateEstShip: string | null;
};

export const initialUser: User = {
  id: 0,
  picture: '',
};

export const initialCustomer: Customer = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  note: null,
  createdAt: '',
  updatedAt: '',
};

export const initialLocation: Location = {
  id: 0,
  state: { id: 0, name: '', code: '' },
  name: '',
  zip: '',
  text: null,
  long: 0,
  lat: 0,
};

export const initialSource: Source = {
  id: 0,
  name: '',
};

/* ==================================================================================================================*/

export type UpdateFieldAction<T extends keyof (LeadData & Customer & Source)> =
  {
    field: T extends keyof LeadData
      ? LeadData[T]
      : T extends keyof Customer
        ? Customer[T]
        : T extends keyof Source
          ? Source[T]
          : never;
    value: T[keyof T];
  };

export type UpdateVehicleFieldAction<T extends keyof LeadVehicle> = {
  vehicleIndex: number;
  field: T extends keyof LeadVehicle ? LeadVehicle[T] : never;
  value: LeadVehicle[T];
};

export type RevertFieldAction<T extends keyof LeadData> = {
  field: T;
};

export type NestedObjectValue =
  | string
  | number
  | null
  | Vehicle
  | User
  | Customer
  | Location
  | Source
  | LeadVehicle[]
  | LeadData
  | LeadData[]
  | LeadState
  | Customer
  | Source;

export type NestedObject = {
  [key: string]:
    | NestedObject
    | NestedObjectValue
    | LeadData
    | LeadVehicle
    | LeadVehicle[];
};
