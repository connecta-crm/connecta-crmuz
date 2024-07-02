import { CarType } from '../features/vehicle/VehicleContainer';
import {
  Customer,
  Location,
  Mark,
  Source,
  User,
  initialCustomer,
  initialLocation,
  initialSource,
  initialUser,
} from './DataTypes';

export type OrdersDataType = {
  vehicles: CarType[];
  // price: number | null;
  condition: string | null;
  trailerType: string | null;
  // notes: string | undefined;
  // reservationPrice: string;
  dateEstShip: string | null;
  status: string;
  // buyerNumber: string | null;
  originBusinessName: string | null;
  originBusinessPhone: string | null;
  originContactPerson: string | null;
  originPhone: string | null;
  originSecondPhone: string | null;
  originBuyerNumber: string | null;
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
  originAddress: string | null;
  destinationAddress: string | null;
  locationType: string | null;
};
/* ==================================================================================================================*/

export type DatesOrder = {
  dateEstShip: string;
  dateEstPu: string;
  dateEstDel: string;
  dateDispatched: string;
  datePickedUp: string;
  dateDelivered: string;
};

export type CarrierData = {
  id?: number;
  name: string;
  address: string;
  mcNumber: string;
  contactName: string;
  phone: string;
  phone2: string;
  email: string;
  fax: string;
  status: string;
  location: number | null;
  locationName: string;
};

export type DispatchData = {
  dispatchPaidBy: null;
  dispatchPaymentTerm: null;
  dispatchTermBegins: null;
  dispatchCodMethod: null;
  dispatchPaymentType: null;
  carrierData: CarrierData;
};

export type PaymentsData = {
  paymentTotalTariff: number;
  paymentReservation: number;
  paymentPaidReservation: number;
  paymentCarrierPay: number;
  paymentCodToCarrier: number;
  paymentPaidToCarrier: number;
};

const dispatchData: DispatchData = {
  dispatchPaidBy: null,
  dispatchPaymentTerm: null,
  dispatchTermBegins: null,
  dispatchCodMethod: null,
  dispatchPaymentType: null,
  carrierData: {
    id: 0,
    name: '',
    address: '',
    mcNumber: '',
    contactName: '',
    phone: '',
    phone2: '',
    email: '',
    fax: '',
    status: '',
    location: 0,
    locationName: '',
  },
};

const payments: PaymentsData = {
  paymentTotalTariff: 0,
  paymentReservation: 0,
  paymentPaidReservation: 0,
  paymentCarrierPay: 0,
  paymentCodToCarrier: 0,
  paymentPaidToCarrier: 0,
};

export type OrderData = {
  id: number;
  carrier: number;
  customerName: string;
  customerPhone: string;
  originName: string;
  destinationName: string;
  orderVehicles: OrderVehicle[];
  user: User;
  extraUser: null;
  customer: Customer;
  origin: Location;
  destination: Location;
  source: Source;
  guid: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  condition: string;
  trailerType: string;
  locationType: string;
  notes: string;
  reservationPrice: number;
  dateEstShip: string;
  status: string;
  buyerNumber: string;
  originBusinessName: string;
  originBusinessPhone: string;
  originContactPerson: string;
  originPhone: string;
  originSecondPhone: string;
  originBuyerNumber: string;
  destinationBusinessName: string;
  destinationBusinessPhone: string;
  destinationContactPerson: string;
  destinationPhone: string;
  destinationSecondPhone: string;
  paymentTotalTariff: number;
  paymentReservation: number;
  paymentPaidReservation: number;
  paymentCarrierPay: number;
  paymentCodToCarrier: number;
  paymentPaidToCarrier: number;
  dates: DatesOrder;
  dispatchData: DispatchData;
  payments: PaymentsData;

  dateEstPu: string;
  dateEstDel: string;
  dateDispatched: string;
  datePickedUp: string;
  dateDelivered: string;
  dispatchPaidBy: null;
  dispatchPaymentTerm: null;
  dispatchTermBegins: null;
  dispatchCodMethod: null;
  dispatchPaymentType: null;
  cdNote: string;
  cmNote: string;
  originAddress: string;
  destinationAddress: string;
};

