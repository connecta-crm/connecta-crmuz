import { LeadData, OrderData, QuoteData } from '../../models';

export const isLeadData = (
  data: LeadData | QuoteData | OrderData,
): data is LeadData => (data as LeadData).leadVehicles !== undefined;

export const isQuoteData = (
  data: LeadData | QuoteData | OrderData,
): data is QuoteData => (data as QuoteData).quoteVehicles !== undefined;

export const isOrderData = (
  data: LeadData | QuoteData | OrderData,
): data is OrderData => (data as OrderData).orderVehicles !== undefined;
