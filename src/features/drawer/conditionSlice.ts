import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ConditionFormData = {
  conditionType: string;
};

export type ConditionState = {
  formData: ConditionFormData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

type UpdateFieldAction = {
  value: string;
};

export const conditionSlice = createSlice({
  name: 'condition',
  initialState: {
    formData: {
      conditionType: '',
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    updateSelect: (state, action: PayloadAction<UpdateFieldAction>) => {
      const { value } = action.payload;
      state.formData.conditionType = value;
    },
  },
});

export const { updateSelect } = conditionSlice.actions;

export default conditionSlice.reducer;
