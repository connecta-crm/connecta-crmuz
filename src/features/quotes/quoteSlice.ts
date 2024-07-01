import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerData,
  QuoteData,
  QuoteState,
  QuoteVehicle,
  RevertFieldAction,
  Source,
  quoteData,
} from '../../models';
import initialQuoteData from '../../models/QuoteDataType';
import { setNestedObjectValue } from '../leads/leadSlice';

type UpdateVehicleFieldAction<T extends keyof QuoteVehicle> = {
  vehicleIndex: number;
  field: T extends keyof QuoteVehicle ? QuoteVehicle[T] : never;
  value: QuoteVehicle[T];
};

type UpdateFieldAction<T extends keyof (QuoteData & Customer & Source)> = {
  field: T extends keyof QuoteData
    ? QuoteData[T]
    : T extends keyof Customer
      ? Customer[T]
      : T extends keyof Source
        ? Source[T]
        : never;
  value: T[keyof T];
};

const initialState: QuoteState = {
  quoteData,
  initialQuoteData,
  status: 'idle',
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData: (state, action: PayloadAction<QuoteData>) => {
      state.quoteData = action.payload;
      state.initialQuoteData = action.payload;
    },
    updateField: <T extends keyof (QuoteData & Customer & CustomerData)>(
      state: QuoteState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.quoteData, field, value as keyof undefined);
    },
    updateVehicleField: <T extends keyof QuoteVehicle>(
      state: QuoteState,
      action: PayloadAction<UpdateVehicleFieldAction<T>>,
    ) => {
      const { vehicleIndex, field, value } = action.payload;
      const quotes = [...state.quoteData.quoteVehicles];
      const quote = quotes[vehicleIndex];
      setNestedObjectValue(quote, field, value as keyof undefined);
      quotes[vehicleIndex] = quote;
      state.quoteData.quoteVehicles = quotes;
    },
    resetField: <T extends keyof QuoteData>(
      state: QuoteState,
      action: PayloadAction<RevertFieldAction<T>>,
    ) => {
      const { field } = action.payload;
      if (!(field in state.initialQuoteData))
        throw new Error('Invalid Field in quoteSlice');
      state.quoteData[field] = state.initialQuoteData[field];
    },
    resetToInitialData: (state) => {
      const initialData = state.initialQuoteData;
      state.quoteData = { ...initialData };
    },
  },
});

export const getQuoteData = (state: { quote: QuoteState }) =>
  state.quote.quoteData;

export const {
  setQuoteData,
  updateField,
  updateVehicleField,
  resetField,
  resetToInitialData,
} = quoteSlice.actions;

export default quoteSlice.reducer;
