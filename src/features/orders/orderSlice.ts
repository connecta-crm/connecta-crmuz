import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  Customer,
  CustomerData,
  OrderData,
  OrderState,
  OrderVehicle,
  RevertFieldAction,
  Source,
  initialOrderData,
  orderData,
} from '../../models';
import { setNestedObjectValue } from '../leads/leadSlice';

type UpdateVehicleFieldAction<T extends keyof OrderVehicle> = {
  vehicleIndex: number;
  field: T extends keyof OrderVehicle ? OrderVehicle[T] : never;
  value: OrderVehicle[T];
};

type UpdateFieldAction<T extends keyof (OrderData & Customer & Source)> = {
  field: T extends keyof OrderData
    ? OrderData[T]
    : T extends keyof Customer
      ? Customer[T]
      : T extends keyof Source
        ? Source[T]
        : never;
  value: T[keyof T];
};

const initialState: OrderState = {
  orderData,
  initialOrderData,
  status: 'idle',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<OrderData>) => {
      state.orderData = action.payload;
      state.initialOrderData = action.payload;
    },
    updateField: <T extends keyof (OrderData & Customer & CustomerData)>(
      state: OrderState,
      action: PayloadAction<UpdateFieldAction<T>>,
    ) => {
      const { field, value } = action.payload;
      setNestedObjectValue(state.orderData, field, value as keyof undefined);
    },
    updateVehicleField: <T extends keyof OrderVehicle>(
      state: OrderState,
      action: PayloadAction<UpdateVehicleFieldAction<T>>,
    ) => {
      const { vehicleIndex, field, value } = action.payload;
      const orders = [...state.orderData.orderVehicles];
      const order = orders[vehicleIndex];
      setNestedObjectValue(order, field, value as keyof undefined);
      orders[vehicleIndex] = order;
      state.orderData.orderVehicles = orders;
    },
    resetField: <T extends keyof OrderData>(
      state: OrderState,
      action: PayloadAction<RevertFieldAction<T>>,
    ) => {
      const { field } = action.payload;
      if (!(field in state.initialOrderData))
        throw new Error('Invalid Field in orderSlice');
      state.orderData[field] = state.initialOrderData[field];
    },
  },
});

export const getOrderData = (state: { order: OrderState }) =>
  state.order.orderData;

export const { setOrderData, updateField, updateVehicleField, resetField } =
  orderSlice.actions;

export default orderSlice.reducer;
