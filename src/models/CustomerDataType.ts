export type CustomerExtraItem = {
  id: number;
  phone: string;
};

export type CustomerDataType = {
  id: number;
  extra: CustomerExtraItem[];
  name: string;
  lastName: string | null;
  email: string;
  phone: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

/* ==================================================================================================================*/

export type CustomerData = {
  id: number;
  extra: CustomerExtraItem[];
  name: string;
  lastName: string | null;
  email: string;
  phone: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CustomerState = {
  customerData: CustomerData;
  initialCustomerData: CustomerData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

// * INITIAL CUSTOMER DATA
export const customerData: CustomerData = {
  id: 0,
  extra: [],
  name: '',
  lastName: null,
  email: '',
  phone: '',
  note: null,
  createdAt: '',
  updatedAt: '',
};

const initialCustomerData: CustomerData = {
  id: 0,
  extra: [],
  name: '',
  lastName: null,
  email: '',
  phone: '',
  note: null,
  createdAt: '',
  updatedAt: '',
};

export default initialCustomerData;
