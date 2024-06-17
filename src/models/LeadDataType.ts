import {
  Customer,
  Location,
  Source,
  User,
  Vehicle,
  initialCustomer,
  initialLocation,
  initialSource,
  initialUser,
} from './DataTypes';

export type LeadDataType = {
  vehicles: {
    vehicle: string | null;
    vehicleYear: FormDataEntryValue | null;
  }[];
  status: string | null;
  price: number;
  condition: string | null;
  trailerType: string | null;
  notes: string | undefined;
  reservationPrice: number;
  dateEstShip: string | null;
  customer: string | null;
  source: string | null;
  origin: string | null;
  destination: string | null;
  user: string | undefined;
  // extraUser: 0,
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
  originAddress: string;
  destinationAddress: string;
};

export type LeadState = {
  leadData: LeadData;
  initialLeadData: LeadData;
  // status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

export type LeadVehicle = {
  id: number | null;
  vehicle: Vehicle;
  vehicleYear: string | null;
  lead: number | null;
};

// * INITIAL LEAD DATA

export const leadData = {
  id: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  leadVehicles: [],
  user: initialUser,
  extraUser: null,
  customer: initialCustomer,
  origin: initialLocation,
  destination: initialLocation,
  source: initialSource,
  guid: '',
  createdAt: '',
  updatedAt: '',
  status: '',
  price: 0,
  condition: '',
  trailerType: '',
  notes: '',
  reservationPrice: 0,
  dateEstShip: null,
};

const initialLeadData = {
  id: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  leadVehicles: [],
  user: initialUser,
  extraUser: null,
  customer: initialCustomer,
  origin: initialLocation,
  destination: initialLocation,
  source: initialSource,
  guid: '',
  createdAt: '',
  updatedAt: '',
  status: '',
  price: 0,
  condition: '',
  trailerType: '',
  notes: '',
  reservationPrice: 0,
  dateEstShip: null,
};

export default initialLeadData;
