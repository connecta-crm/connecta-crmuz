import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerData,
  LeadData,
  LeadVehicle,
  QuoteState,
  RevertFieldAction,
  UpdateFieldAction,
  UpdateVehicleFieldAction,
} from '../../models';
import {
  initialLeadData,
  leadData,
  setNestedObjectValue,
} from '../leads/leadSlice';

const initialState: QuoteState = {
  quoteData: leadData,
  initialQuoteData: initialLeadData,
  status: 'idle',
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData: (state, action: PayloadAction<LeadData>) => {
      state.quoteData = action.payload;
      state.initialQuoteData = action.payload;
    },
    updateField: <T extends keyof (LeadData & Customer & CustomerData)>(
      state: QuoteState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.quoteData, field, value as keyof undefined);
    },
    updateVehicleField: <T extends keyof LeadVehicle>(
      state: QuoteState,
      action: PayloadAction<UpdateVehicleFieldAction<T>>,
    ) => {
      const { vehicleIndex, field, value } = action.payload;
      const vehicles = [...state.quoteData.leadVehicles];
      const vehicle = vehicles[vehicleIndex];
      setNestedObjectValue(vehicle, field, value as keyof undefined);
      vehicles[vehicleIndex] = vehicle;
      state.quoteData.leadVehicles = vehicles;
    },
    resetField: <T extends keyof LeadData>(
      state: QuoteState,
      action: PayloadAction<RevertFieldAction<T>>,
    ) => {
      const { field } = action.payload;
      if (!(field in state.initialQuoteData))
        throw new Error('Invalid Field in quoteSlice');
      state.quoteData[field] = state.initialQuoteData[field];
    },
  },
});

export const getQuoteData = (state: { lead: QuoteState }) =>
  state.lead.quoteData;

export const { setQuoteData, updateField, updateVehicleField, resetField } =
  quoteSlice.actions;

export default quoteSlice.reducer;
