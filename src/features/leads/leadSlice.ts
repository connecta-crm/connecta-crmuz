import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerData,
  LeadData,
  LeadState,
  LeadVehicle,
  NestedObject,
  QuoteData,
  QuoteVehicle,
  RevertFieldAction,
  Source,
  User,
  Vehicle,
  leadData,
} from '../../models';
import initialLeadData from '../../models/LeadDataType';

type UpdateVehicleFieldAction<T extends keyof LeadVehicle> = {
  vehicleIndex: number;
  field: T extends keyof LeadVehicle ? LeadVehicle[T] : never;
  value: LeadVehicle[T];
};

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

const initialState: LeadState = {
  leadData,
  initialLeadData,
  status: 'idle',
};

export const setNestedObjectValue = (
  obj: NestedObject,
  path:
    | string
    | number
    | Vehicle
    | null
    | User
    | Customer
    | Location
    | Source
    | LeadVehicle[]
    | QuoteVehicle[],
  value:
    | LeadData[keyof (LeadData | Source | Customer)]
    | QuoteData[keyof (QuoteData | Source | Customer)],
) => {
  if (typeof path === 'string') {
    const keys = path.split('.');
    let currentObj: NestedObject = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in currentObj)) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key] as NestedObject;
    }

    const lastKey = keys[keys.length - 1];
    if (lastKey) {
      currentObj[lastKey] = value;
    }
  }
};

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLeadData: (state, action: PayloadAction<LeadData>) => {
      state.leadData = action.payload;
      state.initialLeadData = action.payload;
    },
    updateField: <T extends keyof (LeadData & Customer & CustomerData)>(
      state: LeadState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.leadData, field, value as keyof undefined); // state.leadData[field] = value;
    },
    updateVehicleField: <T extends keyof LeadVehicle>(
      state: LeadState,
      action: PayloadAction<UpdateVehicleFieldAction<T>>,
    ) => {
      const { vehicleIndex, field, value } = action.payload;
      const vehicles = [...state.leadData.leadVehicles];
      const vehicle = vehicles[vehicleIndex];
      setNestedObjectValue(vehicle, field, value as keyof undefined); // vehicle[field] = value;
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
