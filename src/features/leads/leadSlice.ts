import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Mark = {
  id: number;
  name: string;
};

type Vehicle = {
  id: number;
  mark: Mark;
  name: string;
  vehicleType: string;
};

type LeadVehicle = {
  id: number;
  vehicle: Vehicle;
  vehicleYear: number;
  lead: number;
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

type Source = {
  id: number;
  name: string;
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
  dateEstShip: string;
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
    dateEstShip: '',
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
    dateEstShip: '',
  },
  status: 'idle',
};

type UpdateFieldAction<T extends keyof LeadData> = {
  field: T;
  value: LeadData[T]; // Ensures the value is of the type that the field in LeadData expects
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
    updateField: <T extends keyof LeadData>(
      state: LeadState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.leadData, field, value);

      // state.leadData[field] = value;
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

export const { setLeadData, updateField, resetField } = leadSlice.actions;

export default leadSlice.reducer;

// {
//   "id": 84,
//   "customerName": "Ali Brian",
//   "customerPhone": "22222222222",
//   "originName": "Illinois, IL 61791",
//   "destinationName": "California, CA 90844",
//   "leadVehicles": [
//       {
//           "id": 54,
//           "vehicle": {
//               "id": 218,
//               "mark": {
//                   "id": 35,
//                   "name": "Mercedes-Benz"
//               },
//               "name": "A-Class",
//               "vehicleType": "Car"
//           },
//           "vehicleYear": 2024,
//           "lead": 84
//       }
//   ],
//   "user": {
//       "id": 1,
//       "picture": "http://crmapi01xz.matelogisticss.com/media/profile_pictures/1.png"
//   },
//   "extraUser": null,
//   "customer": {
//       "id": 2,
//       "name": "Ali Brian",
//       "email": "alibrian@gmail.com",
//       "phone": "22222222222",
//       "note": null,
//       "createdAt": "03/17/2024 09:22 AM",
//       "updatedAt": "03/17/2024 09:22 AM"
//   },
//   "origin": {
//       "id": 370,
//       "state": {
//           "id": 17,
//           "name": "Illinois",
//           "code": "IL"
//       },
//       "name": "Bloomington",
//       "zip": "61791",
//       "text": null,
//       "long": -1.5891981,
//       "lat": 42.8082302
//   },
//   "destination": {
//       "id": 377,
//       "state": {
//           "id": 6,
//           "name": "California",
//           "code": "CA"
//       },
//       "name": "Long Beach",
//       "zip": "90844",
//       "text": null,
//       "long": 17.168092452559726,
//       "lat": 48.7172601837884
//   },
//   "source": {
//       "id": 2,
//       "name": "Website"
//   },
//   "guid": "ae006353-6f0d-47ab-bc66-c63ce56d3c6c",
//   "createdAt": "05/01/2024 05:05 PM",
//   "updatedAt": "05/01/2024 05:05 PM",
//   "status": "leads",
//   "price": 2147483647,
//   "condition": "rols",
//   "trailerType": "open",
//   "notes": "test",
//   "reservationPrice": 2147483647,
//   "dateEstShip": "2024-05-29"
// }
