import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Mark = {
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

type User = {
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

type State = {
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

export type LeadState = {
  leadData: LeadData;
  initialLeadData: LeadData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

const initialUser: User = {
  id: 0,
  picture: '',
};

const initialCustomer: Customer = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  note: null,
  createdAt: '',
  updatedAt: '',
};

const initialLocation: Location = {
  id: 0,
  state: { id: 0, name: '', code: '' },
  name: '',
  zip: '',
  text: null,
  long: 0,
  lat: 0,
};

const initialSource: Source = {
  id: 0,
  name: '',
};

const initialState: LeadState = {
  leadData: {
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
  },
  initialLeadData: {
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
  },
  status: 'idle',
};

// type UpdateFieldAction<T extends keyof LeadData> = {
//   field: T | keyof T;
//   value: LeadData[T] | T[keyof T];
// };
type UpdateFieldAction<T extends keyof (LeadData & Customer & Source)> = {
  field: T extends keyof LeadData
    ? LeadData[T]
    : T extends keyof Customer
      ? Customer[T]
      : T extends keyof Source
        ? Source[T]
        : never;
  value: T[keyof T];
};

type UpdateVehicleFieldAction<T extends keyof LeadVehicle> = {
  vehicleIndex: number;
  field: T extends keyof LeadVehicle ? LeadVehicle[T] : never;
  value: LeadVehicle[T];
};

type RevertFieldAction<T extends keyof LeadData> = {
  field: T;
};

function setNestedObjectValue(obj, path, value) {
  // Split the path into an array of keys
  const keys = path.split('.');
  // Get the last key
  const lastKey = keys.pop();
  // Reduce the keys array to navigate to the nested object
  const lastObj = keys.reduce((acc, key) => {
    if (acc[key] === undefined) acc[key] = {}; // Create nested object if it does not exist
    return acc[key];
  }, obj);
  // Set the value to the last key
  lastObj[lastKey] = value;
}

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLeadData: (state, action: PayloadAction<LeadData>) => {
      state.leadData = action.payload;
      state.initialLeadData = action.payload;
    },
    updateField: <T extends keyof (LeadData & Customer)>(
      state: LeadState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.leadData, field, value);
      // state.leadData[field] = value;
    },
    updateVehicleField: <T extends keyof LeadVehicle>(
      state: LeadState,
      action: PayloadAction<UpdateVehicleFieldAction<T>>,
    ) => {
      const { vehicleIndex, field, value } = action.payload;
      const vehicles = [...state.leadData.leadVehicles];
      const vehicle = vehicles[vehicleIndex];
      setNestedObjectValue(vehicle, field, value); // vehicle[field] = value;
      vehicles[vehicleIndex] = vehicle;
      state.leadData.leadVehicles = vehicles;
    },
    resetField: <T extends keyof LeadData>(
      state: LeadState,
      action: PayloadAction<RevertFieldAction<T>>,
    ) => {
      const { field } = action.payload;
      if (!(field in state.initialLeadData))
        throw new Error('Invalid Field in LeadSlice');
      state.leadData[field] = state.initialLeadData[field];
    },
  },
});

export const getLeadData = (state: { lead: LeadState }) => state.lead.leadData;

export const { setLeadData, updateField, updateVehicleField, resetField } =
  leadSlice.actions;

export default leadSlice.reducer;
