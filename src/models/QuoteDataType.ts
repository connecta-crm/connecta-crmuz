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

export type QuoteDataType = {
  vehicles: {
    vehicle: string | null;
    vehicleYear: FormDataEntryValue | null;
  }[];
  status: string | null;
  price: number | null;
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
/* ==================================================================================================================*/

export type QuoteData = {
  id: number;
  customerName: string;
  customerPhone: string;
  originName: string;
  destinationName: string;
  quoteVehicles: QuoteVehicle[];
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

export type QuoteState = {
  quoteData: QuoteData;
  initialQuoteData: QuoteData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

export type QuoteVehicle = {
  id: number | null;
  vehicle: Vehicle;
  vehicleYear: string | null;
  quote: number | null;
};

// * INITIAL QUOTE DATA

export const quoteData = {
  id: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  quoteVehicles: [],
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

const initialQuoteData = {
  id: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  quoteVehicles: [],
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

export default initialQuoteData;
