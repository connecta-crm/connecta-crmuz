export type CompanyType = {
  id: string;
  name: string;
  department: string;
  mainline: string;
  fax: string;
  email: string;
  supportEmail: string;
  accountingEmail: string;
  address: string;
  monFri: string;
  saturday: string;
  sunday: string;
  logo: string;
  updatedFrom: string;
};
export type ContractType = {
  id: string;
  executedOn: string;
  createdAt: string;
  signed: boolean;
  contractType: string;
  order: string;
  signerInitials?: string;
  signerName?: string;
  signedTime: string;
  signIpAddress: string;
};

export type Origintype = {
  id: 1;
  customerName: string;
  customerPhone: string;
  originName: string;
  destinationName: string;
  orderVehicles: {
    id: string;
    vehicle: {
      id: string;
      mark: {
        id: string;
        name: string;
        isActive: boolean;
      };
      name: string;
      vehicleType: string;
      isActive: boolean;
    };
    vehicleYear: string;
    lot: string;
    vin: string;
    color: string;
    plate: string;
    order: string;
  }[];
  user: {
    id: string;
    picture: string;
    firstName: string;
    lastName: string;
  };
  extraUser: string | null;
  customer: {
    id: string;
    name: string;
    lastName: null;
    email: string;
    phone: string;
    note: null;
    createdAt: string;
    updatedAt: string;
  };
  origin: {
    id: string;
    state: {
      id: string;
      name: string;
      code: string;
    };
    name: string;
    zip: string;
    text: null | string;
    long: string;
    lat: string;
  };
  destination: {
    id: string;
    state: {
      id: string;
      name: string;
      code: string;
    };
    name: string;
    zip: string;
    text: string;
    long: string;
    lat: string;
  };
  source: {
    id: string;
    name: string;
  };
  dispatchData: {
    dispatchPaidBy: string | null;
    dispatchPaymentTerm: string | null;
    dispatchTermBegins: string | null;
    dispatchCodMethod: string | null;
    dispatchPaymentType: string | null;
    carrierData: {
      id: string;
      name: string;
      address: string;
      mcNumber: string;
      contactName: string;
      phone: string;
      phone2: string;
      email: string;
      fax: string;
      status: string;
      location: string;
    };
  };
  dates: {
    dateEstShip: string;
    dateEstPu: string;
    dateEstDel: string;
    dateDispatched: string;
    datePickedUp: string;
    dateDelivered: string;
  };
  payments: {
    paymentTotalTariff: string;
    paymentReservation: string;
    paymentPaidReservation: string;
    paymentCarrierPay: string;
    paymentCodToCarrier: string;
    paymentPaidToCarrier: string;
  };
  guid: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  condition: string;
  trailerType: string;
  notes: string;
  reservationPrice: number;
  dateEstShip: string;
  status: string;
  buyerNumber: string;
  locationType: string;
  originAddress: string;
  originBusinessName: string;
  originBusinessPhone: string;
  originContactPerson: string;
  originPhone: string;
  originSecondPhone: string;
  originBuyerNumber: string;
  destinationAddress: string;
  destinationBusinessName: string;
  destinationBusinessPhone: string;
  destinationContactPerson: string;
  destinationPhone: string;
  destinationSecondPhone: string;
  destinationBuyerNumber: string;
  cdNote: string;
  cmNote: string;
  updatedFrom: string | null;
};
