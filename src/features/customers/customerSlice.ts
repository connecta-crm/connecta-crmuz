import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  Customer,
  CustomerData,
  CustomerState,
  RevertFieldAction,
  Source,
  customerData,
} from '../../models';
import initialCustomerData from '../../models/CustomerDataType';
import { setNestedObjectValue } from '../leads/leadSlice';

type UpdateFieldAction<T extends keyof (CustomerData & Customer & Source)> = {
  field: T extends keyof CustomerData
    ? CustomerData[T]
    : T extends keyof Customer
      ? Customer[T]
      : T extends keyof Source
        ? Source[T]
        : never;
  value: T[keyof T];
};

const initialState: CustomerState = {
  customerData,
  initialCustomerData,
  status: 'idle',
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerData: (state, action: PayloadAction<CustomerData>) => {
      state.customerData = action.payload;
      state.initialCustomerData = action.payload;
    },
    updateField: <T extends keyof (CustomerData & Customer & CustomerData)>(
      state: CustomerState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.customerData, field, value as keyof undefined);
    },
    resetField: <T extends keyof CustomerData>(
      state: CustomerState,
      action: PayloadAction<RevertFieldAction<T>>,
    ) => {
      const { field } = action.payload;
      if (!(field in state.initialCustomerData))
        throw new Error('Invalid Field in customerSlice');
      state.customerData[field] = state.initialCustomerData[field];
    },
    resetToInitialData: (state) => {
      const initialData = state.initialCustomerData;
      state.customerData = { ...initialData };
    },
  },
});

export const getCustomerData = (state: { customer: CustomerState }) =>
  state.customer.customerData;

export const { setCustomerData, updateField, resetField, resetToInitialData } =
  customerSlice.actions;

export default customerSlice.reducer;
