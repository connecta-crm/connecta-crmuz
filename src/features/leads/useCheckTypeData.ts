import { LeadData, QuoteData } from '../../models';

export const isLeadData = (data: LeadData | QuoteData): data is LeadData =>
  (data as LeadData).leadVehicles !== undefined;

export const isQuoteData = (data: LeadData | QuoteData): data is QuoteData =>
  (data as QuoteData).quoteVehicles !== undefined;
