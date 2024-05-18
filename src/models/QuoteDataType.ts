import { LeadData } from './DataTypes';

export type QuoteDataType = {
  vehicles: {
    vehicle: string | null;
    vehicleYear: FormDataEntryValue | null;
  }[];
  status: string | null;
  price: number | null;
  condition: string | null;
  trailerType: string | null;
  notes: string | undefined;
  reservationPrice: number;
  dateEstShip: string | null;
  customer: string | null;
  source: string | null;
  origin: string | null;
  destination: string | null;
  user: string | undefined;
  // extraUser: 0,
};

export type QuoteState = {
  quoteData: LeadData;
  initialQuoteData: LeadData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};
