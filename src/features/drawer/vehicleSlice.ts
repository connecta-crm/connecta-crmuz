import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type VehicleFormData = {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
};

export type VehicleState = {
  formData: VehicleFormData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

type UpdateFieldAction = {
  field: keyof VehicleState['formData'];
  value: string;
};

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    formData: {
      vehicleYear: '',
      vehicleMake: '',
      vehicleModel: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    updateField: (state, action: PayloadAction<UpdateFieldAction>) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
  },
});

export const { updateField } = vehicleSlice.actions;

export default vehicleSlice.reducer;