export type OrderVehicle = {
  id: number;
  vehicle: VehicleForOrder;
  vehicleYear: number;
  lot: string;
  vin: string;
  color: string;
  plate: string;
  order: number;
};

export type VehicleForOrder = {
  id: number | null;
  name: string | null;
  mark: Mark & { isActive: boolean };
  vehicleType: string | null;
  isActive: boolean;
};

export type OrderState = {
  orderData: OrderData;
  initialOrderData: OrderData;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: unknown;
};

export const orderData: OrderData = {
  id: 0,
  carrier: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  orderVehicles: [],
  user: initialUser,
  extraUser: null,
  customer: initialCustomer,
  origin: initialLocation,
  destination: initialLocation,
  source: initialSource,
  guid: '',
  createdAt: '',
  updatedAt: '',
  price: 0,
  condition: '',
  trailerType: '',
  locationType: '',
  notes: '',
  reservationPrice: 0,
  dateEstShip: '',
  status: '',
  buyerNumber: '',
  originBusinessName: '',
  originBusinessPhone: '',
  originContactPerson: '',
  originPhone: '',
  originSecondPhone: '',
  originBuyerNumber: '',
  destinationBusinessName: '',
  destinationBusinessPhone: '',
  destinationContactPerson: '',
  destinationPhone: '',
  destinationSecondPhone: '',
  paymentTotalTariff: 0,
  paymentReservation: 0,
  paymentPaidReservation: 0,
  paymentCarrierPay: 0,
  paymentCodToCarrier: 0,
  paymentPaidToCarrier: 0,
  dates: {
    dateEstShip: '',
    dateEstPu: '',
    dateEstDel: '',
    dateDispatched: '',
    datePickedUp: '',
    dateDelivered: '',
  },
  payments,
  dateEstPu: '',
  dateEstDel: '',
  dateDispatched: '',
  datePickedUp: '',
  dateDelivered: '',
  dispatchData: dispatchData,
  dispatchPaidBy: null,
  dispatchPaymentTerm: null,
  dispatchTermBegins: null,
  dispatchCodMethod: null,
  dispatchPaymentType: null,
  cdNote: '',
  cmNote: '',
};

const initialOrderData: OrderData = {
  id: 0,
  carrier: 0,
  customerName: '',
  customerPhone: '',
  originName: '',
  destinationName: '',
  orderVehicles: [],
  user: initialUser,
  extraUser: null,
  customer: initialCustomer,
  origin: initialLocation,
  destination: initialLocation,
  source: initialSource,
  guid: '',
  createdAt: '',
  updatedAt: '',
  price: 0,
  condition: '',
  trailerType: '',
  locationType: '',
  notes: '',
  reservationPrice: 0,
  dateEstShip: '',
  status: '',
  buyerNumber: '',
  originBusinessName: '',
  originBusinessPhone: '',
  originContactPerson: '',
  originPhone: '',
  originSecondPhone: '',
  originBuyerNumber: '',
  destinationBusinessName: '',
  destinationBusinessPhone: '',
  destinationContactPerson: '',
  destinationPhone: '',
  destinationSecondPhone: '',
  paymentTotalTariff: 0,
  paymentReservation: 0,
  paymentPaidReservation: 0,
  paymentCarrierPay: 0,
  paymentCodToCarrier: 0,
  paymentPaidToCarrier: 0,
  dates: {
    dateEstShip: '',
    dateEstPu: '',
    dateEstDel: '',
    dateDispatched: '',
    datePickedUp: '',
    dateDelivered: '',
  },
  payments,
  dateEstPu: '',
  dateEstDel: '',
  dateDispatched: '',
  datePickedUp: '',
  dateDelivered: '',
  dispatchData: dispatchData,
  dispatchPaidBy: null,
  dispatchPaymentTerm: null,
  dispatchTermBegins: null,
  dispatchCodMethod: null,
  dispatchPaymentType: null,
  cdNote: '',
  cmNote: '',
};

export default initialOrderData;
