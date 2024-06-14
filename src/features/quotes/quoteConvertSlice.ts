import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { setNestedObjectValue } from '../leads/leadSlice';
import { getQuoteData } from './quoteSlice';
const initialQuoteConvertData = {
  vehicles: [],
  quoteVehicles: [],
  price: null,
  condition: null,
  trailerType: null,
  notes: null,
  reservationPrice: null,
  dateEstShip: null,
  status: null,
  buyerNumber: null,
  locationType: null,
  dispatchPaidBy: null,
  dispatchPaymentTerm: null,
  dispatchTermBegins: null,
  dispatchCodMethod: null,
  dispatchPaymentType: null,
  originBusinessName: null,
  originBusinessPhone: null,
  originContactPerson: null,
  originPhone: null,
  originSecondPhone: null,
  originBuyerNumber: null,
  destinationBusinessName: null,
  destinationBusinessPhone: null,
  destinationContactPerson: null,
  destinationPhone: null,
  destinationSecondPhone: null,
  paymentTotalTariff: null,
  paymentReservation: null,
  paymentPaidReservation: null,
  paymentCarrierPay: null,
  paymentCodToCarrier: null,
  paymentPaidToCarrier: null,
  dateEstPu: null,
  dateEstDel: null,
  dateDispatched: null,
  datePickedUp: null,
  dateDelivered: null,
  cdNote: null,
  cmNote: null,
  customer: null,
  source: null,
  user: null,
  extraUser: null,
  carrier: null,
  origin: null,
  destination: null,
  updatedFrom: null,
  originAddress: null,
  destinationAddress: null,
};

export const fetchQuoteConvertData = createAsyncThunk(
  'quoteConvert/fetchQuoteConvertData',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const quoteData = getQuoteData(state);
    return {
      quoteConvertData: { ...initialQuoteConvertData, ...quoteData },
    };
  },
);

const initialState = {
  quoteConvertData: initialQuoteConvertData,
  initialQuoteConvertData,
  status: 'idle',
};

export const quoteConvertSlice = createSlice({
  name: 'quoteConvert',
  initialState,
  reducers: {
    setQuoteConvertData: (state, action) => {
      state.quoteConvertData = action.payload;
      state.initialQuoteConvertData = action.payload;
    },
    updateConvertField: (state, action) => {
      const { field, value } = action.payload;
      setNestedObjectValue(
        state.quoteConvertData,
        field,
        value as keyof undefined,
      );
    },
    updateConvertVehicleField: (state, action) => {
      const { vehicleIndex, field, value } = action.payload;
      const quotes = [...state.quoteConvertData.quoteVehicles];
      const quote = quotes[vehicleIndex];
      setNestedObjectValue(quote, field, value as keyof undefined);
      quotes[vehicleIndex] = quote;
      state.quoteConvertData.quoteVehicles = quotes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuoteConvertData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuoteConvertData.fulfilled, (state, action) => {
        state.quoteConvertData = action.payload.quoteConvertData;
        state.status = 'succeeded';
      })
      .addCase(fetchQuoteConvertData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const getQuoteConvertData = (state: RootState) =>
  state.quoteConvert.quoteConvertData;

export const {
  setQuoteConvertData,
  updateConvertField,
  updateConvertVehicleField,
} = quoteConvertSlice.actions;

export default quoteConvertSlice.reducer;
