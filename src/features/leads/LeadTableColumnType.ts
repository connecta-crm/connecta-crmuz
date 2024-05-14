export interface LeadTableDataType {
  key: string;
  id: string;
  customerName: string;
  customerPhone: string;
  originName: string;
  destinationName: string;
  leadVehicles: { vehicleName: string }[];
  guid: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  price: number;
  condition: string;
  trailerType: string;
  notes: string;
  reservationPrice: number;
  dateEstShip: string;
  customer: number;
  source: number;
  origin: number;
  destination: number;
}
