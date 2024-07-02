import { CarType } from '../features/vehicle/VehicleContainer';

export type OrdersDataType = {
  vehicles: CarType[];
  locationType:string|null
  // price: number | null;
  condition: string | null;
  trailerType: string | null;
  // notes: string | undefined;
  // reservationPrice: string;
  dateEstShip: string | null;
  status: string;
  buyerNumber: string | null;
  originBusinessName: string | null;
  originBusinessPhone: string | null;
  originContactPerson: string | null;
  originPhone: string | null;
  originSecondPhone: string | null;
  originBuyerNumber: string | null;
  originAddress:string| null
  destinationAddress:string| null
  destinationBusinessName: string | null;
  destinationBusinessPhone: string | null;
  destinationContactPerson: string | null;
  destinationPhone: string | null;
  destinationSecondPhone: string | null;
  paymentTotalTariff: number;
  paymentReservation: number;
  // paymentPaidReservation: number;
  paymentCarrierPay: number;
  // paymentCodToCarrier: number;
  // paymentPaidToCarrier: number;
  dateEstPu: string | null;
  dateEstDel: string | null;
  // dateDispatched: string | null;
  // datePickedUp: string | null;
  // dateDelivered: string | null;
  cdNote: string | undefined;
  cmNote: string | undefined;
  customer: string | null;
  source: string | null;
  user: string | undefined;
  // extraUser: string | null;
  origin: string | null;
  destination: string | null;
};
