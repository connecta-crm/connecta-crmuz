import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// export type VehicleFormData = {
//   vehicleYear: string;
//   vehicleMake: string;
//   vehicleModel: string;
//   vehicleType: string;
// };

// export type VehicleState = {
//   formData: VehicleFormData;
//   status?: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error?: unknown;
// };

// type UpdateFieldAction = {
//   field: keyof VehicleState['formData'];
//   value: string;
// };

export type LeadState = {
  leadData: object;
};

const initialState: LeadState = {
  leadData: {},
};

export const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    setLeadData: (state, action: PayloadAction<object>) => {
      state.leadData = action.payload;
    },
  },
});

export const getLeadData = (state: { lead: LeadState }) => state.lead.leadData;

export const { setLeadData } = leadSlice.actions;

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
