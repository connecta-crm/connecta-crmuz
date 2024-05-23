import { LeadData, LeadState, LeadVehicle } from './LeadDataType';
import { OrderData, OrderState, OrderVehicle } from './OrderDataType';
import { QuoteData, QuoteState, QuoteVehicle } from './QuoteDataType';

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

export type RevertFieldAction<
  T extends keyof (LeadData & QuoteData & OrderData),
> = {
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
  | QuoteVehicle[]
  | QuoteData
  | QuoteData[]
  | QuoteState
  | OrderVehicle[]
  | OrderData
  | OrderData[]
  | OrderState
  | Customer
  | Source;

export type NestedObject = {
  [key: string]:
    | NestedObject
    | NestedObjectValue
    | LeadData
    | LeadVehicle
    | LeadVehicle[]
    | QuoteData
    | QuoteVehicle
    | QuoteVehicle[]
    | OrderData
    | OrderVehicle
    | OrderVehicle[];
};
/* ==================================================================================================================*/
